import type { FeatureProps } from 'src/utilities/helpers/features';
import { replaceAll } from './replacement-helpers';

export const generateListItem = ({
	location,
	template,
	locale,
}: {
	location: FeatureProps;
	template: HTMLTemplateElement;
	locale: string;
}): HTMLLIElement => {
	const clone = template.content.firstElementChild.cloneNode(
		true,
	) as HTMLLIElement;

	// openinghours
	replaceAll({ location, container: clone, locale });

	// set properties on item
	clone.setAttribute('data-slug', location.properties.slug);
	clone.setAttribute('data-slug-ggd', location.properties.ggdData.slug);

	// add outline to the list when the location is a test location
	if (location.properties?.isTestLocation) {
		clone.classList.add('is-test-location');
	}

	// return element for re-use in array of locations
	return clone;
};
