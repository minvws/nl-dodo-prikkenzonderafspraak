import { BiLinkAlt } from 'react-icons/bi';
import { BsCardText, BsCardImage, BsCameraVideo } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Content',
	name: 'multiContentBlocks',
	type: 'array',
	of: [
		defineField({
			title: 'Content',
			name: 'content',
			type: 'object',
			icon: BsCardText,
			preview: {
				select: {
					title: 'content',
				},
			},
			fields: [
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				}),
			],
		}),
		defineField({
			title: 'Button',
			name: 'button',
			type: 'flexibleButton',
			icon: BiLinkAlt,
		}),
		defineField({
			title: 'Afbeelding',
			name: 'picture',
			type: 'picture',
			icon: BsCardImage,
		}),
		defineField({
			title: 'Video',
			name: 'video',
			type: 'video',
			icon: BsCameraVideo,
		}),
	],
});
