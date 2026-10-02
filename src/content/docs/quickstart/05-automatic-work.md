---
title: 5. Automatic work
description: What Erpyd does on its own on your pull requests: repairing failing checks and resolving merge conflicts, for how long, and how to give a pull request back.
---

On a pull request that carries the `erpy-factory` label, Erpyd works on its own, without a comment from you. Every pull request that Erpyd opens carries the label.

## What Erpyd does

- **Failing checks.** When the checks on the latest commit have finished and one is red, Erpyd repairs it. It leaves alone the workflows you told it to, and makes at most three automatic attempts per pull request.
- **Merge conflicts.** When the pull request conflicts with its base branch, Erpyd merges the base branch into it and resolves the conflicts. You can turn this off, see [Advanced settings](../03-advanced-settings/).

## For how long

Erpyd does this for seven days. The seven days start when the label is added, and start again each time Erpyd does work on the change itself: building it, following up on a review that asks for changes, filming its screen recordings or revising its design. Repairing checks and resolving conflicts do not start them again, and neither does a push or a comment from you unless it leads Erpyd to do one of those.

After seven days the label comes off the pull request and the automatic work stops.

## Give a pull request back

Add the `erpy-factory` label to the pull request again. The seven days start again. Erpyd then repairs on the next run of your checks, and resolves conflicts on its next check for them.

You can also ask for either work at any time, with or without the label, see [Use Erpy Factory](../04-use-erpy-factory/). Such a request does not start the seven days again, and it does not bring the label back.

## Take a pull request back

Remove the `erpy-factory` label from the pull request. Erpyd stops its automatic work on it.
