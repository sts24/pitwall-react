import React from "react";
import RaceTable from "./RaceTable";

export default class RaceResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="race-results">
                <header className="races-header">
                    <h2>Race Results</h2>
        
                    <button className="button">Sort By Oldest First</button>
                    <button className="button">Sort By Newest First</button>
        
                </header>

                {
                    this.props.races.map(race => (
                        <RaceTable results={race} key={race.round + '-' + race.date} />
                    ))
                }
            </div>
        )
    };

}