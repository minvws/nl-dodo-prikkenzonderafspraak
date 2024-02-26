import { createClient } from '@sanity/client';
import { studioDataSet, studioProjectID } from '../environment';

const client = createClient({
	projectId: studioProjectID,
	dataset: studioDataSet,
	apiVersion: '2023-03-21',
	useCdn: false,
});

export default client;
