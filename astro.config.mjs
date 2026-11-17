// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served from the repository's default GitHub Pages address, https://erpyfactory.github.io/docs.
// Links between pages are relative so a later move to a custom domain only changes `site` and `base`.
export default defineConfig({
	site: 'https://erpyfactory.github.io',
	base: '/docs',
	// The addresses the site had before Get started: each one opens its page today.
	redirects: {
		'/quickstart/01-install-the-app': '/docs/get-started/03-link-your-code-host/github/',
		'/quickstart/02-configure-your-repository': '/docs/get-started/04-add-a-repository/',
		'/quickstart/03-advanced-settings': '/docs/reference/harness-yaml/',
		'/quickstart/04-use-erpy-factory': '/docs/work-with-erpy/ask-erpy-from-gitlab-or-github/',
		'/quickstart/05-automatic-work': '/docs/work-with-erpy/automatic-work/',
		'/onboarding-checklist': '/docs/reference/onboarding-checklist/',
	},
	integrations: [
		starlight({
			title: 'Erpy Factory',
			description: 'A factory for Odoo projects on GitLab or GitHub: turn tickets into merge requests and pull requests.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/erpyfactory/docs' }],
			editLink: { baseUrl: 'https://github.com/erpyfactory/docs/edit/main/' },
			components: { Footer: './src/components/Footer.astro' },
			sidebar: [
				{ label: 'What is Erpy Factory', slug: 'index' },
				{ label: 'Before you start', slug: 'reference/onboarding-checklist' },
				{
					label: 'Get started',
					items: [
						{ slug: 'get-started/01-your-invitation' },
						{ slug: 'get-started/02-add-your-openrouter-key' },
						{
							label: '3. Link your code host',
							items: [
								{ slug: 'get-started/03-link-your-code-host/gitlab' },
								{ slug: 'get-started/03-link-your-code-host/github' },
							],
						},
						{ slug: 'get-started/04-add-a-repository' },
						{ slug: 'get-started/05-invite-your-team' },
						{ slug: 'get-started/06-write-your-first-ticket' },
					],
				},
				{
					label: 'Work with Erpy',
					items: [
						{ slug: 'work-with-erpy/ask-erpy-from-gitlab-or-github' },
						{ slug: 'work-with-erpy/automatic-work' },
					],
				},
				{
					label: 'Reference',
					items: [{ slug: 'reference/harness-yaml' }],
				},
			],
		}),
	],
});
