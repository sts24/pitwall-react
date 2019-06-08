import React from "react";

export default class ConstructorStandings extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <section className="standings-table">

                <header>
                    <h2>Constructor's Championship</h2>
                </header>

                <div className="chart-wrap">
                    <table className="chart show-all">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Constructor</th>
                                <th>Points</th>
                                <th>Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.standings.map(c => (
                                    <tr key={c.Constructor.name}>
                                        <td>{c.position}</td>
                                        <td>
                                            <a href={c.Constructor.url} target="_blank">{c.Constructor.name}</a>
                                            <img className="nation-flag" />
                                        </td>
                                        <td>{c.points}</td>
                                        <td>{c.wins}</td>
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