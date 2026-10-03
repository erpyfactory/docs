---
title: 5. Automatic work
description: What Erpyd does on its own on your pull requests, repairing failing checks and resolving merge conflicts, for how long, and how to bring a pull request back.
---

On a pull request that carries the `erpy-factory` label, Erpyd takes care of what breaks pull requests most often, without a comment from you. Every pull request that Erpyd opens carries the label.

## Failing checks

When the checks on the latest commit have finished and one is red, Erpyd repairs it. It leaves alone the workflows you told it to, and makes at most three automatic attempts per pull request.

## Merge conflicts

When the pull request conflicts with its base branch, Erpyd merges the base branch into it and resolves the conflicts. You can turn this off, see [Advanced settings](../03-advanced-settings/).

In both cases Erpyd changes only what the pull request needs. It leaves alone anything else that is broken, and if it has to touch a file outside the pull request, it says so in a comment on it.

## A broken base branch

Less often, a test fails on the branch your pull requests target. Erpyd fixes it once, in a separate pull request onto that branch, and not inside yours. That pull request carries the `erpy-fix` label, because Erpyd opened it itself, and the `erpy-blocking` label while your pull request waits on it. Erpyd adds and removes `erpy-blocking` itself. It starts on its own when your checks are red after a push to a branch listed in `extra_base_branches`, see [Advanced settings](../03-advanced-settings/), or when it finds a failing test that your pull request does not touch, or a security defect on the base branch. You review and merge that pull request: Erpyd never merges it into your base branch. Meanwhile Erpyd pushes nothing to your pull request and comments on it with a link. After the merge it brings the fix into your pull request, and your checks run again.

## How long it lasts

Pull requests are meant to be merged. Erpyd takes care of a pull request for seven days after the last time it did work on the change itself: building it, following up on a review that asks for changes, filming its screen recordings or revising its design. Repairing checks and resolving conflicts do not start the seven days again, and neither does a push or a comment from you, unless it leads Erpyd to one of those. A pull request that is still going through review rounds stays in care.

A pull request that is not merged in that time is treated as no longer important. The `erpy-factory` label comes off it, within about an hour, and Erpyd stops its automatic work on it. The pull request stays open, and you can bring it back to Erpyd.

## Bring a pull request back to Erpyd

- Add the `erpy-factory` label again. The seven days start again. Erpyd then repairs on the next run of your checks, and resolves conflicts on its next check for them.
- Or ask Erpyd for work on the pull request, in a comment that mentions Erpyd. It works with or without the label, puts the label back and starts the seven days again. For example:

  ```text
  @erpyd please work through the review
  ```

  ```text
  @erpyd film the screen recordings again
  ```

- A request to fix the failing checks or to resolve the conflicts works at any time too, see [Use Erpy Factory](../04-use-erpy-factory/). It does not put the label back, and it does not start the seven days again.

## Take a pull request back from Erpyd

Sometimes you ask Erpyd to work on a pull request, and then decide to continue on your own. Remove the `erpy-factory` label from the pull request. Erpyd stops the automatic work it had waiting for it, and starts none. Work that is already running is not stopped, and anything you asked for in a comment still runs. You can bring the pull request back to Erpyd at any time, as above.
