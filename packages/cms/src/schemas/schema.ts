// Pages
import homePage from './pages/home';
import locationsPage from './pages/locations';
import genericPage from './pages/generic';
import errorPage from './pages/error';

// Documents
import siteSettingsDocument from './documents/siteSettings';
import modalsDocument from './documents/modals';
import taleDocument from './documents/tale';
import assistanceDocument from './documents/assistance';
import ggdDocument from './documents/ggd';
import locationDocument from './documents/location';

// objects
import metaDataObject from './objects/metaData';
import heroObject from './objects/hero';
import pageSourceSelectorObject from './objects/pageSourceSelector';
import internalPageSelectorObject from './objects/internalPageSelector';
import taleSelectorObject from './objects/taleSelector';
import iconPickerObject from './objects/iconPicker';
import buttonObject from './objects/button';
import pictureObject from './objects/picture';
import videoObject from './objects/video';
import overviewObject from './objects/overview';
import moreInfoObject from './objects/moreInfo';
import taleDeeplinkObject from './objects/taleDeeplink';
import multiContentBlocksObject from './objects/multiContentBlocks';
import {
	customBlockObject,
	customBlockWithoutModalObject,
} from './objects/customBlock';
import openingHoursObject from './objects/openinghours';
import openingHoursOverrideObject from './objects/openinghoursoverride';
import timeStringObject from './objects/timeString';

export default [
	// pages
	homePage,
	locationsPage,
	genericPage,
	errorPage,

	// documents
	siteSettingsDocument,
	modalsDocument,
	taleDocument,
	assistanceDocument,
	ggdDocument,
	locationDocument,

	// objects
	metaDataObject,
	heroObject,
	pageSourceSelectorObject,
	internalPageSelectorObject,
	taleSelectorObject,
	iconPickerObject,
	buttonObject,
	pictureObject,
	videoObject,
	overviewObject,
	moreInfoObject,
	taleDeeplinkObject,
	multiContentBlocksObject,
	customBlockObject,
	customBlockWithoutModalObject,

	openingHoursObject,
	openingHoursOverrideObject,
	timeStringObject,
];
