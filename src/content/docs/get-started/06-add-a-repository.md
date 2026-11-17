---
title: 6. Add a repository
description: Bring a GitLab project or a GitHub repository into Erpy Factory, and let Erpy set it up with harness.yaml.
---

You choose which repositories Erpy works on, and Erpy sets each one up. The setup is a merge request (a pull request on GitHub) that adds `harness.yaml` and a `.harness` folder. You review it and merge it.

## Before you start

- Your organization has a link: [Link GitLab](../03-link-gitlab/) or [Link GitHub](../05-link-github/).
- You are a Builder or an Admin. A Viewer sees the list but cannot add: "A Viewer cannot add a repository. Ask a Builder or an Admin."

## Open Add repository

Select **Add repository**, on the home page's Repositories card or at the foot of the repository switcher.

- With a link to both GitLab and GitHub, the page asks "Where is the repository?". Choose **GitHub** or **GitLab**.
- With more than one GitLab group, it asks "Which GitLab group?". Choose the group.
- With no link yet, an Admin sees **Link GitHub** and **Link GitLab**. After the link you come back to this page.

## On GitLab

The page lists the projects in your group that Erpy's user reaches as Developer and that are not in Factory yet. GitLab decides what Erpy reaches. Erpy works only on the projects you add.

### Steps

1. Tick the projects to add. You can tick 20 at most at once. Use **Search** to find a project by its path. A project with no commit yet carries the **Empty** badge.
2. For each empty project you tick, the page asks "It is empty. What will it be?". Choose one:

   | Choice | What the screen says |
   |---|---|
   | **Odoo module** | "Odoo 18, with tests in the module" |
   | **Next.js app** | "TypeScript, tested with Vitest" |
   | **Python service** | "FastAPI, tested with pytest" |
   | **Something else** | "Say what in one line" |

   The configuration covers Odoo projects today. For an Odoo project, choose **Odoo module**.
3. Select **Add** (or **Add 3 repositories**, with the number you ticked).

Next to the button, a line says what is missing:

| What you see | What it means |
|---|---|
| "20 at most at once." | You ticked 20. Add these first, then add more. |
| "Say what each empty repository will be." | An empty project you ticked has no choice yet. |
| "Adding starts no run, except the setup of an empty repository." | You can add. |

### Not in the list?

The list shows only the projects Erpy's user is a member of. In GitLab, invite Erpy's user to the project as Developer, or to a group. Factory reads the list again within the hour. To read it now, select **Check again** under "Not in the list?".

The page then says "Erpy is listing acme now. New projects show in the list above within a minute: reload the page." Under **Not usable** it lists each project Erpy's user reaches but Erpy can't use, with the fix. Here `acme-erpy` stands for Erpy's user and `acme` for your group.

| What you see | What to do |
|---|---|
| "acme-erpy is Reporter or Guest here. Make acme-erpy Developer." | In GitLab, change the role of Erpy's user on that project to Developer. |
| "acme-erpy is Maintainer or Owner here. Lower acme-erpy to Developer." | In GitLab, lower the role of Erpy's user on that project to Developer. |
| "Not in acme. Move the project into acme, or link its group." | The project is in another top-level group. Move it into your group in GitLab, or link that group too. |
| "A personal project of acme-erpy. Erpy never works in one." | Move the code into a project of your group. |

If nothing is wrong, the page says "acme-erpy reaches no project that Erpy cannot use." If you see "GitLab was checked less than a minute ago. Reload the page in a minute.", wait a minute, then reload the page.

### Create a new project

1. On the Add repository page, select **Create a new one on GitLab**. GitLab's new-project page opens in a new tab.
2. Leave "Initialize repository with a README" off, and create the project.
3. Invite Erpy's user to the project as Developer, unless it is already a member of the whole group.
4. Back in Factory, reload the page, or select **Check again**. The project shows in the list as **Empty**. Add it as in the steps above.

## On GitHub

Factory lists every repository the Erpy app can reach on GitHub. There is no list to tick: you give the app access on GitHub.

1. On the Add repository page, select **The Erpy App's settings for Acme**, where Acme is your GitHub account. GitHub opens in a new tab.
2. Under **Repository access**, add the repository, and save.
3. The repository shows in Factory within a minute. Open its board: if it has no `harness.yaml` yet, the board shows **Set up my repo**. See [An existing project](#an-existing-project).

If the page says "Acme: an owner of the account changes the App's access on GitHub.", ask an owner of the GitHub account to give the app access.

To create a new repository, select **Create a new one on GitHub**, create it, then give the Erpy app access to it under **Repository access**. On GitHub, Add repository does not ask what an empty repository will be: create the repository with a README, so it has a first commit.

## What happens after Add

On GitLab, the page lists each project you added with what happens next:

| What you see | What it means |
|---|---|
| "Has harness.yaml: ready for tickets." | The project is set up. Write a ticket. |
| "No harness.yaml yet: its board shows Set up my repo." | Open its board and select **Set up my repo**. See [An existing project](#an-existing-project). |
| "Empty: Factory is setting it up as Odoo module: a first commit with a test and CI, then a setup pull request with harness.yaml." | Erpy is setting up the empty project. See [An empty project](#an-empty-project). |
| "Empty: setup did not start." followed by the reason | Do what the reason says. |
| "Its board says whether it needs setup." | Open its board. |

If GitLab refused Erpy's labels, the page also says "GitLab refused Erpy’s labels on one repository: Erpy’s user needs the Developer role there. Erpy tries again every hour." Make Erpy's user Developer of that project.

Select **Add more** to add other projects.

If setup did not start, the reason says what to do. For example: "GitLab did not let Erpy make the first commit in gitlab.com/acme/shop. Add a README on GitLab (Add file → New file, README.md), then set it up again; the project is then set up without a starter." Your group's default branch protection can keep a Developer from pushing to an empty project. After you add the README, open the project's board and select **Set up my repo**.

### An empty project

1. Erpy commits a starter straight to the default branch: a README, a starting layout, one test, and CI that runs the test. For **Something else**, the starter is the README alone.
2. Erpy then plans the configuration and opens the setup merge request, titled "Configure this repository for Erpy Factory".
3. You review the merge request and merge it.

### An existing project

A project with code and no `harness.yaml` shows **Set up my repo** on its board: "Erpy reads your repository and opens a merge request that adds its settings. You merge it." (a pull request on GitHub).

1. Select **Set up my repo**. Factory opens the setup ticket, "Set up" followed by the project's name.
2. Erpy reads the repository and plans its configuration (Configuration planning), then opens the setup merge request (Repository configuration). You don't approve the plan first.
3. Review the merge request, and merge it when it looks right.

While the setup ticket is open, the board shows "Setup in progress — view ticket" instead of the button.

## What the setup merge request holds

- `harness.yaml`, with a comment above each setting that says what it is for. Every setting is in the file. A setting Erpy found no evidence for stays commented out, with an example value. [harness.yaml settings](../../reference/harness-yaml/) explains each one.
- A `.harness` folder, with `.harness/AGENTS.md`: what Erpy knows about your repository's environment and branch model. Put your own instructions for Erpy there.
- Nothing under `.github/workflows`, and no change to your CI.

The description lists each setting with the evidence for its value. Where Erpy had to guess, it says "Check these before you merge:" and lists each guess. Change any value in the merge request before you merge it, or later with another merge request.

Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are. If your repository already has a `harness.yaml` or a `.harness` folder, the setup merge request replaces it.

## Check

- The setup merge request is titled "Configure this repository for Erpy Factory", from a branch named `erpy/configure-` followed by a number.
- It adds `harness.yaml` and a `.harness` folder, and changes nothing under `.github/workflows`.
- After you merge it, `harness.yaml` is on the default branch, and the repository is set up. Its board no longer shows **Set up my repo**.

## What to expect

- Erpy never merges. You merge the setup merge request.
- For an empty project, the starter commits are the only ones Erpy makes straight to your default branch. Everything else comes as a merge request.
- Merging the setup merge request starts no work by itself. Erpy starts on the tickets you write.

## Next step

[Invite your team](../07-invite-your-team/).
