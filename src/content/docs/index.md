---
title: Erpy Factory
description: Erpy Factory is a factory for Odoo projects. It turns the issues in your GitHub repository into pull requests.
---

Erpy Factory is a factory for Odoo projects: it turns the issues in your GitHub repository into pull
requests.

Erpy Factory is in early access.

## Quick start

Each step ends with a **Check**: something you can look at to know it worked.

1. [Install the Erpyd GitHub App](quickstart/01-install-the-app/) on your repositories.
2. [Configure your repository](quickstart/02-configure-your-repository/): ask Erpyd to plan it, approve the plan, merge the pull request.
3. [Advanced settings](quickstart/03-advanced-settings/): every setting in `harness.yaml`, for Enterprise, your own Docker Compose setup, or your own AWS account.
4. [Use Erpy Factory](quickstart/04-use-erpy-factory/): ask Erpyd for the requirements, approve them, have it build the change, review the pull request.
5. [Automatic work](quickstart/05-automatic-work/): what Erpyd does on its own on your pull requests, and how long.

## What you need

- One or more GitHub repositories, owned by an organization or a personal account.
- Permission to install a GitHub App on that account. For an organization that means being an
  owner of it.
