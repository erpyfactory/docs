---
title: 2. Add your OpenRouter key
description: Save your organization's own OpenRouter API key, the first step of a new organization's setup page.
---

Your organization's own [OpenRouter](https://openrouter.ai) key pays for your DeepSeek tickets: see
[What the key pays for](#what-the-key-pays-for). On a new organization, the key is the first step of
the setup page, **OpenRouter key**: the next steps open once the key is saved.

## Before you start

- You are an Admin of the organization. The person Erpy invited first is an Admin. Anyone else sees
  [what a Builder or Viewer sees](#if-you-are-not-an-admin).
- You have an OpenRouter account with at least 1 USD of credit.

## Steps

1. Sign in at [openrouter.ai](https://openrouter.ai) and add credit at
   [openrouter.ai/settings/credits](https://openrouter.ai/settings/credits): at least 1 USD.
2. On OpenRouter's API Keys page ([openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)),
   create an API key and set its **Credit limit**, for example $10; OpenRouter counts in US dollars.
   Use an API key, not a provisioning key. A key without a limit is refused. You can raise the limit at
   OpenRouter later. When the key
   reaches its limit, its status reads **Limit reached**, and your DeepSeek tickets wait until the limit
   is raised.
3. Copy the key. It starts with `sk-or-v1-`.
4. In Erpy Factory, on the setup page's **OpenRouter key** step, paste the key in **OpenRouter API
   key**. The step says "Erpy works on Acme's DeepSeek tickets with models it reaches through
   OpenRouter, and your organization's own OpenRouter key pays for them." Under the field: "Set a
   credit limit on the key, for example $10. Factory refuses a key without one, and DeepSeek tickets
   wait once it's used up. You can raise it at OpenRouter at any time."
5. Select **Save**. The button reads "Checking…" while Factory checks the key with OpenRouter. Factory
   saves the key only once OpenRouter accepts it.
6. The page opens the **Link code host** step and says "This key pays for Acme's DeepSeek tickets.
   Next, link your code host." If your code host is already linked, it opens **Add repository**
   instead, without that line.

## Check

- The sidebar marks **OpenRouter key** as done, and the **Link code host** step is open.
- Select **OpenRouter key** in the sidebar to open the step again. It shows the key's facts, as
  Settings → Model key does once setup is over: **Status** reads **Active**, and the key shows only its
  last four characters, as `sk-or-…` and the four characters. **Continue** opens the first step not
  done.

## What to expect

**Next step.** The setup page goes on to **Link code host**. If your code is on GitLab, go on to
[3. Link your code host: GitLab](../03-link-your-code-host/gitlab/). If it is on GitHub, go on to
[3. Link your code host: GitHub](../03-link-your-code-host/github/).

### What the key pays for

Before you save the key, the setup page's **OpenRouter key** step says "Erpy works on Acme's DeepSeek
tickets with models it reaches through OpenRouter, and your organization's own OpenRouter key pays for
them." Once setup is over, Settings → Model key says: "This organization's DeepSeek tickets are paid
by this key, and wait while it fails."

- **A DeepSeek ticket** is a ticket Erpy has set to run on a DeepSeek model, which Erpy reaches through
  OpenRouter. Every other ticket runs on Claude. Erpy decides this for each ticket. You don't choose the
  model.
- **On a DeepSeek ticket, the key pays for all of Erpy's work**: for example PRD writing, Implementation, and the CI
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
| "This key has no credit limit. Set one on OpenRouter's API Keys page, then save it again." | Set a **Credit limit** on the key at OpenRouter, then select **Save** again. The ↗ icon after "OpenRouter's API Keys page" opens openrouter.ai/settings/keys. |
| "This key has used up its credit limit. Raise it on OpenRouter's API Keys page, then save it again." | Raise the key's credit limit at OpenRouter, then save it again. |
| "The OpenRouter account of this key has less than 1 USD of credit. Add credit at openrouter.ai/settings/credits, then save it again." | Add credit at OpenRouter, then save it again. |
| "This organization has no OpenRouter key. Reload the page." | Reload the page. |
| "This organization is not known to Factory. Reload the page and try again." | Reload the page and try again. |
| "OpenRouter did not answer. Try again in a few minutes." | Wait a few minutes, then save it again. |
| "The key could not be checked. Try again in a few minutes." | Wait a few minutes, then save it again. |
| "Another admin changed this key at the same moment, and their change is the one in use. Reload the page to see it." | Reload the page. The key it shows is the one in use. |

When **Check again** answers that the key has no credit limit, has used up its limit or has too little
credit, the message ends in "then select Check again." instead of "then save it again.": the key is
already saved, so fix it at OpenRouter and select **Check again**.

## If you are not an Admin

Only an Admin can add, replace or remove the key.

- On a new organization's setup page, the **OpenRouter key** step says "An Admin of Acme sets its
  OpenRouter key." It also names your Admins after "Admins:" when Erpy Factory can list them. Ask one of them, then reload the page once
  they have saved it.
- Once setup is over, on Settings → Model key, you read the key's facts and "Only an Admin of this organization can change
  this." When no key is set, the page says "No key is set. DeepSeek tickets wait until an Admin sets
  one."

## The key's status

Factory checks the key with OpenRouter. **Status** shows one of these, on Settings → Model key once setup is over, and during setup on the **OpenRouter key** step when you open it again from the sidebar.

| What you see | What to do |
| --- | --- |
| **Active** | Nothing. The key works. |
| **Invalid** | OpenRouter refuses the key, or the key no longer has a credit limit. The line beside the status says which. "The key has no credit limit at OpenRouter. Set a limit on the key, then select Check again." means the key works: set a limit at openrouter.ai/settings/keys, then select **Check again**. Otherwise select **Replace** and save a new API key. |
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
- "the organization’s OpenRouter key has no credit limit". This line ends "An Admin sets one at
  OpenRouter, then selects Check again on Settings → Model key." instead;
- "the organization’s OpenRouter account has no credit left";
- "the organization’s OpenRouter key has reached its limit".

Select **Open Model key** on that line to go to Settings → Model key and fix it. The ticket waits until
the key is **Active**.

## Check again, replace or remove the key

Once setup is over, an Admin has three buttons on Settings → Model key. During setup, Settings → Model key opens the setup page instead: select **OpenRouter key** in the sidebar for the same three buttons.

- **Check again**: Factory asks OpenRouter about the key now, and the page updates its facts. Use it
  after you add credit or raise the limit.
- **Replace**: the key field comes back. Paste the new key and select **Save**, or **Cancel**.
- **Remove**: the dialog asks "Remove the OpenRouter key?" and says "DeepSeek tickets wait until a new key is set.
  Builds already running finish on this key; Factory deletes it 12 hours later. To stop them at once, revoke the key at OpenRouter." Select **Remove** to confirm.
