import React, {Component} from 'react';
import store from "../store/index";
import {deletePayment, editPayment} from "../actions/index";
import "react-datepicker/dist/react-datepicker.css";
import EditPaymentRow from "./EditPaymentRow";


class PaymentRow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }


  deletePayment() {
    let {paymentId} = this.props.payment;
    let deleteConfirm = window.confirm("Are you sure you want to delete payment with ID: "+ paymentId);

    if(deleteConfirm) {
      store.dispatch(deletePayment(paymentId));
    }
  }

  setEditMode(setValue) {
    this.setState({
      editMode: setValue
    })
  }

  saveEditPayment(payment) {
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
      store.dispatch(editPayment(payment));
    } else {
      alert("Invalid values for: " + invalid.toString())
    }
  }

  render () {
    const {payment} = this.props;
    const editMode = this.state.editMode;

    if(editMode) {
      return <EditPaymentRow payment={payment}
                             onCancel={()=>{this.setEditMode(false)}}
                             onSave={(payment) => this.saveEditPayment(payment)}/>
    }

    return (
      <tr>
        <td>{payment.paymentId}</td>
        <td>{payment.orderDate}</td>
        <td>{payment.amount}</td>
        <td>{payment.merchantId}</td>
        <td>{payment.customerEmail}</td>
        <td>{payment.paymentStatus}</td>
        <td>
          <i className="fa fa-trash" onClick={() => this.deletePayment()}/>
          <i className="fa fa-edit" onClick={() => this.setEditMode(true)}/>
        </td>
      </tr>
    )
  }
}

export default PaymentRow


