#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="${ROOT_DIR}/deploy_ubuntu_24_04.sh"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

FAKE_BIN="${TMP_DIR}/bin"
SITE_DIR="${TMP_DIR}/site"
SERVICE_FILE="${TMP_DIR}/ergouzi-docs.service"
NPM_LOG="${TMP_DIR}/npm.log"
SYSTEMCTL_LOG="${TMP_DIR}/systemctl.log"

mkdir -p "${FAKE_BIN}" "${SITE_DIR}"

cat > "${FAKE_BIN}/node" <<'EOF'
#!/usr/bin/env bash
exit 0
EOF
chmod +x "${FAKE_BIN}/node"

cat > "${FAKE_BIN}/npm" <<'EOF'
#!/usr/bin/env bash
set -Eeuo pipefail
echo "$*" >> "${NPM_LOG:?}"
if [[ "$*" == "run build" ]]; then
  mkdir -p dist/assets
  printf '<!doctype html><html><body>built dist</body></html>\n' > dist/index.html
  printf 'built asset\n' > dist/assets/test.txt
fi
EOF
chmod +x "${FAKE_BIN}/npm"

cat > "${FAKE_BIN}/systemctl" <<'EOF'
#!/usr/bin/env bash
set -Eeuo pipefail
echo "$*" >> "${SYSTEMCTL_LOG:?}"
EOF
chmod +x "${FAKE_BIN}/systemctl"

cat > "${FAKE_BIN}/sudo" <<'EOF'
#!/usr/bin/env bash
set -Eeuo pipefail
while [[ "$#" -gt 0 ]]; do
  case "$1" in
    -H)
      shift
      ;;
    -u)
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      break
      ;;
  esac
done
exec "$@"
EOF
chmod +x "${FAKE_BIN}/sudo"

assert_file_contains() {
  local path="$1"
  local expected="$2"
  if ! grep -Fq -- "${expected}" "${path}"; then
    echo "expected '${expected}' in ${path}" >&2
    echo "--- ${path} ---" >&2
    cat "${path}" >&2
    exit 1
  fi
}

PATH="${FAKE_BIN}:${PATH}" \
NPM_LOG="${NPM_LOG}" \
SYSTEMCTL_LOG="${SYSTEMCTL_LOG}" \
SITE_DIR="${SITE_DIR}" \
SERVICE_FILE="${SERVICE_FILE}" \
SUDO_BIN="${FAKE_BIN}/sudo" \
SYSTEMCTL_BIN="${FAKE_BIN}/systemctl" \
BUILD_USER="build-user" \
SKIP_ROOT_CHECK=1 \
bash "${SCRIPT_PATH}"

assert_file_contains "${NPM_LOG}" "ci"
assert_file_contains "${NPM_LOG}" "run build"
assert_file_contains "${SITE_DIR}/index.html" "built dist"
assert_file_contains "${SITE_DIR}/assets/test.txt" "built asset"
assert_file_contains "${SERVICE_FILE}" "--directory ${SITE_DIR}"
assert_file_contains "${SYSTEMCTL_LOG}" "daemon-reload"
assert_file_contains "${SYSTEMCTL_LOG}" "enable ergouzi-docs"
assert_file_contains "${SYSTEMCTL_LOG}" "restart ergouzi-docs"

printf 'ok - deploy script builds dist and publishes it\n'
