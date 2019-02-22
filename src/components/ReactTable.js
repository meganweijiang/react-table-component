import React, { Component } from 'react';
import DataTable from './DataTable';
import Filter from './Filter';
import ShowColumns from './ShowColumns';

class ReactTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: '',
      order: '',
      query: '',
      hiddenCols: [],
      hiddenRows: []
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    this.updateRows(nextProps, nextState);
  }

  // Update rows based on sorting by asc or desc
  updateRows = (nextProps, nextState) => {
    let rowsCopy = nextProps.rows;
    const sortOn = nextState.sortedBy.split('-').pop();
    if (nextState.order === 'asc') {
      this.sortByCol(rowsCopy, sortOn);
    }
    if (nextState.order === 'desc') {
      this.sortByCol(rowsCopy, sortOn).reverse();
    }    
  } 

  clearFilter = (e) => {
    this.setState({
      hiddenRows: [],
      query: ''
    });
  }

  // Update values shown by checking against query substring match
  updateByQuery = () => {
    const query = this.state.query;
    const currentRows = this.props.rows;
    const noMatch = [];
    for (let i = 0; i < currentRows.length; i++) {
      let found = false;
      for (let j = 0; j < currentRows[i].length; j++) {
        console.log(currentRows[i][j]);
        if (currentRows[i][j].includes(query)) {
          found = true;
          break;
        }
      }
      // If there isn't a match in the row, don't show it
      if (found === false) {
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
    this.setState({hiddenRows: [...noMatch]});
  } 

  handleFilterChange = (e) => {
    if (e.target.value === '') {
      this.clearFilter();
      return;
    }
    this.setState({query: e.target.value}, this.updateByQuery);
  }

  // Determine whether we are sorting asc or desc for a specific column
  handleSort = (e) => {
    if (this.state.order === '') {
      this.setState({
        sortedBy: e.target.id,
        order: 'asc'
      });
    }
    if (this.state.order === 'asc') {
      if (this.state.sortedBy === e.target.id) {
        this.setState({order: 'desc'});
      }
      else {
        this.setState({sortedBy: e.target.id});
      }
    }
    if (this.state.order === 'desc') {
      if (this.state.sortedBy === e.target.id) {
        this.setState({order: 'asc'});
      }
      else {
        this.setState({ 
          sortedBy: e.target.id,
          order: 'asc'
       });
      }
    }    
  }

  handleHideColumn = (e) => {
    const colNum = parseInt(e.target.id.split('-').pop());
    this.setState({hiddenCols: [...this.state.hiddenCols, colNum]});      
  }

  handleShowColumns = () => {
    this.setState({hiddenCols: []});      
  }

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
    for (let i = 0; i < this.props.columnHeaders.length; i++) {
      let headerID = `header-${i}`;
      let headerSubID = `headersub-${i}`;
      headers.push(<th key={headerID} className={ this.state.hiddenCols.includes(i) ? 'hide' : null }>
        <button id={headerID} className={ this.state.sortedBy === headerID ? this.state.order : null } 
        onClick={this.handleSort}>{this.props.columnHeaders[i]}</button></th>);
      if (this.props.allowColHide) {
        headerSub.push(<td key={headerSubID} className={this.state.hiddenCols.includes(i) ? 'hide' : 'subhead'}>
        <button onClick={this.handleHideColumn} className='subhead-button' id={headerSubID}>Hide Column</button></td>);
      }
    }
    table.push(<tr key="row0" id="row0">{headers}</tr>);
    table.push(<tr key="row0-sub" id="row0-sub">{headerSub}</tr>);

    // Create rows
    for (let i = 0; i < this.props.rows.length; i++) {
      let children = [];
      for (let j = 0; j < this.props.rows[0].length; j++) {
        let cellID = `cell${i}-${j}`;
        children.push(<td key={cellID} className={this.state.hiddenCols.includes(j) ? 'hide' : null } id={cellID}>{this.props.rows[i][j]}</td>);
      }
      let rowNum = `row${i+1}`;
      table.push(<tr key={rowNum} id={rowNum} className={this.state.hiddenRows.includes(i) ? 'hide' : null }>{children}</tr>);
    }
    return table;
  }

  render() {
    return (
      <div className="react-table-component">
        <DataTable 
          createTable={this.createTable} 
          columnHeaders={this.props.columnHeaders} 
          rows={this.props.rows} 
          colorOdd={this.props.colorOdd}
          colorEven={this.props.colorEven}
          colorHeader={this.props.colorHeader}
        />
        <ShowColumns 
          handleShowColumns={this.handleShowColumns} 
          hiddenCols={this.state.hiddenCols} 
        />
        <Filter 
          handleFilterChange={this.handleFilterChange} 
          clearFilter={this.clearFilter}
          query={this.state.query} 
          rows={this.props.rows}
        />
      </div>
    );
  }
}

ReactTable.defaultProps = {
  columnHeaders: [],
  rows: [],
  colorOdd: '#ffffff',
  colorEven: '#e5fcee',
  colorHeader: '#025b26',
  allowColHide: true
};

export default ReactTable;
