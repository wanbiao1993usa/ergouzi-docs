#!/usr/bin/env bash

set -Eeuo pipefail

APP_NAME="${APP_NAME:-ergouzi-docs}"
SERVICE_NAME="${SERVICE_NAME:-${APP_NAME}}"
SITE_DIR="${SITE_DIR:-/var/www/${APP_NAME}}"
LISTEN_PORT="${LISTEN_PORT:-3001}"
BIND_ADDRESS="${BIND_ADDRESS:-127.0.0.1}"
SERVICE_FILE="${SERVICE_FILE:-/etc/systemd/system/${SERVICE_NAME}.service}"
SERVER_ENTRY="${SITE_DIR}/serve_spa.py"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_JSON="${SCRIPT_DIR}/package.json"
PACKAGE_LOCK="${SCRIPT_DIR}/package-lock.json"
BUILD_OUTPUT_DIR="${BUILD_OUTPUT_DIR:-${SCRIPT_DIR}/dist}"
PYTHON_BIN="${PYTHON_BIN:-$(command -v python3 || true)}"
SYSTEMCTL_BIN="${SYSTEMCTL_BIN:-$(command -v systemctl || true)}"
SUDO_BIN="${SUDO_BIN:-$(command -v sudo || true)}"
CURRENT_USER="$(id -un)"
BUILD_USER="${BUILD_USER:-${SUDO_USER:-${CURRENT_USER}}}"

require_command() {
  local path="$1"
  local label="$2"

  if [[ -z "${path}" ]]; then
    echo "未找到 ${label}，请先安装 ${label}。" >&2
    exit 1
  fi
}

run_as_build_user() {
  local shell_script="$1"

  if [[ "${BUILD_USER}" == "${CURRENT_USER}" ]]; then
    env SCRIPT_DIR="${SCRIPT_DIR}" BUILD_OUTPUT_DIR="${BUILD_OUTPUT_DIR}" bash -c "${shell_script}"
    return
  fi

  require_command "${SUDO_BIN}" "sudo"
  "${SUDO_BIN}" -H -u "${BUILD_USER}" env SCRIPT_DIR="${SCRIPT_DIR}" BUILD_OUTPUT_DIR="${BUILD_OUTPUT_DIR}" bash -c "${shell_script}"
}

if [[ "${SKIP_ROOT_CHECK:-0}" != "1" && "${EUID}" -ne 0 ]]; then
  echo "请使用 sudo 运行：sudo bash ${0}" >&2
  exit 1
fi

require_command "${PYTHON_BIN}" "python3"
require_command "${SYSTEMCTL_BIN}" "systemctl"

if [[ ! -f "${PACKAGE_JSON}" ]]; then
  echo "未找到 ${PACKAGE_JSON}" >&2
  exit 1
fi

echo "==> 检查构建环境"
run_as_build_user '
  command -v node >/dev/null || {
    echo "未找到 node，请先安装 Node.js。" >&2
    exit 1
  }
  command -v npm >/dev/null || {
    echo "未找到 npm，请先安装 npm。" >&2
    exit 1
  }
'

if [[ -f "${PACKAGE_LOCK}" ]]; then
  echo "==> 安装依赖 (npm ci)"
  run_as_build_user 'cd "$SCRIPT_DIR" && npm ci'
else
  echo "==> 安装依赖 (npm install)"
  run_as_build_user 'cd "$SCRIPT_DIR" && npm install'
fi

echo "==> 构建站点 (npm run build)"
run_as_build_user 'cd "$SCRIPT_DIR" && npm run build'

if [[ ! -d "${BUILD_OUTPUT_DIR}" ]]; then
  echo "构建失败：未找到 ${BUILD_OUTPUT_DIR}" >&2
  exit 1
fi

if [[ ! -f "${BUILD_OUTPUT_DIR}/index.html" ]]; then
  echo "构建失败：未找到 ${BUILD_OUTPUT_DIR}/index.html" >&2
  exit 1
fi

echo "==> 准备站点目录 ${SITE_DIR}"
install -d -m 755 "${SITE_DIR}"

echo "==> 发布 dist 到 ${SITE_DIR}"
find "${SITE_DIR}" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "${BUILD_OUTPUT_DIR}/." "${SITE_DIR}/"
find "${SITE_DIR}" -type d -exec chmod 755 {} +
find "${SITE_DIR}" -type f -exec chmod 644 {} +

echo "==> 写入 SPA 静态服务入口 ${SERVER_ENTRY}"
cat > "${SERVER_ENTRY}" <<'PY'
from __future__ import annotations

import argparse
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


class SpaStaticHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        original_path = self.path
        parsed = urlsplit(original_path)
        request_path = unquote(parsed.path)
        candidate = Path(self.translate_path(request_path))

        # Only fall back for route-like URLs. Missing files such as images or JS
        # should still return 404 instead of incorrectly serving index.html.
        if not candidate.exists() and not os.path.splitext(request_path)[1]:
            self.path = "/index.html"

        try:
            return super().send_head()
        finally:
            self.path = original_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve a static SPA with index.html fallback.")
    parser.add_argument("--bind", default="127.0.0.1")
    parser.add_argument("--port", default=3001, type=int)
    parser.add_argument("--directory", default=os.getcwd())
    args = parser.parse_args()

    handler = partial(SpaStaticHandler, directory=args.directory)
    server = ThreadingHTTPServer((args.bind, args.port), handler)
    server.serve_forever()


if __name__ == "__main__":
    main()
PY
chmod 755 "${SERVER_ENTRY}"

echo "==> 写入 systemd 服务 ${SERVICE_FILE}"
install -d -m 755 "$(dirname -- "${SERVICE_FILE}")"
cat > "${SERVICE_FILE}" <<EOF
[Unit]
Description=Ergouzi Docs Static Server
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=${SITE_DIR}
ExecStart=${PYTHON_BIN} ${SERVER_ENTRY} --port ${LISTEN_PORT} --bind ${BIND_ADDRESS} --directory ${SITE_DIR}
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

echo "==> 重新加载 systemd"
"${SYSTEMCTL_BIN}" daemon-reload

echo "==> 设置 ${SERVICE_NAME} 开机自启并立即启动"
"${SYSTEMCTL_BIN}" enable "${SERVICE_NAME}"
"${SYSTEMCTL_BIN}" restart "${SERVICE_NAME}"

cat <<EOF

部署完成。

站点目录：
  ${SITE_DIR}

systemd 服务：
  ${SERVICE_FILE}

当前监听：
  http://${BIND_ADDRESS}:${LISTEN_PORT}

构建产物：
  ${BUILD_OUTPUT_DIR}

如果你要让 Caddy 反代到这个服务，可以参考：

  docs.example.com {
      reverse_proxy ${BIND_ADDRESS}:${LISTEN_PORT}
  }

常用检查命令：
  ${SYSTEMCTL_BIN} status ${SERVICE_NAME}
  journalctl -u ${SERVICE_NAME} -n 100 --no-pager

如果你希望直接对外暴露 ${LISTEN_PORT}，部署时可以改成：
  sudo BIND_ADDRESS=0.0.0.0 bash ${SCRIPT_DIR}/deploy_ubuntu_24_04.sh

EOF
