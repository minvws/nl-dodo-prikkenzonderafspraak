import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { media } from 'sanity-plugin-media';

import schemas from './src/schemas/schema';
import deskStructure from './src/deskStructure';
import { studioDataSet, studioProjectID } from './src/environment';
import { languages } from './languages';

export default defineConfig({
	title: 'Prikken Zonder Afspraak',
	projectId: studioProjectID,
	dataset: studioDataSet,
	plugins: [
		deskTool({
			structure: deskStructure,
		}),
		visionTool(),
		media(),
		documentInternationalization({
			// Required:
			supportedLanguages: languages,
			schemaTypes: [
				'siteSettings',
				'modals',
				'tale',
				'assistance',
				'home-page',
				'locations-page',
				'generic-page',
				'error-page',
			],
		}),
	],
	tools: (prev) => {
		// 👇 Uses environment variables set by Vite in development mode
		if (import.meta.env.DEV) {
			return prev;
		}

		return prev.filter((tool) => tool.name !== 'vision');
	},
	schema: {
		types: schemas,
	},
});
