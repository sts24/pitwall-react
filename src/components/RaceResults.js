import React from "react";
import modelStore from "../state";
import { observer } from "mobx-react";
import RaceTable from "./RaceTable";

@observer
export default class RaceResults extends React.Component {
    constructor(props) {
        super(props);
        this.modelStore = modelStore;
    }

    render() {
        let races = this.modelStore.races;
       
            return (
                <div className="race-results">
                    <header className="races-header">
                        <h2>Race Results</h2>
                    </header>

                    {races.map(race => (
                        <RaceTable results={race} key={race.round + '-' + race.date} />
                    ))}

                
                </div>
            )
        
    };

}