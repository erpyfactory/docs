---
title: 1. Your invitation and Google sign-in
description: Sign in to Erpy Factory with Google, using the address your invitation was sent to.
---

Erpy sets up your organization and emails you an invitation. You join by signing in with Google, using
the address the invitation was sent to.

## Before you start

- You have the invitation email. Its subject is "[Erpy Factory] You're invited to Acme on Erpy Factory",
  with your organization's name in place of Acme.
- You have a Google account with that exact email address.

## Steps

1. In the invitation email, select **Sign in to Erpy Factory**. If the email is gone, go to
   [erpy.dev](https://erpy.dev) instead. The page says "Sign in to your organisation's dashboard."
2. Select **Sign in with Google**. The page can show other sign-in buttons too; use the Google one.
3. Choose the Google account whose address is the one under **Sign in as** in the email.

## Check

Your organization's page opens, with your organization's name at the top. On a new organization, the
first page is the OpenRouter key:

- as an Admin, you see "Add your OpenRouter key";
- with any other role, you see "Waiting for the OpenRouter key" until an Admin has saved it.

Go on to [2. Add your OpenRouter key](../02-add-your-openrouter-key/).

## What to expect

- **Your first sign-in claims the invitation.** The address must be verified at Google. From then on,
  your access follows that Google account, not the address. If someone later gets that address on
  another Google account, they do not get your access.
- **Each person is invited by address.** Your Google Workspace domain does not let anyone in: a
  colleague with an address on the same domain still needs their own invitation. An Admin invites them
  on [7. Invite your team](../07-invite-your-team/).
- **Your Google account decides.** If your Google Workspace admin suspends or deletes your Google
  account, you can no longer sign in with Google.

## The invitation email

The email says which organization you were added to and with which role, for example:

- "You were added to Acme as an admin."
- **Organization**: your organization's name.
- **Role**: Admin, Builder or Viewer. See [Invite your team](../07-invite-your-team/) for what each
  role can do.
- **Sign in as**: the address to sign in with.

It has a **Sign in to Erpy Factory** button. The button only opens the sign-in page. There is
nothing to accept, and the invitation does not expire. You can also sign in at
[erpy.dev](https://erpy.dev) at any time, without the email.

Its last line says why you got it:

- If you are the first Admin of an organization Erpy set up, also when the invitation is sent again: "You got this email because Erpy set up
  Acme on Erpy Factory and invited you@example.com to it. If you did not expect it, you can ignore it."
- If an Admin of your organization invited you: "You got this email
  because an admin of Acme invited you@example.com to Erpy Factory. If you did not expect it, you can
  ignore it."

## If you are refused

| What you see | What to do |
| --- | --- |
| "You need an invitation", with "Please ask your administrator to add you to their organisation." | You signed in with a Google account that has no invitation. Select **Sign out**, then sign in again with the Google account whose address got the invitation. If you have no invitation, ask an Admin of your organization to invite you. If you are your organization's first Admin, write to support@erpy.dev. |
| The same card, with the right Google account | The invitation may have been sent to another address, or cancelled. Ask whoever invited you to check the address they used; if Erpy invited you as the first Admin, write to support@erpy.dev. Once you've been added, sign in again. |
