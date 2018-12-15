import React from 'react';
import Paginator from "./Paginator";
import store from "../store/index";
import {addPayment, setCurrentPage, setMaxResults} from "../actions/index";
import './PaymentTable.scss';
import PaymentRow from "../containers/PaymentRow";
import EditPaymentRow from "../containers/EditPaymentRow";

class PaymentTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      editMode : false
    };
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

  render() {
    const {payments} = this.props;

    if(payments.length === 0 ){
      return <div className="no-result">No Payments Found</div>
    }

    const {currentPage, maxResults} = store.getState().filters;
    const index = (currentPage-1)*maxResults;
    const results = payments.slice(index, index+maxResults);
    const {editMode} = this.state;

    return (
      <div className="payment-table">
        <table>
          <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order Date</th>
            <th>Amount</th>
            <th>Merchant ID</th>
            <th>Customer Email</th>
            <th>Status</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          { results.map((payment) => {
            return (
              <PaymentRow payment={payment} key={payment.paymentId}/>
            )})
          }
          { editMode &&
          <EditPaymentRow onCancel={() => this.setEditMode(false)}
                          onSave={(payment) => this.addNewPayment(payment)}/>
          }
          </tbody>
        </table>
        <button className="add-btn" onClick={() => {this.setEditMode(true)}} disabled={editMode}>Add Payment</button>
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

