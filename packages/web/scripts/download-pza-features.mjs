import { rmSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import got from 'got';
import { parse, isAfter, isBefore, startOfDay, startOfToday } from 'date-fns';
import dotenv from 'dotenv';

/** Get the custom set environment */
const ENV = process.env.ENVIRONMENT || 'development';
/** Use the env based on the passed env value */
dotenv.config({ path: `.env.${ENV}` });

const folder = './public/data/v3';

console.log(`ENVIRONMENT: ${ENV}`);

/**
 * This functions formats a raw Sanity data set to a feature collection to be consumed by Mapbox
 * @param  data The raw Sanity data to turn into the feature collection
 * @returns 	A feature collection to be used by Mapbox to render a set of poi's
 */
const formatFeatureCollection = (data) => ({
	type: 'FeatureCollection',
	features: data.map((feature) => ({
		type: 'Feature',
		properties: {
			...feature,
		},
		geometry: {
			type: 'Point',
			coordinates: feature.location.coordinates
				.split(',')
				.map((c) => parseFloat(c.trim()))
				.reverse(),
		},
	})),
});

/**
 * Filter the locations by removing the locations which don't have geocoordinates or are closed
 * @param  data The raw Sanity data to turn into the feature collection
 * @returns
 */
const filterLocations = (data, compareDate, logReasons) =>
	data.filter((feature) => {
		// skip features that do not have location or information yet, they are probably still being edited.
		if (!feature.location || !feature.location.coordinates || !feature.slug) {
			logReasons &&
				console.log('Skipping because not complete', JSON.stringify(feature));
			return false;
		}

		if (
			['production', 'staging', 'alternative'].includes(ENV) &&
			feature.isTestLocation
		) {
			return false;
		}

		// if compare date is after the end date skip this feature
		if (feature.show && feature.show.end) {
			const end = startOfDay(parse(feature.show.end, 'y-L-d', 0));

			if (isAfter(compareDate, end)) {
				logReasons &&
					console.log(
						`Skipped ${feature.name} because of end`,
						feature.show.end,
						end,
					);
				return false;
			}
		}

		// if compare date is before the start date skip this feature
		if (feature.show && feature.show.start) {
			const start = startOfDay(parse(feature.show.start, 'y-L-d', 0));

			if (isBefore(compareDate, start)) {
				logReasons &&
					console.log(
						`Skipped ${feature.name} because of start`,
						feature.show.start,
						start,
					);
				return false;
			}
		}

		// otherwise include it
		return true;
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
		const query = encodeURIComponent(
			`*[_type == "location-document"]{_updatedAt, _id, isTestLocation, name, 'slug': slug.current, 'ggd': GGD->name, "ggdData": {"name": GGD->name, "slug": GGD->slug.current}, appointmentType, "location": {...location, "place": location.place[]->slug.current}, openingHours, show} | order(location.city asc)`,
		);
		const { result } = await got(
			`https://cc556vss.api.sanity.io/v1/data/query/production?query=${query}`,
			{
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		const today = startOfToday();
		console.log('Date (UTC)', today);

		const filteredData = filterLocations(result, today, false);
		const featureCollection = formatFeatureCollection(filteredData);

		// check if folder exists
		if (!existsSync(folder)) {
			console.log(`Creating '${folder}'`);
			mkdirSync(folder);
		}

		writeFile({
			filePath: './public/data/v3/features.json',
			data: JSON.stringify(featureCollection),
		});
	} catch (error) {
		console.log(error);
	}
})();
