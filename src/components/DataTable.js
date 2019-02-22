import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  tr:nth-child(odd) {
    background-color: ${props => props.colorOdd ? props.colorOdd : "#ffffff"};
  }
  tr:nth-child(even) {
    background-color: ${props => props.colorEven ? props.colorEven : "#e5fcee"};
  }
  th {
    background-color: ${props => props.colorHeader ? props.colorHeader: "#025b26"};
  }
`;

const DataTable = (props) => (
  <div className="table-wrapper">
    <StyledTable colorOdd={props.colorOdd} colorEven={props.colorEven} colorHeader={props.colorHeader}>
      <tbody>
          {props.createTable()}
      </tbody>
    </StyledTable>
  </div>
)

export default DataTable;
