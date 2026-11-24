---
title: 5. Invite your team
description: Invite the people of your organization by email, and give each one a role.
---

Invite the people who work with Erpy by their email address, and give each one a role. They sign in with
Google, using the address you enter.

## Before you start

- You are an Admin of the organization, and you signed in with Google.
- Setup is over: your code host is linked and your first repository is added. See
  [4. Add a repository](../04-add-a-repository/). Until then, Settings → Users, like every other page
  of the organization, opens the setup page.
- Your GitLab group or GitHub account's link is **Active**.

## Steps

1. Open Settings → Users.
2. Enter the person's email address.
3. Choose a role: **Admin**, **Builder** or **Viewer**. The form starts at **Builder**. See
   [Roles](#roles).
4. Select **Send invite**. The page says "Invitation saved. The email goes out within a minute."
5. Tell the person to follow [1. Your invitation and Google sign-in](../01-your-invitation/).

## Check

The person is listed on Settings → Users with the role you chose.

- Under **Status**, they read **Invited** and "Sent" with how long ago, until they sign in.
- After their first sign-in with Google, they read **Joined** with the date.

## What to expect

- Each person signs in with Google, using the exact address you entered. A Google Workspace domain
  does not let anyone in on its own: invite each person by address.
- The page says what each role can do, under "What each role can do".
- A person who signs in with Google and wants to ask Erpy from GitLab or GitHub connects that account
  first. The page says so: "To ask Erpy for work from GitHub or GitLab, an invited Builder or Admin
  connects that account under Connected accounts in the account menu, after they sign in." On
  Connected accounts, they select **Connect GitLab** or **Connect GitHub**. Their row on Settings →
  Users then shows a badge with the account, for example **GitLab · jane**. See
  [Ask Erpy from GitLab or GitHub](../../work-with-erpy/ask-erpy-from-gitlab-or-github/).

## Roles

Each role can do everything the role below it can.

| Role | What it can do |
| --- | --- |
| Viewer | Read the boards and the tickets. |
| Builder | Everything a Viewer can. Create tickets, edit them, reply and comment on them, and close them. Write and approve PRDs (the requirements Erpy writes for a ticket, see [6. Write your first ticket](../06-write-your-first-ticket/)). Set up a repository. Attach files. |
| Admin | Everything a Builder can. Invite people and change their roles. Create API keys. Manage webhooks. Add, replace and remove the OpenRouter key. |

- **API keys** (Settings → API keys) let your own programs manage your tickets through Erpy Factory's
  REST API. See [erpy.dev/docs/api](https://erpy.dev/docs/api).
- **Webhooks** (Settings → Webhooks) tell your own system when a ticket needs you. They are not the
  GitLab webhooks of [Add the webhooks](../03-link-your-code-host/gitlab/#add-the-webhooks).

When someone tries something their role does not allow, the page names the role it needs, for example
"Approving a PRD needs the Builder role in Acme."

## Change a role or take access away

Your own row shows "(you)" and has no buttons: you cannot change your own access.

- **Change a role**: choose another role in the person's **Role** column. The change is saved at once.
- **Resend**: on a person still **Invited**, sends the invitation email again. The page says "The
  invitation goes out again within a minute."
- **Cancel invite**: on a person still **Invited**, removes the invitation and the row.
- **Revoke**: on a person who **Joined**, takes their access away. Their row stays, with **No access**.
- **Grant Builder**: on a row with **No access**, gives the person access again, as a Builder. Change
  the role afterwards if they need another one.
- **Invite again**: on a row with **No access**, makes the row a fresh invitation and keeps the role. The page says "Invitation saved. The email goes out within a minute." Use it when the person's Google account was deleted and made again on the same address: the new account cannot take over a row that has joined until an Admin does **Revoke** and then **Invite again**.

## If it is refused

| What you see | What to do |
| --- | --- |
| "Enter a valid email address." | Check the address for typos, then select **Send invite** again. |
| "This person is already on the list." | The address is already listed. Find its row. If it reads **Invited**, use **Resend** if they did not get the email. |
| "This person is already on the list, with no access. Press Invite again on their row." | The row reads **No access**. Use **Invite again**, or **Grant Builder** to give access again as a Builder. |
| "The invitation was saved, but the email could not be queued. They can still sign in with Google; try Resend later." | The invitation stands. Tell the person to sign in with Google, or select **Resend** later. |
| "Only an open invitation can be resent." | The person has already joined, or the invitation was cancelled. Reload the page. |
