---
title: 1. Install the Erpyd GitHub App
description: Install Erpyd on your repositories.
---

Erpyd is a public GitHub App. Installing it lets Erpy Factory see the repositories you choose.

## Before you start

- You can sign in to GitHub as an owner of the account or organization that owns the repositories.
  If you are not an owner, GitHub sends the owner a request to approve the installation.

## Steps

1. Open [github.com/apps/erpyd/installations/new](https://github.com/apps/erpyd/installations/new).
2. Choose the account or organization that owns your repositories.
3. Under **Repository access**, choose **All repositories**, or **Only select repositories** and pick the ones you want Erpyd to work on.
4. Review the permissions GitHub shows on the page, then select **Install**.

## Check

Open your installed apps:

- for an organization: `https://github.com/organizations/<your-organization>/settings/installations`
- for a personal account: [github.com/settings/installations](https://github.com/settings/installations)

**Erpyd** is listed, marked as suspended (see below). Select **Configure** and confirm that the
repository access is the one you chose: all repositories, or exactly the ones you picked.

## What to expect

Installing connects Erpyd to your repositories. GitHub then shows Erpyd as **suspended** on your
installation, for example on the installation's page in your organization's settings. This is
normal: a new installation starts suspended, and Erpyd does nothing until it is unsuspended. We
will get in touch with you and unsuspend it.
