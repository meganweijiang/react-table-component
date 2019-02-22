import React from 'react';

const parseRows = (rows) => {
  return rows.join("\n");
}

const DataForm = (props) => (
  <div className="form-wrapper-table">
    <form>
      <ul>
        <li>
          <span className="clearfix">Table Headers</span>
          <p>Provide comma separated values with no spaces between values</p>
          <input id="columnHeaders" name="columnHeaders" value={props.columnHeaders} onChange={props.handleChange}/>
        </li>
        <li>
          <span className="clearfix">Table Data</span>
          <p>Provide comma separated values with no spaces between values, rows separated by line breaks</p>
          <textarea id="rows" name="rows" value={parseRows(props.rows)} onChange={props.handleChange}/>
        </li>
      </ul>
      <ul className="table-colors">
        <li>
          <span>Table heading color</span><input id="colorHeader" value={props.colorHeader} onChange={props.handleColorChange} />
        </li>
        <li>
          <span>Table odd row color</span><input id="colorOdd" value={props.colorOdd} onChange={props.handleColorChange} />
        </li>
        <li>
          <span>Table even row color</span><input id="colorEven" value={props.colorEven} onChange={props.handleColorChange} />
        </li>
      </ul>
      <button onClick={props.toggleColHide}>Toggle Column Hiding</button>
    </form>
  </div>
)
  
export default DataForm;