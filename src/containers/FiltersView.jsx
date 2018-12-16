import React, {Component} from "react";
import store from "../store/index";
import {setSearchTerm, setSortBy, setStatusFilter} from "../actions/index";
import SearchBar from "../components/SearchBar";
import './FiltersView.scss';
import PAYMENT_STATUS from '../constants/paymentStatus';

class FiltersView extends Component {

  constructor(props) {
    super(props);

    this.sortFields = {
      paymentId : 'Payment ID',
      orderDate : 'Order Date',
      amount : 'Amount',
      merchantId : 'Merchant ID',
      customerEmail : 'Customer Email',
      paymentStatus : 'Status',
    }
  }

  handleSearchTermChange(term) {
    store.dispatch(setSearchTerm(term));
  }

  handleSortByChange(e, sortBy) {
    let {field, asc } = sortBy;

    if(e.target.name==='asc-order') {
      asc = e.target.value==="true";
    } else {
      field = e.target.value;
    }
    store.dispatch(setSortBy({field, asc}));
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
          <label className='sort-by-label'>Sort By:
            <select name='sort-field' value={sortBy.field} onChange={(e) => {this.handleSortByChange(e, sortBy)}}>
              { Object.entries(this.sortFields).map(([field, label]) => {
                  return <option key={field} value={field}>{label}</option>
                })
              }
            </select></label>
          <label className='order-by-label'>Sort By:
            <select name='asc-order' value={sortBy.asc} onChange={(e) => {this.handleSortByChange(e, sortBy)}}>
              <option value={true}>Low to High</option>
              <option value={false}>High to low</option>
            </select></label>
          <label>Status:
            <select value={paymentStatus} onChange={(e) => {this.handleStatusFilterChange(e)}}>
              <option value="">ALL</option>
              { Object.values(PAYMENT_STATUS).map((status) => {
                return <option key = {status} value={status}>{status}</option>
              })
              }
            </select></label>
        </form>
      </div>

    )
  }
}

export default FiltersView;