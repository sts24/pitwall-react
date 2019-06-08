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
        this.changeTab = this.changeTab.bind(this);
        this.currentYear = new Date().getFullYear();
        this.state = {
            races: [],
            driverStandings: [],
            constructorStandings: [],
            viewOptions: {
                seasonSelect: '',
                selectedTab: 'races',
                loading: false,
                error: false
            }
        }
    }

    changeSeason(newSeason){
        this.getData(newSeason);
    }

    changeTab(newTab){
        this.setState({
            viewOptions: {
                selectedTab: newTab
            }
        })
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
                .then(function(){
                    
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
        let selectedTab;

        if(this.state.viewOptions.selectedTab == 'races'){
            selectedTab = <RaceResults races={this.state.races} />;
        } else if(this.state.viewOptions.selectedTab == 'drivers'){
            selectedTab = <DriverStandings standings={this.state.driverStandings} />;
        } else if(this.state.viewOptions.selectedTab == 'constructors'){
            selectedTab = <ConstructorStandings standings={this.state.constructorStandings} />;
        }

        let loadingOverlay;
        if(this.state.viewOptions.loading == true){
            loadingOverlay = <section className="overlay">
                <div className="loading-spinner"></div>
            </section>;
        }

        return (
            <div id="page">
                <PageHeader onSeasonSelect={this.changeSeason} onChangeTab={this.changeTab}></PageHeader>

                <main className="content-area">

                    <header className="content-header content-block">
                        <h1>Season</h1>
                    </header>
                    
                    <section className="content-block">
                        {selectedTab}
                    </section>

                    {loadingOverlay}

                </main>

            </div>
        );
    }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);