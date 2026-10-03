---
title: Onboarding checklist
description: The questions about your Odoo project that decide how much setup it takes to connect your repositories to Erpy Factory.
---

Erpy Factory runs your Odoo project the way you run it. How much setup that takes depends on a few answers about your project. Go through this checklist before the quick start.

Most projects can give the simple answer to every row, and then need only the first two steps of the quick start. Each other answer means more setup, and the [Advanced settings](../quickstart/03-advanced-settings/) page covers it.

## Your GitHub account

| Question | Simple | More setup |
| --- | --- | --- |
| Which account owns your repositories? | One organization or personal account | Odoo or Enterprise code in a repository of another account: Erpy AI must be installed there too |
| How many Odoo versions do you run? | One, in one repository | Several, one repository each, configured one by one |

## Your Odoo project

| Question | Simple | More setup |
| --- | --- | --- |
| Do you run Community or Enterprise? | Community | Enterprise: where does its code live, in your image or in a GitHub repository? |
| Where does your Odoo source come from? | The Odoo image you use | A repository: the official one, a fork or your own |
| Where are your add-ons? | At the top of the repository | In other folders, or with your own `odoo.conf` |
| Which languages besides English do new terms need? | None, or a short list | A long list: translation work grows with it |

## Your images and registries

| Question | Simple | More setup |
| --- | --- | --- |
| Which image does your CI run your tests in? | A public image, for example `odoo:19.0` on Docker Hub | An image in your own Amazon ECR: you create a read-only AWS role for Erpy |
| Is your image in another private registry? | No | Yes: for now, the Erpy Factory team sets up the login to that registry |
| Does your development setup use Docker Compose? | No: Odoo and Postgres only | Yes: your own Compose file, extra services such as Redis or nginx, an Odoo service built from a Dockerfile |
| Which images do those services use? | Public ones | Private ones: the same registry question as above |

## Your test data

| Question | Simple | More setup |
| --- | --- | --- |
| Do your tests start from a database dump? | No: Erpy installs your modules into a fresh database | Yes: a `pg_dump -Fc` dump in your own Amazon S3 bucket, built on the same Odoo image as your tests, read through an AWS role |
| Do your tests need demo data? | No | Yes |
| Is that bucket encrypted with your own KMS key? | Not applicable | Yes: the role also needs access to that key |

## Your AWS account

Only if you answered with Amazon ECR or Amazon S3 above.

| Question | Simple | More setup |
| --- | --- | --- |
| Can you create an IAM role in your AWS account? | Yes, one read-only role | Someone else owns the account: ask them first |

## Your checks

| Question | Simple | More setup |
| --- | --- | --- |
| Which check must be green before a pull request can merge? | One job name | Several |

## What your answers mean

- **All simple.** You need only the first two steps of the quick start.
- **Some more setup.** You need the first two steps, then [Advanced settings](../quickstart/03-advanced-settings/) for the rows you answered with more setup.

Start the [quick start](../quickstart/01-install-the-app/).
