import { rmSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import { point, booleanPointInPolygon, polygon } from '@turf/turf';

/**
 * NOTE!!!!!!!!!
 * Make sure you have downloaded the latest geojson from http://overpass-turbo.eu with the following query:

area["name"="Nederland"];
(
  nwr["place"~"hamlet|village|town|city"](area);
);
out meta;

 * Then export the data as geojson and save it in the next to this file as `export.json`
 */

import file from './export.json' assert { type: 'json' };
import provinces from './provinces.json' assert { type: 'json' };
const outputFolder = './public/data';

const sortPlace = ['city', 'town', 'village', 'hamlet'];
const formatFeatureCollection = (data) => ({
	type: 'FeatureCollection',
	features: data
		// Filter out features without a name and place type city_block
		.filter(
			(feature) =>
				feature.properties?.name && feature.properties.place !== 'city_block',
		)
		// Store everything in a new array
		.map((feature, index, self) => {
			// Get province based on location of the feature inside the province polygon
			const province = provinces.features.find((province) =>
				booleanPointInPolygon(
					point(feature.geometry.coordinates),
					polygon(province.geometry.coordinates),
				),
			)?.properties?.name;

			// Get the wiki name if it exists and the province is not mentioned
			const wiki =
				feature.properties['wikipedia'] &&
				province &&
				!feature.properties['wikipedia']
					.toLowerCase()
					.includes(province.toLowerCase())
					? feature.properties['wikipedia'].split(':')[1].trim()
					: undefined;

			// Check if the feature is unique
			const isUnique =
				index ===
				self.findIndex((t) => t.properties.name === feature.properties.name);

			// Construct a variable alt name base on wiki or postal code when the
			// feature is not unique
			const variableAlt = isUnique
				? undefined
				: wiki && feature.properties.name !== wiki
				? wiki
				: feature.properties['postal_code']
				? feature.properties['postal_code']
				: undefined;

			return {
				type: 'Feature',
				properties: {
					name: feature.properties.name,
					nameAlt:
						feature.properties['alt_name'] ||
						feature.properties['name_alt'] ||
						feature.properties['official_name'] ||
						variableAlt,
					place: feature.properties?.place,
					province: provinces.features.find((province) => {
						const pt = point(feature.geometry.coordinates);
						const poly = polygon(province.geometry.coordinates);
						return booleanPointInPolygon(pt, poly);
					})?.properties?.name,
				},
				geometry: feature.geometry,
			};
		})
		// Sort the array by place type
		.sort(
			(a, b) =>
				sortPlace.indexOf(a.properties.place) -
				sortPlace.indexOf(b.properties.place),
		),
});

/**
 * This will write a file to disk by first checking for existence
 */
const writeFile = ({ filePath, data }) => {
	if (existsSync(filePath)) rmSync(filePath);

	writeFileSync(filePath, data);
};

(async () => {
	try {
		const { features } = file;

		const featureCollection = formatFeatureCollection(features);

		// check if outputFolder exists
		if (!existsSync(outputFolder)) {
			console.log(`Creating '${outputFolder}'`);
			mkdirSync(outputFolder);
		}

		writeFile({
			filePath: './public/data/places.json',
			data: JSON.stringify(featureCollection),
		});
	} catch (error) {
		console.log(error);
	}
})();
