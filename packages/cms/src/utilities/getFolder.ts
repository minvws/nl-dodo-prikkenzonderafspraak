export const getFolder = (
	S,
	{
		title,
		items,
		icon,
	}: {
		title: string;
		items: any;
		icon?: any;
	},
) =>
	S.listItem()
		.title(title)
		.icon(icon)
		.child(S.list().title(title).items(items));
