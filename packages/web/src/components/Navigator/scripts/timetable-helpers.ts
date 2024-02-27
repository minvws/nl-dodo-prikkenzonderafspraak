import { DateTime } from 'luxon';

/**
 * Creates array of the upcoming 7 days, starting from today
 * @returns array
 */
const getDates = (days = 7) =>
	Array(days)
		.fill(undefined)
		.map((_, index) => {
			const dateTime = DateTime.local().plus({ days: index });

			return {
				dateTime,
				date: dateTime.toISODate(),
				weekDay: dateTime.setLocale('en').weekdayLong.toLowerCase(),
			};
		});

/**
 * Applies openinghours with overrides
 * @param date
 * @param overrides
 * @returns
 */
const applyOpeningHoursOverrides = (date, overrides) => {
	const override = overrides.find((override) => override.date === date.date);

	return override
		? {
				...date,
				openinghours: override.openinghours,
		  }
		: date;
};

/**
 * Applies openinghours without overrides
 * @param date
 * @param scheme
 * @returns date
 */
const applyOpeningHoursScheme = (date, scheme, show) => {
	if (
		scheme[date.weekDay] &&
		scheme[date.weekDay].length &&
		!isAfterClose(date, show)
	) {
		date.openinghours = scheme[date.weekDay];
	}

	return date;
};

const isAfterClose = (date, show) => {
	if (!show?.end) {
		return false;
	}

	const end = DateTime.fromISO(show.end);

	return date.dateTime.startOf('day') > end.startOf('day');
};

/**
 * Updates given date with openinghours
 * @param date
 * @param openingHours
 * @returns
 */
const updateDateWithOpeningHours = ({ date, openingHours, show }) => {
	let dateWithOpeningHours = date;

	if (openingHours && openingHours.scheme)
		dateWithOpeningHours = applyOpeningHoursScheme(
			date,
			openingHours.scheme,
			show,
		);

	if (openingHours && openingHours.overrides?.length)
		dateWithOpeningHours = applyOpeningHoursOverrides(
			date,
			openingHours.overrides,
		);

	return dateWithOpeningHours;
};

/**
 * Gets dates of the upcoming week containing opening hours
 * @param openingHours
 * @returns array
 */
export const getDatesWithOpeningHours = (
	{ openingHours, show }: { openingHours: any; show?: any },
	days = 7,
) =>
	getDates(days).map((date) =>
		updateDateWithOpeningHours({ date, openingHours, show }),
	);

/**
 * Determines if a location is opened today
 * @param openingHours
 * @returns bool
 */
export const isOpenToday = (openingHours) =>
	getDatesWithOpeningHours({ openingHours })[0].openinghours?.length;

/**
 * Determines if a location is opened now
 * @param openingHours
 * @returns bool
 */
export const isOpenNow = (openingHours) => {
	const today = getDatesWithOpeningHours({ openingHours })[0];
	const now = DateTime.local();

	if (today.openinghours?.length) {
		return today.openinghours.filter((item) => {
			const todayStart = today.dateTime.startOf('day').plus({
				hours: item.start.split(':')[0],
				minutes: item.start.split(':')[1],
			});
			const todayEnd = today.dateTime.startOf('day').plus({
				hours: item.end.split(':')[0],
				minutes: item.end.split(':')[1],
			});
			return now >= todayStart && now <= todayEnd;
		}).length;
	} else {
		return false;
	}
};

/**
 * Determines if a location is opened this week
 * @param openingHours
 * @returns bool
 */
export const isOpenThisWeek = (openingHours, show) =>
	getDatesWithOpeningHours({ openingHours, show }).find(
		(date) => date.openinghours,
	);

/**
 * Returns the first day the location opens
 * @param openingHours
 * @returns date
 */
export const getFirstDayOpen = ({ openingHours, show }) => {
	const openThisWeek = isOpenThisWeek(openingHours, show);

	if (openThisWeek) {
		return openThisWeek;
	}

	return getDatesWithOpeningHours({ openingHours, show }, 21).find(
		(date) => date.openinghours,
	);
};
