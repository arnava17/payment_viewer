import React, {Component} from 'react';
import PaymentTable from "./PaymentTable";
import store from "../store/index";
import FiltersView from "./FiltersView";
import {setPayments} from "../actions/index";
import './App.scss';

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      status: 'LOADING'
    };
  }

  componentWillMount() {
    this.getPayments();
  }

  getPayments() {
    let payments = localStorage.getItem('payments');
    payments = payments ? JSON.parse(payments) : null;
    if(payments) {
      this.setState({status: 'SUCCESS'});
      store.dispatch(setPayments(payments));
    } else {
      this.getPaymentsFromServer();
    }
  }

  getPaymentsFromServer() {
    fetch('./payments.json').then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Something Went Wrong')
      }
    }).then((response) => {
      this.setState({status: 'SUCCESS'});
      store.dispatch(setPayments(response));
    }).catch((error) => {
      console.log(error);
      this.setState({status: 'FAILURE'})
    })
  }

  filterResultsBySearchTerm(results, searchTerm) {
    let term = searchTerm.toLowerCase();
    return results.filter(({customerEmail, paymentStatus}) => {

      return customerEmail.toLowerCase().includes(term) ||
        paymentStatus.toLowerCase().includes(term);
    })
  }

  filterResultsByStatus(results, status) {
    if(!status) {
      return results;
    }
    return results.filter(({paymentStatus}) => {
      return paymentStatus === status
    })
  }

  sortResultsBy(results, {field, asc}) {
    if(!field) {
      return results;
    }

    let arr = [...results];
    const compareFunction = (a, b) => {
      a = a[field];
      b = b[field];

      if(field === 'orderDate') {
        a = new Date(a);
        b = new Date(b);
      } else if(field === 'customerEmail' || field === 'paymentStatus') {
        return asc?a.localeCompare(b):-1*a.localeCompare(b);
      }
      return asc? a-b:b-a;
    };

    return arr.sort(compareFunction);
  }

  render() {
    const {status}  = this.state;
    const state =store.getState();
    if(status === 'LOADING') {
      return <div className="message">LOADING......</div>
    } else if(status === 'FAILURE') {
      return <div className="message">Something went wrong</div>
    }

    let {payments} = state;
    let {searchTerm, sortBy, paymentStatus} = state.filters;

    if(searchTerm) {
      payments = this.filterResultsBySearchTerm(payments, searchTerm);
    }

    payments = this.sortResultsBy(payments, sortBy);
    payments = this.filterResultsByStatus(payments, paymentStatus);

    return (
      <div className="App">
        <FiltersView/>
        <PaymentTable payments={payments}/>
      </div>
    )
  }
}

export default App;
