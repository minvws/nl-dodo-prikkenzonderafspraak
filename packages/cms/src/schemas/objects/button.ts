import { defineType, defineField } from 'sanity';
import { BiLinkAlt } from 'react-icons/bi';

export default defineType({
	title: 'Knop',
	name: 'flexibleButton',
	type: 'object',
	fieldsets: [
		{
			name: 'linkTo',
			title: 'Linkt naar',
			description: 'Vul éen van de drie typen links in.',
		},
	],
	validation: (Rule) =>
		Rule.custom((fields: any) =>
			!fields?.label
				? true
				: fields?.href || fields?.pageReference || fields?.asset
				? true
				: '"Linkt naar" is verplicht',
		),
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((label: any, context: any) =>
					!label?.length &&
					(context?.parent?.pageReference ||
						context?.parent?.href ||
						context?.parent?.asset)
						? 'Label verplicht'
						: true,
				),
		}),
		defineField({
			title: 'Interne link',
			description: 'Creëert een interne link naar een andere pagina.',
			name: 'pageReference',
			type: 'pageSourceSelector',
			readOnly: ({ parent }) => !!parent?.href || !!parent?.asset,
			fieldset: 'linkTo',
		}),
		defineField({
			name: 'deepLink',
			type: 'taleDeeplink',
			hidden: ({ parent }) => !parent?.pageReference,
			fieldset: 'linkTo',
		}),
		defineField({
			title: 'href',
			name: 'href',
			type: 'string',
			readOnly: ({ parent }) => !!parent?.pageReference || !!parent?.asset,
			fieldset: 'linkTo',
		}),
		defineField({
			title: 'Bestand',
			name: 'asset',
			type: 'file',
			readOnly: ({ parent }) => !!parent?.pageReference || !!parent?.href,
			fieldset: 'linkTo',
		}),
		defineField({
			title: 'Variant',
			name: 'variant',
			type: 'string',
			options: {
				layout: 'dropdown',
				list: [
					{
						title: 'Primary',
						value: 'primary',
					},
					{
						title: 'Secondary',
						value: 'secondary',
					},
					{
						title: 'Tertiary',
						value: 'tertiary',
					},
					{
						title: 'Quaternary',
						value: 'quaternary',
					},
				],
			},
		}),
		defineField({
			title: 'Icoon positionering',
			name: 'iconPosition',
			type: 'string',
			options: {
				layout: 'dropdown',
				list: [
					{
						title: 'Achter de label',
						value: 'trailing',
					},
					{
						title: 'Voor de label',
						value: 'leading',
					},
				],
			},
		}),
		defineField({
			title: 'Icoon',
			name: 'icon',
			type: 'iconPicker',
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
	preview: {
		select: {
			title: 'label',
		},
		prepare({ title }) {
			return {
				title: title,
				media: BiLinkAlt,
			};
		},
	},
});
