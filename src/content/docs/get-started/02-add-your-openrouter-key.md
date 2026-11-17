---
title: 2. Add your OpenRouter key
description: Save your organization's own OpenRouter API key, the first page of a new organization.
---

Your organization's own [OpenRouter](https://openrouter.ai) key pays for your DeepSeek tickets: see
[What the key pays for](#what-the-key-pays-for). On a new organization, the key page is the first page:
nothing else opens until the key is saved.

## Before you start

- You are an Admin of the organization. The person Erpy invited first is an Admin. Anyone else sees
  [what a Builder or Viewer sees](#if-you-are-not-an-admin).
- You have an OpenRouter account with at least 1 USD of credit.

## Steps

1. Sign in at [openrouter.ai](https://openrouter.ai) and add credit at
   [openrouter.ai/settings/credits](https://openrouter.ai/settings/credits): at least 1 USD.
2. At [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys), create an API key and give it
   a spend limit. Use an API key, not a provisioning key. A key without a spend limit is refused.
3. Copy the key. It starts with `sk-or-v1-`.
4. In Erpy Factory, on the page "Add your OpenRouter key", paste the key in **OpenRouter API key**.
5. Select **Save**. The button reads "Checking…" while Factory checks the key with OpenRouter. Factory
   saves the key only once OpenRouter accepts it.
6. The page says "Key saved" and "This key pays for Acme's DeepSeek tickets. Next, link GitLab."
   Select **Continue**.

## Check

- The page said "Key saved", and **Continue** opened your organization.
- Open Settings → Model key. Under **OpenRouter key**, **Status** reads **Active**. The page shows
  only the key's last four characters, as `sk-or-…` and the four characters.

## What to expect

**Next step.** On a new organization, the key page names "Link GitLab" as the next step. On GitLab, go on to
[3. Link GitLab](../03-link-gitlab/). On GitHub, go on to [5. Link GitHub](../05-link-github/)
instead.

### What the key pays for

Settings → Model key says what the key is for: "This organization's DeepSeek tickets are paid by this
key, and wait while it fails."

- **A DeepSeek ticket** is a ticket Erpy has set to run on a DeepSeek model, which Erpy reaches through
  OpenRouter. Every other ticket runs on Claude. Erpy decides this for each ticket. You don't choose the
  model.
- **On a DeepSeek ticket, the key pays for all of Erpy's work**: PRD writing, Implementation, and the CI
  fix, Conflict fix and Review follow-up on its merge request or pull request. That includes the
  [automatic work](../../work-with-erpy/automatic-work/) Erpy does on its own there.
- **Other tickets don't use your key.** Erpy's replies when you ask `@erpyai` a question never use it
  either.

What your organization pays Erpy for its plan is on the [pricing page](https://erpy.dev/pricing): one
plan, priced by the number of PRDs a month, where one PRD is one ticket taken through the factory.

### The key's facts

The page also shows the key's **Label**, its **Limit** and what is left of it, the **Credit left** on
the OpenRouter account, the **Last check**, and who set the key and when (**Set by**).

## If it is refused

The key stays unsaved, and the page shows one of these messages beside **Save**. **Check again** can answer with some of them too.

| What you see | What to do |
| --- | --- |
| "This is not an OpenRouter API key. A key starts with sk-or-v1- followed by 64 characters 0-9 and a-f." | Copy the whole key again from OpenRouter, with nothing before or after it, and paste it. |
| "OpenRouter did not accept this key. Check that it is an API key, not a provisioning key, and that it is not deleted or disabled." | Create a new API key at openrouter.ai/settings/keys, not a provisioning key, and save it. |
| "This key has no spend limit. Set a limit on it at openrouter.ai/settings/keys, then save it again." | Set a spend limit on the key at OpenRouter, then select **Save** again. |
| "This key has used up its spend limit. Raise the limit at openrouter.ai/settings/keys, then save it again." | Raise the key's limit at OpenRouter, then save it again. |
| "The OpenRouter account of this key has less than 1 USD of credit. Add credit at openrouter.ai/settings/credits, then save it again." | Add credit at OpenRouter, then save it again. |
| "This organization has no OpenRouter key. Reload the page." | Reload the page. |
| "This organization is not known to Factory. Reload the page and try again." | Reload the page and try again. |
| "OpenRouter did not answer. Try again in a few minutes." | Wait a few minutes, then save it again. |
| "The key could not be checked. Try again in a few minutes." | Wait a few minutes, then save it again. |

## If you are not an Admin

Only an Admin can add, replace or remove the key.

- On a new organization, you see "Waiting for the OpenRouter key", with "An Admin of Acme adds the
  organization's OpenRouter key first. This page opens the organization once the key is saved." and
  the names of your Admins. Ask one of them, then reload the page once they have saved it.
- On Settings → Model key, you read the key's facts and "Only an Admin of this organization can change
  this." When no key is set, the page says "No key is set. DeepSeek tickets wait until an Admin sets
  one."

## The key's status

Factory checks the key with OpenRouter. **Status** on Settings → Model key shows one word.

| What you see | What to do |
| --- | --- |
| **Active** | Nothing. The key works. |
| **Invalid** | OpenRouter refuses the key. Select **Replace** and save a new API key. |
| **No credit** | Add credit at openrouter.ai/settings/credits, then select **Check again**. |
| **Limit reached** | Raise the key's limit at openrouter.ai/settings/keys, then select **Check again**. |

## When a ticket waits for the key

While the key is missing or not **Active**, a ticket that runs on DeepSeek does not start. The ticket
page says why, for example:

"This ticket runs on DeepSeek, paid with the organization’s OpenRouter key, and waits: the
organization’s OpenRouter account has no credit left. An Admin fixes it on Settings → Model key."

The reason after "waits:" is one of these:

- "the organization has no OpenRouter key saved";
- "OpenRouter refuses the organization’s key";
- "the organization’s OpenRouter account has no credit left";
- "the organization’s OpenRouter key has reached its limit".

Select **Open Model key** on that line to go to Settings → Model key and fix it. The ticket waits until
the key is **Active**.

## Check again, replace or remove the key

On Settings → Model key, an Admin has three buttons:

- **Check again**: Factory asks OpenRouter about the key now, and the page updates its facts. Use it
  after you add credit or raise the limit.
- **Replace**: the key field comes back. Paste the new key and select **Save**, or **Cancel**.
- **Remove**: the dialog asks "Remove the OpenRouter key?" and says "Factory deletes the key at once.
  DeepSeek tickets wait until a new key is set." Select **Remove** to confirm.
