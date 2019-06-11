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

		this.setViewOptions({
			'seasonSelect': loadYear
		});

		axios.get('https://ergast.com/api/f1/' + loadYear + '/results.json?limit=1000')
			.then(response => {
				let races = response.data.MRData.RaceTable.Races;
				this.setRaces(races);
			});

		axios.get('https://ergast.com/api/f1/' + loadYear + '/driverStandings.json?limit=1000')
			.then(response => {
				let driversData = (response.data.MRData.StandingsTable.StandingsLists.length > 0) ? response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings : [];
				this.setDrivers(driversData);
			});

		axios.get('https://ergast.com/api/f1/' + loadYear + '/constructorStandings.json?limit=1000')
			.then(response => {
				let constructorsData = (response.data.MRData.StandingsTable.StandingsLists.length > 0) ? response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings : [];
				this.setConstructors(constructorsData);
			});

		
	}
}

const modelStore = new dataStore();
export default modelStore;
export { dataStore };