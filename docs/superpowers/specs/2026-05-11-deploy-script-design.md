# Deploy Script Design

## Goal

Make [deploy_ubuntu_24_04.sh](/Users/biaowan/projects/docs/deploy_ubuntu_24_04.sh) deploy the current Vite app instead of the legacy source tree by building `dist/` on the server and publishing that output.

## Constraints

- Keep the existing entrypoint: `sudo bash ./deploy_ubuntu_24_04.sh`
- Preserve the current Ubuntu + `systemd` + `python3 -m http.server` hosting model
- Avoid leaving root-owned build artifacts in the repository when the script is launched with `sudo`
- Keep the script easy to run on a single server without adding Docker or a separate CI system

## Design

- Determine a build user from `BUILD_USER` or `SUDO_USER`, falling back to the current user only when needed
- Run dependency installation and `npm run build` as that build user
- Prefer `npm ci` when `package-lock.json` exists, otherwise fall back to `npm install`
- Publish the contents of `dist/` into the configured site directory instead of copying source `index.html` and `assets/`
- Continue writing a `systemd` unit that serves the published directory with `python3 -m http.server`
- Expose a few path and command overrides so the script can be verified locally with fake binaries and temporary directories

## Verification

- Add a shell test that stubs `npm`, `sudo`, and `systemctl`
- Verify the script runs install and build commands, writes a service file, and publishes built files from `dist/`
- Update [README.md](/Users/biaowan/projects/docs/README.md) so the documented behavior matches the script
