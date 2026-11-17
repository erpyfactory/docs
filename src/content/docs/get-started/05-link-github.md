---
prev:
  link: ../02-add-your-openrouter-key/
  label: 2. Add your OpenRouter key
title: 5. Link GitHub
description: Link your GitHub account or organization to Erpy Factory by installing the Erpy app from Settings → Links.
---

This step is for code on GitHub. If your code is on GitHub, do this step instead of steps 3 and 4. If it is on GitLab, skip it and go on to [Add a repository](../06-add-a-repository/).

You install the Erpy app on your GitHub account or organization, from Factory, and choose the repositories Erpy may see. Erpy sees only those repositories.

## Before you start

- You are an Admin of your organization in Erpy Factory. Only an Admin can link GitHub. While nothing is linked, anyone else sees "Acme has no link yet. An Admin of Acme links its GitHub account or GitLab group here." Once something is linked, they see the link cards and no **Link GitHub** button.
- You can sign in to GitHub as an owner of the GitHub account or organization that holds the repositories.
- Start from Settings → Links in Factory, not from GitHub. An install you start on GitHub is not linked to your organization.

## Steps

1. In Factory, open Settings → Links.
2. Under **GitHub**, select **Link GitHub**. If something is already linked, **Link GitHub** sits above the list of links.
3. GitHub opens the Erpy app's install page. Choose the GitHub account or organization that holds your repositories.
4. Under **Repository access**, choose **All repositories**, or **Only select repositories** and pick the ones Erpy may work on. Then install the app.
5. GitHub opens its authorize page. Authorize Erpy with the same GitHub account that installed the app. Erpy uses this only to check who installed it.
6. GitHub sends you back to Settings → Links in Factory. A message at the top of the page says how it went. See [What the message says](#what-the-message-says).

Finish within thirty minutes of selecting **Link GitHub**. After that, the link can't be checked and you start again.

## Check

On Settings → Links, your GitHub account is a card with the line "GitHub account · GitHub account, through the Erpy app" and the first repositories Erpy sees. The card's status says where the link stands:

| Status | What it means |
|---|---|
| "Waiting for approval" | The app is installed. Erpy activates the installation on its side. If it stays like this, write to support@erpy.dev. |
| "Active" | Erpy can work on the repositories you chose. |

If the message said "The account appears on this page within a minute", refresh the page after a minute to see the card.

## What to expect

- Erpy reads the code in the repositories you chose, and opens branches and pull requests for your tickets. It sees nothing else.
- To give Erpy more or fewer repositories later, change the app's **Repository access** on GitHub. [Add a repository](../06-add-a-repository/) shows where.
- If you came from **Add repository**, Settings → Links says "Link GitHub or GitLab to add a repository." and offers a way back to **Add repository** after the link.

## What the message says

After GitHub sends you back, one of these messages shows at the top of Settings → Links. "Acme" stands for your organization's name.

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

[Add a repository](../06-add-a-repository/).
