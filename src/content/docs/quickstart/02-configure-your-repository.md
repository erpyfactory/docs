---
title: 2. Configure your repository
description: Ask Erpyd to plan your repository's configuration, answer its questions, approve the plan, and merge the pull request it opens.
---

Erpyd configures your repository from a plan that you review first. It looks at the repository, writes the plan into an issue, and after you approve the plan it opens a pull request with the configuration.

This step covers the simple case: a repository of Odoo add-ons with CI that runs on a public Odoo image such as `odoo:19.0`. If you run Odoo Enterprise, use your own Docker Compose setup, or keep your image or database dump in your own AWS account, you do the same steps and then go on to [Advanced settings](../03-advanced-settings/).

## Before you start

- Step 1 is done and Erpyd is active on your installation. You can see its status on your installed apps page:
  - for an organization: `https://github.com/organizations/<your-organization>/settings/installations`
  - for a personal account: [github.com/settings/installations](https://github.com/settings/installations)
- Issues are enabled on the repository.
- You have write access to the repository. Erpyd acts only on requests from people with write access.

## Steps

1. Open a new issue in your repository, for example titled "Configure Erpy Factory".
2. Add this comment:

   ```text
   @erpyd plan the configuration
   ```

3. Erpyd replies that it is planning and keeps one status comment up to date: in progress, then done. Wait for "The configuration plan is ready for review."
4. Read the plan. Erpyd wrote it into the issue, below your text. It says what it found in your repository, which labels and configuration file it will add and what each setting in that file is for, what it proposes for each of your workflows, and what you need to decide.
5. Erpyd tries to answer most questions from your repository itself. If it could not, it lists its open questions in the issue. Answer them in a comment that mentions Erpyd, and say there anything else you want changed, for example:

   ```text
   @erpyd the staging deploy should be left alone
   ```

   Erpyd updates the plan, lists what it changed and what is still open, and asks you to approve again. An approval you gave before an update no longer counts. Repeat until the plan is right.

6. When the plan is right, add this comment:

   ```text
   @erpyd approve, configure
   ```

7. Wait for "Pull request #N with the configuration is open for review."
8. Review the pull request, and merge it when it looks right.

## What Erpyd configures

Erpyd writes the configuration into `harness.yaml`, with a comment above each setting that says what it is for, and creates a `.harness` folder where you can keep your own instructions for Erpyd. It fills in what it finds in your repository and asks you in the plan about what it cannot work out. A typical result:

```yaml
harness:
  # The Erpy Factory configuration this repository builds on. Leave these three as they are.
  extends: {git: git@github.com:erpyfactory/harness, ref: main, stack: odoo}
  target: {runtime: claude, model: opus}
  modules:
    - name: honeydukes
      source: {path: .harness}
  extensions:
    # Files Erpyd never edits: this configuration itself.
    harness_paths: [harness.yaml, .harness/]
    # The check a pull request must be green on.
    required_check: Addons tests
    # The Odoo version your add-ons are written for.
    odoo_version: "19.0"
    # The image Erpyd runs your code and tests on.
    odoo_image: "odoo:19.0"
    # The languages a new translatable term needs, besides English.
    odoo_locales: [fr_BE, nl_NL]
    resolve_ci:
      # Workflows Erpyd does not try to repair when they fail.
      ignore_workflows: ["Deploy to staging"]
```

You can change any setting later with a pull request. [Advanced settings](../03-advanced-settings/) explains every setting and the values it accepts.

A workflow that Erpyd leaves alone still runs and still blocks a merge. Erpyd only does not try to repair it. Workflows that deploy, run scheduled work against outside systems, or need secrets or an environment Erpyd does not have are proposed as Leave alone.

## Check

- The issue has a plan, and after you approved it, a pull request titled "Configure this repository for Erpy Factory", opened from a branch named `erpy/configure-` followed by the issue number.
- The pull request adds `harness.yaml` and a `.harness` folder, and changes nothing under `.github/workflows`. A comment above each setting in `harness.yaml` says what it is for.
- Your repository now has Erpy labels: open **Issues**, then **Labels**.
- After you merge the pull request, the issue closes by itself.

## What to expect

- Erpyd never pushes to your default branch. It only opens the pull request.
- The configuration pull request does not change your workflows. Erpyd reviews them and proposes what to do with each.
- Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are. Erpyd's runs do not use your `.claude` folder or `CLAUDE.md`. Put instructions for Erpyd in `.harness/AGENTS.md`.
- Erpyd sets up `harness.yaml` and a `.harness` folder. If your repository already has them, Erpyd sees that, suggests how to proceed, and works to resolve the conflict. Nothing in them changes until you approve.
- If you ask to configure before there is a plan, Erpyd asks you to plan first.
- Merging the pull request starts no work by itself. After it, Erpyd works on its own only on pull requests that carry the `erpy-factory` label, which you add, or which a pull request gets from the issue it closes. On those pull requests Erpyd:
  - repairs a failing check, for up to a few attempts, except in workflows you told it to leave alone;
  - resolves merge conflicts;
  - follows up when someone with write access requests changes.
- The label comes off a pull request seven days after it was added or Erpyd last worked on it, whichever is later. Add it again to give the pull request back to Erpyd, or remove it yourself to take it back sooner.
