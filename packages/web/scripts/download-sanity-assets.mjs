import stream from 'stream';
import { promisify } from 'util';
import {
	mkdirSync,
	createWriteStream,
	rmSync,
	existsSync,
	readdirSync,
} from 'fs';
import got from 'got';
import dotenv from 'dotenv';

/** Get the custom set environment */
const ENV = process.env.ENVIRONMENT || 'development';

/** Use the env based on the passed env value */
dotenv.config({ path: `.env.${ENV}` });

const pipeline = promisify(stream.pipeline);

const folder = './public/assets/sanity';

console.log(`ENVIRONMENT: ${ENV}`);

(async () => {
	try {
		const { result } = await got(
			`https://${process.env.PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.PUBLIC_SANITY_DATASET}?query=*%5B_type+in+%5B%22sanity.fileAsset%22%2C+%22sanity.imageAsset%22%5D%5D%7B%0A++url%2C%0A++sha1hash%2C%0A++originalFilename%2C%0A++extension%0A%7D`,
			{
				headers: {
					'user-agent': undefined,
				},
			},
		).json();

		// check if folder exists
		if (!existsSync(folder)) {
			console.log(`Creating '${folder}'`);
			mkdirSync(folder);
		}

		// Read the files present on the disk to compare them later with sanity database
		let diskFiles = readdirSync(folder, {
			withFileTypes: true,
		})
			.filter((item) => !item.isDirectory())
			.map((item) => item.name);

		// loop over result from sanity
		for (const { url, sha1hash, extension } of result) {
			const fileName = `${sha1hash}.${extension}`;
			const filePath = `${folder}/${fileName}`;

			// Remove item from diskfiles if its present in sanity
			diskFiles = diskFiles.filter((item) => item !== fileName);

			if (!existsSync(filePath)) {
				await pipeline(got.stream(url), createWriteStream(filePath));
			}
		}

		// remove files from disk which are not present in sanity
		diskFiles.forEach((file) => {
			rmSync(`${folder}/${file}`, { force: true });
			console.log(
				'File removed from sanity so also removed from disk:',
				`${folder}/${file}`,
			);
		});
	} catch (error) {
		console.log(error);
	}
})();
