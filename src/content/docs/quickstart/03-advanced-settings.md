---
title: 3. Advanced settings
description: Every setting in harness.yaml, in file order, with the values it accepts, for a repository that is more than a simple Odoo add-ons repository.
---

Step 2 sets up the simple case. This page explains every setting in `harness.yaml`, in file order, for when your repository is different: Odoo Enterprise, your own Docker Compose setup, a database dump, an image in your own AWS account.

Erpyd proposes a value for each setting in the plan, from what it finds in your repository, and asks you only what it cannot find. You answer in a comment, as in step 2, and you can change any setting later with a pull request. Under each setting below is the question Erpyd asks.

Every setting goes under `harness:`, `extensions:`, except `worktree`. The examples show the key only.

## The top of the file

```yaml
harness:
  # The Erpy Factory configuration this repository builds on. Leave these three as they are.
  extends: {git: git@github.com:erpyfactory/harness, ref: main, stack: odoo}
  target: {runtime: claude, model: opus}
  modules:
    - name: honeydukes
      source: {path: .harness}
```

### `extends` and `target`

Leave both as they are. `extends` names the Erpy Factory configuration your repository builds on, and `target` the agent that works on it.

### `modules`: your own instructions for Erpyd

The `modules` entry connects your repository's `.harness` folder to every run. Erpyd writes it for you, named after your repository. The name must be the one in `.harness/qory-module.yaml`.

Put what Erpyd should know about your repository in the `.harness` folder:

- `AGENTS.md`: instructions that Erpyd reads on every run. Erpyd starts it with your branch model and your environment.
- `skills/<name>/SKILL.md`, `agents/<name>.md` and `commands/<name>.md`: your own skills, agents and commands. A name that Erpy Factory already uses is refused: pick another.

Your own `.claude` folder and `CLAUDE.md` are not used by Erpyd's runs.

### `harness_paths`

**Which files must Erpyd never edit?**

```yaml
harness_paths: [harness.yaml, .harness/]
```

The configuration itself. A folder ends with `/`. Without this setting, Erpyd cannot write anything in your repository, so leave it in.

## Your Odoo version and image

### `odoo_version`

**Which Odoo version are your add-ons written for?**

```yaml
odoo_version: "19.0"
```

Erpyd finds it in your module manifests. Write it as a quoted `"major.minor"`. Required.

### `odoo_image`

**Which image does your CI run the tests in?**

This is the Odoo image Erpyd runs your code and tests on, so use the one your CI uses. Erpyd finds it in your workflows, Docker Compose file or Dockerfile. Required, and the reference needs a tag or a digest: a bare `odoo` is refused.

```yaml
# From Docker Hub
odoo_image: "odoo:19.0"

# From another public registry
odoo_image: "ghcr.io/acme/odoo:19.0-custom"

# From your own Amazon ECR, read through a role you create
odoo_image: "123456789012.dkr.ecr.eu-west-3.amazonaws.com/acme/odoo:19.0"
odoo_aws_role: "arn:aws:iam::123456789012:role/erpy-odoo-read"
```

An image in your own ECR is read through a role that you create, see [Read access in your AWS account](#read-access-in-your-aws-account). Erpyd pulls such an image on every run, so setup takes longer than with a public image.

If your Docker Compose file builds the Odoo service from a Dockerfile, `odoo_image` is the image that Dockerfile starts from. If the file runs the Odoo service from an image, `odoo_image` must be that image.

### `odoo_enterprise` and `odoo_enterprise_source`

**Do you run Odoo Community or Enterprise? If Enterprise: which repository holds the code, and may Erpyd read it?**

```yaml
odoo_enterprise: true

# Enterprise is inside your image, at this path
odoo_enterprise_source: "image:/opt/odoo/enterprise"

# Enterprise is in a GitHub repository, at a branch or tag
odoo_enterprise_source: "github:acme/enterprise@19.0"
```

`odoo_enterprise` is `false` by default. Erpyd finds it in your Docker files, add-ons path and manifests. When it is `true`, `odoo_enterprise_source` is required. Without `@<ref>`, a GitHub source is read at your `odoo_version`.

A private repository must be in the same account or organization as your repository, with Erpyd installed on it.

### `odoo_source`

**Where does your Odoo source come from: the Odoo image you use, or a separate repository?**

```yaml
# From the image, the default
odoo_source: image

# From a path inside the image
odoo_source: "image:/usr/lib/python3/dist-packages"

# From a GitHub repository: the official one, a fork or your own
odoo_source: "github:odoo/odoo@19.0"
```

Erpyd finds it in your workflows, Docker files or `.gitmodules`. With a repository, it clones it at the branch you name, or at your `odoo_version` without one, and keeps a copy to read while it works. A private repository must be in the same account or organization as yours, with Erpyd installed on it.

## Your development stack

### `odoo_compose_file` and `odoo_compose_services`

**Does your development setup run more than Odoo and Postgres? Do you have a Docker Compose file for it?**

```yaml
odoo_compose_file: docker-compose.yml
odoo_compose_services: [odoo=web, postgres=db]
```

Erpyd runs the same services as you, so its tests see what yours see. Without a Docker Compose file, it uses its own standard stack: Odoo and Postgres 16. The path is relative to your repository's root.

Erpyd works out which of your services is Odoo, Postgres and nginx from their images. Name them in `odoo_compose_services`, as `<role>=<service>`, only when it cannot tell: a service built from a Dockerfile, or several that fit.

### `odoo_conf`

**Do you have your own Odoo configuration file?**

```yaml
odoo_conf: config/odoo.conf
```

A path relative to your repository's root. Without one, Erpyd uses the image's own configuration.

### `odoo_addons_paths`

**In which folders are your add-ons?**

```yaml
odoo_addons_paths: [addons, custom]
```

Folders relative to your repository's root. The default is the root itself. They also decide which modules a fresh database installs.

### `odoo_base_image` and `odoo_hub_images`

**Which images does your development setup use besides Odoo?**

```yaml
odoo_base_image: "odoo:19.0"
odoo_hub_images: ["postgres:16", "nginx:alpine"]
```

`odoo_base_image` is the image for demos and recordings. It is the Odoo image by default. `odoo_hub_images` are the other images your Docker Compose file uses. Erpyd loads them in advance, so each one must be readable without signing in, for example a public Docker Hub image. Erpyd finds them in your Docker Compose file.

## Your data

### `odoo_dev_db`

**Do you have a development database? What is it called?**

```yaml
odoo_dev_db: odoo_dev
```

Erpyd restores or creates its starting data under that name: a lowercase name. The default is `odoo_dev`.

### `odoo_seed` and `odoo_aws_role`

**Do your tests start from a database dump? Is it in your own Amazon S3 bucket?**

```yaml
# A fresh database with your modules installed, the default
odoo_seed: none

# A dump in your own S3 bucket, read through a role you create
odoo_seed: "s3://acme-erpy-dumps/odoo"
odoo_aws_role: "arn:aws:iam::123456789012:role/erpy-odoo-read"
```

Erpyd then starts from the same data as you. With no dump, it installs every installable module in your add-ons folders into a fresh database. A fresh database fails to install if a module does not install, and the run stops before any work starts. See [Read access in your AWS account](#read-access-in-your-aws-account) for the role and the dump.

### `odoo_with_demo`

**Do your tests run with Odoo's demo data?**

```yaml
odoo_with_demo: false
```

`false` by default. It applies only to a fresh database.

## Languages

### `odoo_locales`

**Which languages besides English must a new translatable term be translated into?**

```yaml
odoo_locales: [fr_BE, nl_NL]
```

Erpyd finds them in your translation lint settings, else in your `.po` files. Without them, the plan asks you.

## Continuous integration and pull requests

### `required_check`

**Which check must be green before a pull request can merge?**

```yaml
required_check: Addons tests
```

The name of the job, as the pull request shows it, not the name of the workflow. For several, separate the names with commas: `Tests, Lint`. Erpyd finds it in your branch's required checks, else in the job that runs your tests, and always writes it in the file, never as a comment. Without it, Erpyd cannot judge a pull request's checks, so it does not report them as passed.

### `resolve_ci`

**Which branches do pull requests target besides the default branch? For each of your workflows: should Erpyd try to repair it when it fails, or leave it alone?**

```yaml
resolve_ci:
  extra_base_branches: ["19.0"]
  ignore_workflows: ["Deploy to staging"]
```

`extra_base_branches` are branches besides the default one that Erpyd watches. Erpyd finds them in your recent pull requests and your workflows' branch filters.

`ignore_workflows` are the workflows Erpyd does not try to repair when they fail. A name can be a pattern, for example `Deploy*`. To match a `*` itself, write `[*]`. A workflow Erpyd leaves alone still runs and still blocks a merge.

### `resolve_conflicts`

**Should Erpyd resolve merge conflicts on its own?**

```yaml
resolve_conflicts:
  automatic: false
```

On by default. Set `automatic` to `false` to turn it off. It must be `true` or `false`.

### `chat`

**Do you use review bots whose comments Erpyd should read as feedback? Which ones?**

```yaml
chat:
  bots: ["coderabbitai[bot]"]
```

Their logins, as GitHub shows them. Erpyd finds them in the authors of your recent reviews. Erpyd reads their comments, and acts on them, on open pull requests that carry the `erpy-factory` label or where the bot mentions `@erpyd`.

### `carry_days`

**For how long should Erpyd take care of a pull request?**

```yaml
carry_days: 7
```

The number of days the `erpy-factory` label stays on a pull request after it was added, or after Erpyd last did work on the change. The default is 7, and Erpyd writes it as a comment. A whole number from 1 to 3650. See [Automatic work](../05-automatic-work/).

### `worktree`

**Does new work start from a branch other than the default branch?**

```yaml
worktree:
  base: "19.0"
```

This one is not under `extensions`: it sits at the top of the file, beside `harness`. Quote a branch name that looks like a number. The file must be on your default branch for Erpyd to read it.

## Read access in your AWS account

Erpyd reads a private Odoo image from your Amazon ECR, or a database dump from your Amazon S3 bucket, through one read-only IAM role that you create in your AWS account. Put its ARN in `odoo_aws_role`.

When the plan asks about this role, it shows the trust policy with your installation id filled in, and the permissions the role needs.

Give the role this trust policy. `<your installation id>` is the number at the end of the address of your installation's page. Open it from **Settings**, **GitHub Apps**, **Erpyd**, **Configure**:

- for an organization: `https://github.com/organizations/<your-organization>/settings/installations/<id>`
- for a personal account: `https://github.com/settings/installations/<id>`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"AWS": "arn:aws:iam::564589597920:role/harness-boundary-credentials"},
      "Action": "sts:AssumeRole",
      "Condition": {"StringEquals": {"sts:ExternalId": "<your installation id>"}}
    }
  ]
}
```

Then give it only the read access it needs:

- For an image in ECR: `ecr:GetAuthorizationToken`, `ecr:BatchCheckLayerAvailability`, `ecr:GetDownloadUrlForLayer` and `ecr:BatchGetImage`.
- For a dump in S3: `s3:GetObject` on `arn:aws:s3:::<bucket>/<prefix>/*`. The bucket must be in the same AWS account as the role. If it is encrypted with your own KMS key, the role also needs `kms:Decrypt` on that key, in the role's policy and in the key's policy.
- Keep the role's maximum session at one hour or more, which is the AWS default.

The role must be in your own AWS account.

Store the dump in `s3://<bucket>/<prefix>/` like this:

- the dump itself, made with `pg_dump -Fc`. It holds the database only. Erpyd does not restore a filestore.
- `latest.txt`: one line with the dump's key in the bucket, for example `seed/odoo_2026-10-01.dump`.
- `latest.meta.json`: write it last. It must say which Odoo image the dump was built on:

  ```json
  {"base_image_digest": "sha256:<digest of the image the dump was built on>"}
  ```

Erpyd compares that digest with the `odoo_image` it starts. If Erpyd cannot read the dump, or the dump was built on a different image, it stops before any work and says on the issue what to fix. Fix it and ask again.

## The whole file

Here is a `harness.yaml` that uses every setting. Your file has only the ones that apply to you.

```yaml
harness:
  # The Erpy Factory configuration this repository builds on. Leave these three as they are.
  extends: {git: git@github.com:erpyfactory/harness, ref: main, stack: odoo}
  target: {runtime: claude, model: opus}
  modules:
    - name: honeydukes
      source: {path: .harness}
  extensions:
    # Files Erpyd never edits: this configuration itself.
    harness_paths: [harness.yaml, .harness/]
    # The Odoo version your add-ons are written for.
    odoo_version: "19.0"
    # The image Erpyd runs your code and tests on. Use the one your CI uses.
    odoo_image: "123456789012.dkr.ecr.eu-west-3.amazonaws.com/acme/odoo:19.0"
    # Whether you run Odoo Enterprise (true) or Community (false). Community by default.
    odoo_enterprise: true
    # Where your Enterprise source comes from: a path inside the image, or a GitHub repository.
    odoo_enterprise_source: "github:acme/enterprise@19.0"
    # Where the Odoo source comes from: the image (the default), or a GitHub repository.
    odoo_source: "github:odoo/odoo@19.0"
    # Your development stack: a Docker Compose file, and which of its services play which role.
    odoo_compose_file: docker-compose.yml
    odoo_compose_services: [odoo=web, postgres=db]
    # The Odoo configuration file, when you have your own.
    odoo_conf: config/odoo.conf
    # The folders that hold your add-ons, when they are not at the top of the repository.
    odoo_addons_paths: [addons, custom]
    # The image for demos and recordings. It is the Odoo image by default.
    odoo_base_image: "odoo:19.0"
    # The other images your Docker Compose file uses.
    odoo_hub_images: ["postgres:16", "nginx:alpine"]
    # The development database.
    odoo_dev_db: odoo_dev
    # Where your database dump is stored. Without one, tests start from a fresh database.
    odoo_seed: "s3://acme-erpy-dumps/odoo"
    # The read-only role in your AWS account that Erpyd uses to read your ECR image and your dump.
    odoo_aws_role: "arn:aws:iam::123456789012:role/erpy-odoo-read"
    # Whether to load demo data when starting from a fresh database.
    odoo_with_demo: false
    # The languages a new translatable term needs, besides English.
    odoo_locales: [fr_BE, nl_NL]
    # The check a pull request must be green on.
    required_check: Addons tests
    # The days the erpy-factory label stays on a pull request nobody works on. 7 by default.
    carry_days: 7
    resolve_ci:
      # Branches besides the default that pull requests target.
      extra_base_branches: ["19.0"]
      # Workflows Erpyd does not try to repair when they fail.
      ignore_workflows: ["Deploy to staging"]
    # Set to false to stop Erpyd resolving merge conflicts on its own. It does by default.
    resolve_conflicts:
      automatic: false
    chat:
      # Review bots whose comments Erpyd reads as feedback.
      bots: ["coderabbitai[bot]"]
# The branch new work starts from, when it is not your default branch.
worktree:
  base: "19.0"
```

## Check

- `harness.yaml` on your default branch has the settings you chose, written without a leading `#`.
- If a run needs a setting that is missing, Erpyd says which one on the issue and asks you to add it to `harness.yaml` with a pull request. Add it, then ask again.
