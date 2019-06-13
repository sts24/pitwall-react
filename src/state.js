import { observable, action, computed, autorun } from 'mobx';
import axios from "axios";

//useStrict(true);

class dataStore {

	@observable races = [];
	@observable drivers = {};
	@observable constructors = {};
	@observable viewOptions = {
		selectedTab: 'races',
		loading: true,
	};

	@action setRaces(data) { this.races = data; }
	@action setDrivers(data) { this.drivers = data; }
	@action setConstructors(data) { this.constructors = data; }

	@action setViewOptions(data) {
		for (let item in data) {
			this.viewOptions[item] = data[item];
		}
	}

	@action getData(loadYear) {

		let $this = this;

		this.setViewOptions({
			'seasonSelect': loadYear
		});

		function getRaceData(loadYear) {
			return axios.get('https://ergast.com/api/f1/' + loadYear + '/results.json?limit=1000')
				.then(response => {
					let races = response.data.MRData.RaceTable.Races;
					return races;
				});
		}

		function getDriversData(loadYear) {
			return axios.get('https://ergast.com/api/f1/' + loadYear + '/driverStandings.json?limit=1000')
				.then(response => {
					let driversData = (response.data.MRData.StandingsTable.StandingsLists.length > 0) ? response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings : [];
					return driversData;
				});
		}

		function getConstructorsData(loadYear) {
			return axios.get('https://ergast.com/api/f1/' + loadYear + '/constructorStandings.json?limit=1000')
				.then(response => {
					let constructorsData = (response.data.MRData.StandingsTable.StandingsLists.length > 0) ? response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings : [];
					return constructorsData;
				});
		}

		axios.all([getRaceData(loadYear), getDriversData(loadYear), getConstructorsData(loadYear)])
			.then(axios.spread(function (raceData, driversData, constructorsData) {
				$this.setRaces(raceData);
				$this.setDrivers(driversData);
				$this.setConstructors(constructorsData);
			}));
		
	}
}

const modelStore = new dataStore();
export default modelStore;
export { dataStore };