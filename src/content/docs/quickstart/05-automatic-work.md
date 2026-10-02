---
title: 5. Automatic work
description: What Erpyd does on its own on your pull requests, repairing failing checks and resolving merge conflicts, for how long, and how to give a pull request back.
---

On a pull request that carries the `erpy-factory` label, Erpyd works on its own, without a comment from you. Every pull request that Erpyd opens carries the label.

## What Erpyd does

- **Failing checks.** When the checks on the latest commit have finished and one is red, Erpyd repairs it. It leaves alone the workflows you told it to, and makes at most three automatic attempts per pull request.
- **Merge conflicts.** When the pull request conflicts with its base branch, Erpyd merges the base branch into it and resolves the conflicts. You can turn this off, see [Advanced settings](../03-advanced-settings/).

## For how long

Erpyd does this for seven days. The seven days start when the label is added, and start again each time Erpyd does work on the change itself: building it, following up on a review that asks for changes, filming its screen recordings or revising its design. Repairing checks and resolving conflicts do not start them again, and neither does a push or a comment from you unless it leads Erpyd to do one of those.

After seven days the label comes off the pull request and the automatic work stops.

## When your base branch is broken

When a test fails on a branch that your pull requests target, Erpyd fixes it once, in a separate pull request onto that branch, and never inside your own pull requests. It starts this on its own, in two cases:

- your checks are red after a push to a branch listed in `extra_base_branches`, see [Advanced settings](../03-advanced-settings/). Your default branch counts only if you list it there;
- while repairing one of your pull requests, Erpyd finds a failing test that the pull request does not touch.

The repair pull request is titled "Fix <test> on <base>", carries the `erpy-factory` label and is open for review, not a draft. You review it and merge it. Erpyd never merges it.

If every failing test on your pull request comes from the base branch, Erpyd pushes nothing to it and waits. It comments on your pull request "I opened <link> to fix tests that fail on `<base>`. Please merge it, and I will continue here." A wait does not use up a repair attempt. When the repair pull request is merged, Erpyd brings the fix into your pull request, and your checks run again. The wait also ends when you push to your pull request, or close the repair pull request without merging it. A wait that nobody ends stops by itself after 14 days.

## Give a pull request back

Add the `erpy-factory` label to the pull request again. The seven days start again. Erpyd then repairs on the next run of your checks, and resolves conflicts on its next check for them.

You can also ask for either work at any time, with or without the label, see [Use Erpy Factory](../04-use-erpy-factory/). Such a request does not start the seven days again, and it does not bring the label back.

## Take a pull request back

Remove the `erpy-factory` label from the pull request. Erpyd stops its automatic work on it.
