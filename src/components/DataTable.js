import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  tr:nth-child(odd) {
    background-color: ${props => props.color1 ? props.color1 : "#ffffff"};
  }
  tr:nth-child(even) {
    background-color: ${props => props.color2 ? props.color2 : "#e5fcee"};
  }
  th {
    background-color: ${props => props.thcolor ? props.thcolor: "#025b26"};
  }
`;

const DataTable = (props) => (
  <div className="table-wrapper">
  { props.columnHeaders.length > 0 || props.rows.length > 0 ?
    (
      <StyledTable color1={props.color1} color2={props.color2} thcolor={props.thcolor}>
        <tbody>
            {props.createTable()}
        </tbody>
      </StyledTable>
    ) : (
      <p>Begin entering data and table will display here. Make sure all rows have the same number of records as the number of headers.</p>
    )
  }
  </div>
)

export default DataTable;
