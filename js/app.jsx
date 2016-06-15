import React, {Component}from 'react';
import {render} from 'react-dom';

class App extends Component {
    constructor() {
        super();
        this.state = {
            clickCount: 0,
        };
    }
    render() {
        return(<div>
            <a href="" onClick={this.handleClick.bind(this)}> Click Aqui: {this.state.clickCount}</a>
        </div>);
    }
    handleClick(event) {
        event.preventDefault();
        this.setState({
            clickCount: this.state.clickCount + 1,
        });
    }
}

export default App;
