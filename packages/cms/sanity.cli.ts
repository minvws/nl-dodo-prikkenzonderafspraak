import { defineCliConfig } from 'sanity/cli';
import { studioDataSet, studioProjectID } from './src/environment';

export default defineCliConfig({
	api: {
		projectId: studioProjectID,
		dataset: studioDataSet,
	},
});
