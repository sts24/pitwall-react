import React from 'react';

export default class RaceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    gridDiff(car){
        let gridDiff = (car.grid - car.position);
		return gridDiff;
    }

    render(){
        if(!this.state.hasError){
            return(
                <section className="race-table">

                    <header>
                        <h2>{ }</h2>
                        <h3><a  target="_blank">{this.props.results.Circuit.circuitName}</a></h3>
                        <small>Round {this.props.results.round} •  • RACE_DATE • <a target="_blank">Read on Wikipedia</a></small>
                    </header>

                    <div className="chart-wrap">
                        <table className="chart">
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
                                    this.props.results.Results.map(car => (
                                        <tr key={car.Driver.code}>
                                            <td>{car.positionText}</td>
                                            <td><span className="grid-change grid-up">{this.gridDiff(car)}</span></td>
                                            <td><span className="grid-change grid-down">{Math.abs(this.gridDiff(car))}</span></td>
                                            <td></td>
                                            <td>
                                                <a  target="_blank">{car.Driver.givenName} {car.Driver.familyName}</a> 
                                                <img className="nation-flag" /></td>
                                            <td>{car.grid}</td>
                                            <td>{car.number}</td>
                                            <td>
                                                <a target="_blank">{car.Constructor.name}</a>
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
                            <tfoot>
                                <tr>
                                    <td colSpan="10">
                                        <button className="show-all-btn">Show Entire Results</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </section>
            )
        }
    }
}