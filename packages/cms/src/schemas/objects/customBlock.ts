import { FiLink } from 'react-icons/fi';
import { VscScreenFull } from 'react-icons/vsc';
import { defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

const generate = (
	name: string = 'customBlock',
	includeModalSelector: boolean = true,
) => ({
	title: 'Content',
	name,
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{
					title: 'Heading 2',
					value: 'h2',
				},
				{
					title: 'Heading 3',
					value: 'h3',
				},
				{
					title: 'Span',
					value: 'span',
				},
				{
					title: 'Small',
					value: 'small',
				},
			],
			marks: {
				annotations: [
					// Link
					{
						name: 'link',
						type: 'object',
						title: 'Link',
						icon: FiLink,
						validation: (Rule) =>
							Rule.custom((fields: any) =>
								fields?.pageReference || fields?.href
									? true
									: 'Vul "Pagina link" of "href" in',
							),
						fields: [
							defineField({
								title: 'Pagina link',
								description: 'Creëert een interne link naar een andere pagina.',
								name: 'pageReference',
								type: 'pageSourceSelector',
								readOnly: ({ parent }) => !!parent?.href,
							}),
							{
								title: 'href',
								name: 'href',
								type: 'string',
								readOnly: ({ parent }) => !!parent?.pageReference,
							},
							{ name: 'button', type: 'boolean' },
						],
					},
					...(includeModalSelector
						? [
								{
									name: 'dialog',
									type: 'object',
									title: 'Dialog',
									icon: VscScreenFull,
									fields: [
										{
											title: 'Selecteer modal',
											name: 'modal_ref',
											type: 'reference',
											to: [{ type: 'modals' }],
											options: {
												filter: filterReferenceByLanguage,
											},
										},
									],
								},
						  ]
						: []),
				],
			},
		},
	],
});

export const customBlockObject = generate();
export const customBlockWithoutModalObject = generate(
	'customBlockWithoutModal',
	false,
);
