// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served from the repository's default GitHub Pages address, https://erpyfactory.github.io/docs.
// Links between pages are relative so a later move to a custom domain only changes `site` and `base`.
export default defineConfig({
	site: 'https://erpyfactory.github.io',
	base: '/docs',
	integrations: [
		starlight({
			title: 'Erpy Factory',
			description: 'A factory for Odoo projects: turn GitHub issues into pull requests.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/erpyfactory/docs' }],
			editLink: { baseUrl: 'https://github.com/erpyfactory/docs/edit/main/' },
			sidebar: [
				{ label: 'What is Erpy Factory', slug: 'index' },
				{ label: 'Quick start', items: [{ autogenerate: { directory: 'quickstart' } }] },
			],
		}),
	],
});
