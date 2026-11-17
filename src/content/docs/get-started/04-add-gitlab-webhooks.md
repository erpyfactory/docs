---
title: 4. Add GitLab webhooks
description: Add a group webhook or one webhook per project on GitLab, so Erpy hears about your changes at once.
---

A webhook tells Erpy at once when something happens in your projects: a push, a comment, a merge request, a pipeline. Erpy's GitLab user is a Developer and cannot add webhooks, so you add them on GitLab and paste each one's signing token in Erpy Factory.

## Before you start

- Step 3 is done: your GitLab group is linked and its card in **Settings → Links** is "Active". See [3. Link GitLab](../03-link-gitlab/).
- You are an Admin of your organization in Erpy Factory.
- On GitLab, you are Owner of the group (for a group webhook) or Maintainer of each project (for project webhooks), or someone who is helps you.

On the link's card in Settings → Links, open the **Webhooks** section. It is open by itself while no webhook is saved, and it walks through the same three parts as the steps below.

## Steps

1. **Choose one kind of webhook.**
   - **One group webhook**: you need GitLab Premium or Ultimate, and you are Owner of the group. In the group on GitLab, open **Settings → Webhooks**. It covers every project in the group, and projects added later.
   - **One webhook per project**: works on any GitLab plan, and you are Maintainer of the project. In each project on GitLab, open **Settings → Webhooks**. A project added later needs its own webhook.

   Use one kind only. Saving a group webhook stops the project webhooks, and the other way round.
2. **Copy the URL the page shows.** The group webhook's URL is under "One group webhook". Each project has its own URL, listed under its name below "Or one webhook per project". The project list appears once Erpy's user has projects.
3. **Fill in GitLab's form.** On GitLab's **Webhooks** page, add a new webhook:
   - **URL**: paste the URL you copied.
   - **Secret token**: leave it empty.
   - **Signing token**: generate one and copy it. GitLab shows it only once.
   - **Trigger**: tick these events:
     - Push events
     - Comments
     - Confidential comments
     - Issues events
     - Confidential issues events
     - Merge request events
     - Pipeline events
     - Emoji events

     On a group webhook, also tick **Member events** and **Project events**. They tell Erpy about projects and members added later.
   - **SSL verification**: keep it on.

   Then select **Add webhook**.
4. **Paste the signing token in Erpy Factory.** Under "3. Paste its signing token here":
   - In **Webhook**, choose **Group webhook**, or the project the webhook belongs to. **Webhook** lists at most 50 projects. To choose any project, select **Paste its signing token** next to it in the list above.
   - Paste the token into **Signing token** and select **Save**.

   The page says "Saved. Erpy accepts deliveries from the group webhook now. Use GitLab's Test button to send one." (or "from the project webhook").
5. **Send a test.** On GitLab, use the webhook's **Test** button to send an event.

For webhooks per project, repeat steps 2 to 5 for each project Erpy works on.

## Check

- The **Webhooks** line on the card says "A group webhook is saved." or "Project webhooks are saved. Add one for each project Erpy works on." Before you save one it says "No webhook yet. Until you add one, Erpy checks GitLab every 5 minutes."
- Each project in the list shows "Waiting for first event. Erpy checks GitLab every 5 minutes meanwhile." until a webhook has delivered an event for that project, then "Receiving events". The list is refreshed every hour, so "Receiving events" can take up to an hour to show.
- A test sends one event, so it turns one project at most. With a group webhook, each other project turns to "Receiving events" after something happens in it, such as a push or a comment.

## What to expect

- Nothing waits on the webhook. You can add repositories and write tickets before it delivers.
- Until a project's webhook delivers, Erpy checks GitLab every 5 minutes for that project, so it still picks up your changes, only later. This covers the projects you added in Erpy Factory (see [6. Add a repository](../06-add-a-repository/)), not every project in the list.
- The project list shows every project Erpy's user reaches, including ones you have not added yet. You can add their webhooks before you add the repositories.
- If GitLab stops sending webhooks once they have worked, the card shows "Needs attention". See [Needs attention](../03-link-gitlab/#needs-attention).
- Erpy doesn't remove webhooks. If you remove the link, delete the webhooks on GitLab yourself.

## If it is refused

| What you see | What to do |
|---|---|
| "Paste the signing token as GitLab shows it. It starts with whsec_." | Paste the whole signing token, as GitLab showed it. If you no longer have it, delete the webhook on GitLab, add it again, and paste the new signing token. |
| "Erpy does not work on that project: its user is not Developer there. Add it, wait for the project list, then save again." | Make Erpy's user Developer of the project on GitLab, wait until the project shows in the list, then save again. |
| "The link changed while saving. Save again." | Select **Save** again. |
| "The signing token was not saved. Try again in a moment." | Wait a moment, then save again. |
| "Only an Admin of Acme can set up GitLab webhooks." | Ask an Admin of your organization. |

## Next step

[6. Add a repository](../06-add-a-repository/)
