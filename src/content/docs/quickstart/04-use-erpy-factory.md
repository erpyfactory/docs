---
title: 4. Use Erpy Factory
description: Turn an issue into a pull request. Ask Erpyd to write the requirements, approve them, ask it to build the change, and review the pull request.
---

Erpyd turns an issue into a pull request in two stages: it writes the requirements, you approve them, and then it builds the change. You talk to Erpyd in comments that mention `@erpyd`, in your own words. Erpyd acts only on requests from people with write access.

## Before you start

- Your repository is set up: Erpyd is installed and active on it, and you merged the configuration pull request, with the advanced settings if your repository needs them.
- You have an issue that describes one small change. Write it as you would tell a colleague, for example "Add a delivery note field to sale orders".

## Typical workflow

1. Open the issue.
2. Add this comment:

   ```text
   @erpyd write the requirements
   ```

3. Erpyd replies that it is writing them and keeps one status comment up to date: in progress, then done. Wait for "The requirements are ready for review."
4. Read the requirements. Erpyd replaced the description of the issue with them, and kept your own text at the bottom, under "Original request". Erpyd adds the label `erpy-prd-review`.
5. If Erpyd has a question, it asks it in a comment. Answer in a comment that mentions Erpyd. To change something, say what in a comment that mentions Erpyd, for example:

   ```text
   @erpyd the delivery note should be optional
   ```

   Erpyd revises the requirements and asks you to approve them again. Repeat until the requirements are right.

6. When the requirements are right, add this comment:

   ```text
   @erpyd I approve this issue
   ```

   Erpyd replies that it added `erpy-prd-ready` and removed `erpy-prd-review`. Nothing is built yet.

7. Add this comment:

   ```text
   @erpyd build this change
   ```

   Erpyd replies "I'm starting on this issue now. I'll open a pull request with the change."

8. Wait for "Pull request #N is open for review." in the status comment.
9. Review the pull request, and merge it when it looks right.

## Check

- After you approve the requirements, the issue has the label `erpy-prd-ready`.
- After the pull request is open, the issue has the label `erpy-in-review`, and a pull request titled with the issue number, from a branch named `issue-` followed by the issue number, closes it.
- The pull request has a check named "Implementation".
- After you merge the pull request, the issue closes by itself.

## What to expect

- Erpyd starts the pull request as a draft, and writes its description when the change is ready for review. The description starts with `Closes #N`, and has a summary, the acceptance criteria and an overview of the changes.
- Erpyd does not build before you approve the requirements. If you ask for it anyway, Erpyd comments "I can't build this yet because the requirements are not approved. When they are right, ask `@erpyd` in a comment here to approve them, then to build the change." and adds the label `erpy-needs-info`. Approve the requirements, then ask again.
- Erpyd works on one issue or pull request at a time. When many requests are waiting, Erpyd's check says it starts when capacity is free.
- Erpyd never merges, never pushes to your default branch, and never changes your workflows, `harness.yaml` or `.harness` folder. You do.
- A pull request that Erpyd opens carries the `erpy-factory` label, and Erpyd keeps it in order on its own, see Autonomous workflows below.
- If a run stops, the status comment and the check on the pull request say why. When it is something you can fix, such as "This repository's configuration has no `<setting>` setting, and this work needs it. Add `<setting>` to harness.yaml with a pull request.", fix it and ask again in a new comment that mentions Erpyd. Other stops say that Erpyd reported the fault to its team and will continue once it is fixed.

## Autonomous workflows

On a pull request that carries the `erpy-factory` label, Erpyd works on its own, without a comment from you:

- **Failing checks.** When the checks on the latest commit have finished and one is red, Erpyd repairs it. It leaves alone the workflows you told it to, and makes at most three automatic attempts per pull request.
- **Merge conflicts.** When the pull request conflicts with its base branch, Erpyd merges the base branch into it and resolves the conflicts. You can turn this off, see [Advanced settings](../03-advanced-settings/).

Erpyd does this for seven days. The seven days start when the label is added, and start again each time Erpyd does work on the change itself: building it, following up on a review that asks for changes, filming its screen recordings or revising its design. Repairing checks and resolving conflicts do not start them again, and neither does a push or a comment from you unless it leads Erpyd to do one of those. After seven days the label comes off the pull request and the automatic work stops.

To give the pull request back to Erpyd, add the `erpy-factory` label again. The seven days start again. Erpyd then repairs on the next run of your checks, and resolves conflicts on its next check for them.

You can also ask for either at any time, whether or not the pull request has the label, with a comment that mentions Erpyd:

```text
@erpyd please fix the failing checks
```

```text
@erpyd resolve the merge conflicts
```

Erpyd replies "I'm fixing the failing checks on this pull request now." or "I'm merging the base branch into this pull request and resolving the conflicts now." A request like this has no limit on attempts. It does not start the seven days again, and it does not bring the label back.
