import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './EditPaymentRow.scss';

class EditPaymentRow extends Component{

  constructor(props) {
    super(props);
    let {payment} = this.props;

    if(payment) {
      this.state = {
        ...payment
      }
    } else {
      this.state = {
        paymentId : RandomID(),
        orderDate : formatDate(new Date()),
        merchantId: '',
        paymentStatus: 'Initiated',
        amount : 0.0,
        customerEmail: ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name] : value
    })
  }

  handleDateChange(date) {
    this.setState({
      orderDate : formatDate(date)
    })
  }

  render() {
    const {paymentId, merchantId, amount, orderDate, customerEmail, paymentStatus} = this.state;

    const payment = { paymentId, merchantId, amount, orderDate, customerEmail, paymentStatus };

    return (
      <tr className="edit-payment">
        <td>{paymentId}</td>
        <td>
          <DatePicker name="orderDate"
                      selected={new Date(orderDate)}
                      onChange={this.handleDateChange}
                      dateFormatCalendar="MM/dd/yyyy" withPortal={window.innerWidth < 520}/>
        </td>
        <td><input type="number" step="0.01" name="amount" value={amount} onChange={this.handleChange}/></td>
        <td><input type="number" name="merchantId" value={merchantId} onChange={this.handleChange}/></td>
        <td><input type="email" name="customerEmail" value={customerEmail} onChange={this.handleChange}/></td>
        <td>
          <select type="text" name="paymentStatus" value={paymentStatus} onChange={this.handleChange}>
            <option value="Initiated">Initiated</option>
            <option value="Failed">Failed</option>
            <option value="Dropped">Dropped</option>
            <option value="Success">Success</option>
            <option value="Refunded">Refunded</option>
          </select>
        </td>
        <td>
          <i onClick={(e) => this.props.onSave(payment)} className="fa fa-save"/>
          <i onClick={() => this.props.onCancel()} className="fa fa-times-rectangle"/>
        </td>
      </tr>
    )
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
}

function RandomID() {
  return Math.ceil(Math.random()*1000000);
}

export default EditPaymentRow;