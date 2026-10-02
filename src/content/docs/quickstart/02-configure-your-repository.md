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

## What Erpyd works out from your repository

Erpyd takes this on itself. It reads your repository and tries to answer each of these questions, so you do not have to. Only what it cannot work out from the repository does it ask you, in the plan, and you answer in a comment.

1. Which check must be green before a pull request can merge? If you have no CI, which check should it be?
2. Which Odoo version are your add-ons written for?
3. Do you run Odoo Community or Enterprise?
4. If Enterprise: which repository holds the code, and may Erpyd read it?
5. Where does the Odoo source come from (the official repository, a fork, or your own), and at which branch?
6. How do you run Odoo for development? What are the Odoo, Postgres and nginx containers called, and what is the network they share called?
7. Which image does Odoo run on, the official one or one you build? Which images run beside it, for example Postgres and nginx? Are any of them private?
8. What are your development and test databases called, and at which address does the development server answer?
9. Do your tests start from a database dump? Where is it stored?
10. Which image does your CI run the tests in?
11. Which languages besides English must a new translatable term be translated into?
12. Which branches do pull requests target besides the default branch?
13. Does new work start from a branch other than the default branch?
14. Should a fix be carried over to other versions? Between which branches, for example from `18.0` to `19.0`?
15. For each of your workflows: should Erpyd try to repair it when it fails, or leave it alone?
16. Should Erpyd resolve merge conflicts on its own?
17. Do you use review bots whose comments Erpyd should read as feedback? Which ones?
18. Do you already have a `harness.yaml`, a `.harness` folder, a `.claude` folder, an `AGENTS.md` or a `CLAUDE.md`?

## What Erpyd configures

Everything Erpyd configures is a setting in `harness.yaml`. Every setting is in the file, with a comment above it that says what it is for. Erpyd fills in a setting from your repository when it finds evidence there, and writes it as a comment with an example value when it does not. You answer those in the plan.

This is an example for a repository with a Docker setup and CI. The comments here also say where Erpyd looks:

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
    # Found in your branch's required checks, else the job that runs your tests.
    required_check: Addons tests
    # The Odoo version your add-ons are written for. Found in your module manifests.
    odoo_version: "19.0"
    # Whether you run Odoo Enterprise (true) or Community (false).
    # Found in your Docker files, addons path and manifests. Without them, you answer.
    odoo_enterprise: false
    # Where the Odoo source comes from, and the branch it is taken at.
    # Found in your workflows, Docker files or .gitmodules.
    # odoo_core_repo: odoo/odoo
    # odoo_enterprise_repo: odoo/enterprise
    # odoo_source_ref: "19.0"
    # The containers and the network of your development setup.
    # Found in your Docker Compose file.
    odoo_dev_container: odoo-dev
    odoo_postgres_container: postgres-dev
    odoo_nginx_container: nginx-dev
    odoo_docker_network: odoo-dev-network
    # The image the Odoo service runs, and the Docker Hub images beside it.
    # Found in your Docker Compose file or Dockerfile.
    odoo_base_image: "odoo:19.0"
    odoo_hub_images: ["postgres:16", "nginx:alpine"]
    # The databases for development and for tests, and the address of the development server.
    # Found in your Docker Compose file and test scripts.
    odoo_dev_db: odoo_dev
    odoo_test_db: odoo_test
    odoo_dev_url: "http://localhost:8069"
    # The languages a new translatable term needs, besides English.
    # Found in your translation lint settings, else in your .po files. Without them, you answer.
    odoo_locales: [fr_BE, nl_NL]
    # The image your CI runs the tests in.
    # Found in your workflows.
    odoo_test_image: "odoo:19.0"
    # The bucket that holds your development database dump.
    # Found in your workflows. If you have none, you answer.
    # odoo_seed_bucket: my-odoo-db-dumps
    resolve_ci:
      # Branches besides the default that pull requests target and CI runs on.
      # Found in your recent pull requests and workflow branch filters.
      extra_base_branches: ["19.0"]
      # Workflows Erpyd does not try to repair when they fail.
      # Erpyd proposes Repair or Leave alone for each workflow in the plan, and you decide.
      ignore_workflows: ["Deploy to staging"]
    # Set to false to stop Erpyd resolving merge conflicts on its own. It does by default.
    # resolve_conflicts:
    #   automatic: false
    # chat:
    #   # Review bots whose comments Erpyd reads as feedback.
    #   # Found in the authors of your recent reviews. You answer if you use one.
    #   bots: ["coderabbitai[bot]"]
    # Branch pairs a fix is carried to: a fix merged on the first is opened again on the second.
    # forward_port: ["18.0:19.0"]
# The branch new work starts from, when it is not your default branch.
# worktree:
#   base: "19.0"
```

The commented-out settings are the ones Erpyd found no evidence for, or that you turn on yourself. Erpyd asks you about them in the plan. You can change any setting later with a pull request.

A workflow that Erpyd leaves alone still runs and still blocks a merge. Erpyd only does not try to repair it. Workflows that deploy, run scheduled work against outside systems, or need secrets or an environment Erpyd does not have are proposed as Leave alone.

## Check

- The issue has a plan, and after you approved it, a pull request titled "Configure this repository for Erpy Factory", opened from a branch named `erpy/configure-` followed by the issue number.
- The pull request adds `harness.yaml` and a `.harness` folder, and changes nothing under `.github/workflows`. A comment above each setting in `harness.yaml` says what it is for.
- Your repository now has Erpy labels: open **Issues**, then **Labels**.
- After you merge the pull request, the issue closes by itself.

## What to expect

- Erpyd never pushes to your default branch. It only opens the pull request.
- Erpyd does not change your workflows. It reviews them and proposes what to do with each.
- Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are.
- Erpyd sets up `harness.yaml` and a `.harness` folder. If your repository already has them, Erpyd sees that, suggests how to proceed, and works to resolve the conflict. Nothing in them changes until you approve.
- If you ask to configure before there is a plan, Erpyd asks you to plan first.
- Merging the pull request starts no work by itself. After it, Erpyd works on its own only on pull requests that carry the `erpy-factory` label, which you add, or which a pull request gets from the issue it closes. On those pull requests Erpyd:
  - repairs a failing check, for up to a few attempts, except in workflows you told it to leave alone;
  - resolves merge conflicts;
  - follows up when someone with write access requests changes.
- The label comes off a pull request after seven days without a hand-over. Remove it yourself to take a pull request back.
