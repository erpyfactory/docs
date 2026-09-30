---
title: Erpy Factory
description: Erpy Factory is a factory for Odoo projects. It turns the issues in your GitHub repository into pull requests.
---

Erpy Factory is a factory for Odoo projects: it turns the issues in your GitHub repository into pull
requests.

You describe the work in an issue. Erpy Factory plans the change, writes the code, runs your
checks and hands the result back as a pull request for you to review. Review feedback and
failing checks can be handed back to it the same way. The work runs on Erpy Factory's side;
what connects it to your repositories is **Erpyd**, the GitHub App you install.

Erpy Factory is in early access.

## Quick start

Each step ends with a **Check**: something you can look at to know it worked. If a check does not
match what you see, do not go on to the next step.

1. [Install the Erpyd GitHub App](quickstart/01-install-the-app/) on your repositories.

## What you need

- One or more GitHub repositories, owned by an organization or a personal account.
- Permission to install a GitHub App on that account. For an organization that means being an
  owner of it.
