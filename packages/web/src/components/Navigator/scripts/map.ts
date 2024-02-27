import mapboxgl from 'mapbox-gl';
import { bbox, lineString, type Position } from '@turf/turf';
import type { FeatureProps } from 'src/utilities/helpers/features';
import { isOpenNow } from './timetable-helpers';
import { mqLarge } from '@dodo/ui/primitives';

export class Map {
	mapElement: HTMLDivElement;
	map: any;
	userMarkerTemplateElement: HTMLTemplateElement;
	markerTemplateElement: HTMLTemplateElement;
	userMarker: mapboxgl.Marker = undefined;
	markers: any[] = [];
	boundsFull: [[number, number], [number, number]] = [
		[3.23390071158434, 50.5503661060614], // southwestern corner of the bounds
		[7.12749998189678, 54.0436329908026], // northeastern corner of the bounds
	];
	centerMap: [number, number] = [5.180700346741352, 52.33146823204307]; // Center of the netherlands
	previousBounds: any;

	constructor({ element }: { element: HTMLDivElement }) {
		this.mapElement = element;
		this.userMarkerTemplateElement = document.querySelector(
			'[data-module-bind="map__marker-user"]',
		);
		this.markerTemplateElement = document.querySelector(
			'[data-module-bind="map__marker"]',
		);
	}

	startMap() {
		// zoom onto netherlands
		this.map = new mapboxgl.Map({
			container: this.mapElement.id,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: this.centerMap,
		}).fitBounds(this.boundsFull, {
			duration: 0,
		});
	}

	generateMarkers({ features }: { features: FeatureProps[] }) {
		const newFeatures = features
			// Sort by longitude
			.sort((a, b) => b.geometry.coordinates[1] - a.geometry.coordinates[1])
			// Create markers
			.map((feature) => {
				const clone =
					this.markerTemplateElement.content.firstElementChild.cloneNode(
						true,
					) as HTMLButtonElement;
				const nameElement = clone.querySelector('[data-name]');
				const openElement = clone.querySelector('[data-is-open]');
				const markerVisualPZA = clone.querySelector(
					'[data-marker-name="map-marker-pza"]',
				);
				const markerVisualPMA = clone.querySelector(
					'[data-marker-name="map-marker-pma"]',
				);

				if (markerVisualPZA && markerVisualPMA) {
					if (feature.properties?.appointmentType.length === 0) {
						markerVisualPZA.remove();
					} else if (feature.properties?.appointmentType?.includes('pza')) {
						markerVisualPMA.remove();
					} else {
						markerVisualPZA.remove();
					}
				}

				nameElement.innerHTML = `${
					feature.properties?.name
						? feature.properties.name
						: feature.properties.location.address
				}, ${feature.properties.location.city}`;
				if (
					feature.properties?.appointmentType?.includes('pza') &&
					isOpenNow(feature.properties.openingHours)
				) {
					clone.classList.add('is-open-location');
				} else if (openElement) {
					openElement.remove();
				}

				if (feature.properties?.isTestLocation) {
					clone.classList.add('is-test-location');
				}

				this.markers.push(
					new mapboxgl.Marker(clone)
						.setLngLat(feature.geometry.coordinates)
						.addTo(this.map),
				);
				return {
					...feature,
					markerElement: clone,
				};
			})
			// resort by city
			.sort((a, b) =>
				a.properties.location.city
					.trim()
					.toLowerCase()
					.localeCompare(b.properties.location.city.trim().toLowerCase()),
			);

		return newFeatures;
	}

	// Remove old and add new user location marker
	generateUserMarker({ position }: { position: [number, number] }) {
		this.removeUserMarker();

		const clone =
			this.userMarkerTemplateElement.content.firstElementChild.cloneNode(
				true,
			) as HTMLImageElement;

		this.userMarker = new mapboxgl.Marker(clone)
			.setLngLat(position)
			.addTo(this.map);
	}

	removeUserMarker() {
		if (this.userMarker) this.userMarker.remove();
	}

	zoomToFeature({
		feature,
		offset = 0,
	}: {
		feature: FeatureProps;
		offset: number;
	}) {
		const [longitude, latitude] = feature.geometry.coordinates;

		this.map.flyTo({
			center: [longitude, latitude],
			zoom: 16,
			speed: 3,
			essential: false,
			offset: [offset, 0],
		});
	}

	zoomToFull() {
		this.map.fitBounds(this.boundsFull);
	}

	getBoundingBox({ collection }: { collection: Position[] }) {
		const line = lineString(collection);
		return bbox(line);
	}

	setBoundingBox({ collection }: { collection: Position[] }) {
		this.map.fitBounds(this.getBoundingBox({ collection }), {
			padding: 72,
			duration: 1500,
		});
	}

	storeCurrentBounds() {
		this.previousBounds = this.map.getBounds();
	}

	restorePreviousBounds() {
		if (this.previousBounds) {
			const speed = window.matchMedia(mqLarge).matches ? 1500 : 0;
			this.map.fitBounds(this.previousBounds, {
				duration: speed,
			});
		}
	}

	init() {
		this.startMap();
	}

	getMap() {
		return this.map;
	}
}
