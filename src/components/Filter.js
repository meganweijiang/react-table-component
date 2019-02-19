import React from 'react';

const Filter = (props) => (
  <div>
  { props.rows.length > 0 && 
    (
      <div className="filter clear-fix"><span>Filter</span>
        <input id="filter" name="filter" value={props.query} onChange={props.handleFilterChange} />
        <div className="filter-button-wrapper">
          <button className="clear-filter-button" id="clear-filter" type="reset" onClick={props.clearFilter}>Clear</button>
        </div>
      </div>
    ) 
  }
  </div>
)

export default Filter;
