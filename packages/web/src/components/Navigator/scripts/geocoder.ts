import { debounceQuick } from '@dodo/ui/helpers';
import { trackEvent } from 'src/utilities/tracking/piwik';
import Fuse, { type FuseResult } from 'fuse.js';

type PlaceProps = {
	properties: {
		name: string;
		nameAlt?: string;
		province?: string;
	};
	geometry: {
		coordinates: number[];
	};
};

type FeaturesProps = {
	features: PlaceProps[];
};

export class Geocoder {
	element: HTMLDivElement;
	input: HTMLInputElement;
	clearButton: HTMLButtonElement;

	// Places
	placesLoaded: boolean;
	fusePlaces: Fuse<PlaceProps>;

	// Resultlist
	resultList: HTMLOListElement;
	resultItemTemplate: HTMLTemplateElement;
	activeOption: HTMLButtonElement;

	// Callbacks
	onSelection: Function;
	onClear: Function;

	constructor({
		element,
		onSelection,
		onClear,
	}: {
		element: HTMLDivElement;
		onSelection: Function;
		onClear: Function;
	}) {
		this.element = element;
		this.input = element.querySelector(
			'[data-module-bind="input-text__input"]',
		);
		this.clearButton = element.querySelector(
			'[data-module-bind="input-text__clear-button"]',
		);
		this.resultItemTemplate = element.querySelector(
			'[data-module-bind="geocoder__list-item"]',
		);
		this.resultList = element.querySelector(
			'[data-module-bind="geocoder__list"]',
		);
		this.onSelection = onSelection;
		this.onClear = onClear;
	}

	/**
	 * Load places from json file
	 */
	async loadPlaces() {
		const featuresData = await fetch('/data/places.json');
		const places: FeaturesProps = await featuresData.json();
		this.fusePlaces = new Fuse(places.features, {
			includeScore: true,
			threshold: 0.2,
			keys: ['properties.name', 'properties.nameAlt'],
		});
		this.placesLoaded = true;
	}

	async loadData() {
		if (!this.placesLoaded) {
			await this.loadPlaces();
		}
	}

	/**
	 * Populate list with filtered places
	 */
	populateList({ places }: { places: FuseResult<PlaceProps>[] }) {
		this.resultList.innerHTML = '';

		places.slice(0, 5).forEach((place) => {
			const homeTown = place.item;
			const listItemElement = this.resultItemTemplate.content.cloneNode(
				true,
			) as HTMLLIElement;
			const buttonElement = listItemElement.querySelector('button');
			const labelElement = listItemElement.querySelector('[data-label]');
			const metaElement = listItemElement.querySelector('[data-meta]');

			labelElement.textContent = homeTown.properties.name;

			if (!homeTown.properties.province) {
				metaElement.remove();
			} else {
				metaElement.textContent = homeTown.properties.province;
			}

			if (homeTown.properties?.nameAlt) {
				metaElement.textContent = `${metaElement.textContent} - ${homeTown.properties.nameAlt}`;
			}

			buttonElement.addEventListener('click', () => {
				this.onSelection(homeTown.geometry.coordinates);
				this.resultList.hidden = true;
				this.input.value = homeTown.properties.name;
				this.input.focus();
			});
			this.resultList.appendChild(listItemElement);
		});

		this.resultList.hidden = this.resultList.children.length === 0;
	}

	/**
	 * Clear list
	 */
	clearList() {
		this.resultList.innerHTML = '';
	}

	/**
	 * Get all options currently in the list
	 */
	getAllOptions() {
		return [...this.resultList.querySelectorAll<HTMLButtonElement>('button')];
	}

	/**
	 * Get first option currently in the list
	 */
	getFirstOption() {
		return this.getAllOptions()[0];
	}

	/**
	 * Highlight and focus next or previous option
	 */
	highlightSiblingOption(direction: 'next' | 'previous' = 'next') {
		const allOptions = this.getAllOptions();
		const activeIndex = allOptions.indexOf(this.activeOption);
		const nextIndex = direction === 'next' ? activeIndex + 1 : activeIndex - 1;
		const nextOption = allOptions[nextIndex];
		if (nextOption) {
			this.highlightOption(nextOption);
		} else if (direction === 'previous') {
			this.input.focus();
		}
	}

	/**
	 * Highlight and focus option
	 */
	highlightOption(option: HTMLButtonElement) {
		if (this.activeOption) {
			this.activeOption.setAttribute('aria-selected', 'false');
		}

		option.setAttribute('aria-selected', 'true');
		this.activeOption = option;
		this.activeOption.focus();
	}

	/**
	 * Check if there's only one option and press it
	 */
	pressOnlyOptionIfAvailable() {
		const allOptions = this.getAllOptions();
		if (allOptions.length === 1) {
			allOptions[0].click();
		} else {
			this.onInputPressedDownKey();
		}
	}

	/**
	 * Show menu
	 */
	showMenu() {
		this.resultList.hidden = false;
		this.input.setAttribute('aria-expanded', 'true');
	}

	/**
	 * Hide menu
	 */
	hideMenu() {
		this.clearList();
		this.resultList.hidden = true;
		this.input.setAttribute('aria-expanded', 'false');
	}

	/**
	 * When down key is pressed in input
	 */
	onInputPressedDownKey() {
		const inputValue = this.input.value.trim();

		if (inputValue.length > 0) {
			this.showMenu();
			const firstOption = this.getFirstOption();
			this.highlightOption(firstOption);
		}
	}

	/**
	 * Initialize the input field
	 */
	initInput() {
		// initial setup
		this.input.setAttribute('autocomplete', 'off');
		this.input.setAttribute('autocapitalize', 'none');
		this.input.setAttribute('aria-autocomplete', 'list');
		this.input.setAttribute('role', 'combobox');
		this.input.setAttribute('aria-expanded', 'false');

		this.input.addEventListener('focus', this.loadData.bind(this), {
			once: true,
		});
		this.input.addEventListener('mouseover', this.loadData.bind(this), {
			once: true,
		});

		// Debounce any keystrokes to avoid loading places on every keypress
		const debouncedChange = debounceQuick(() => {
			if (!this.placesLoaded) return false;

			if (this.input.value.trim() === '') {
				this.onClear();
			}
			const value = this.input.value.trim().toLowerCase().replace(/\W+/g, '');
			const matchedPlaces =
				value === '' || value.trim().length < 2
					? []
					: this.fusePlaces.search(value);

			this.populateList({ places: matchedPlaces });
		}, 200);

		this.input.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowUp':
				case 'ArrowLeft':
				case 'ArrowRight':
				case 'Space':
				case 'Shift':
					// ignore
					break;
				case 'Enter':
					event.preventDefault();
					this.pressOnlyOptionIfAvailable();
					break;
				case 'Escape':
				case 'Tab':
					this.hideMenu();
					break;
				case 'ArrowDown':
					event.preventDefault();
					this.onInputPressedDownKey();
					break;
				default:
					debouncedChange(event);
			}
		});

		// Log our search queries to piwik
		const debouncedLog = debounceQuick((query: string) => {
			if (query !== '') {
				trackEvent('Geocoder', 'query', query);
			}
		}, 1000);
		this.input.addEventListener('input', function () {
			const query = this.value;
			debouncedLog(query);
		});

		this.clearButton.addEventListener('click', debouncedChange);
	}

	/**
	 * Initialize the list
	 */
	initList() {
		this.resultList.addEventListener('keydown', (event) => {
			switch (event.code) {
				case 'Enter':
				case 'Space':
					// do nothing
					break;
				case 'ArrowUp':
					event.preventDefault();
					this.highlightSiblingOption('previous');
					break;
				case 'ArrowDown':
					event.preventDefault();
					this.highlightSiblingOption('next');
					break;
				case 'Escape':
				case 'Tab':
					this.input.focus();
					this.hideMenu();
					break;
				default:
					this.input.focus();
			}
		});
	}

	init() {
		this.initInput();
		this.initList();

		// Any click outside the wrapper will hide the menu
		document.addEventListener('click', (event: Event) => {
			if (!this.element.contains(event.target as Node)) {
				this.hideMenu();
			}
		});

		window.addEventListener('load', this.loadData.bind(this), { once: true });
	}
}
