import React from 'react';

const DataForm = (props) => (
  <div className="form-wrapper-table">
    <form>
      <ul>
      <li>
        <span className="clearfix">Table Headers</span>
        <p>Provide comma separated values with no spaces between values</p>
        <input id="columnHeaders" name="columnHeaders" onChange={props.handleChange}/>
      </li>
      <li>
        <span className="clearfix">Table Data</span>
        <p>Provide comma separated values with no spaces between values, rows separated by line breaks</p>
        <textarea id="rows" name="rows" onChange={props.handleChange}/>
      </li>
      </ul>
    </form>
  </div>
)
  
export default DataForm;