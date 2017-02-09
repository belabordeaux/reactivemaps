// actuators
import {ReactiveMap} from './actuators/ReactiveMap';
import {GeoDistanceSlider} from './sensors/GeoDistanceSlider';
import {GeoDistanceDropdown} from './sensors/GeoDistanceDropdown';
import {PlacesSearch} from './sensors/PlacesSearch';
import reactivebase from '@appbaseio/reactivebase';

module.exports = {
	ReactiveMap: ReactiveMap,
	GeoDistanceSlider: GeoDistanceSlider,
	GeoDistanceDropdown: GeoDistanceDropdown,
	PlacesSearch: PlacesSearch,
	reactivebase: reactivebase
};
