import { followCustomBlockReferences } from './';

export const customBlockQuery = ({ name }: { name: string }): string =>
	`${name}[]${followCustomBlockReferences()}`;
