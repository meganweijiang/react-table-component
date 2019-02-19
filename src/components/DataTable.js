import React from 'react';

const DataTable = (props) => (
  <div className="table-wrapper">
  { props.columnHeaders.length > 0 || props.rows.length > 0 ?
    (
      <table>
        <tbody>
          {props.createTable()}
        </tbody>
      </table>
    ) : (
      <p>Begin entering data and table will display here. Make sure all rows have the same number of records as the number of headers.</p>
    )
  }
  </div>
)

export default DataTable;
