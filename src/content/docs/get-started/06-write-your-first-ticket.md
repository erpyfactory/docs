---
title: 6. Write your first ticket
description: Choose where your tickets live, write a ticket, read and approve its PRD, and review the merge request or pull request Erpy opens.
---

A ticket describes one change you want. Erpy writes its requirements, you approve them, and Erpy builds the change and opens a merge request (on GitLab) or a pull request (on GitHub). You review it and you merge it.

## Before you start

- Your repository is added and set up: its board shows no **Set up my repo** button. See [Add a repository](../04-add-a-repository/).
- You have the Builder or Admin role in your organization. A Viewer can read tickets, but cannot write, approve or close them.
- An Admin chose where your tickets live, or left the default. See [Choose where your tickets live](#choose-where-your-tickets-live).

## Choose where your tickets live

Settings → Tickets sets where people in your organization file and follow their work. It shows two choices:

| Choice | What the screen says |
|---|---|
| **Factory tickets** | "People file work in Factory, as T-1, T-2 and so on. Nothing appears in the forge’s issues." |
| **GitLab issues** (on GitHub: **GitHub issues**) | "People file and discuss work as GitLab issues. Factory reads and writes them there." |

Factory tickets are the default. Until an Admin saves a choice, the page says "Not chosen yet. Until an Admin saves a choice, the organization uses Factory tickets."

Only an Admin can change the choice: choose one and select **Save**. The page says "Saved." Everyone else sees the choice, with "Only an Admin of this organization can change this."

**On GitLab, keep Factory tickets.** Requirements written on a GitLab issue cannot be approved, not on GitLab and not in Erpy Factory, and without an approval Erpy builds nothing. Requirements on a Factory ticket are approved with **Approve PRD**. So on GitLab, write your tickets in Erpy Factory, and use GitLab comments for questions and for more work on a merge request, see [Ask Erpy from GitLab or GitHub](../../work-with-erpy/ask-erpy-from-gitlab-or-github/).

**On GitHub**, both choices work. With GitHub issues, you approve the requirements in a comment on the issue, see [Ask Erpy from GitLab or GitHub](../../work-with-erpy/ask-erpy-from-gitlab-or-github/).

Whatever the choice, **New ticket** on the board always makes a Factory ticket (T-1, T-2 and so on).

## Steps

### Write the ticket

1. Open your repository's board.
2. Select **New ticket**. A side panel opens, titled "New internal ticket", with "Saved as a draft. Nothing runs until you ask Factory to write a PRD." Internal means the ticket is kept in Erpy Factory, as T-1, T-2 and so on, not as a GitLab or GitHub issue. On your organization's board, first choose the repository the ticket is for.
3. Fill in the title, and describe the request in the box under it. Write the change as you would tell a colleague, for example "Add a delivery note field to sale orders". Use **Preview** to read the description as it will show. You can attach files.
4. Select **Create ticket**. The ticket opens. It is a draft, in the **Draft** column, and nothing runs yet.
5. To change the draft, select **Edit**.

### Ask Erpy to write the PRD

6. On the draft ticket, select **Write PRD**. The page says "PRD queued. Erpy starts writing it shortly." The card moves to **PRD authoring**.
7. Wait until the card reaches **PRD review**. The ticket page shows the PRD. Meanwhile, the card's column and the ticket's **Work history** tab show how far Erpy is.

The PRD (product requirements document) is the requirements for your change: what it does, and how you will know it works.

### Read and change the PRD

8. Read the **PRD** tab. Your own text stays under the **Original request** tab. Other tabs can appear as the work goes on, such as **Questions** and **Work history**.
9. If something is wrong or missing, change it in one of two ways:
   - Write what to change in the box under the comments and select **Reply**. Erpy answers in the thread, and rewrites the PRD when you ask for a change. While it rewrites, the PRD shows "Rewriting · not saved yet".
   - Select **Edit PRD**, change the text yourself, and select **Save**.
10. If Erpy has a question, the ticket shows **Needs you** and a **Questions** tab with the number of questions that wait. Answer them there.

### Approve, or decline

11. When the PRD is right, select **Approve PRD**. The page says "PRD approved. Erpy starts building it shortly." Only a Builder or an Admin can approve.
12. If you don't want the change after all, select **Close ticket**. A dialog asks "Close ticket T-1?" and says "Erpy stops working on it. The ticket and its history stay readable." Select **Close ticket** to confirm, or **Keep open**.

### Review and merge

13. Erpy builds the change and opens a merge request on GitLab, or a pull request on GitHub. The card moves to **Building**, can pass through **Demo capture** and **Pre-merge**, and ends in **PR review**. The **Work history** tab shows how far it is.
14. Review the merge request or pull request on GitLab or GitHub, and merge it when it looks right. Erpy never merges.
15. Erpy does not deploy. After the merge, install or upgrade the module in your Odoo as you do today.

## Check

- After **Create ticket**, the card is in **Draft**.
- After **Write PRD**, the card moves to **PRD authoring**, then to **PRD review**.
- After **Approve PRD**, the card moves on to **Building**.
- The merge request or pull request description starts with the ticket's address. Its branch name starts with `issue-` and a number.
- After you merge it, the ticket closes.

## What to expect

### The board

The board has one column per stage, left to right:

| Column | What it means |
|---|---|
| **Draft** | A ticket you created. Nothing runs until someone selects **Write PRD**. |
| **PRD authoring** | Erpy is writing or revising the PRD. |
| **PRD review** | The PRD is ready. Read it, then approve it, change it or close the ticket. |
| **Building** | Erpy is building the change, or working through a review that asks for changes. |
| **Demo capture** | Erpy is filming screen recordings of the change. They show on the ticket's **Films** tab, and the merge request or pull request description links the recording under **Scenarios**. |
| **Pre-merge** | Erpy is getting the merge request or pull request ready to merge, for example fixing failing checks or merge conflicts. |
| **PR review** | The merge request or pull request is ready. Review it and merge it. |

**Draft**, **PRD review** and **PR review** say "· your turn" next to their count: those are the columns where a person acts. The **Last 10 shipped** column at the end lists the last tickets that shipped.

Above the board, **All**, **Blocking**, **Needs you** and **Fixes** choose which cards show:

- **Blocking**: cards that other work waits on.
- **Needs you**: cards a person is wanted on.
- **Fixes**: work Erpy raised itself to fix something.

### Paused, Stopped and Snoozed

| What you see | What it means | What to do |
|---|---|---|
| A task marked "paused", with "Resumes automatically" | The work is paused on Erpy's side. It continues on its own. | Nothing. |
| "Paused until {branch}'s tests are fixed" on a card, where `{branch}` is your base branch, for example "Paused until 19.0's tests are fixed" | The base branch already fails these tests. Erpy fixes the base branch in a separate merge request or pull request, and continues here on its own once that is merged. | Review and merge the fix. See [Automatic work](../../work-with-erpy/automatic-work/). |
| "Stopped" and a date on a card, under the **Stopped** heading | GitHub only. The ticket's open pull requests no longer carry the `erpy-factory` label: someone removed it, or Erpy had not worked on the change itself for seven days. Erpy does no automatic work on them. On GitLab, a card shows no "Stopped", also after you remove the label. | Add the `erpy-factory` label again, or ask for work in a comment that mentions `@erpyai`. See [Automatic work](../../work-with-erpy/automatic-work/). |
| "Snoozed until" and a date on a card | Someone snoozed the ticket off the board until that date. | Select **Unsnooze** to bring it back now. |

Stopped cards show only while the **Stopped** chip above the board is on. Snoozed cards show only while the **Snoozed** chip is on.

To snooze a ticket, hover its card, select the alarm clock in its corner, and choose **1 day**, **1 week** or **1 month**. The card leaves the board until that date, and comes back on its own.

### Other things to know

- If your organization's OpenRouter key is missing or does not work, a ticket can wait for it. The ticket page then says why it waits, and shows **Open Model key**. An Admin fixes the key on Settings → Model key, see [Add your OpenRouter key](../02-add-your-openrouter-key/).
- If you lack the role for an action, the screen says so, for example "Approving a PRD needs the Builder role in Acme."
- A closed ticket stays readable, with its history.

## Next

[Ask Erpy from GitLab or GitHub](../../work-with-erpy/ask-erpy-from-gitlab-or-github/)
