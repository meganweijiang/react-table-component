import React from 'react';

const ShowColumns = (props) => (
  <div>
  { 
    props.hiddenCols.length > 0 
    && 
    <button className="show-cols clear-fix" onClick={props.handleShowColumns}>Show All Columns</button> 
  }
  </div>
)

export default ShowColumns;