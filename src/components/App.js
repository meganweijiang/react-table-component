import React, { Component } from 'react';
import '../styles/styles.scss';
import ReactTable from './ReactTable';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            react-table-component
          </h1>
        </header>
        <ReactTable />
      </div>
    );
  }
}

export default App;
