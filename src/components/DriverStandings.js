import React from "react";



export default class DriverStandings extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <section className="standings-table">

                <header>
                    <h2>Driver's Championship</h2>
                </header>

                <div className="chart-wrap">
                    <table className="chart show-all">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Constructor</th>
                                <th>Points</th>
                                <th>Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.standings.map(driver => (
      
                                <tr key={driver.Driver.code}>
                                    <td>{driver.position}</td>
                                    <td>
                                        <a href={driver.Driver.url} target="_blank">{driver.Driver.givenName + ' ' + driver.Driver.familyName}</a> 
                                        <img className="nation-flag" />
                                    </td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                    <td>{driver.wins}</td>
                                </tr>
                            
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </section>
        )
    };

}