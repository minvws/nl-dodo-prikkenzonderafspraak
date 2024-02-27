import { imageQuery, internalPageReferenceInSelectQuery } from '.';

/**
 * This helper function will transfer modals into content
 */
export const followCustomBlockReferences = () => `{
	...,
	markDefs[]{
		...,
		_type == "link" => @{
			"slugCollection": select(
				defined(href) => {
					"slug": href,
				},
				${internalPageReferenceInSelectQuery()},
			),
		},
		_type == "dialog" => @.modal_ref->{
			title,
			${imageQuery({ name: 'image' })},
			content,
		}
	},
}`;
