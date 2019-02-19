import React, { Component } from 'react';

class DataForm extends Component {
    render() {
      return (
        <div className="form-wrapper-table">
            <form>
                <ul>
                <li>
                    <span className="clearfix">Table Headers</span>
                    <p>Provide comma separated values with no spaces between values</p>
                    <input id="columnHeaders" name="columnHeaders" onChange={this.props.handleChange}/>
                </li>
                <li>
                    <span className="clearfix">Table Data</span>
                    <p>Provide comma separated values with no spaces between values, rows separated by line breaks</p>
                    <textarea id="rows" name="rows" onChange={this.props.handleChange}/>
                </li>
                </ul>
            </form>
        </div>
      );
    }
  }
  
  export default DataForm;