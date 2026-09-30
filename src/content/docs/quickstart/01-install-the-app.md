---
title: 1. Install the Erpyd GitHub App
description: Install Erpyd on one repository.
---

Erpyd is a public GitHub App. Installing it lets Erpy Factory see the repositories you choose.

## Before you start

- You can sign in to GitHub as an owner of the account or organization that owns the repository.
  If you are not an owner, GitHub sends the owner a request to approve the installation.
- Pick **one** repository to start with. You can add more later.

## Steps

1. Open [github.com/apps/erpyd/installations/new](https://github.com/apps/erpyd/installations/new).
2. Choose the account or organization that owns your repository.
3. Under **Repository access**, choose **Only select repositories** and pick your repository.
4. Read the permissions on the page, then select **Install**.

The permissions Erpyd asks for are the ones GitHub shows on the install page:

| Permission | Access |
|---|---|
| Actions | Read and write |
| Checks | Read and write |
| Contents | Read and write |
| Issues | Read and write |
| Pull requests | Read and write |
| Commit statuses | Read and write |
| Organization members | Read-only |
| Email addresses | Read-only |
| Metadata | Read-only |

## Check

Open your installed apps:

- for an organization: `https://github.com/organizations/<your-organization>/settings/installations`
- for a personal account: [github.com/settings/installations](https://github.com/settings/installations)

**Erpyd** is listed. Select **Configure** and confirm it has access to the repository you picked
and to no other.

## What to expect

Installing does not start any work yet. Erpy Factory records a new installation as pending, and
GitHub may show it as **suspended**. That is expected: it stays that way until the installation is
activated, which is the next step, not yet written.
