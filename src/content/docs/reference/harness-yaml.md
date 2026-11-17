---
title: harness.yaml settings
description: Every setting in harness.yaml, in file order, with what it does, its default and the values it accepts.
---

`harness.yaml` tells Erpy how to work on your repository. Erpy writes it in the setup merge request (a pull request on GitHub), see [Add a repository](../../get-started/06-add-a-repository/). This page explains each setting, in the order the file holds them, for when your repository is more than a simple Odoo add-ons repository: Odoo Enterprise, your own Docker Compose setup, a database dump, an image in your own AWS account.

## How Erpy writes the file

- **Every setting is in the file**, in the order of this page, with a comment line above it that says what it is for. So you see everything you can set.
- **Two settings are always live:** `harness_paths` and `required_check`.
- **The others are live only where Erpy found evidence** in your repository for a value other than the default. Otherwise they are commented out, with the default or an example value after the `#`.
- **Three settings are always commented out:** `odoo_datasets_dir`, `odoo_dataset_loader` and `odoo_image_access`. You turn one on by writing it live.
- A block whose settings are all commented out is commented out too.

Erpy fills in what it finds in your repository. Where it had to guess, the setup merge request says "Check these before you merge:" and lists each guess. To change a setting, edit `harness.yaml` in the setup merge request before you merge it, or later with another merge request. To turn a setting on, remove its leading `#`.

Every setting goes under `harness:`, `extensions:`, except `worktree`. The examples below show the key only. Under each setting is the question it answers.

## The top of the file

```yaml
harness:
  extends: {git: git@github.com:erpyfactory/harness, ref: main, stack: odoo}
  target: {runtime: claude, model: opus}
  modules:
    - name: acme-odoo
      source: {path: .harness}
```

### `extends` and `target`

Leave both as they are. `extends` names the Erpy Factory configuration your repository builds on, and `target` the agent that works on it.

### `modules`: your own instructions for Erpy

The `modules` entry connects your repository's `.harness` folder to every run. Erpy writes it for you, named after your repository.

Put what Erpy should know about your repository in `.harness/AGENTS.md`. Erpy starts it with your branch model and your environment, and reads it on every run. Add your own instructions below.

Your own `.claude` folder, `AGENTS.md` and `CLAUDE.md` are left as they are.

## Always live

### `harness_paths`

**Which files must Erpy never edit?**

```yaml
harness_paths: [harness.yaml, .harness/]
```

The configuration itself. It always holds `harness.yaml` and `.harness/`. A folder ends with `/`. Each path is relative to your repository's root, with no `./`, `..` or wildcard. You can add a path that holds your own agent configuration. Without this setting, Erpy edits nothing in your repository, so leave it in.

### `required_check`

**Which check must be green before a merge request or pull request can merge?**

```yaml
required_check: Tests
```

The name of the CI job that runs your tests, as the merge request or pull request shows it, not the name of a workflow or pipeline. A matrix job shows one check per combination: list each one. For several, separate the names with commas: `Tests, Lint`. Erpy finds it in your default branch's required checks, else in the job that runs your tests. If it finds neither, it writes its best guess and asks you to check it. Without this setting, Erpy can't judge a merge request's checks, so it never reports them as passed.

## Your Odoo version and image

### `odoo_version`

**Which Odoo version are your add-ons written for?**

```yaml
odoo_version: "19.0"
```

Erpy finds it in your module manifests. Write it as a quoted `"major.minor"`. Required.

### `odoo_image`

**Which image does your CI run the tests in? Is it a public image?**

The image Erpy runs your code and tests on, so use the one your CI uses. It must be public, or in your own Amazon ECR and read through `odoo_aws_role`. Erpy finds it in your CI, else in your Docker Compose file. If your Docker Compose file builds the Odoo service from a Dockerfile, `odoo_image` is the image that Dockerfile starts from. Required.

```yaml
# From Docker Hub
odoo_image: "odoo:19.0"

# From another public registry
odoo_image: "ghcr.io/acme/odoo:19.0-custom"

# From your own Amazon ECR, read through a role you create (GitHub only today)
odoo_image: "123456789012.dkr.ecr.eu-west-3.amazonaws.com/acme/odoo:19.0"
odoo_aws_role: "arn:aws:iam::123456789012:role/erpy-odoo-read"
```

An image in your own ECR is read through a role that you create, see [Read access in your AWS account](#read-access-in-your-aws-account). Erpy pulls such an image on every run, so a run takes longer to start than with a public image.

### `odoo_enterprise`

**Do you run Odoo Community or Enterprise?**

```yaml
odoo_enterprise: true
```

`false` by default: Community. Erpy finds Enterprise in your Docker files, add-ons path or manifests.

### `odoo_enterprise_source`

**Which repository holds your Enterprise code?**

```yaml
# Enterprise is inside your image, at this path
odoo_enterprise_source: "image:/opt/odoo/enterprise"

# Enterprise is in a GitHub repository, at a branch or tag
odoo_enterprise_source: "github:acme/enterprise@19.0"
```

Required when `odoo_enterprise` is `true`. Without `@<ref>`, a GitHub repository is read at your `odoo_version`. A repository source is read from GitHub only. A private one must be in the same GitHub account or organization as your repository, with the Erpy app installed on it.

### `odoo_source`

**Does your Odoo source come from the Odoo image you use, or from a separate repository?**

```yaml
# From the image, the default
odoo_source: image

# From a path inside the image
odoo_source: "image:/usr/lib/python3/dist-packages"

# From a GitHub repository: the official one, a fork or your own
odoo_source: "github:odoo/odoo@19.0"
```

Erpy finds it in your CI, Docker files or `.gitmodules`. With a repository, it reads it at the branch you name, or at your `odoo_version` without one. A repository source is read from GitHub only. A private one must be in the same GitHub account or organization as your repository, with the Erpy app installed on it.

## Your development stack

### `odoo_compose_file`

**Does your development setup run more than Odoo and Postgres? Do you have a Docker Compose file for it?**

```yaml
odoo_compose_file: docker-compose.yml
```

Erpy runs the same services as you, so its tests see what yours see. The path is relative to your repository's root. Without a Docker Compose file, Erpy uses its own standard stack: Odoo and Postgres.

### `odoo_compose_services`

**Which services in your Docker Compose file run Odoo and Postgres?**

```yaml
odoo_compose_services: [odoo=web, postgres=db]
```

Erpy works out which service is Odoo, Postgres and nginx from its image: a name ending in `odoo`, in `postgres` or `postgis`, or in `nginx`. Name them here, as `<role>=<service>`, only when it can't tell: a service built from a Dockerfile, an image named otherwise, or two services that fit one role.

### `odoo_conf`

**Do you have your own Odoo configuration file?**

```yaml
odoo_conf: config/odoo.conf
```

A path relative to your repository's root. Without one, Erpy uses the image's own configuration.

### `odoo_addons_paths`

**In which folders are your add-ons?**

```yaml
odoo_addons_paths: [addons, custom]
```

Folders relative to your repository's root. The default is `["."]`, the root itself. They also decide which modules a fresh database installs.

## Your data

### `odoo_dev_db`

**Do you have a development database? What is it called?**

```yaml
odoo_dev_db: odoo_dev
```

A lowercase name. The default is `odoo_dev`.

### `odoo_seed`

**Do your tests start from a database dump? Where is it stored?**

```yaml
# A fresh database with your modules installed, the default
odoo_seed: none

# A dump in your own S3 bucket, read through a role you create (GitHub only today)
odoo_seed: "s3://acme-erpy-dumps/odoo"
odoo_aws_role: "arn:aws:iam::123456789012:role/erpy-odoo-read"
```

With a dump, Erpy starts from the same data as you. With `none`, it installs your modules into a fresh database on every run. If a module does not install, the run stops before any work starts. See [Read access in your AWS account](#read-access-in-your-aws-account) for the role and the dump.

### `odoo_with_demo`

**Do your tests run with Odoo's demo data?**

```yaml
odoo_with_demo: true
```

`false` by default. It applies only to a fresh database.

## Demos and recordings

### `odoo_base_image`

**Which image do demos and recordings start from?**

```yaml
odoo_base_image: "odoo:19.0"
```

The image for UI demos and recordings. It is `odoo_image` by default. Erpy writes it live only when your development setup's Odoo image differs from `odoo_image`.

### `odoo_datasets_dir`

**Where are the datasets your demo films declare?**

```yaml
odoo_datasets_dir: demo/datasets
```

The folder, relative to your repository's root, that holds the datasets a demo declares by name. Always commented out: turn it on together with `odoo_dataset_loader`.

### `odoo_dataset_loader`

**Which script loads a dataset into a database?**

```yaml
odoo_dataset_loader: tools/load_dataset.py
```

Your script that loads one dataset into a database, relative to your repository's root. Erpy runs it as `python3 <script> --dataset <file> --db <db> --port <port>`. Always commented out: turn it on together with `odoo_datasets_dir`.

## Pulling images

### `odoo_image_access`

**How does Erpy pull the Odoo image?**

```yaml
odoo_image_access: public
```

`public`, `ecr` or `registry`. Erpy works it out from the image's registry, so it is always commented out. Leave it so.

### `odoo_aws_role`

**Which IAM role in your AWS account may Erpy assume?**

```yaml
odoo_aws_role: "arn:aws:iam::123456789012:role/erpy-odoo-read"
```

The role Erpy assumes to read your private ECR image and your S3 dump. It must be in your own AWS account. Erpy never writes it live by itself: you add it once you have created the role. See [Read access in your AWS account](#read-access-in-your-aws-account).

### `odoo_hub_images`

**Which images does your development setup use besides Odoo?**

```yaml
odoo_hub_images: ["postgres:16", "nginx:alpine"]
```

The Docker Hub images your Docker Compose file uses besides Odoo. Erpy loads them in advance. A service built from a Dockerfile whose base image is private needs that image listed here too. Erpy finds them in your Docker Compose file. It does not list an image from another registry: it asks you about it instead.

## Languages

### `odoo_locales`

**Which languages besides English must a new translatable term be translated into?**

```yaml
odoo_locales: [fr_BE, nl_NL]
```

Erpy finds them in your translation lint settings, else in your `.po` files. Leave out `en_US`.

## CI and merge requests

### `resolve_ci.extra_base_branches`

**Which branches do merge requests target besides the default branch?**

```yaml
resolve_ci:
  extra_base_branches: ["19.0"]
```

Branches besides the default one that merge requests target and CI runs on. Erpy watches them too. It finds them in your recent merge requests and your CI's branch filters.

### `resolve_ci.ignore_workflows`

**For each of your workflows: should Erpy try to repair it when it fails, or leave it alone?**

```yaml
resolve_ci:
  ignore_workflows: ["Deploy"]
```

The workflows Erpy does not try to repair when they fail. On GitHub, a name is a workflow's `name:`. On GitLab, it is a pipeline's name. Erpy proposes to leave alone a deploy, a scheduled job that talks to an outside system, a workflow that runs only after a merge request is closed, and anything that needs secrets or an environment Erpy does not have.

A name can be a pattern, for example `Deploy*`. To match a `*`, `?` or `[` itself, write `[*]`, `[?]` or `[[]`. A name that starts with `!` is written `'\!Release'`, in single quotes. A workflow Erpy leaves alone still runs and still blocks a merge.

### `resolve_conflicts.automatic`

**Should Erpy resolve merge conflicts on its own?**

```yaml
resolve_conflicts:
  automatic: false
```

On by default. Set `automatic` to `false` to turn it off, when you resolve conflicts yourselves. It must be `true` or `false`.

### `chat.bots`

**Do you use review bots whose comments Erpy should read as feedback? Which ones?**

```yaml
chat:
  bots: ["coderabbitai[bot]"]
```

Their logins, as GitLab or GitHub shows them. Erpy finds them in the authors of your recent reviews. Erpy reads their comments, and acts on them, on open merge requests that carry the `erpy-factory` label or where the bot mentions `@erpyai`.

### `worktree.base`

**Does new work start from a branch other than the default branch?**

```yaml
worktree:
  base: "19.0"
```

The branch new work starts from and merge requests target. This one is not under `extensions`: it sits at the top of the file, beside `harness`. Quote a branch name that looks like a number. Erpy writes it live only when most of your recent merge requests target a branch other than the default branch.

## Read access in your AWS account

Erpy reads a private Odoo image from your Amazon ECR, or a database dump from your Amazon S3 bucket, through one read-only IAM role that you create in your own AWS account. Put its ARN in `odoo_aws_role`.

**On GitLab, an AWS role can't be set up yet.** The configuration plan says so, and `odoo_aws_role` stays commented out. Use a public `odoo_image` and start from a fresh database.

**On GitHub:**

1. Open the setup ticket in Factory. When your image is in ECR or your dump is in S3, its configuration plan shows the role's trust policy, with Erpy's role and your installation's id filled in, and the permissions the role needs.
2. Create the role with that trust policy. The external id in it is your installation's id: the number at the end of the address of the Erpy app's page in your GitHub settings, under **GitHub Apps** → **Configure**.
3. Give the role only the read access it needs:
   - For an image in ECR: `ecr:GetAuthorizationToken`, `ecr:BatchCheckLayerAvailability`, `ecr:GetDownloadUrlForLayer` and `ecr:BatchGetImage`.
   - For a dump in S3: `s3:GetObject` on `arn:aws:s3:::<bucket>/<prefix>/*`. If the bucket is encrypted with your own KMS key, the role also needs `kms:Decrypt` on that key, in the role's policy and in the key's policy.
   - Keep the role's maximum session at one hour or more, which is the AWS default.
4. Add `odoo_aws_role` with the role's ARN to `harness.yaml`, with a merge request.

Erpy refuses, on every run:

- a role in Erpy's own AWS account;
- a role whose trust policy has no external id condition;
- a dump bucket in an AWS account other than the role's.

Store the dump in `s3://<bucket>/<prefix>/` like this:

- the dump itself, made with `pg_dump -Fc`. It holds the database only. Erpy does not restore a filestore.
- `latest.txt`: one line with the dump's key in the bucket, for example `seed/odoo_2026-10-01.dump`.
- `latest.meta.json`: write it last. It must say which Odoo image the dump was built on:

  ```json
  {"base_image_digest": "sha256:<digest of the image the dump was built on>"}
  ```

Keep the dump under the seed's prefix, or grant `s3:GetObject` on its key as well. Erpy compares the digest with the `odoo_image` it starts. If Erpy can't read the dump, or the dump was built on a different image, it stops before any work and says what to fix.

## The whole file

Here is a `harness.yaml` for a simple repository: a public Odoo image, CI with one workflow left alone, and no review bot. Every setting is there; the ones without evidence are commented out.

```yaml
harness:
  extends: {git: git@github.com:erpyfactory/harness, ref: main, stack: odoo}
  target: {runtime: claude, model: opus}
  modules:
    - name: acme-odoo
      source: {path: .harness}
  extensions:
    # Files Erpy never edits: this configuration itself.
    harness_paths: [harness.yaml, .harness/]
    # The check a pull request must be green on.
    required_check: Tests
    # The Odoo version your add-ons are written for.
    odoo_version: "19.0"
    # The image Erpy runs your code and tests on. Use the one your CI uses. It must be public, or in your own Amazon ECR and read through odoo_aws_role.
    odoo_image: "odoo:19.0"
    # Whether you run Odoo Enterprise (true) or Community (false). Community by default.
    # odoo_enterprise: false
    # Where your Enterprise code comes from: a folder in the image, or a GitHub repository Erpy is installed on.
    # odoo_enterprise_source: github:odoo/enterprise@19.0
    # Where the Odoo source comes from: the image (the default), or a GitHub repository; a private one needs Erpy installed on it.
    # odoo_source: github:odoo/odoo@19.0
    # Your Docker Compose file. Without one, Erpy uses its own standard stack.
    # odoo_compose_file: docker-compose.yml
    # Which services in your Docker Compose file run Odoo and Postgres, when their images do not say.
    # odoo_compose_services: [odoo=web, postgres=db]
    # The Odoo configuration file, when you have your own.
    # odoo_conf: config/odoo.conf
    # The folders that hold your add-ons. The top of the repository by default.
    # odoo_addons_paths: ["."]
    # The development database. Erpy uses odoo_dev when you name none.
    # odoo_dev_db: odoo_dev
    # Where your database dump is stored, with odoo_aws_role to read it; none starts every run from a fresh database with your modules installed.
    # odoo_seed: none
    # Whether to load demo data when starting from a fresh database.
    # odoo_with_demo: false
    # The image for UI demos and recordings. It is the Odoo image by default.
    # odoo_base_image: "odoo:19.0"
    # The folder that holds the datasets your demo films declare.
    # odoo_datasets_dir: demo/datasets
    # Your script that loads one dataset into a database, run as python3 <script> --dataset <file> --db <db> --port <port>.
    # odoo_dataset_loader: tools/load_dataset.py
    # How Erpy pulls the Odoo image: public, ecr or registry. Erpy works it out from the image's registry.
    # odoo_image_access: public
    # IAM role in your AWS account that Erpy assumes to read your private ECR image (and your S3 dump); its trust policy is in the plan.
    # odoo_aws_role: arn:aws:iam::123456789012:role/erpy-odoo-read
    # The Docker Hub images your Docker Compose file uses besides Odoo.
    # odoo_hub_images: ["postgres:16", "nginx:alpine"]
    # The languages a new translatable term needs, besides English.
    odoo_locales: [fr_BE, nl_NL]
    resolve_ci:
      # Branches besides the default that pull requests target and CI runs on.
      # extra_base_branches: ["19.0"]
      # Workflows Erpy does not try to repair when they fail.
      ignore_workflows: ["Deploy"]
    # resolve_conflicts:
    #   # Set to false to stop Erpy resolving merge conflicts on its own. It does by default.
    #   automatic: false
    # chat:
    #   # Review bots whose comments Erpy reads as feedback.
    #   bots: ["coderabbitai[bot]"]
# worktree:
#   # The branch new work starts from, when it is not your default branch.
#   base: "19.0"
```

## Check

- `harness.yaml` on your default branch has the settings you chose, written without a leading `#`.
- If a run needs a setting that is missing, Erpy says which one and asks you to add it to `harness.yaml` with a merge request.
