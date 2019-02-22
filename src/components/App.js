import React, { Component } from 'react';
import '../styles/styles.scss';
import DataForm from './DataForm';
import ReactTable from './ReactTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnHeaders: ["Test Header 1", "Test Header 2", "Test Header 3"],
      rows: [["Test data 1", "Test data 2", "Test data 3"], ["Test data 4", "Test data 5", "Test data 6"]],
      colorOdd: '',
      colorEven: '',
      colorHeader: '',
      allowColHide: true
    };
  };

  handleChange = (e) => {
    const prop = e.target.id;
    if (e.target.value === '') {
      this.setState({[prop]: []});
      return;
    }
    if (prop === 'columnHeaders') {
      const array = e.target.value.split(',');
      this.setState({[prop]: array});
      return;
    }
    if (prop === 'rows') {
      let result = []
      const array = e.target.value.split('\n');
      for (let i = 0; i < array.length; i++) {
        let rowArray = array[i].split(',');
        result.push(rowArray);
      }
      this.setState({[prop]: result});
      return;
    }
    this.setState({[prop]: e.target.value});
  }

  toggleColHide = (e) => {
    console.log("here");
    e.preventDefault();
    this.setState(prevState => ({
      allowColHide: !prevState.allowColHide
    }));
  }

  handleColorChange = (e) => {
    const prop = e.target.id;
    let value = e.target.value;
    if (value[0] !== '#' && !isNaN(parseInt(value[0]))) {
      value = '#' + value;
    }
    this.setState({[prop]: value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            react-table-component
          </h1>
        </header>
        <DataForm 
          columnHeaders={this.state.columnHeaders}
          rows={this.state.rows}
          handleChange={this.handleChange}
          handleColorChange={this.handleColorChange}
          toggleColHide={this.toggleColHide}
        />
        <ReactTable 
          columnHeaders={this.state.columnHeaders}
          rows={this.state.rows}  
          colorOdd={this.state.colorOdd || undefined}
          colorEven={this.state.colorEven || undefined}
          colorHeader={this.state.colorHeader || undefined}
          allowColHide={this.state.allowColHide}
        />
      </div>
    );
  }
}

export default App;
