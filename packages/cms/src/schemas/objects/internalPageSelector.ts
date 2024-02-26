import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Link naar interne pagina',
	name: 'internalPageSelector',
	type: 'array',
	of: [
		{
			title: 'Overzicht',
			name: 'pageOverview',
			type: 'object',
			fields: [
				defineField({
					title: 'Label',
					name: 'label',
					type: 'string',
				}),
				defineField({
					title: 'Interne link',
					name: 'pageReference',
					type: 'pageSourceSelector',
					readOnly: ({ parent }) => !!parent?.href,
				}),
				defineField({
					title: 'href',
					name: 'href',
					type: 'string',
					readOnly: ({ parent }) => !!parent?.pageReference,
				}),
				defineField({
					title: 'Icoon',
					name: 'icon',
					type: 'iconPicker',
				}),
			],
			preview: {
				select: {
					title: 'label',
					referenceTitle: 'pageReference.metaData.title',
					slug: 'pageReference.slug.current',
				},
				prepare(selection) {
					const { title, referenceTitle, slug } = selection;
					return {
						title:
							typeof referenceTitle === 'object'
								? referenceTitle.nl
								: referenceTitle || title,
						subtitle: slug,
					};
				},
			},
		},
	],
});
