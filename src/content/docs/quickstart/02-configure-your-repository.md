---
title: 2. Configure your repository
description: Ask Erpyd to plan your repository's configuration, answer its questions, approve the plan, and merge the pull request it opens.
---

Erpyd configures your repository from a plan that you review first. It looks at the repository, writes the plan into an issue, and after you approve the plan it opens a pull request with the configuration.

## Before you start

- Step 1 is done and Erpyd is active on your installation. You can see its status on your installed apps page:
  - for an organization: `https://github.com/organizations/<your-organization>/settings/installations`
  - for a personal account: [github.com/settings/installations](https://github.com/settings/installations)
- Issues are enabled on the repository.
- You have write access to the repository. Erpyd acts only on requests from people with write access, and it tells anyone else that they do not have enough access to make the request.

## Steps

1. Open a new issue in your repository, for example titled "Configure Erpy Factory".
2. Add a comment: `@erpyd plan the configuration`
3. Erpyd replies that it is planning and keeps one status comment up to date: in progress, then done. Wait for "The configuration plan is ready for review."
4. Read the plan. Erpyd wrote it into the issue, below your text. It says what it found in your repository, which labels and configuration file it will add and what each setting in that file is for, what it proposes for each of your workflows, and what you need to decide.
5. Erpyd tries to answer most questions from your repository itself. If it could not, it lists its open questions in the issue. Answer them in a comment that mentions Erpyd, and say there anything else you want changed, for example `@erpyd the staging deploy should be left alone`. Erpyd adjusts the plan. Repeat until the plan is right.
6. When the plan is right, add a comment: `@erpyd approve, configure`
7. Wait for "Pull request #N with the configuration is open for review."
8. Review the pull request, and merge it when it looks right.

## Check

- The issue has a plan, and after you approved it, a pull request titled "Configure this repository for Erpy Factory", opened from a branch named `erpy/configure-` followed by the issue number.
- The pull request adds `harness.yaml` and a `.harness` folder, and changes nothing under `.github/workflows`. A comment above each setting in `harness.yaml` says what it is for.
- Your repository now has Erpy labels: open **Issues**, then **Labels**.
- After you merge the pull request, the issue closes by itself.

## What Erpyd configures

Everything Erpyd configures is a setting in `harness.yaml`. Erpyd fills in what it can from your repository, and asks you about the rest. This is the shape of the file, with where each value comes from:

```yaml
harness:
  extensions:
    # The check a pull request must pass before it can merge.
    # Erpyd reads it from your repository rules and workflows.
    required_check: <name of your check>

    # The Odoo version. Erpyd reads it from your module manifests.
    odoo_version: <version>

    # Community or Enterprise, and where the Enterprise code lives.
    # Erpyd reads it from your Docker setup. Without one, you answer.
    odoo_enterprise: <true or false>
    odoo_enterprise_repo: <repository>

    # The Odoo images your tests and demos run on.
    # Erpyd reads them from your Docker Compose file, Dockerfile or CI.
    odoo_test_image: <image>
    odoo_base_image: <image>

    # The databases your tests use, and where the seed they start from is stored.
    # Erpyd reads them from your Docker setup. If it finds none, you answer.
    odoo_dev_db: <name>
    odoo_test_db: <name>
    odoo_seed_bucket: <bucket>

    # The languages your repository keeps translated, besides English.
    # Erpyd reads them from your translation files and lint settings.
    # With no translation files, you answer.
    odoo_locales: [<language>]

    resolve_ci:
      # Branches that pull requests land on besides the default branch.
      # Erpyd reads them from your pull requests.
      extra_base_branches: [<branch>]
      # Workflows Erpyd does not try to repair when they fail.
      # Erpyd proposes Repair or Leave alone for each workflow, and you decide.
      ignore_workflows: [<workflow name>]

    chat:
      # Review bots that may trigger Erpyd by commenting on a pull request.
      bots: [<bot>]
```

A setting Erpyd finds no evidence for is written as a comment with an example value, and Erpyd asks you about it in the plan. You can change any setting later with a pull request.

A workflow that Erpyd leaves alone still runs and still blocks a merge. Erpyd only does not try to repair it. Workflows that deploy, run scheduled work against outside systems, or need secrets or an environment Erpyd does not have are proposed as Leave alone.

## What to expect

- Erpyd never pushes to your default branch. It only opens the pull request.
- Erpyd does not change your workflows. It reviews them and proposes what to do with each.
- Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are.
- If your repository already has a `harness.yaml` or a `.harness` folder, the plan asks you what to do with them. Nothing in them changes until you approve.
- If you ask to configure before there is a plan, Erpyd asks you to plan first.
- Merging the pull request starts no work by itself. After it, Erpyd works on its own only on pull requests that carry the `erpy-factory` label, which you add, or which a pull request gets from the issue it closes. On those pull requests Erpyd:
  - repairs a failing check, for up to a few attempts, except in workflows you told it to leave alone;
  - resolves merge conflicts;
  - follows up when someone with write access requests changes.
- The label comes off a pull request after seven days without a hand-over. Remove it yourself to take a pull request back.
