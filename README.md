# Prikken Zonder Afspraak

This is a [Astro](https://astro.build) project.

## Getting Started

We're using NPM workspaces for our `cms` & `web` packages.
First you'll need to install the dependencies:

```bash
# Install Dependencies
npm i
```

Then you can run/build the Prikken zonder afspraak website:

```bash
# Run website locally
npm run web:dev

# Build website
npm run web:build

# Test website
npm run web:test
```

**Note**: If you want to enable [pagefind](https://pagefind.app) in your dev environment you need to run `npm run web:build` prior to running `npm run web:dev`.

## CMS

**Note**: If you don't have a Sanity instance running yet please see [Installing Sanity](#installing-sanity).

For the `cms` package you can run the following commands:

```bash
# Run Sanity cms locally
npm run cms:dev

# Deploy Sanity cms
npm run cms:deploy
```

### Installing Sanity

If you don't have a Sanity instance running you'll need to create a sanity project via [getting started](https://www.sanity.io/get-started). After that you need to install the CLI locally:

```bash
npm install --global sanity@latest
```

Then you can fill in the `project ID` and the `dataset` of the newly created project into our environment file which is located in the `cms` package:

```js
// packages/cms/src/environment.ts
export const studioProjectID = 'YOUR-PROJECT-ID';
export const studioDataSet = 'YOUR-DATASET';
```

The only thing left to do is restore our backup file (`packages/cms/backups/production.tar.gz`) into your sanity project like this:

```bash
cd packages/cms
sanity dataset import backups/production.tar.gz [YOUR-DATASET]
```

## Learn More

To learn more about Astro, take a look at the following resources:

- [Astro Documentation](https://docs.astro.build/) - learn about Astro features and API.
- [Astro GitHub repository](https://github.com/withastro/astro)
