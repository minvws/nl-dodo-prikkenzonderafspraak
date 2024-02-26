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

For the `cms` package you can run the following commands:

```bash
# Run Sanity cms locally
npm run cms:dev

# Deploy Sanity cms
npm run cms:deploy
```

## Learn More

To learn more about Astro, take a look at the following resources:

- [Astro Documentation](https://docs.astro.build/) - learn about Astro features and API.
- [Astro GitHub repository](https://github.com/withastro/astro)
