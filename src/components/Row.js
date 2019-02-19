import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    return (
      <tr key={this.props.rowKey} id={this.props.rowId} className={this.props.hiddenRows.includes(this.props.currentRow) ? 'hide' : null}>{this.props.cells}</tr>
    )
  }
}

export default Row;
