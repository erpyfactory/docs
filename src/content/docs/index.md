---
title: Erpy Factory
description: Erpy Factory is a factory for Odoo projects on GitLab or GitHub. You write tickets, and Erpy turns them into merge requests or pull requests.
---

Erpy Factory is a factory for Odoo projects on GitLab or GitHub. You write a ticket, Erpy writes the
requirements and you approve them. Then Erpy builds the change and opens a merge request on GitLab, or a
pull request on GitHub. You review it and you merge it. Erpy never merges.

Erpy Factory is in early access.

## What you need

- An invitation to Erpy Factory, sent to your email address.
- A Google account with that email address. You sign in with Google.
- An [OpenRouter](https://openrouter.ai) account with credit on it: at least 1 USD.
- Your code in one of these places:
  - a GitLab group on gitlab.com;
  - a GitHub account: an organization or a personal account.

## Before you start

Go through the [Before you start](reference/onboarding-checklist/) checklist first. It lists the
questions about your Odoo project that decide how much setup it takes.

## Get started

Erpy sets up your organization and emails you an invitation. From there, follow the steps in order. Each
step ends with a **Check**: something you can look at to know it worked.

The dashboard is at [erpy.dev](https://erpy.dev). If the invitation email is gone, sign in there with
Google.

1. [Your invitation and Google sign-in](get-started/01-your-invitation/): sign in with Google, using the
   address the invitation was sent to.
2. [Add your OpenRouter key](get-started/02-add-your-openrouter-key/): your organization's own
   OpenRouter key.
3. Link your code host, the one your code is on:
   - [GitLab](get-started/03-link-your-code-host/gitlab/): give Erpy its own GitLab user and a token,
     then add the webhooks;
   - [GitHub](get-started/03-link-your-code-host/github/): install the Erpy app on your repositories.
4. [Add a repository](get-started/04-add-a-repository/): choose the repositories Erpy works on, and
   merge the setup merge request or pull request.
5. [Invite your team](get-started/05-invite-your-team/): invite people by email and give each one a
   role.
6. [Write your first ticket](get-started/06-write-your-first-ticket/): write a ticket, approve the
   requirements, and review what Erpy builds.

Steps 2 to 4 are the steps of the setup page Erpy Factory shows a new organization: **OpenRouter key**,
**Link code host** and **Add repository**. Once the first repository is added, the organization's
pages open.

## Work with Erpy

- [Ask Erpy from GitLab or GitHub](work-with-erpy/ask-erpy-from-gitlab-or-github/): mention `@erpyai`
  in an issue, a merge request or a pull request. On GitLab, your organization's own Erpy user's
  username works too.
- [Automatic work](work-with-erpy/automatic-work/): what Erpy does on its own on your merge requests
  and pull requests, and how to take the work back.

## Reference

- [`harness.yaml` settings](reference/harness-yaml/): every setting in `harness.yaml`, for Enterprise,
  your own Docker Compose setup, or your own AWS account.
