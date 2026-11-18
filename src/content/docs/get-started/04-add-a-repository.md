---
title: 4. Add a repository
description: Bring a GitLab project or a GitHub repository into Erpy Factory, and let Erpy set it up with harness.yaml.
---

You choose which repositories Erpy works on, and Erpy sets each one up. The setup is a merge request (a pull request on GitHub) that adds `harness.yaml` and a `.harness` folder. You review it and merge it.

## Before you start

- Your code host is linked, and its card is "Active": see [3. Link your code host](../03-link-your-code-host/gitlab/) for GitLab or [for GitHub](../03-link-your-code-host/github/). A GitLab card marked "Waiting for access" doesn't count yet.
- You are a Builder or an Admin. On GitLab, a Viewer sees the list but cannot add: "A Viewer cannot add a repository. Ask a Builder or an Admin."

## Open Add repository

On a new organization, right after the link, the setup page stays on **Link code host** and offers **Continue**, or **Skip for now** while no GitLab webhook is saved. Either opens the **Add repository** step, which shows the list below in place. The sidebar ticks **Link code host** only once someone has selected one of them. A Viewer sees "An Admin or Builder of Acme adds its first repository." instead. It also names your Admins after "Admins:" when Erpy Factory can list them.

- On GitLab, once you add projects, the step stays open with what was added, for example "Added acme/shop to Factory.", and each project's next step: see [What happens after Add](#what-happens-after-add). The sidebar shows all three steps as done. Select **Finish** to open your organization's home. Setup is over, and the organization's pages, Settings included, open as usual. Reloading the step, or opening any setup step's address later, opens the home.
- On GitHub, the repositories come from the Erpy app's access. If you chose repositories when you installed the app, GitHub sends you straight to your organization's home. Otherwise the step reads again by itself, and once the first repository shows, the home opens.

Later, select **Add repository** on the home page's Repositories card or at the foot of the repository switcher. An organization that removes every repository goes back to the setup page, at its first step not done.

- With a link to both GitLab and GitHub, the page asks "Where is the repository?". Choose **GitHub** or **GitLab**.
- With more than one GitLab group, it asks "Which GitLab group?". Choose the group.

## On GitLab

The page lists the projects in your group that Erpy's user reaches as Developer and that are not in Factory yet. GitLab decides what Erpy reaches. Erpy works only on the projects you add.

### Steps

1. Tick the projects to add. You can tick 20 at most at once. Use **Search** to find a project by its path. A project with no commit yet carries the **Empty** badge.
2. For each empty project you tick, the page asks "It is empty. What will it be?". Choose one:

   | Choice | What the screen says |
   |---|---|
   | **Odoo module** | "Odoo 19, with tests in the module" |
   | **Next.js app** | "TypeScript, tested with Vitest" |
   | **Python service** | "FastAPI, tested with pytest" |
   | **Something else** | "Say what in one line" |

   The configuration covers Odoo projects today. For an Odoo project, choose **Odoo module**. Erpy then lays out one Odoo module at the root of the project, in a folder named after the project (for example `coffee_rental` for `coffee-rental`), with its manifest and one test.
3. Select **Add** (or **Add 3 repositories**, with the number you ticked).

Next to the button, a line says what is missing:

| What you see | What it means |
|---|---|
| "20 at most at once." | You ticked 20. Add these first, then add more. |
| "Say what each empty repository will be." | An empty project you ticked has no choice yet. |
| "Adding starts no run, except the setup of an empty repository." | You can add. |

### Not in the list?

The list shows only the projects Erpy's user is a member of. In GitLab, invite Erpy's user to the project as Developer, or to a group. Erpy checks GitLab every hour, so a new project shows in the list within the hour: reload the page.

A group linked through GitLab's approval screen with chosen projects lists only those. The page says "Factory lists only the projects chosen for this link. To add another, install Erpy on acme again and choose it. Factory reads the list again within the hour, or now with Check again." A Viewer reads it without ", or now with Check again".

To see why a project is missing, select **Check again** under "Not in the list?". The page then says "Erpy is listing acme now. New projects show in the list above within a minute: reload the page." For a link with chosen projects, it says "Erpy is listing acme now. This link has chosen projects: install Erpy on acme again and choose a new project to add it." Under **Not usable** the page lists each project Erpy's user reaches but Erpy can't use, with the fix. Here `acme-erpy` stands for Erpy's user and `acme` for your group.

| What you see | What to do |
|---|---|
| "acme-erpy is Reporter or Guest here. Make acme-erpy Developer." | In GitLab, change the role of Erpy's user on that project to Developer. |
| "acme-erpy is Maintainer or Owner here. Lower acme-erpy to Developer." | In GitLab, lower the role of Erpy's user on that project to Developer. |
| "Not in acme. Move the project into acme, or link its group." | The project is in another top-level group. Move it into your group in GitLab, or link that group too. |
| "A personal project of acme-erpy. Erpy never works in one." | Move the code into a project of your group. |

If nothing is wrong, the page says "acme-erpy reaches no project that Erpy cannot use." If you see "GitLab was checked less than a minute ago. Reload the page in a minute.", wait a minute, then reload the page.

### Create a new project

1. On the Add repository page, select **Create a new one on GitLab**. GitLab's new-project page opens in a new tab.
2. Decide on the README box. The Add repository page says to leave "Initialize repository with a README" off; that works only where Erpy's user may make the first push.
   - On GitLab Free, tick "Initialize repository with a README". On Free, GitLab's default branch protection, **Fully protected**, doesn't let a Developer make the first push, and a group Owner can't change it. With the README, the project has its first commit, so it shows without the **Empty** badge, and you set it up with **Set up my repo**, without a starter.
   - On GitLab Premium or Ultimate, check your group's **Settings → Repository → Default branch → Initial default branch protection**. **Fully protected after initial push**, **Partially protected** or **Not protected** lets Erpy's user, a Developer, make the first commit: leave the README off, and Erpy sets the empty project up with a starter. With **Fully protected**, tick the README box, as on Free.
3. Create the project.
4. Invite Erpy's user to the project as Developer, unless it is already a member of the whole group.
5. Back in Factory, reload the page within the hour. The project shows in the list, as **Empty** if you left the README off. Add it as in the steps above.
6. If you use one webhook per project (the only kind on GitLab Free), add one for the new project now that it is listed: its URL shows under its name in the link's **Webhooks** section. See [Add the webhooks](../03-link-your-code-host/gitlab/#add-the-webhooks). Without a webhook, Erpy still checks GitLab every 5 minutes for the projects you added.

## On GitHub

Factory lists every repository the Erpy app can reach on GitHub. There is no list to tick: you give the app access on GitHub.

1. On the Add repository page, select **The Erpy App's settings for Acme**, where Acme is your GitHub account. GitHub opens in a new tab.
2. Under **Repository access**, add the repository, and save.
3. The repository shows in Factory within a minute. Open its board: if it has no `harness.yaml` yet, the board shows **Set up my repo**. See [An existing project](#an-existing-project).

If the page says "Acme: an owner of the account changes the App's access on GitHub.", ask an owner of the GitHub account to give the app access.

To create a new repository, select **Create a new one on GitHub**, create it, then give the Erpy app access to it under **Repository access**. On GitHub, Add repository does not ask what an empty repository will be: create the repository with a README, so it has a first commit. If the repository is empty, add a README before you select **Set up my repo**.

## What happens after Add

On GitLab, the page says what was added, in green, for example "Added acme/shop to Factory.", "Added acme/shop and acme/crm to Factory." or "Added acme/shop, acme/crm and acme/web to Factory." Below, it lists each project you added with what happens next:

| What you see | What it means |
|---|---|
| "Has harness.yaml: ready for tickets." | The project is set up. Write a ticket. |
| "No harness.yaml yet: its board shows Set up my repo." | Open its board and select **Set up my repo**. See [An existing project](#an-existing-project). |
| "Empty: Factory is setting it up as Odoo module: a first commit with a test and CI, then a setup pull request with harness.yaml." (a merge request on GitLab) | Erpy is setting up the empty project. See [An empty project](#an-empty-project). |
| "Empty: setup did not start." followed by the reason | Do what the reason says. |
| "Its board says whether it needs setup." | Open its board. |

If GitLab refused Erpy's labels, the page also says "GitLab refused Erpy’s labels on one repository: Erpy’s user needs the Developer role there. Erpy tries again every hour." Make Erpy's user Developer of that project.

The answer stays above the list until you reload or leave the page, also once every project is in Factory and the page says "Every project Erpy reaches here is in Factory." Tick more projects to add them.

On Settings → Add repository, each project's name in the answer opens its board. On the setup page, the names are not links: select **Finish**, then open a board from the home. Later, choose the project in the repository switcher in the top bar, next to your organization's name, and open **Board**.

If setup of an empty GitLab project did not start, and the reason is "Something changed while the set-up ran. Try again.", the usual cause is your group's default branch protection: it keeps a Developer from making the first push to an empty project. Don't try again from the board while the project is still empty: there, **Set up my repo** sets up an empty project without the starter you chose. Instead:

1. On GitLab, add a README to the project (**Add file → New file**, `README.md`), and commit it.
2. Open the project's board and select **Set up my repo**. The project is set up without a starter.

### An empty project

1. Erpy commits a starter straight to the default branch: a README, a starting layout, one test, and CI that runs the test. For **Something else**, the starter is the README alone.
2. Erpy then plans the configuration and opens the setup merge request, titled "Configure this repository for Erpy Factory".
3. You review the merge request and merge it.

On GitLab, the starter's CI is a `.gitlab-ci.yml` whose job has no runner tags. gitlab.com runs untagged jobs on its hosted runners, unless your group has runners of its own that take them, and that time counts toward your group's compute minutes.

Watch the progress on the project's board: once Erpy has opened the setup ticket, the board shows "Setup in progress — view ticket". Select it to follow the ticket.

### An existing project

A project with code and no `harness.yaml` shows **Set up my repo** on its board: "Erpy reads your repository and opens a merge request that adds its settings. You merge it." (a pull request on GitHub).

1. Select **Set up my repo**. Factory opens the setup ticket, "Set up" followed by the project's name.
2. Erpy reads the repository and plans its configuration (Configuration planning), then opens the setup merge request (Repository configuration). You don't approve the plan first.
3. Review the merge request, and merge it when it looks right.

While the setup ticket is open, the board shows "Setup in progress — view ticket" instead of the button.

## What the setup merge request holds

- `harness.yaml`, with a comment above each setting that says what it is for. Every setting is in the file. A setting Erpy found no evidence for stays commented out, with an example value. [harness.yaml settings](../../reference/harness-yaml/) explains each one.
- A `.harness` folder, with `.harness/AGENTS.md`: what Erpy knows about your repository's environment and branch model. Put your own instructions for Erpy there.
- Nothing else: nothing under `.github/workflows`, and no change to your `.gitlab-ci.yml` or other CI.

The description lists each setting with the evidence for its value. Where Erpy had to guess, it says "Check these before you merge:" and lists each guess. Change any value in the merge request before you merge it, or later with another merge request.

Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are. If your repository already has a `.harness` folder, the setup merge request writes its files into it, over any file of the same name.

## Check

- The setup merge request is titled "Configure this repository for Erpy Factory", from a branch whose name starts with `erpy/configure-`.
- It adds `harness.yaml` and a `.harness` folder, and changes nothing under `.github/workflows` or in `.gitlab-ci.yml`.
- After you merge it, `harness.yaml` is on the default branch, and the repository is set up. Its board no longer shows **Set up my repo**.

## What to expect

- Erpy never merges. You merge the setup merge request.
- For an empty project, the starter commits are the only ones Erpy makes straight to your default branch. Everything else comes as a merge request.

## Next step

[Invite your team](../05-invite-your-team/).
