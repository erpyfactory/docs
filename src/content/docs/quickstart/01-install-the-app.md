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

**Erpyd** is listed. Select **Configure** and confirm that the repository access is the one you
chose: all repositories, or exactly the ones you picked.

## What to expect

Installing connects Erpyd to your repository. It does not start any work by itself.
