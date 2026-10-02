---
title: 2. Configure your repository
description: Ask Erpyd to plan your repository's configuration, approve the plan, and merge the pull request it opens.
---

Erpyd configures your repository from a plan that you review first. It looks at the repository, writes the plan into an issue, and after you approve the plan it opens a pull request with the configuration.

## Before you start

- Step 1 is done and Erpyd is no longer marked as suspended on your installation. [unconfirmed: Erpyd stays silent until the installation is activated. Do we tell the customer how to tell it has been activated, beyond the suspended marker on GitHub?]
- You have write access to the repository. Erpyd acts only on requests from people with write access.
- Issues are enabled on the repository.
- Have an answer ready for each question under **What you decide** below.

## Steps

1. Open a new issue in your repository, for example titled "Configure Erpy Factory". Anything you write in the issue stays above the plan.
2. Add a comment: `@erpyd plan the configuration`
3. Erpyd replies that it is planning and keeps one status comment up to date: queued, in progress, done. Wait for "The configuration plan is ready for review."
4. Read the plan. Erpyd wrote it into the issue itself, below your text. It says what it found in your repository, which labels and configuration file it will add, what it proposes for each of your workflows, and what you decide.
5. Answer the open questions by editing the plan in the issue, or by commenting before you approve. Only comments from people with write access count. [unconfirmed: whether a comment answer is applied, or only an edit of the plan]
6. When the plan is right, add a comment: `@erpyd approve, configure`
7. Wait for "Pull request #N with the configuration is open for review."
8. Review the pull request, and merge it when it looks right.

If you edit the plan after you approved it, Erpyd stops and asks you to approve again. If someone without write access edits the plan, Erpyd changes nothing, and you open a new issue and ask for the plan there.

To plan again, ask `@erpyd plan the configuration` in the same issue: the plan is replaced and your own text stays.

## Check

- The issue has a plan, and after approval a pull request titled "Configure this repository for Erpy Factory", opened from a branch named `erpy/configure-` followed by the issue number.
- The pull request adds `harness.yaml` and a `.harness` folder, and its description explains each setting. It changes nothing under `.github/workflows`.
- Your repository now has Erpy labels: open **Issues**, then **Labels**.
- After you merge the pull request, the issue closes by itself.

## What you decide

Erpyd works out what it can from your repository: the Odoo version and edition, the branches, your workflows and their checks, the containers and databases, the languages, and the review bots. It does not guess. A setting it finds no evidence for is written into `harness.yaml` as a comment with an example value, and it is listed in the plan under **What you decide**. Have answers ready for these:

- **Odoo version.** If your repository is not on a version Erpy Factory supports, the plan says so. [unconfirmed: wording. Today anything other than 19 is listed as a blocker.]
- **Edition.** Community or Enterprise, and where the Enterprise code comes from. Without a full Docker setup in your repository, Erpyd cannot tell, so you answer.
- **Base image.** Which Odoo image your tests run on, what it is for, and where it comes from. Say whether it is public or private. [unconfirmed: a private registry is not supported today, and there is no setting for registry credentials. Decide whether the customer page says that.]
- **Test database.** Whether your tests start from a seed or a dump, and where it is stored. [unconfirmed: the stack requires a seed bucket, and there is no fresh-install mode.]
- **Languages.** Which languages your repository supports and must keep translated. If you have no translation files, you decide.
- **Branches.** Other branches that pull requests land on besides the default one, and whether changes are forward-ported between versions.
- **CI.** For each workflow, whether Erpyd should try to repair it when it fails. Erpyd proposes **Repair** or **Leave alone**. Workflows that deploy, run scheduled work against outside systems, or need secrets or an environment Erpyd does not have are proposed as **Leave alone**. They still run and still block a merge. Erpyd only does not try to repair them. If you have no CI, say what check a pull request must pass.
- **Required check.** Which check must be green before a pull request can merge.
- **Review bots.** Which bots may trigger Erpyd by commenting on a pull request.
- **Other dependencies.** Python packages, system packages, and other add-on repositories your project needs. [unconfirmed: the plan does not survey or record these today; no setting exists. Either drop this bullet, or the customer is told to add them by hand.]

## What to expect

- Erpyd never pushes to your default branch. It only opens the pull request.
- Erpyd does not change your workflows. It reviews them and proposes what to do with each.
- Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are. An existing `harness.yaml` or `.harness` folder is replaced by the pull request. [unconfirmed: the replacement is visible in the pull request diff.]
- Nothing starts automatically when you merge the pull request. [unconfirmed]
- If you ask to configure before there is a plan, Erpyd asks you to plan first.
- If Erpyd does not react at all, the request may come from someone without write access [unconfirmed: the reply is a refusal comment for write-less collaborators, and silence for outsiders], or the installation may not be activated yet.
