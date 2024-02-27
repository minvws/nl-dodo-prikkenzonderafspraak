import dotenv from 'dotenv';

/** Get the custom set environment */
const ENV = process.env.ENVIRONMENT || 'development';

/** Use the env based on the passed env value */
dotenv.config({ path: `.env.${ENV}` });

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sanity from 'astro-sanity';
import Compress from 'astro-compress';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';

console.log(`ENVIRONMENT: ${ENV}`);

export default defineConfig({
	site: 'https://prikkenzonderafspraak.nl/',
	scopedStyleStrategy: 'where',
	integrations: [
		sitemap(),
		sanity({
			projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
			dataset: process.env.PUBLIC_SANITY_DATASET,
			apiVersion: 'v2023-03-21',
			useCdn: process.env.NODE_ENV === 'production',
		}),
		Compress({
			CSS: false,
			HTML: false,
			JavaScript: false,
		}),
		icon({
			// Icon dir of UI package
			iconDir: '../../node_modules/@dodo/ui/src/lib/elements/Icon/icons',
		}),
		pagefind(),
	],
	vite: {
		build: {
			target: browserslistToEsbuild(),
			cssTarget: browserslistToEsbuild(),
		},
		resolve: {
			alias: {
				'@design-system-styles/': './src/design-system/',
			},
		},
	},
});
