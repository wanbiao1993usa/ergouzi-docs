#!/usr/bin/env bash

set -Eeuo pipefail

APP_NAME="${APP_NAME:-ergouzi-docs}"
SERVICE_NAME="${SERVICE_NAME:-${APP_NAME}}"
SITE_DIR="${SITE_DIR:-/var/www/${APP_NAME}}"
LISTEN_PORT="${LISTEN_PORT:-3001}"
BIND_ADDRESS="${BIND_ADDRESS:-127.0.0.1}"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_INDEX="${SCRIPT_DIR}/index.html"
SOURCE_ASSETS_DIR="${SCRIPT_DIR}/assets"
PYTHON_BIN="$(command -v python3 || true)"

if [[ "${EUID}" -ne 0 ]]; then
  echo "请使用 sudo 运行：sudo bash ${0}" >&2
  exit 1
fi

if [[ -z "${PYTHON_BIN}" ]]; then
  echo "未找到 python3，请先安装 Python 3。" >&2
  exit 1
fi

if [[ ! -f "${SOURCE_INDEX}" ]]; then
  echo "未找到 ${SOURCE_INDEX}" >&2
  exit 1
fi

if [[ ! -d "${SOURCE_ASSETS_DIR}" ]]; then
  echo "未找到 ${SOURCE_ASSETS_DIR}" >&2
  exit 1
fi

echo "==> 准备站点目录 ${SITE_DIR}"
install -d -m 755 "${SITE_DIR}"
install -d -m 755 "${SITE_DIR}/assets"

echo "==> 部署静态文件"
install -m 644 "${SOURCE_INDEX}" "${SITE_DIR}/index.html"
find "${SITE_DIR}/assets" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "${SOURCE_ASSETS_DIR}/." "${SITE_DIR}/assets/"
find "${SITE_DIR}" -type d -exec chmod 755 {} +
find "${SITE_DIR}" -type f -exec chmod 644 {} +

echo "==> 写入 systemd 服务 ${SERVICE_FILE}"
cat > "${SERVICE_FILE}" <<EOF
[Unit]
Description=Ergouzi Docs Static Server
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=${SITE_DIR}
ExecStart=${PYTHON_BIN} -m http.server ${LISTEN_PORT} --bind ${BIND_ADDRESS} --directory ${SITE_DIR}
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

echo "==> 重新加载 systemd"
systemctl daemon-reload

echo "==> 设置 ${SERVICE_NAME} 开机自启并立即启动"
systemctl enable "${SERVICE_NAME}"
systemctl restart "${SERVICE_NAME}"

cat <<EOF

部署完成。

站点目录：
  ${SITE_DIR}

systemd 服务：
  ${SERVICE_FILE}

当前监听：
  http://${BIND_ADDRESS}:${LISTEN_PORT}

如果你要让 Caddy 反代到这个服务，可以参考：

  docs.example.com {
      reverse_proxy ${BIND_ADDRESS}:${LISTEN_PORT}
  }

常用检查命令：
  systemctl status ${SERVICE_NAME}
  journalctl -u ${SERVICE_NAME} -n 100 --no-pager

如果你希望直接对外暴露 ${LISTEN_PORT}，部署时可改成：
  sudo BIND_ADDRESS=0.0.0.0 bash ${SCRIPT_DIR}/deploy_ubuntu_24_04.sh

EOF
