import React from 'react';


export default class RaceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
	        hasError: false,
            showAll: false,
            loading: true
	    };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    gridDiff(car){
        let gridData;
        let gridChange = (car.grid - car.position);

        if(gridChange > 0){
            gridData = <td><span className="grid-change grid-up">{gridChange}</span></td>;
        } else if(gridChange < 0){
            gridData = <td><span className="grid-change grid-down">{Math.abs(gridChange)}</span></td>;
        } else {
            gridData = <td></td>;
        }

		return gridData;
    }

    formatDate(raceDate){
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let raceUTC = new Date(raceDate);

        return months[raceUTC.getMonth()] + ' ' + raceUTC.getDate() + ', ' + raceUTC.getFullYear();
    }
    
    showAllToggle(e){
	    e.preventDefault();
	    
	    this.setState({
		    showAll: !this.state.showAll
	    });
    }

    componentDidMount() {
       
        // this.setState({
        //     loading: false
        // });
    }

    render(){
        if(!this.state.hasError){

            const race = this.props.results;
        
            return (
                <section className="race-table">

                    <header>
                        <h2>{race.raceName}</h2>
                        <h3><a href={race.Circuit.url} target="_blank">{race.Circuit.circuitName}</a></h3>
                        <small>Round {race.round} • {race.Circuit.Location.locality}, {race.Circuit.Location.country} • {this.formatDate(race.date)} • <a href={race.url} target="_blank">Read on Wikipedia</a></small>
                    </header>

                    <div className="chart-wrap">
                        <table className={this.state.showAll ? 'chart show-all' : 'chart'}>
                            <thead>
                                <tr>
                                    <th className="th-pos">Pos</th>
                                    <th><span className="hide">Position Change</span></th>
                                    <th>Driver</th>
                                    <th>Grid</th>
                                    <th>No.</th>
                                    <th>Car</th>
                                    <th>Fastest Lap</th>
                                    <th>Laps</th>
                                    <th>Time</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    race.Results.map(car => (
                                        <tr key={car.Driver.code}>
                                            <td>{car.positionText}</td>
                                            {this.gridDiff(car)}
                                            <td>
                                                <a href={car.Driver.url} target="_blank">{car.Driver.givenName} {car.Driver.familyName}</a>
                                                <img className="nation-flag" /></td>
                                            <td>{car.grid}</td>
                                            <td>{car.number}</td>
                                            <td>
                                                <a href={car.Constructor.url} target="_blank">{car.Constructor.name}</a>
                                                <img className="nation-flag" />
                                            </td>
                                            <td>{car.FastestLap ? car.FastestLap.Time.time : ''}</td>
                                            <td>{car.laps}</td>
                                            <td>{car.Time ? car.Time.time : ''}</td>
                                            <td>{car.points}</td>
                                        </tr>
                                    ))
                                }
                            
                            </tbody>
                        
                            {this.state.showAll === false &&
                                <tfoot>
                                    <tr>
                                        <td colSpan="10">
                                            <button className="show-all-btn" onClick={this.showAllToggle.bind(this)}>Show Entire Results</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            }
                        </table>
                    </div>

                </section>
            )
                
          

        }
    }
}

