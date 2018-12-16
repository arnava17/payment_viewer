import React from 'react';
import Paginator from "./Paginator";
import store from "../store/index";
import {addPayment, setCurrentPage, setMaxResults, setSortBy} from "../actions/index";
import './PaymentTable.scss';
import PaymentRow from "../containers/PaymentRow";
import EditPaymentRow from "../containers/EditPaymentRow";

class PaymentTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      editMode : false
    };

    this.headers = {
      paymentId : 'Payment ID',
      orderDate : 'Order Date',
      amount : 'Amount',
      merchantId : 'Merchant ID',
      customerEmail : 'Customer Email',
      paymentStatus : 'Status',
    }
  }

  handlePageChange(pageNumber) {
    store.dispatch(setCurrentPage(parseInt(pageNumber)));
  }

  handleMaxResultsChange(maxRes) {
    store.dispatch(setMaxResults(parseInt(maxRes)));
  }

  setEditMode(setValue) {
    this.setState({editMode: setValue})
  }

  addNewPayment(payment) {
    let valid = true;
    let invalid = [];
    Object.keys(payment).forEach((key) => {
      if(!payment[key]) {
        invalid.push(key);
        valid = false
      }
    });

    if (valid) {
      this.setState({editMode: false});
      store.dispatch(addPayment(payment));
    } else {
      alert("Invalid values for: " + invalid.toString())
    }
  }

  handleSortByChange(e, sortBy) {
    let {field, asc} = sortBy;
    if(field === e.currentTarget.dataset.value) {
      asc = !asc;
    } else {
      field = e.currentTarget.dataset.value;
    }
    store.dispatch(setSortBy({field, asc}));
  }

  render() {
    const {payments} = this.props;

    if(payments.length === 0 ){
      return <div className="no-result">No Payments Found</div>
    }

    const {currentPage, maxResults, sortBy} = store.getState().filters;
    const index = (currentPage-1)*maxResults;
    const results = payments.slice(index, index+maxResults);
    const {editMode} = this.state;

    return (
      <div className="payment-table">
        <button className="add-btn" onClick={() => {this.setEditMode(true)}} disabled={editMode}>Add Payment</button>
        <table>
          <thead>
          <tr>
            { Object.entries(this.headers).map((entry, index) => {
              return (
                <th key={index} onClick={(e) => {this.handleSortByChange(e, sortBy)}}
                    data-value={entry[0]}>
                  <div>
                    <span>{entry[1]}</span>
                    <span className={sortBy.field !==entry[0]?`fa fa-sort`:`fa fa-sort-${sortBy.asc?'asc':'desc'}`}/>
                  </div>
                </th>
              )
              })
            }
            <th/>
          </tr>
          </thead>
          <tbody>
          { editMode &&
          <EditPaymentRow onCancel={() => this.setEditMode(false)}
                          onSave={(payment) => this.addNewPayment(payment)}/>
          }
          { results.map((payment) => {
            return (
              <PaymentRow payment={payment} key={payment.paymentId}/>
            )})
          }
          </tbody>
        </table>

        <Paginator results={payments.length}
                   onPageChange={(c) => this.handlePageChange(c)}
                   onMaxResultsChange={(c) => this.handleMaxResultsChange(c)}
                   currentPage={currentPage}
                   maxResults={maxResults}/>
      </div>
    )
  }
}

export default PaymentTable;

