import React, { Component } from 'react';
import './App.css';

import web3 from './ethereum/web3';
import salesContract from './ethereum/SalesContract';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      inputValue: '',
    }
  }

  async componentDidMount() {
    this.contractInstance = await salesContract;
    let message = await this.contractInstance.message.call();
    this.setState({ message });
    this.contractInstance.MessageEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event)=>{  //it is important to use arrow function here. Otherwise, 'this' will be lost.
      let message = event.args.message;
      this.setState({ message, inputValue: "" });
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await this.contractInstance.setMessage(this.state.inputValue, { from: accounts[0] })
    this.setState({
      message: "",
      inputValue: ""
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React on Ethereum!</h1>
        </header>
        <p className="App-intro">
          {
            this.state.message? this.state.message: "Loading..."
          }
        </p>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
