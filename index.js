import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import './src/assets/sass/pitwall.scss';

import PageHeader from "./src/components/PageHeader";
import ConstructorStandings  from "./src/components/ConstructorStandings";
import DriverStandings from "./src/components/DriverStandings";
import RaceResults from "./src/components/RaceResults";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.changeSeason = this.changeSeason.bind(this);
        this.currentYear = new Date().getFullYear();
        this.state = {
            races: [],
            driverStandings: [],
            constructorStandings: [],
            viewOptions: {
                seasonSelect: '',
                selectedTab: 'races',
                loading: true,
                error: false
            }
        }
    }

    changeSeason(newSeason){
        this.getData(newSeason);
    }

    getData(loadYear){
        
        let $this = this;

        const apiEndpoints = [
            'results',
            'driverStandings',
            'constructorStandings'
        ];

        apiEndpoints.forEach((apiData) => {

            axios.get('https://ergast.com/api/f1/' + loadYear + '/' + apiData + '.json?limit=1000')
                .then(function(response){
                    let ajax_data = response.data.MRData;
                    
                    if(apiData == 'results'){
                        $this.setState({
                            races: ajax_data.RaceTable.Races
                        });
                    }

                    if(apiData == 'driverStandings'){
                        let driversData = (ajax_data.StandingsTable.StandingsLists.length > 0) ? ajax_data.StandingsTable.StandingsLists[0].DriverStandings : [];

                        $this.setState({
                            driverStandings: driversData
                        });
                    }
                    
                    if(apiData == 'constructorStandings'){
                        let constructorsData = (ajax_data.StandingsTable.StandingsLists.length > 0) ? ajax_data.StandingsTable.StandingsLists[0].ConstructorStandings : [];
                        
                        $this.setState({
                             constructorStandings: constructorsData
                        });
                    }

                })
                .catch(function(){
                    //router.push({ name: 'error' });
                });
        });
        
        
    }

    componentDidMount(){
        this.getData(this.currentYear);
    }

    render() {
        return (
            <div id="page">
                <PageHeader onSeasonSelect={this.changeSeason}></PageHeader>

                <main className="content-area">

                    <header className="content-header content-block">
                        <h1>Season</h1>
                    </header>
                    
                    <RaceResults races={this.state.races} />
                
                    <section className="content-block">
                        <DriverStandings standings={this.state.driverStandings} />
                    </section>

                    <section className="content-block">
                        <ConstructorStandings standings={this.state.constructorStandings} />
                    </section>

                    <section className="overlay">
                        <div className="loading-spinner"></div>
                    </section>

                </main>

            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);