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

Erpyd takes this on itself. It reads your repository and tries to answer each of these questions, so you do not have to. Most of them are what Erpyd needs to run your Odoo stack. Only what it cannot work out from the repository does it ask you, in the plan, and you answer in a comment. Under each question is the reason Erpyd wants to know.

1. Which Odoo version are your add-ons written for?

   Erpyd checks that its test setup runs the Odoo version your add-ons are written for.

2. Do you run Odoo Community or Enterprise?

   Enterprise needs its own code, so Erpyd must know whether to set it up.

3. If Enterprise: which repository holds the code, and may Erpyd read it?

   Erpyd clones your Enterprise code next to your repository and runs your add-ons with it. If the repository is private, Erpyd must be installed on it, in the same account or organization as your repository.

4. Where does your Odoo source come from: the Odoo image you use, or a separate repository (the official one, a fork or your own)?

   With an official Odoo image, Erpyd takes the Odoo source from the image. With a source repository, Erpyd clones it at the branch you use and keeps a copy to read while it works. If the repository is private, Erpyd must be installed on it, in the same account or organization as your repository.

5. Does your development setup run more than Odoo and Postgres, for example Redis? Do you have a Docker Compose file for it?

   Erpyd runs the same services, so its tests see what yours see. Without a Docker Compose file, Erpyd uses its own standard development stack.

6. Which images does your development setup use besides Odoo, for example Postgres and nginx? Is any of them private?

   Erpyd loads these images in advance, so it must be able to pull them.

7. Do you have a development database? What is it called?

   Erpyd restores its starting data under that name. Without one, it starts from a fresh database.

8. Do your tests start from a database dump? Where is it stored?

   Erpyd then starts from the same data as you, and needs to be able to read the dump. Without a dump, it starts from a fresh database.

9. Do your tests run with Odoo's demo data?

   Erpyd starts its tests from the same data as yours.

10. Which image does your CI run the tests in? Is it a public image?

   This is the Odoo image Erpyd runs your code and tests on, so use the one your CI uses. It must be public.

11. Which languages besides English must a new translatable term be translated into?

   Erpyd will not finish a change that adds text without translating it into these languages.

12. Which branches do pull requests target besides the default branch?

   Erpyd repairs failing checks and resolves conflicts on pull requests to these branches that carry the `erpy-factory` label. When one of these branches itself goes red, Erpyd opens a fix for it.

13. Does new work start from a branch other than the default branch?

   Erpyd starts its work from that branch and opens its pull requests against it.

14. Which check must be green before a pull request can merge?

   Erpyd watches this check on the pull requests it opens, and works until it passes.

15. For each of your workflows: should Erpyd try to repair it when it fails, or leave it alone?

   On pull requests that carry the `erpy-factory` label, Erpyd repairs a failing workflow by changing your code, for a few attempts. Some failures cannot be fixed that way, for example a deploy that fails for a missing secret, so you tell it which workflows to leave alone.

16. Should Erpyd resolve merge conflicts on its own?

   Erpyd resolves conflicts itself on pull requests that carry the `erpy-factory` label, and you may prefer to do it yourself.

17. Do you use review bots whose comments Erpyd should read as feedback? Which ones?

   Erpyd reads these bots' comments as review feedback and acts on it, on pull requests that carry the `erpy-factory` label or where the bot mentions `@erpyd`.

18. Erpyd configures its settings in `harness.yaml` and lets you keep your own instructions for Erpyd in a `.harness` folder. Do you already have a `harness.yaml` or a `.harness` folder?

   Erpyd needs to know, so that it builds on what you have and does not overwrite it unasked.

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
    # The image Erpyd runs your code and tests on. Use the one your CI uses. It must be public.
    # Found in your workflows, Docker Compose file or Dockerfile.
    odoo_image: "odoo:19.0"
    # Whether you run Odoo Enterprise (true) or Community (false). Community by default.
    # Found in your Docker files, addons path and manifests.
    # odoo_enterprise: false
    # Where your Enterprise source comes from, when you run Enterprise: a path inside the image,
    # or a GitHub repository. A private repository needs Erpyd installed on it.
    # odoo_enterprise_source: image:/mnt/enterprise
    # odoo_enterprise_source: github:<owner>/<name>@19.0
    # Where the Odoo source comes from: the image (the default), or a GitHub repository.
    # A private repository needs Erpyd installed on it.
    # Found in your workflows, Docker files or .gitmodules.
    # odoo_source: github:odoo/odoo@19.0
    # Your development stack: a Docker Compose file, and which of its services run Odoo and Postgres.
    # Name a service only when it is built from a Dockerfile.
    # Found in your repository. Without one, Erpyd uses its own standard stack.
    # odoo_compose_file: docker-compose.yml
    # odoo_compose_services: [odoo=web, postgres=db]
    # The Odoo configuration file, when you have your own.
    # odoo_conf: config/odoo.conf
    # The folders that hold your add-ons, when they are not at the top of the repository.
    # odoo_addons_paths: [addons, custom]
    # The development database. Erpyd uses odoo_dev when you name none.
    # odoo_dev_db: odoo_dev
    # Where your database dump is stored. By default there is none, and tests start from a fresh database.
    # odoo_seed: none
    # Whether to load demo data when starting from a fresh database.
    # odoo_with_demo: false
    # The image for UI demos and recordings. It is the Odoo image by default.
    # odoo_base_image: "odoo:19.0"
    # The Docker Hub images your Docker Compose file uses besides Odoo.
    # Found in your Docker Compose file.
    # odoo_hub_images: ["postgres:16", "nginx:alpine"]
    # The languages a new translatable term needs, besides English.
    # Found in your translation lint settings, else in your .po files. Without them, you answer.
    odoo_locales: [fr_BE, nl_NL]
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
- The configuration pull request does not change your workflows. Erpyd reviews them and proposes what to do with each.
- Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are. Erpyd's runs do not use your `.claude` folder or `CLAUDE.md`. Put instructions for Erpyd in `.harness/AGENTS.md`.
- Erpyd sets up `harness.yaml` and a `.harness` folder. If your repository already has them, Erpyd sees that, suggests how to proceed, and works to resolve the conflict. Nothing in them changes until you approve.
- If you ask to configure before there is a plan, Erpyd asks you to plan first.
- Merging the pull request starts no work by itself. After it, Erpyd works on its own only on pull requests that carry the `erpy-factory` label, which you add, or which a pull request gets from the issue it closes. On those pull requests Erpyd:
  - repairs a failing check, for up to a few attempts, except in workflows you told it to leave alone;
  - resolves merge conflicts;
  - follows up when someone with write access requests changes.
- The label comes off a pull request seven days after it was added or Erpyd last worked on it, whichever is later. Add it again to give the pull request back to Erpyd, or remove it yourself to take it back sooner.
