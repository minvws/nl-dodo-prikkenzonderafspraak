type AppointmentType = 'pza' | 'pma';
export type AppointmentTypeProps = AppointmentType[];

export interface FeatureProps {
	type: 'feature';
	element: HTMLLIElement;
	markerElement: HTMLButtonElement;
	geometry: {
		coordinates: [number, number];
	};
	properties: {
		distance?: number;
		isTestLocation?: boolean;
		slug: string;
		ggdData: {
			name: string;
			slug: string;
		};
		location: {
			address: string;
			city: string;
			coordinates: string;
			zipcode: string;
		};
		name: string;
		openingHours: {
			scheme: {
				[key in
					| 'monday'
					| 'tuesday'
					| 'wednesday'
					| 'thursday'
					| 'friday'
					| 'saturday'
					| 'sunday']: {
					start: string;
					end: string;
				}[];
			};
			overrides: {
				date: string;
				openingHours?: {
					start: string;
					end: string;
				}[];
			}[];
		};
		show: {
			start?: string;
			end?: string;
		};
		appointmentType?: AppointmentTypeProps;
	};
}

export interface FeaturesProps {
	type: 'FeatureCollection';
	features: FeatureProps[];
}
