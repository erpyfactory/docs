---
title: Automatic work
description: What Erpy does on its own on your merge requests and pull requests, repairing failing checks and resolving merge conflicts, and how to take the work back or hand it back.
---

On a merge request (GitLab) or pull request (GitHub) that carries the `erpy-factory` label, Erpy fixes what breaks them most often, without a comment from you. Every merge request or pull request that Erpy opens carries the label.

## Failing checks

When the checks on the latest commit have finished and one is red, Erpy repairs it. On GitLab, that is the merge request's pipeline. Erpy leaves alone the workflows or pipelines you told it to, see [`harness.yaml` settings](../../reference/harness-yaml/), and makes at most three automatic attempts per merge request or pull request.

## Merge conflicts

When the merge request or pull request conflicts with its base branch, Erpy merges the base branch into it and resolves the conflicts. You can turn this off with `harness.extensions.resolve_conflicts.automatic`, see [`harness.yaml` settings](../../reference/harness-yaml/).

In both cases Erpy changes only what the merge request or pull request needs. It leaves alone anything else that is broken, and if it has to touch a file outside the change, it says so in a comment on it.

## A broken base branch

Less often, a test fails on the branch your merge requests or pull requests target. Erpy fixes it once, in a separate merge request or pull request onto that branch, and not inside yours. That one carries the `erpy-fix` label, because Erpy opened it itself, and the `erpy-blocking` label while yours waits on it. Erpy adds and removes `erpy-blocking` itself.

It starts on its own when your checks are red after a push to a branch listed in `extra_base_branches`, see [`harness.yaml` settings](../../reference/harness-yaml/), or when it finds a failing test that your change does not touch, or a security defect on the base branch. You review and merge the fix: Erpy never merges it into your base branch. Meanwhile Erpy pushes nothing to your merge request or pull request, and comments on it with a link. After the merge it brings the fix into yours, and your checks run again.

## Take a merge request or pull request back from Erpy

Sometimes you ask Erpy to work on a merge request or pull request, and then decide to continue on your own. Remove the `erpy-factory` label from it. Erpy stops the automatic work it had waiting for it, and starts none. Work that is already running is not stopped, and anything you asked for in a comment still runs. On a GitLab project with no webhook yet, Erpy doesn't see the label removal: it starts no new automatic work, but work already waiting still runs.

To give it back to Erpy, add the `erpy-factory` label again. Erpy then repairs on the next run of your checks, and resolves conflicts on its next check for them.

## How long it lasts

Pull requests and merge requests are meant to be merged. Erpy keeps working on one on its own, while it carries the `erpy-factory` label, for seven days after the last time it worked on the change itself: building it, following up on a review that asks for changes, filming its screen recordings or revising its design. Repairing checks and resolving conflicts do not start the seven days again, and neither does a push or a comment from you, unless it leads Erpy to one of those. So a pull request or merge request that is still going through review rounds stays with Erpy.

A pull request or merge request that is not merged in that time is treated as no longer important. The `erpy-factory` label comes off it, within about an hour, and Erpy stops its automatic work on it. It stays open. On GitHub, its ticket shows "Stopped" on the board. On GitLab, the ticket shows "Stopped" only in a project with a webhook; without one the label still comes off, but the card shows no "Stopped". You can give it back to Erpy by adding the label again, or in a comment, see [Bring a merge request or pull request back to Erpy](#bring-a-merge-request-or-pull-request-back-to-erpy).

## Bring a merge request or pull request back to Erpy

On the board, a stopped ticket's card shows "Stopped" and the date. On GitLab, this is only in a project with a webhook, as said above. Its hint, on hover or keyboard focus, says how to hand it back, for example on GitLab "Stopped on 24 November 2026. Hand back with an @erpyai comment."

- Add the `erpy-factory` label again. The seven days start again. Erpy then repairs on the next run of your checks, and resolves conflicts on its next check for them.
- Or ask Erpy for work on the merge request or pull request, in a comment on it that mentions `@erpyai`. It works with or without the label, puts the label back and starts the seven days again. On GitLab, Erpy reads the comment through your webhooks, or within 5 minutes in a project that has none. For example:

  ```text
  @erpyai please work through the review
  ```

  ```text
  @erpyai film the screen recordings again
  ```

- A request to fix the failing checks or to resolve the conflicts works at any time too, see [Ask Erpy from GitLab or GitHub](../ask-erpy-from-gitlab-or-github/). It does not put the label back, and it does not start the seven days again.
