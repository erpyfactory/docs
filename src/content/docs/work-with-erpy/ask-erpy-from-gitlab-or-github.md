---
title: Ask Erpy from GitLab or GitHub
description: Mention Erpy in comments on GitLab or GitHub to ask a question, to ask for more work on a merge request or pull request, or, on GitHub, to turn an issue into a pull request.
---

Besides the board, you can talk to Erpy in comments on GitLab or GitHub. Mention `@erpyai` and say what you want, in your own words.

## Before you start

- Your organization and repository are set up, see [Get started](../../get-started/01-your-invitation/).
- You have the Builder or Admin role in your organization. Erpy answers only a Builder or an Admin.
- If you sign in to Erpy Factory with Google, you connected your GitLab or GitHub account, see [Connect your account](#connect-your-account).

## Connect your account

Erpy needs to know that a comment on GitLab or GitHub is yours, so it can give it your role. If you sign in with Google, connect your account once:

1. In Erpy Factory, open the account menu and select **Connected accounts**.
2. Select **Connect GitLab** or **Connect GitHub**, and sign in to GitLab or GitHub as the account you comment with.
3. The page says "Connected. Erpy now knows your comments are yours.", and lists your account next to GitLab or GitHub.

| What you see | What to do |
|---|---|
| "That account is connected to another Erpy person. Ask your Erpy administrator." | Ask an Admin of your organization. |
| "You have already connected another account there. Disconnect it first." | Select **Disconnect** next to the other account, then connect again. |
| "Nothing was connected: the request was cancelled." | Select **Connect GitLab** or **Connect GitHub** again, and approve the request. |
| "Nothing was connected: the request expired or was opened in another browser. Try again." | Try again in the same browser. |
| "Nothing was connected: we could not read the account. Try again in a moment." | Try again in a moment. |

To undo it, select **Disconnect**.

## Where to mention Erpy

Mention Erpy in a comment on an issue, or on a merge request (GitLab) or pull request (GitHub), in a repository Erpy works on.

- **On GitLab**, write `@erpyai`, or the username of your organization's own Erpy user, the GitLab user you created for Erpy. Write it exactly: on GitLab, Erpy does not answer a misspelled name.
- **On GitHub**, write `@erpyai`.

On GitLab, `@erpyai` needs no GitLab user: it is not the Erpy user you created, and you add no user for it. Erpy reads the text of each comment, through your webhooks as soon as you post it, or within 5 minutes in a project that has no webhook yet. GitLab may not show `@erpyai` as a link; Erpy reads the comment all the same.

Erpy replies in the same thread.

### If Erpy can't act on your request

| What you see | What to do |
|---|---|
| "I don't know your GitLab account in Erpy for Acme, so I cannot act on your request. If you already use Erpy, connect your GitLab account under Connected accounts in Erpy's account menu. Otherwise ask your Erpy administrator to invite you by email." (On GitHub, it names your GitHub account.) | [Connect your account](#connect-your-account), or ask an Admin to invite you. Then comment again. |
| "Your role in Acme in Erpy is Viewer. Only a Builder or an Admin can ask me to do work. Ask your Erpy administrator to change your role." | Ask an Admin to give you the Builder role. Then comment again. |

Erpy posts one of these once per person on a thread. After that, it says nothing more to that person on the thread, even when the reason changes: fix the cause, then comment again.

## On GitHub: from an issue to a pull request

On GitHub, Erpy turns an issue into a pull request in two stages: it writes the requirements, you approve them, and your approval starts the build.

1. Open the issue. Write it as you would tell a colleague, for example "Add a delivery note field to sale orders".
2. Add this comment:

   ```text
   @erpyai write the requirements
   ```

3. Erpy replies "I'm writing the requirements for this issue now." and keeps one status comment up to date: in progress, then done. Wait for "The requirements are ready for review."
4. Read the requirements. Erpy replaced the description of the issue with them, and kept your own text at the bottom, under "Original request". Erpy adds the label `erpy-prd-review`.
5. If Erpy has a question, it asks it in a comment. Answer in a comment that mentions `@erpyai`. To change something, say what in a comment that mentions `@erpyai`, for example:

   ```text
   @erpyai the delivery note should be optional
   ```

   Erpy replies "I'm revising this issue's requirements now." and revises the requirements. The status comment then reads "The requirements are updated." If you ask for a change after approving and before Erpy starts building, it reads "The requirements are updated and ready for review again.", and you approve them again. Repeat until the requirements are right.

6. When the requirements are right, add this comment:

   ```text
   @erpyai I approve this issue
   ```

   Your approval starts the build. Erpy replies "I marked the requirements approved. I'm starting on this issue now. I'll open a pull request with the change."

7. Wait for "Pull request #N is open for review." in the status comment. For a change that gets screen recordings, the status first reads "Pull request #N is open; a screen recording of the change comes next."
8. Review the pull request, and merge it when it looks right.

### Check

- After you approve the requirements, the issue has the label `erpy-prd-ready`, until the build moves the issue on.
- When the pull request is ready for review, the issue has the label `erpy-ready-for-review`. The pull request is titled with the issue number, comes from a branch whose name starts with `issue-` and the issue number, and closes the issue.
- The pull request has a check named "Implementation".
- After you merge the pull request, the issue closes by itself.

### What to expect

- Erpy starts the pull request as a draft, and writes its description when the change is ready for review. The description starts with `Closes #N`, and has a summary, the acceptance criteria and an overview of the changes.
- If you ask Erpy to build an issue whose requirements wait for review, or an issue with no requirements yet, your request counts as the approval: Erpy adds `erpy-prd-ready` and builds.
- If your organization uses Factory tickets, the same flow runs on the board with buttons, see [Write your first ticket](../../get-started/06-write-your-first-ticket/).

## On GitLab: tickets in Erpy Factory, comments on merge requests

On GitLab, write your tickets in Erpy Factory, see [Write your first ticket](../../get-started/06-write-your-first-ticket/). Requirements written on a GitLab issue cannot be approved, so write your tickets in Erpy Factory. Keep **Factory tickets** under Settings → Tickets.

On GitLab, use comments to:

- ask Erpy a question, on an issue or a merge request, see [Ask questions](#ask-questions);
- ask for more work on a merge request: a change, fixing the failing checks or resolving the merge conflicts, see [Ask for more work on a merge request or pull request](#ask-for-more-work-on-a-merge-request-or-pull-request).

If you ask on GitLab for something Erpy does not take there, such as approving requirements or building from a GitLab issue, Erpy replies:

> This isn't available on GitLab yet.

### The merge request

Erpy opens a merge request for each approved ticket. Its description starts with the ticket's address, and its branch name starts with `issue-` and a number. You review it and you merge it. When you merge it, the ticket closes.

## Ask questions

On an issue, a merge request or a pull request, ask Erpy a question in a comment that mentions `@erpyai`, for example:

```text
@erpyai why does the delivery note use a text field?
```

Erpy answers in the thread. It starts no work for a question.

## Ask for more work on a merge request or pull request

When a merge request or pull request is open, you can ask Erpy for more in a comment on it that mentions `@erpyai`, in your own words:

```text
@erpyai show the delivery note on the delivery order too
```

```text
@erpyai please fix the failing checks
```

```text
@erpyai resolve the merge conflicts
```

Erpy replies that it is working on it:

| You ask | Erpy replies on GitLab | Erpy replies on GitHub |
|---|---|---|
| A change | "I'm working to implement your new request now." | "I'm working to implement your new request now." |
| Fix the failing checks | "I'm fixing the failing checks on this merge request now." | "I'm fixing the failing checks on this pull request now." |
| Resolve the merge conflicts | "I'm merging the base branch into this merge request and resolving the conflicts now." | "I'm merging the base branch into this pull request and resolving the conflicts now." |

These requests work whether or not the merge request or pull request carries the `erpy-factory` label, and they have no limit on attempts.

### Closed or merged

On a closed or merged merge request or pull request, or a closed issue, Erpy starts no work, and still answers questions about it. It replies, for example:

| Where | What Erpy replies |
|---|---|
| A merged merge request | "Merge request !12 is already merged, so I start no new work on it. Open an issue for the change you need, or ask me here how or why it was done." |
| A closed merge request | "Merge request !12 is closed, so I start no work on it. Reopen it and ask again, or ask me here how or why it was done." |
| A merged pull request | "Pull request #12 is already merged, so I start no new work on it. Open an issue for the change you need, or ask me here how or why it was done." |
| A closed pull request | "Pull request #12 is closed, so I start no work on it. Reopen it and ask again, or ask me here how or why it was done." |
| A closed issue | "Issue #12 is closed, so I start no work on it. Reopen it and ask again, or ask me here how or why it was done." |

The reply says to open an issue. On GitLab, write a new ticket on the board instead: requirements on a GitLab issue cannot be approved.

## What to expect

- If the change touches code that is broken, Erpy fixes it in the same merge request or pull request, and opens no follow-up issue for it. A test that already fails on the base branch is the exception: Erpy fixes it in a separate merge request or pull request onto the base branch, see [Automatic work](../automatic-work/).
- Erpy runs one piece of work at a time on each ticket, issue, merge request or pull request. If you ask for more on one while Erpy is still working on it, your request waits and starts when that work ends. If your earlier request has not started yet, Erpy works on your newest request in its place: put everything you need in one comment. Work on different ones can run at the same time. When many requests are waiting, they start when there is capacity.
- Erpy never merges: you do. While it builds a change, it does not change your workflows, `harness.yaml` or `.harness` folder.
- Erpy does not deploy. After you merge, install or upgrade the module in your Odoo as you do today.
- A merge request or pull request that Erpy opens carries the `erpy-factory` label, and Erpy keeps it in order on its own, see [Automatic work](../automatic-work/).
- If a run stops and there is something you can fix, such as a missing setting in `harness.yaml`, Erpy says so in a comment. Fix it and ask again in a new comment that mentions `@erpyai`. Work can also pause on Erpy's side and continue on its own, with nothing for you to do.
