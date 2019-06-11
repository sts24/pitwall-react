import React from "react";
import modelStore from "../state";
import { observer } from "mobx-react";

@observer
export default class PageHeader extends React.Component {

    constructor(props) {
        super(props);
        this.modelStore = modelStore;
        this.seasonSelect = this.seasonSelect.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.state = {
            seasons: []
        }
    }

    componentDidMount() {
        // this will prefill season select menu with all years since 1950
        let currentYear = new Date().getFullYear();
        let yearList = [];
        for(let year = 1950; year <= currentYear; year++){
            yearList.push(year);
        }

        this.setState({
            seasons: yearList.reverse()
        });
    }

    seasonSelect(e){
        this.modelStore.getData(e.target.value);
    }

    changeTab(value,e){
        e.preventDefault();
        this.modelStore.setViewOptions({
            selectedTab: value
        });
    }

    render(){
        return(
        <header className="header">
            <div className="header-contents">
                <img src="./src/assets/images/pitwall-stacked-white.svg" className="site-title" />
                
                <nav className="data-selection">
                    
                    <label>Select a Season</label>
                    <div className="season-select-wrapper">
                        <select id="season-select" className="season-select" onChange={this.seasonSelect}>
                            {
                                this.state.seasons.map(season => (
                                    <option value={season} key={season}>{season}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <ul className="site-nav">
                        <li><button className="site-nav-button" onClick={(e) => this.changeTab('races',e)}>Race Results</button></li>
                        <li><button className="site-nav-button" onClick={(e) => this.changeTab('drivers',e)}>Driver's Championship</button></li>
                        <li><button className="site-nav-button" onClick={(e) => this.changeTab('constructors',e)}>Constructor's Championship</button></li>
                    </ul>

                    <div className="info">
                        <p>Pitwall was created by <a href="https://www.smithscott.net" target="_blank">Scott Smith</a>. Learn more about this project <a href="https://github.com/sts24/pitwall-2" target="_blank">on the GitHub page.</a></p>
                    </div>

                </nav>
            </div>
        </header>
        )
    };

}