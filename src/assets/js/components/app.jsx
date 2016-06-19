import React, {Component}from 'react';
import {render} from 'react-dom';

import PageTitle from './pageTitle/pageTitle.jsx';
import Footer from './footer/footer.jsx';
import styles from './app.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            clickCount: 0,
        };
    }
    render() {
        return(
            <div>
                <PageTitle></PageTitle>
                <div className={styles.limeBackground}>
                    <a href="" onClick={this.handleClick.bind(this)}> Click Aqui por Favor: {this.state.clickCount}</a>
                </div>
                <Footer></Footer>
            </div>
            
        );
    }
    handleClick(event) {
        event.preventDefault();
        this.setState({
            clickCount: this.state.clickCount + 1,
        });
    }
}

export default App;
