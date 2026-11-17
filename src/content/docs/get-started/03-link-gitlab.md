---
title: 3. Link GitLab
description: Give Erpy its own GitLab user, paste that user's token in Settings → Links, and link your group.
---

Erpy works on GitLab as a user you create for it. You make that user a Developer of the projects Erpy may work on, then paste its token in Erpy Factory. Erpy sees only the projects that user is a member of.

## Before you start

- Your code is on gitlab.com, in a top-level group.
- You can create a GitLab user and add it to the group or its projects, or you know who can.
- You are an Admin of your organization in Erpy Factory.
- Step 2 is done: your OpenRouter key is saved. See [2. Add your OpenRouter key](../02-add-your-openrouter-key/).

Open **Settings → Links**. When nothing is linked yet, the **GitLab** card shows the form. When something is already linked, select **Link GitLab** to open it.

The form shows three numbered cards and a token field numbered 4. Steps 1 to 4 below follow them.

## Steps

1. **Create a user for Erpy.** On gitlab.com, create a user only Erpy uses, such as `acme-erpy`. Don't use a person's own account.
   - It needs its own email address, one no other GitLab account uses.
   - On a paid GitLab plan, it takes a seat in your group, like any member with the Developer role.
   - If your group enforces two-factor authentication, set it up for this user too, with an authenticator app or a security key. Email codes don't count.
2. **Make it Developer.** Add the user as **Developer** to a group, which gives it every project in the group and its subgroups, or to single projects (**Manage → Members** in GitLab). Keep these rules:
   - Developer only, never Maintainer or Owner.
   - Projects of one top-level group only.

   You can also do this step after you link. The link then waits for access (see [Waiting for access](#waiting-for-access)). If your group has no project yet, follow [If your group has no project yet](#if-your-group-has-no-project-yet).
3. **Create its token.** Sign in to GitLab as Erpy's user, for example in a private window. Create a personal access token with:
   - the scopes `api` and `self_rotate`;
   - an expiry date.

   The **Open GitLab's token form** link on the page opens GitLab's form with the name and both scopes filled in. Open it in the window where you are signed in as Erpy's user: copy the link and paste it into the private window. Opened where you are signed in as yourself, it creates the token for your own account.

   The form does not fill in the expiry date: choose one yourself, more than 65 days from today, for example the latest date GitLab's form allows. Erpy renews the token once 65 days or fewer remain (see [Token renewal](#token-renewal)). Copy the token when GitLab shows it.
4. **Paste the token.** Back in Erpy Factory, paste it into the field under "4. Paste the token" and select **Check token**. The button reads "Checking…" while Erpy looks at what the token reaches.

   Nothing is linked yet. The check only shows you what the token reaches.
5. **Read the preview.** The page shows "Token accepted" and what the token reaches (see [The preview](#the-preview)).
6. **Link.** Select **Link acme**, where `acme` is your group (or the user's name, when it is in no project yet). The button reads "Linking…", then the page says:
   - "acme is linked. Erpy lists its projects within a few minutes.", or
   - for a user in no project yet: "acme-erpy is linked. Erpy lists its projects within the hour after you add it as Developer to a group or to projects in GitLab."

   Link within 10 minutes of the check. After that, check the token again.

### The preview

| Row | What it means |
|---|---|
| **Group** | The top-level group the link covers, for example `gitlab.com/acme`. "None yet" when the user is in no project. |
| **Erpy acts as** | The GitLab user whose token you pasted, with its name. |
| **Token expires** | The token's expiry date. |
| "Erpy works on 12 projects, as Developer" | The projects Erpy can work on: the user is Developer there. |
| "Not used: the user is Reporter or Guest of 2 projects, so Erpy cannot push there." | Projects the user can see but not push to. Erpy does not work on them. Make the user Developer there if Erpy should. |
| "This user has no projects yet. Add it as Developer to a group or to projects in GitLab. You can link it now: its projects show here within the hour after that." | The user is in no project. You can link now and give access later. |

#### Personal projects

| What you see | What to do |
|---|---|
| "acme-erpy has personal projects: acme-erpy/notes, acme-erpy/sandbox. This looks like a person's account, not one made for Erpy. Erpy does not work on personal projects, but the token can reach them. Link it only if you accept that." | The token can read projects in the user's own namespace. Erpy never works on them. Use a user made only for Erpy, or link only if you accept that the token reaches those projects. |

## If your group has no project yet

When Erpy's user is Developer of a group that has no project yet, Erpy finds no project to work on. Link anyway, then create the project:

1. **Link the token** as in the steps above. The preview's **Group** row says "None yet". After **Link**, the card is marked "Waiting for access".
2. **Create the project in GitLab now**, in the group where Erpy's user is Developer. Leave "Initialize repository with a README" off, so Erpy can set the empty project up for you. On GitLab Free, read the next paragraph first. Erpy's user is Developer of the group, so it reaches the new project: you don't need to invite it.

   Before you create it, on GitLab Premium or Ultimate, check the group's **Settings → Repository → Default branch → Initial default branch protection**. **Fully protected after initial push**, **Partially protected** or **Not protected** lets a Developer make the first push. **Fully protected** does not. If Erpy can't make the first commit, [6. Add a repository](../06-add-a-repository/#what-happens-after-add) says what to do.
   On GitLab Free, a group Owner can't change this setting, and GitLab's default, **Fully protected**, doesn't let a Developer make the first push. On Free, tick "Initialize repository with a README" when you create the project instead: Erpy then sets it up with **Set up my repo**, without a starter.
3. **Wait until the card is marked "Active".** Erpy checks every hour, so this takes up to about an hour after the project exists. To skip the wait once the project exists, select **Link GitLab** on Settings → Links and paste the same token again: the preview now shows your group, and **Link** turns the card "Active" at once.
4. **Go on with [4. Add GitLab webhooks](../04-add-gitlab-webhooks/)**, then [6. Add a repository](../06-add-a-repository/), where the project shows as **Empty**.

## Check

Settings → Links shows a card for your group:

- the group, for example `gitlab.com/acme`, marked "Active";
- "GitLab group · Erpy works as your GitLab user, Developer of these projects";
- its first projects, or "No projects listed yet." until Erpy has listed them.

The card's menu (**⋯**) has **Open in GitLab** and **See projects**.

A card marked "Waiting for access" is not active yet. See [Waiting for access](#waiting-for-access).

## What to expect

- Erpy lists the group's projects within a few minutes, and checks the user's access every hour after that. A project you add the user to later shows up on its own, within the hour.
- **Settings → Users** opens once the link is "Active", so you can [invite your team](../07-invite-your-team/).
- Erpy cannot add webhooks: its user is a Developer. Someone with more rights on GitLab adds them in the next step.

## Waiting for access

A user that is in no project yet, or whose projects can't be linked yet, shows as a card marked "Waiting for access", with what to change on GitLab. Erpy checks again every hour and links the group of its first projects by itself.

| What you see | What to do |
|---|---|
| "acme-erpy is in no project yet. In GitLab, add acme-erpy as Developer to a group, which gives it every project there, or to single projects (Manage → Members). Erpy lists them within the hour." | Add the user as Developer on GitLab. Nothing else to do in Erpy Factory. |
| "acme-erpy is in projects of more than one top-level group (acme, acme-labs). A link covers one group: remove acme-erpy from all but one in GitLab. Nothing was taken." | Remove the user from the projects of every top-level group but one. |
| "acme is linked to another organization, so its projects are not taken. Give acme-erpy access to another group, or remove that link first." | Remove the link in the other organization first, or give the user access to another group. |
| "acme is linked to this organization already, through another user. Remove one of the two links." | Your organization already links this group with another user. Remove one of the two links. |

## If it is refused

A refused check clears the token field. Fix the cause on GitLab, then paste the token again.

| What you see | What to do |
|---|---|
| "Paste the whole token: one word, as GitLab showed it after you created it." | Copy the whole token again from GitLab, with no spaces. |
| "GitLab does not accept this token: it is revoked, expired or mistyped." | Paste it again, or create a new token. |
| "The token needs the scopes api and self_rotate. Create a new one with both." | Create a new token with both scopes. |
| "The token has no expiry date. Create a new one with an expiry date." | Create a new token with an expiry date. |
| "This token belongs to a GitLab administrator. Paste the token of the user you made for Erpy." | Use the token of the user you made for Erpy. |
| "The token's user is Maintainer or Owner of acme. Erpy works as a Developer: lower the role to Developer, then check again." | On GitLab, change the user's role to Developer in that group or project, then select **Check token** again. |
| "The token's user is Reporter or Guest of its projects. Make it Developer of the projects Erpy should work on, then check again." | Raise the user to Developer on the projects Erpy should work on. |
| "The token's user is in projects of more than one top-level group (acme, acme-labs). A link covers one group: keep the user in one." | Remove the user from the projects of every top-level group but one. |
| "acme/team is not a top-level group." | Erpy links a top-level group. Check which groups the user is a member of. |
| "This group is linked to another organization. It must be removed there first." | An Admin of that organization removes the link first. |
| "This group is already linked to this organization, through another user. Replace that link's token instead." | Use **Replace token** on the existing link, with a token of that link's user. |
| "This group is already linked through GitLab's approval screen. Remove that link first." | Remove the existing link of this group, then link it with the token. |
| "What the token reaches changed since the check. Check the token again." | The user's projects changed in the meantime. Select **Check token** again and read the new preview. |
| "The check is more than 10 minutes old. Check the token again." or "The check is more than 10 minutes old, or from another session. Check the token again." | Paste the token and select **Check token** again, then **Link**. |
| "Sign in again, then check the token." | Sign in again with Google, then check the token. |
| "Only an Admin of Acme can link a GitLab group." | Ask an Admin of your organization. |
| "The check did not complete. Try again in a moment." or "The link did not complete. Try again in a moment." | Wait a moment, then try again. |
| "acme is linked but not yet attached to Acme. The request could not be sent. Try again in a moment." | Wait a moment, then check the token again and select **Link** again. |

## Needs attention

Erpy checks every link each hour. When something is wrong, the card is marked "Needs attention" and says what to do. Your organization's home page shows the same line.

| What you see | What to do |
|---|---|
| "Erpy's GitLab user is Maintainer or Owner somewhere. Lower it to Developer; Erpy checks again each hour and starts again by itself." | Change the user's role to Developer on GitLab. Erpy clears the warning within the hour. |
| "GitLab did not let Erpy renew the token, which expires within 60 days. Replace it before then." | [Replace the token](#replace-the-token) before it expires. |
| "Erpy's GitLab user is no longer Developer of any project in the group. Add it back to the projects, or replace the token." | Add the user back as Developer, or replace the token. |
| "GitLab has stopped sending webhooks. Check the webhooks below on GitLab." | Open the group's or projects' **Settings → Webhooks** on GitLab and check that the webhooks are still there and enabled. See [4. Add GitLab webhooks](../04-add-gitlab-webhooks/). |
| "GitLab no longer accepts the token. Replace it." | [Replace the token](#replace-the-token). |

## Replace the token

Replace the token when the card asks for it, or when you want a fresh one.

1. On GitLab, sign in as Erpy's user and create a new personal access token, as in step 3.
2. On the link's card in Settings → Links, select **Replace token**. The form says "The webhooks you added stay."
3. Paste the new token, select **Check token**, read the preview, and confirm.

Use a token of the same user. Other tokens are refused:

| What you see | What to do |
|---|---|
| "This token reaches acme-labs, not the group whose token you are replacing. Paste a token of a user in that group." | Create the token as the user of this link. |
| "This token's user, other-user, is not the user of the link you are replacing, and is in no project yet. Paste a token of that link's user." | Create the token as the user of this link. |
| "This group is already linked to this organization, through another user. Replace that link's token instead." | The token is another user's. Create the token as the user of this link. |

## Remove the link

1. On the link's card, open the menu (**⋯**) and select **Remove link…**.
2. The dialog says "Erpy revokes its tokens, and tickets on the group's projects stop. Erpy's GitLab
   user and the webhooks stay in the group: remove them in GitLab. You can link the group again
   later." Confirm with **Remove link**, or keep it with **Keep link**.
3. In GitLab, remove Erpy's user from the group or projects, and delete the webhooks you added.

A "Waiting for access" card's menu has only **Remove link…**, and only an Admin sees it. Its dialog says "Erpy revokes its token. Erpy's GitLab user stays in GitLab: remove it there."

## Token renewal

Erpy renews the token itself, so you don't have to.

- When 65 days or fewer remain before the token expires, Erpy asks GitLab for a new token, at most once a day. The new token runs for about a year.
- GitLab revokes the old value when it renews the token. The token you pasted then stops working; Erpy holds the new one.
- If GitLab refuses the renewal and 60 days or fewer remain, the card shows "Needs attention": "GitLab did not let Erpy renew the token, which expires within 60 days. Replace it before then."

Don't revoke the token on GitLab while the link is in use. If you do, the card asks you to replace it.

## What other people see

Only an Admin can link GitLab, replace the token, add webhooks or remove a link. A Builder or a Viewer sees:

- before a link exists: "Acme has no link yet. An Admin of Acme links its GitHub account or GitLab group here."
- after: the link's card, with its status, its projects and any "Needs attention" line. On a linked group's card, the menu has **Open in GitLab** and **See projects**.

## Next step

[4. Add GitLab webhooks](../04-add-gitlab-webhooks/)
