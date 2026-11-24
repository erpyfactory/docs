---
title: '3. Link your code host: GitLab'
description: Give Erpy its own GitLab user, paste that user's token, link your group, and add the webhooks.
sidebar:
  label: GitLab
prev:
  link: ../../02-add-your-openrouter-key/
  label: 2. Add your OpenRouter key
next:
  link: ../../04-add-a-repository/
  label: 4. Add a repository
---

You link one code host: the one your code is on. This page is for GitLab. For GitHub, see
[3. Link your code host: GitHub](../github/).

Erpy works on GitLab as a user you create for it. You make that user a Developer of the projects Erpy may work on, then paste its token in Erpy Factory. Erpy sees only the projects that user is a member of.

## Before you start

- Your code is on gitlab.com, in a top-level group.
- You can create a GitLab user and add it to the group or its projects, or you know who can.
- You are an Admin of your organization in Erpy Factory.
- Your OpenRouter key is saved. See [2. Add your OpenRouter key](../../02-add-your-openrouter-key/).

On a new organization, the setup page's **Link code host** step shows two cards, **GitLab** and **GitHub**. The **GitLab** card shows the form. Once setup is over, you link on **Settings → Links**: when something is already linked, select **Link GitLab** to open the form.

The form shows a numbered list of three steps, one per row, and a token field numbered 4. Steps 1 to 4 below follow them.

## Steps

1. **Create a user for Erpy.** On gitlab.com, create a user only Erpy uses, such as `acme-erpy`. Don't use a person's own account.
   - It needs its own email address, one no other GitLab account uses.
   - On a paid GitLab plan, it takes a seat in your group, like any member with the Developer role.
   - If your group enforces two-factor authentication, set it up for this user too, with an authenticator app or a security key. Email codes don't count.
   - On GitLab's Free plan, when your CI runs on GitLab's own runners, GitLab may ask this user to verify its account: an email address, a phone number or a payment method, depending on the account. If it does, this user's pipelines fail without running a job until the account is verified. GitLab shows a banner with **Verify my account**: sign in as Erpy's user and follow it. Then push a commit, or run a new pipeline on its branch. A paid plan, bought compute minutes, or your own runners avoid it.
2. **Make it Developer.** Add the user as **Developer** to a group, which gives it every project in the group and its subgroups, or to single projects (**Manage → Members** in GitLab). Keep these rules:
   - Developer only, never Maintainer or Owner.
   - Projects of one top-level group only.

   Do this before you link. If you link a user that is in no project yet, the step waits until Erpy's user is Developer of a project: see [Waiting for access](#waiting-for-access). If your group has no project yet, see [If your group has no project yet](#if-your-group-has-no-project-yet).
3. **Create its token.** Sign in to GitLab as Erpy's user, for example in a private window. Create a legacy personal access token (**Generate token** → **Legacy token**, not **Fine-grained token**) with:
   - the scopes `api` and `self_rotate`;
   - an expiry date.

   The **Open GitLab's token form** link on the page opens GitLab's form with the name and both scopes filled in. Open it in the window where you are signed in as Erpy's user: copy the link and paste it into the private window. Opened where you are signed in as yourself, it creates the token for your own account.

   The form does not fill in the expiry date: choose one yourself, more than 65 days from today, for example the latest date GitLab's form allows. Erpy renews the token once 65 days or fewer remain (see [Token renewal](#token-renewal)). Copy the token when GitLab shows it.
4. **Paste the token.** Back in Erpy Factory, paste it into the field under "4. Paste the token" and select **Check token**. The button reads "Checking…" while Erpy looks at what the token reaches.

   Nothing is linked yet. The check only shows you what the token reaches.
5. **Read the preview.** The page shows "Token accepted" and what the token reaches (see [The preview](#the-preview)).
6. **Link.** Select **Link acme**, where `acme` is your group (or the user's name, when it is in no project yet). The button reads "Linking…", then the page says "acme is linked. Erpy lists its projects within a minute." The projects then show on the link's card, in its **Webhooks** section and on [4. Add a repository](../../04-add-a-repository/). If they haven't shown after a few minutes, Erpy's hourly check lists them, within the hour.

   On the setup page, the **Link code host** step first says "Erpy is saving the GitLab link. This step shows it once it is saved." For up to two minutes it reads again by itself until the link shows, and doesn't offer GitLab or GitHub again. If the link hasn't shown by then, the step offers GitLab and GitHub again. Reload the page a little later. If the link still doesn't show, write to support@erpy.dev. Once the link shows, the step shows the link's card, marked "Active", with its **Webhooks** section: see [Add the webhooks](#add-the-webhooks). For a user in no project yet, it shows the waiting card instead: see [Waiting for access](#waiting-for-access). For an Admin, the step offers **Skip for now** while no webhook is saved, and **Continue** as soon as one is. A Builder sees **Continue**. Both open **Add repository**. A Viewer sees no button, and reads "An Admin or Builder of Acme adds its first repository." instead.

   The sidebar ticks **Link code host** only once someone has selected **Continue** or **Skip for now**. Until then, the setup page opens on **Link code host**, also after a reload, and **Add repository** can't be opened. If the step can't be saved, it says "Erpy could not save this step. Try again." beside the button and stays on screen.

   Link within 10 minutes of the check. After that, check the token again.

### The preview

| Row | What it means |
|---|---|
| **Group** | The top-level group the link covers, for example `gitlab.com/acme`. "None yet" when the user is in no project. |
| **Erpy acts as** | The GitLab user whose token you pasted, with its name. |
| **Token expires** | The token's expiry date. |
| "Erpy works on 12 projects, as Developer" | The projects Erpy can work on: the user is Developer there. |
| "Not used: the user is Reporter or Guest of 2 projects, so Erpy cannot push there." | Projects the user can see but not push to. Erpy does not work on them. Make the user Developer there if Erpy should. |
| "This user has no projects yet. Add it as Developer to a group or to projects in GitLab. You can link it now: its projects show here within the hour after that." | The user is in no project. You can link now: the link then waits until the user is Developer of a project. See [Waiting for access](#waiting-for-access). |

#### Personal projects

| What you see | What to do |
|---|---|
| "acme-erpy has personal projects: acme-erpy/notes, acme-erpy/sandbox. This looks like a person's account, not one made for Erpy. Erpy does not work on personal projects, but the token can reach them. Link it only if you accept that." | The token can read projects in the user's own namespace. Erpy never works on them. Use a user made only for Erpy, or link only if you accept that the token reaches those projects. |

## If your group has no project yet

Erpy's user is Developer of projects, so create the first project before you link:

1. **Create the project in GitLab**, in your group.
   - On GitLab Free, tick "Initialize repository with a README". On Free, GitLab's default branch protection, **Fully protected**, doesn't let a Developer make the first push, and a group Owner can't change it. With the README, the project already has its first commit. Add answers "No harness.yaml yet: its board shows Set up my repo.", and **Set up my repo** on its board opens a merge request with a starter: merge it, and setup then starts by itself.
   - On GitLab Premium or Ultimate, you can leave "Initialize repository with a README" off, so Erpy sets the empty project up with a starter. First check the group's **Settings → Repository → Default branch → Initial default branch protection**: **Fully protected after initial push**, **Partially protected** or **Not protected** lets a Developer make the first push. With **Fully protected**, tick the README box, as on Free.
2. **Make Erpy's user Developer** of the group, or of the new project, as in step 2.
3. **Link** as in steps 3 to 6. The preview's **Group** row now shows your group, and the card is marked "Active".
4. **Go on with [Add the webhooks](#add-the-webhooks)**, then [4. Add a repository](../../04-add-a-repository/). The project shows there within a minute of the link, marked **Empty** if you left the README off.

## Check

The setup page's **Link code host** step, and later Settings → Links, shows a card for your group:

- the group, for example `gitlab.com/acme`, marked "Active";
- "GitLab group · Erpy works as your GitLab user, Developer of these projects";
- every project Erpy's user reaches, added or not, or "No projects listed yet." until Erpy has listed them. The card shows 20 at a time: **Show 20 more** shows the next ones. With more than 20, a search box, "Search 45 projects", finds one by name.

On Settings → Links, the card's menu (**⋯**) has **Open in GitLab** and **See projects**.

A card marked "Waiting for access" is not active yet. See [Waiting for access](#waiting-for-access).

## What to expect

- Erpy lists the group's projects within a minute of the link, and checks the user's access every hour after that. A project you add the user to later shows up on its own, within the hour, or within a minute with **Check again** on [4. Add a repository](../../04-add-a-repository/).
- Settings, **Settings → Users** included, opens once setup is over: after the first repository is added. Then you can [invite your team](../../05-invite-your-team/).
- Erpy cannot add webhooks: its user is a Developer. Someone with more rights on GitLab adds them: see [Add the webhooks](#add-the-webhooks).

## Add the webhooks

A webhook tells Erpy at once when something happens in your projects: a push, a comment, a merge request, a pipeline. Erpy's GitLab user is a Developer and cannot add webhooks, so you add them on GitLab and paste each one's signing token in Erpy Factory.

Webhooks are optional. Without them, Erpy checks GitLab every 5 minutes for the projects you added, so it picks up your changes later. On the setup page, select **Skip for now** to add a repository first, and add the webhooks later on Settings → Links.

### Before you add them

- Your GitLab group is linked, and its card is "Active": on the setup page's **Link code host** step, or later on **Settings → Links**. The **Webhooks** section shows only once the link is active: on a card marked "Active" or "Needs attention". If the card says "Waiting for access", go back to [If your group has no project yet](#if-your-group-has-no-project-yet) or [Waiting for access](#waiting-for-access).
- You are an Admin of your organization in Erpy Factory.
- On GitLab, you are Owner of the group (for a group webhook) or Maintainer of each project (for project webhooks), or someone who is helps you.

On the link's card, open the **Webhooks** section. It is open by itself while no webhook is saved, and it walks through the same work as steps 1 to 5 below. Its first line says "Erpy's user can't add webhooks. Ask a group Owner (Premium or Ultimate) or a project Maintainer to add one in GitLab, then paste its signing token here."

### Webhook steps

1. **Choose one kind of webhook.**
   - **One group webhook**: you need GitLab Premium or Ultimate, and you are Owner of the group. In the group on GitLab, open **Settings → Webhooks**. It covers every project in the group, and projects added later.
   - **One webhook per project**: works on any GitLab plan, and you are Maintainer of the project. In each project on GitLab, open **Settings → Webhooks**. A project added later needs its own webhook.

   Use one kind only. Saving a group webhook stops the project webhooks, and the other way round.
2. **Copy the URL the page shows.** The group webhook's URL is under "One group webhook". Each project has its own URL, listed under its name below "Or one webhook per project". The project list appears once Erpy's user has projects. The page shows each URL in full, with a **Copy** button beside it: select it, and it reads **Copied**. If your browser doesn't let the page copy, it says "Could not copy. Select the URL and copy it yourself."
3. **Fill in GitLab's form.** On GitLab's **Webhooks** page, add a new webhook:
   - **URL**: paste the URL you copied.
   - **Secret token**: leave it empty. Erpy doesn't use it: it checks GitLab's signing token instead, which proves each delivery came from your webhook.
   - **Signing token**: select **Generate signing token** and copy it. GitLab shows it only once. gitlab.com's form has this field on every plan. Erpy accepts only deliveries signed with it, so a webhook without a signing token doesn't work.
   - **Trigger**: tick these events:
     - Push events
     - Comments
     - Confidential comments
     - Work item events
     - Confidential work item events
     - Merge request events
     - Pipeline events
     - Emoji events

     On a group webhook, also tick **Member events** and **Project events**. They tell Erpy about projects and members added later.
   - **SSL verification**: keep it on.

   Then select **Add webhook**.
4. **Paste the signing token in Erpy Factory.** Under "3. Paste its signing token here":
   - In **Webhook**, choose **Group webhook**, or the project the webhook belongs to. **Webhook** lists at most 50 projects. To choose one it doesn't list, select **Paste its signing token** next to it in the list above.
   - Paste the token into **Signing token** and select **Save**.

   The page says "Signing token saved for the group webhook. Erpy accepts its deliveries now. Use GitLab's Test button to send one." For a project webhook, it names the project as **Webhook** does, for example "Signing token saved for acme/shop. Erpy accepts its deliveries now. Use GitLab's Test button to send one." **Webhook** stays on the saved webhook, and the **Signing token** field then reads "Saved. Paste a new token only to replace it."
5. **Send a test.** On GitLab, open the webhook's **Test** list and choose **Push events**. GitLab can send it only once the project has at least one commit. For a project that is still empty, send the test after its first commit, for example after you add it in [4. Add a repository](../../04-add-a-repository/) and Erpy commits the starter.

   GitLab shows the result at once: edit the webhook and look under **Recent events**. A `200` status means Erpy accepted the delivery. A `401` means the signature didn't match: check that you saved this webhook's signing token in step 4.

For webhooks per project, repeat steps 2 to 5 for each project Erpy works on.

### Check the webhooks

- As soon as you save, the **Webhooks** line on the card says "A group webhook is saved." or "Project webhooks are saved. Add one for each project Erpy works on." Before you save one it says "No webhook yet. Until you add one, Erpy checks GitLab every 5 minutes."
- Each project in the list shows "Waiting for first event. Erpy checks GitLab every 5 minutes meanwhile." until a webhook has delivered an event for that project, then "Receiving events". Only events of projects you have added in [4. Add a repository](../../04-add-a-repository/) count, so a test sent before you add the project gets a `200` on GitLab but doesn't change this line. A project you have not added reads "Not in Factory yet: Erpy ignores its events until you add it on Add repository." The list is refreshed every hour, so "Receiving events" can take up to an hour to show.
- A test sends one event, so it turns one project at most. With a group webhook, each other project turns to "Receiving events" after something happens in it, such as a push or a comment.

### What to expect from webhooks

- Nothing waits on the webhook. You can add repositories and write tickets before it delivers.
- Until a project's webhook delivers, Erpy checks GitLab every 5 minutes for that project, so it still picks up your changes, only later. This covers the projects you added in Erpy Factory (see [4. Add a repository](../../04-add-a-repository/)), not every project in the list.
- The project list shows every project Erpy's user reaches, including ones you have not added yet. You can add their webhooks before you add the repositories.
- If GitLab stops sending webhooks once they have worked, the card shows "Needs attention". See [Needs attention](#needs-attention).
- Erpy doesn't remove webhooks. If you remove the link, delete the webhooks on GitLab yourself.

### If saving a signing token is refused

| What you see | What to do |
|---|---|
| "Paste the signing token as GitLab shows it. It starts with whsec_." | Paste the whole signing token, as GitLab showed it. If you no longer have it, delete the webhook on GitLab, add it again, and paste the new signing token. |
| "Erpy does not work on that project: its user is not Developer there. Add it, wait for the project list, then save again." | Make Erpy's user Developer of the project on GitLab, wait until the project shows in the list, then save again. |
| "The link changed while saving. Save again." | Select **Save** again. |
| "The signing token was not saved. Try again in a moment." | Wait a moment, then save again. |
| "Only an Admin of Acme can set up GitLab webhooks." | Ask an Admin of your organization. |

## Waiting for access

A user that is in no project yet, or whose projects can't be linked yet, shows as a card marked "Waiting for access", with what to change on GitLab. Erpy checks again every hour and links the group of its first projects by itself.

On the setup page, the **Link code host** step shows the waiting card, and for a user in no project it reads "Waiting for access: make Erpy's user Developer of a project." Once you have given the user access on GitLab, a Builder or an Admin can select **Check again**: the page says "Erpy is checking GitLab now. This page shows the link once acme-erpy is Developer of a project." Erpy then links the group, and the page, which reads again by itself, shows the link within a minute. Without **Check again**, Erpy links it with its hourly check, within the hour.

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
| "This GitLab user is already linked to another organization. Create another GitLab user for Erpy, or remove that link there first." | The user is in no project yet, and another organization already links it. Create another GitLab user for Erpy and use its token, or ask an Admin of that organization to remove its link first. |
| "This group is already linked to this organization, through another user. Replace that link's token instead." | Use **Replace token** on the existing link, with a token of that link's user. |
| "This group is already linked through GitLab's approval screen. Remove that link first." | Remove the existing link of this group, then link it with the token. |
| "What the token reaches changed since the check. Check the token again." | The user's projects changed in the meantime. Select **Check token** again and read the new preview. |
| "The check is more than 10 minutes old. Check the token again." or "The check is more than 10 minutes old, or from another session. Check the token again." | Paste the token and select **Check token** again, then **Link**. |
| "Sign in again, then check the token." | Sign in again with Google, then check the token. |
| "Only an Admin of Acme can link a GitLab group." | Ask an Admin of your organization. |
| "The check did not complete. Try again in a moment." or "The link did not complete. Try again in a moment." | Wait a moment, then try again. |
| "acme is linked but not yet attached to Acme. The request could not be sent. Try again in a moment." | Wait a moment, then check the token again and select **Link** again. |

## Needs attention

Erpy checks every link each hour. When something is wrong, the card is marked "Needs attention" and says what to do. Your organization's home page shows the same line; with more than one link, it shows only one link's line.

Four of these clear by themselves once the cause is fixed: a blocked or deactivated user, a user who is Maintainer or Owner, a user who is no longer Developer of any project, and silent webhooks. Only a token GitLab no longer accepts, or one it did not let Erpy renew, needs [Replace token](#replace-the-token).

| What you see | What to do |
|---|---|
| "Erpy's GitLab user is Maintainer or Owner somewhere. Lower it to Developer; Erpy checks again each hour and starts again by itself." | Change the user's role to Developer on GitLab. Erpy clears the warning within the hour, with no new token. |
| "GitLab did not let Erpy renew the token, which expires within 60 days. Replace it before then." | [Replace the token](#replace-the-token) before it expires. |
| "Erpy's GitLab user is no longer Developer of any project in the group. Add it back as Developer; Erpy checks again each hour and starts again by itself." | Add the user back as Developer on GitLab. Erpy clears the warning within the hour, with no new token. |
| "GitLab has stopped sending webhooks. …" | Open the group's or projects' **Settings → Webhooks** on GitLab and check that the webhooks are still there and enabled. See [Add the webhooks](#add-the-webhooks). The warning clears by itself once they deliver again, with no new token. |
| "GitLab no longer accepts the token. Replace it." | [Replace the token](#replace-the-token). |
| "GitLab has blocked or deactivated Erpy's GitLab user. Get it unblocked, or sign in to GitLab as that user to reactivate it; Erpy checks again each hour and starts again by itself." | Get the user unblocked in GitLab, or sign in as that user to reactivate it. Erpy clears the warning within the hour, with no new token. |

## Replace the token

Replace the token when the card asks for it, or when you want a fresh one.

1. On GitLab, sign in as Erpy's user and create a new personal access token, as in step 3.
2. On the link's card, select **Replace token**: on the setup page's **Link code host** step during setup, or on Settings → Links after. The form says "A new token of acme-erpy, this link's user. The webhooks you added stay."
3. Paste the new token, select **Check token**, read the preview, and confirm.

Use a token of this link's user. Erpy refuses a token of any other user:

| What you see | What to do |
|---|---|
| "This token reaches acme-labs, not the group whose token you are replacing. Paste a token of acme-erpy." | Create the token as the user of this link. |
| "This token's user, other-user, is not the user of the link you are replacing, and is in no project yet. Paste a token of acme-erpy." | Create the token as the user of this link. |
| "This token's user, other-user, is not the user of the link you are replacing. Paste a token of acme-erpy." | Create the token as the user of this link. |

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

- on the setup page, before a link exists: "An Admin of Acme links its code host: GitLab or GitHub." It also names your Admins after "Admins:" when Erpy Factory can list them;
- on Settings → Links, before a link exists: "Acme has no link yet. An Admin of Acme links its GitHub account or GitLab group here."
- after: the link's card, with its status, its projects and any "Needs attention" line. On Settings → Links, a linked group's card has a menu with **Open in GitLab** and **See projects**.

## Next step

[Add the webhooks](#add-the-webhooks)
