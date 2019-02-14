import React, { Component } from 'react';
import debounce from 'lodash.debounce';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnHeaders: [],
      rows: [],
      sortedBy: '',
      order: '',
      query: '',
      hiddenCols: [],
      hiddenRows: []
    };
  };

  componentWillUpdate = (nextProps, nextState) => {
    this.updateRows(nextState);
  }

  // Update rows based on sorting by asc or desc
  updateRows = (nextState) => {
    let rowsCopy = nextState.rows;
    const sortOn = nextState.sortedBy.split('-').pop();
    if (nextState.order === 'asc') {
      this.sortByCol(rowsCopy, sortOn);
    }
    if (nextState.order === 'desc') {
      this.sortByCol(rowsCopy, sortOn).reverse();
    }    
  } 

  clearFilter = (e) => {
    this.setState({ hiddenRows: [], query: '' });
  }

  // Update values shown by checking against exact query match
  updateByQuery = () => {
    const query = this.state.query;
    const currentRows = this.state.rows;
    const noMatch = [];
    for (let i = 0; i < currentRows.length; i++) {
      // If there isn't a match in the row, don't show it
      if (!currentRows[i].includes(query)) {
        noMatch.push(i);
      }
      // If there is a match but the column is hidden, don't show it
      else {
        let matchIdx = currentRows[i].indexOf(query);
        if (this.state.hiddenCols.includes(matchIdx)) {
          noMatch.push(i);
        }
      }
    }
    this.setState({ hiddenRows: [ ...noMatch ]})
  } 

  handleChange = (e) => {
    e.persist();
    this.updateTable(e);
  }

  handleFilterChange = (e) => {
    this.setState({ query: e.target.value })
  }

  // Determine whether we are sorting asc or desc for a specific column
  handleSort = (e) => {
    if (this.state.order === '') {
      this.setState({
        sortedBy: e.target.id,
        order: 'asc'
      })
    }
    if (this.state.order === 'asc') {
      if (this.state.sortedBy === e.target.id) {
        this.setState({ order: 'desc' })
      }
      else {
        this.setState({ sortedBy: e.target.id })
      }
    }
    if (this.state.order === 'desc') {
      if (this.state.sortedBy === e.target.id) {
        this.setState({ order: 'asc' })
      }
      else {
        this.setState({ 
          sortedBy: e.target.id,
          order: 'asc'
       })
      }
    }    
  }

  handleHideColumn = (e) => {
    const colNum = parseInt(e.target.id.split('-').pop());
    this.setState({ hiddenCols: [...this.state.hiddenCols, colNum] });      
  }

  handleShowColumns = () => {
    this.setState({ hiddenCols: [] });      
  }

  // Update table values as user is typing. Debounce to stop stack overflow.
  updateTable = debounce((e) => {
    const prop = e.target.id;
    if (prop === 'columnHeaders') {
      const array = e.target.value.split(',');
      this.setState({ [prop]: array })
      return
    }
    if (prop === 'rows') {
      let result = []
      const array = e.target.value.split('\n');
      for (let i = 0; i < array.length; i++) {
        let rowArray = array[i].split(',');
        result.push(rowArray);
      }
      this.setState({ [prop]: result })
      return
    }
    this.setState({ [prop]: e.target.value })
  }, 200);

  // Sorting algorithm
  sortByCol = (arr, col) => {
    const sortFunction = (a, b) => {
      if (a[col] === b[col]) {
        return 0;
      }
      else {
        return (a[col] < b[col]) ? -1 : 1;
      }
    }

    arr.sort(sortFunction);
    return arr;
  }

  // Generate the table from input values
  createTable = () => {
    let table = [];
    let headers = [];
    let headerSub = [];

    // Create headers and sub headers (hide column buttons)
    for (let i = 0; i < this.state.columnHeaders.length; i++) {
      let headerID = `header-${i}`;
      let headerSubID = `headersub-${i}`;
      headers.push(<th key={headerID} className={ this.state.hiddenCols.includes(i) ? 'hide' : null }>
        <button id={headerID} className={ this.state.sortedBy === headerID ? this.state.order : null } 
        onClick={this.handleSort}>{this.state.columnHeaders[i]}</button></th>);
      headerSub.push(<td key={headerSubID} className={this.state.hiddenCols.includes(i) ? 'hide' : 'subhead'}>
        <button onClick={this.handleHideColumn} className='subhead-button' id={headerSubID}>Hide Column</button></td>);
    }
    table.push(<tr key="row0" id="row0">{headers}</tr>);
    table.push(<tr key="row0-sub" id="row0-sub">{headerSub}</tr>);

    // Create rows
    for (let i = 0; i < this.state.rows.length; i++) {
      let children = [];
      for (let j = 0; j < this.state.rows[0].length; j++) {
        let cellID = `cell${i}-${j}`;
        children.push(<td key={cellID} className={this.state.hiddenCols.includes(j) ? 'hide' : null } id={cellID}>{this.state.rows[i][j]}</td>);
      }
      let rowNum = `row${i+1}`;
      table.push(<tr key={rowNum} id={rowNum} className={this.state.hiddenRows.includes(i) ? 'hide' : null }>{children}</tr>);
    }
    return table;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            react-table-component
          </h1>
        </header>
        <div className="form-wrapper-table">
          <form>
            <ul>
              <li>
                <span className="clearfix">Table Headers</span>
                <p>Provide comma separated values with no spaces between values</p>
                <input id="columnHeaders" name="columnHeaders" onChange={this.handleChange}/>
              </li>
              <li>
                <span className="clearfix">Table Data</span>
                <p>Provide comma separated values with no spaces between values, rows separated by line breaks</p>
                <textarea id="rows" name="rows" onChange={this.handleChange}/>
              </li>
            </ul>
          </form>
        </div>
        <div className="table-wrapper">
          { this.state.columnHeaders.length > 0 || this.state.rows.length > 0 ?
            (
              <table><tbody>{this.createTable()}</tbody></table>
            ) : (
              <p>Begin entering data and table will display here. Make sure all rows have the same number of records as the number of headers.</p>
            )
          }
        </div>
          { this.state.hiddenCols.length > 0 && <button className="show-cols clear-fix" onClick={this.handleShowColumns}>Show All Columns</button> }
          { this.state.rows.length > 0 && 
            (
              <div className="filter clear-fix"><span>Filter</span>
                <input id="filter" name="filter" value={this.state.query} onChange={this.handleFilterChange} />
                <div className="filter-button-wrapper">
                  <button className="filter-button" id="submit-filter" type="submit" onClick={this.updateByQuery}>Submit</button>
                  <button className="clear-filter-button" id="clear-filter" type="reset" onClick={this.clearFilter}>Clear</button>
                </div>
              </div>
            ) 
          }
      </div>
    );
  }
}

export default Table;