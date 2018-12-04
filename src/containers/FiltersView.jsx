import React, {Component} from "react";
import store from "../store/index";
import {setSearchTerm, setSortBy, setStatusFilter} from "../actions/index";
import SearchBar from "../components/SearchBar";
import './FiltersView.scss';

class FiltersView extends Component {

  handleSearchTermChange(term) {
    store.dispatch(setSearchTerm(term));
  }

  handleSortByChange(e) {
    store.dispatch(setSortBy(e.target.value));
  }

  handleStatusFilterChange(e) {
    store.dispatch(setStatusFilter(e.target.value))
  }

  render() {
    const {sortBy, searchTerm, paymentStatus} =  store.getState().filters;

    return (
      <div className="filters-view">
        <SearchBar value={searchTerm} onChange={(e) => {this.handleSearchTermChange(e)}}/>
        <form>
          <label>Sort By:
            <select value={sortBy} onChange={(e) => {this.handleSortByChange(e)}}>
              <option value="paymentId">Payment ID</option>
              <option value="orderDate">Order Date</option>
              <option value="amount">Amount</option>
            </select></label>
          <label>Status:
            <select value={paymentStatus} onChange={(e) => {this.handleStatusFilterChange(e)}}>
              <option value="">ALL</option>
              <option value="Initiated">Initiated</option>
              <option value="Refunded">Refunded</option>
              <option value="Success">Success</option>
              <option value="Dropped">Dropped</option>
              <option value="Failed">Failed</option>
            </select></label>
        </form>
      </div>

    )
  }
}

export default FiltersView;