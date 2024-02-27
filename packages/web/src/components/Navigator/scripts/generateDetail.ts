import { mqLarge } from '@dodo/ui/primitives';
import copy from 'copy-to-clipboard';
import type { FeatureProps } from 'src/utilities/helpers/features';
import { replaceAll, replaceTimeTable } from './replacement-helpers';
import { isOpenNow } from './timetable-helpers';

export const generateDetail = ({
	location,
	template,
	locale,
	accessToken,
}: {
	location: FeatureProps;
	template: HTMLTemplateElement;
	locale: string;
	accessToken: string;
}): HTMLDivElement => {
	const clone = template.content.firstElementChild.cloneNode(
		true,
	) as HTMLDivElement;

	// Replace variables
	replaceAll({ location, container: clone, locale });
	replaceTimeTable({
		location,
		container: clone,
		locale,
	});

	// Remove markers based on appointment type
	const markerVisualPZA = clone.querySelector(
		'[data-marker-name="map-marker-pza"]',
	);
	const markerVisualPMA = clone.querySelector(
		'[data-marker-name="map-marker-pma"]',
	);
	if (markerVisualPZA && markerVisualPMA) {
		if (location.properties?.appointmentType.length === 0) {
			markerVisualPZA.remove();
		} else if (location.properties?.appointmentType?.includes('pza')) {
			markerVisualPMA.remove();
		} else {
			markerVisualPZA.remove();
		}
	}

	// Add/remove/replace static map on larger viewports
	const imageWrapElements =
		clone.querySelectorAll<HTMLDivElement>('[data-wrap-image]');

	if (window.matchMedia(mqLarge).matches) {
		imageWrapElements.forEach((element) => element.remove());
	} else {
		const mapImageElements =
			clone.querySelectorAll<HTMLImageElement>('[data-image-map]');
		mapImageElements.forEach((element) => {
			element.src = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${location.geometry.coordinates[0]},${location.geometry.coordinates[1]},17,0.00,0.00/768x460@2x?access_token=${accessToken}`;
		});

		if (isOpenNow(location.properties.openingHours)) {
			clone.classList.add('is-open-location');
		}
	}

	// initialise copybutton
	const copyButtonElement = clone.querySelector(
		'[data-module-bind="location__button-copy"]',
	) as HTMLButtonElement;

	if (copyButtonElement) {
		const copyButtonContentElement = copyButtonElement.querySelector(
			'[data-button-content]',
		);
		const address = `${location.properties.location.address}, ${location.properties.location.city}`;

		copyButtonElement.addEventListener('click', (event) => {
			event.preventDefault();
			if (copy(address)) {
				copyButtonContentElement.innerHTML = copyButtonElement.dataset
					.labelCopied as string;

				// re-instate original label after a couple of seconds
				setTimeout(() => {
					if (copyButtonContentElement)
						copyButtonContentElement.innerHTML = copyButtonElement.dataset
							.labelCopy as string;
				}, 1500);
			}
		});
	}

	return clone;
};
