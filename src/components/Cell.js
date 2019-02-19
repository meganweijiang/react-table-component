import React from 'react';

const Cell = (props) => (
    props.type === 'header' ?
      (<th key={headerID} className={ this.state.hiddenCols.includes(i) ? 'hide' : null }>
    <button id={headerID} className={ this.state.sortedBy === headerID ? this.state.order : null } 
    onClick={this.handleSort}>{this.state.columnHeaders[i]}</button></th>)
    :
    (<td key={headerSubID} className={this.state.hiddenCols.includes(i) ? 'hide' : 'subhead'}>
        <button onClick={this.handleHideColumn} className='subhead-button' id={headerSubID}>Hide Column</button></td>)
)

export default Cell;
