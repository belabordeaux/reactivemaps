import { default as React, Component } from 'react';
var ReactDOM = require('react-dom');
import {ReactiveMap,
		AppbaseMap,
		AppbaseSearch,
		AppbaseSlider,
		AppbaseList} from '../../app/app.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.markerOnIndex = this.markerOnIndex.bind(this);
	}
	getGradient(temp) {
		if(temp <= 5) {
			return 'rgba(0, 0, 255, 1)';
		}
		else if(temp > 5 && temp <= 10) {
			return 'rgba(255,255,0, 1)';
		}
		else if(temp > 10 && temp <= 15) {
			return 'rgba(128,0,128, 1)';
		}
		else if(temp > 15 && temp <= 20) {
			return 'rgba(255,0,255, 1)';
		}
		else if(temp > 20) {
			return 'rgba(255,0,0, 1)';
		}
	}
	markerOnIndex(res) {
		if (res.allMarkers && res.allMarkers.hits && res.allMarkers.hits.hits) {
			let result = res.allMarkers.hits.hits.map((markerData, index) => {
				let location = markerData._source[this.props.mapping.location];
				return new google.maps.LatLng(location.lat, location.lon);
			});
			let gredient = res.allMarkers.hits.hits.map((markerData, index) => {
				let source = markerData._source;
				return this.getGradient(source.main.temp);
			});
			console.log(gredient);
			let heatmap = new google.maps.visualization.HeatmapLayer({
				data: result,
				map: res.mapRef.props.map,
				radius: 50
			});
			var gradient = [
				'rgba(0, 255, 255, 0)',
				'rgba(0, 255, 255, 1)',
				'rgba(0, 191, 255, 1)',
				'rgba(0, 127, 255, 1)',
				'rgba(0, 63, 255, 1)',
				'rgba(0, 0, 255, 1)',
				'rgba(0, 0, 223, 1)',
				'rgba(0, 0, 191, 1)',
				'rgba(0, 0, 159, 1)',
				'rgba(0, 0, 127, 1)',
				'rgba(63, 0, 91, 1)',
				'rgba(127, 0, 63, 1)',
				'rgba(191, 0, 31, 1)',
				'rgba(255, 0, 0, 1)'
			];
			heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
		}
	}
	render() {
		return (
			<div className="row m-0 h-100">
				<ReactiveMap config={this.props.config} />
				<div className="col s12 h-100">
					<AppbaseMap
						inputData={this.props.mapping.location}
						defaultZoom={4}
						defaultCenter={{ lat: 40.673940, lng: -101.314026 }}
						historicalData={true}
						markerCluster={false}
						searchComponent="appbase"
						searchField={this.props.mapping.venue}
						mapStyle={this.props.mapStyle}
						markerOnIndex={this.markerOnIndex}
						autoCenter={false}
						size={100}
						searchAsMoveComponent={true}
						searchAsMoveDefault={true}
						MapStylesComponent={true}
						allowMarkers={false}
						title="Meetupblast"
						/>
				</div>
			</div>
		);
	}
}

Main.defaultProps = {
	mapStyle: "Light Monochrome",
	mapping: {
		city: 'name',
		location: 'coord'
	},
	config: {
		"appbase": {
			"appname": "weather",
			"username": "dmgyKySw5",
			"password": "162202d3-43f7-4e01-95f2-f9f3e1b02bb5",
			"type": "city"
		}
	}
};

ReactDOM.render(<Main />, document.getElementById('map'));
