---
title: '3. Link your code host: GitHub'
description: Link your GitHub account or organization to Erpy Factory by installing the Erpy app.
sidebar:
  label: GitHub
prev:
  link: ../../02-add-your-openrouter-key/
  label: 2. Add your OpenRouter key
next:
  link: ../../04-add-a-repository/
  label: 4. Add a repository
---

You link one code host: the one your code is on. This page is for GitHub. For GitLab, see
[3. Link your code host: GitLab](../gitlab/).

You install the Erpy app on your GitHub account or organization, from Factory, and choose the repositories Erpy may see. Erpy sees only those repositories.

## Before you start

- You are an Admin of your organization in Erpy Factory. Only an Admin can link GitHub. On the setup page, anyone else sees "An Admin of Acme links its code host: GitLab or GitHub." It also names your Admins after "Admins:" when Erpy Factory can list them. Later, on Settings → Links, they see "Acme has no link yet. An Admin of Acme links its GitHub account or GitLab group here." while nothing is linked, and the link cards with no **Link GitHub** button once something is.
- You can sign in to GitHub as an owner of the GitHub account or organization that holds the repositories.
- Start from Erpy Factory, not from GitHub. An install you start on GitHub is not linked to your organization.

## Steps

1. On a new organization, open the setup page's **Link code host** step. It shows two cards, **GitLab** and **GitHub**. Once setup is over, you link on Settings → Links instead.
2. On the **GitHub** card, which says "Install the Erpy app on your GitHub account or organization, and choose its repositories.", select **Install the Erpy app**. On Settings → Links, the button is **Link GitHub**; if something is already linked, it sits above the list of links.
3. GitHub opens the Erpy app's install page. Choose the GitHub account or organization that holds your repositories.
4. Under **Repository access**, choose **All repositories**, or **Only select repositories** and pick the ones Erpy may work on. Then install the app.
5. GitHub opens its authorize page. Authorize Erpy with the same GitHub account that installed the app. Erpy uses this only to check who installed it.
6. GitHub sends you back to Factory, to the page you started from: the **Link code host** step, or Settings → Links. A message at the top says how it went. See [What the message says](#what-the-message-says). On the setup page, for up to two minutes until the link shows, the step shows only that message, "The GitHub account is linked to Acme." or "GitHub installed the Erpy app. The account appears on this page within a minute. Refresh the page.", and reads again by itself. It doesn't offer GitLab or GitHub again meanwhile. If the link hasn't shown by then, the message goes and the step offers GitLab and GitHub again. Reload the page a little later. If the link still doesn't show, write to support@erpy.dev. If the app already brought repositories, setup is over, and your organization's board opens instead.

Finish within thirty minutes of selecting the button. After that, the link can't be checked and you start again.

## Check

On the **Link code host** step, and later on Settings → Links, your GitHub account is a card with the line "GitHub account · GitHub account, through the Erpy app" and the first repositories Erpy sees. The card's status says where the link stands:

| Status | What it means |
|---|---|
| "Waiting for approval" | The app is installed. Erpy activates the installation on its side. On the setup page, the step shows the card and reads again by itself until it is active. If it stays like this, write to support@erpy.dev. |
| "Active" | Erpy can work on the repositories you chose. |

If the message said "The account appears on this page within a minute", refresh the page after a minute to see the card.

## What to expect

- Erpy reads the code in the repositories you chose, and opens branches and pull requests for your tickets. It sees nothing else.
- To give Erpy more or fewer repositories later, change the app's **Repository access** on GitHub. [Add a repository](../../04-add-a-repository/) shows where.
- If you came from **Add repository**, Settings → Links says "Link GitHub or GitLab to add a repository." and offers a way back to **Add repository** after the link.

## What the message says

After GitHub sends you back, one of these messages shows at the top of the page. "Acme" stands for your organization's name. On the setup page, the messages name the button **Install the Erpy app** where the table says **Link GitHub**: select that button instead.

| What you see | What to do |
|---|---|
| "The GitHub account is linked to Acme." | Nothing. The link is made. |
| "GitHub installed the Erpy app. The account appears on this page within a minute. Refresh the page." | Wait a minute, then refresh the page. |
| "That GitHub account is linked to another organization in Erpy, so it was not linked to Acme." | A GitHub account can be linked to one organization only. Link another GitHub account here. |
| "The Erpy app was installed by another GitHub account, so it was not linked. Ask the person who installed it to press Link GitHub here." | The app on that account was installed by someone else. Ask that person to select **Link GitHub** in Factory. They must be an Admin of your organization. |
| "The Erpy app was installed by another GitHub account, octo-admin, not octo-dev, so it was not linked. Press Link GitHub while signed in to GitHub as octo-admin, or ask octo-admin." | The same, with both GitHub accounts named. Sign in to GitHub as the account that installed the app, then select **Link GitHub** again. |
| "Your GitHub account cannot reach that installation, so it was not linked. Press Link GitHub while signed in to GitHub as the account that installed the Erpy app." | You authorized with a different GitHub account than the one that installed the app. Sign in to GitHub as the installing account and select **Link GitHub** again. |
| "Nothing was linked: Erpy was not authorized on GitHub. Press Link GitHub again and authorize Erpy to finish." | You cancelled on GitHub's authorize page. Select **Link GitHub** again and authorize Erpy. |
| "GitHub asked an owner of the GitHub organization to approve the Erpy app. An install that an owner approves later is not linked here: the owner can press Link GitHub here as an Admin instead." | You are not an owner of that GitHub organization, and an install an owner approves later is not linked. Either an owner on GitHub makes you an owner there and you select **Link GitHub** again, or that owner selects **Link GitHub** as an Admin of your organization in Erpy Factory. |
| "The link could not be checked: it was started in another session or too long ago. Press Link GitHub again." | You signed in again, or more than thirty minutes passed. Select **Link GitHub** again. |
| "GitHub sent no installation back. Press Link GitHub again." | Select **Link GitHub** again. |
| "Link GitHub is not set up on this dashboard. Report this to an operator." | This is on Erpy's side. Write to support@erpy.dev. |
| "The request could not be sent. Try again in a moment." | Wait a moment, then select **Link GitHub** again. |

## Unlink GitHub

Uninstall the Erpy app in the account's settings on GitHub. Factory has no button to remove a GitHub link.

## Next step

[Add a repository](../../04-add-a-repository/).
