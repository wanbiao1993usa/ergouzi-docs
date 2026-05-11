# Deploy Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Ubuntu deployment script so it installs dependencies on the server, builds the Vite app, and publishes `dist/`.

**Architecture:** Keep the current single-script deployment model, but split the workflow into build and publish phases. Build runs as the non-root invoking user when possible, while publish and `systemd` updates remain privileged.

**Tech Stack:** Bash, npm, Vite, systemd, python3 `http.server`

---

### Task 1: Lock the expected deployment behavior with a shell test

**Files:**
- Create: `tests/deploy_ubuntu_24_04.test.sh`
- Test: `tests/deploy_ubuntu_24_04.test.sh`

- [ ] **Step 1: Write the failing test**

```bash
bash /Users/biaowan/projects/docs/tests/deploy_ubuntu_24_04.test.sh
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bash tests/deploy_ubuntu_24_04.test.sh`
Expected: FAIL because the current script neither runs `npm ci` / `npm run build` nor publishes `dist/`.

### Task 2: Implement build-and-publish deployment

**Files:**
- Modify: `deploy_ubuntu_24_04.sh`
- Test: `tests/deploy_ubuntu_24_04.test.sh`

- [ ] **Step 1: Write minimal implementation**

```bash
# Add command discovery for node, npm, sudo, and systemctl.
# Add a helper that runs npm commands as BUILD_USER.
# Replace source-file copying with dist publication.
```

- [ ] **Step 2: Run test to verify it passes**

Run: `bash tests/deploy_ubuntu_24_04.test.sh`
Expected: PASS with published files coming from `dist/`.

### Task 3: Update operator documentation

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Document the new workflow**

```markdown
- Script installs dependencies on the server
- Script runs `npm ci` or `npm install`
- Script runs `npm run build`
- Script publishes `dist/`
```

- [ ] **Step 2: Re-run the deployment test**

Run: `bash tests/deploy_ubuntu_24_04.test.sh`
Expected: PASS
