import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  tr:nth-child(odd) {
    background-color: ${props => props.colorOdd};
  }
  tr:nth-child(even) {
    background-color: ${props => props.colorEven};
  }
  th {
    background-color: ${props => props.colorHeader};
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
