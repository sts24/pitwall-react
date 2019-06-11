import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import modelStore from "./src/state.js";

import './src/assets/sass/pitwall.scss';

import PageHeader from "./src/components/PageHeader";
import ConstructorStandings  from "./src/components/ConstructorStandings";
import DriverStandings from "./src/components/DriverStandings";
import RaceResults from "./src/components/RaceResults";


@observer
class App extends React.Component {

    constructor(props) {
        super(props);
        this.currentYear = new Date().getFullYear();
        this.modelStore = this.props.modelStore;
        this.state = {
            races: [],
            driverStandings: [],
            constructorStandings: [],
            seasonSelect: '',
            selectedTab: 'races',
            loading: true,
            error: false
        }

        this.modelStore.getData(this.currentYear);
    }

    render() {

        return (
            <div id="page">
                <PageHeader></PageHeader>

                <main className="content-area">

                    <header className="content-header content-block">
                        <h1>{this.modelStore.viewOptions.seasonSelect} Season</h1>
                    </header>
                    
                    <section className="content-block">
                        	
                        {this.modelStore.viewOptions.selectedTab == 'races' &&
                            <RaceResults />
						}
						
                        {this.modelStore.viewOptions.selectedTab == 'drivers' &&
							<DriverStandings />
        				} 
						
                        {this.modelStore.viewOptions.selectedTab == 'constructors' &&
							<ConstructorStandings />
						}
                        	
                    </section>

                </main>

            </div>
        );
    }
}


ReactDOM.render(<App modelStore={modelStore} />, document.getElementById("app"));