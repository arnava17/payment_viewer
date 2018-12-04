import React, {Component} from "react";
import './Paginator.scss';

class Paginator extends Component {

  constructor(props){
    super(props);

    this.resultPerPageOptions = ['ALL',1, 2, 3, 4, 5];

    this.handleCurrentPageChange = this.handleCurrentPageChange.bind(this);
    this.handleMaxResultsChange = this.handleMaxResultsChange.bind(this);
  }

  handleCurrentPageChange(e) {
    this.props.onPageChange(e.target.value);
  }

  handleMaxResultsChange(e) {
    this.props.onMaxResultsChange(e.target.value);
  }


  render() {
    const {maxResults, currentPage, results} = this.props;
    const totalPages = Math.ceil(results/maxResults);

    return (
      <div className="paginator">
         <label htmlFor="max-results">Results per page:</label>
         <select id="max-results"
                 value={maxResults}
                 onChange={this.handleMaxResultsChange}>
           { this.resultPerPageOptions.map((option) => {
             return (
               <option key={option} value={option==='ALL'?results:option}>{option}</option>
             )
           })

           }
         </select>
        <div>
         <button disabled={currentPage === 1}
           value={-1} onClick={this.handleCurrentPageChange} className="fa fa-arrow-left"/>
         <label>{currentPage} of {totalPages}</label>
         <button disabled={currentPage === totalPages}
           value={1} onClick={this.handleCurrentPageChange} className="fa fa-arrow-right"/>

        </div>
      </div>
    )
  }
}

export default Paginator;