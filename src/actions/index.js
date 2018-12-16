import ACTION from '../constants/actions';

export function setSearchTerm(searchTerm) {
  return {
    type : ACTION.SET_SEARCH_TERM,
    payload: searchTerm
  }
}

export function setSortBy(sortBy) {
  return {
    type : ACTION.SET_SORT_BY,
    payload: sortBy
  }
}

export function setStatusFilter(sortBy) {
  return {
    type : ACTION.SET_STATUS_FILTER,
    payload: sortBy
  }
}

export function setMaxResults(maxRes) {
  return {
    type : ACTION.SET_MAX_RESULTS,
    payload: maxRes
  }
}

export function setCurrentPage(maxRes) {
  return {
    type : ACTION.SET_CURRENT_PAGE,
    payload: maxRes
  }
}

export function deletePayment(id) {
  return {
    type : ACTION.DELETE_PAYMENT,
    payload: id
  }
}

export function editPayment(payment) {
  return {
    type : ACTION.EDIT_PAYMENT,
    payload: payment
  }
}

export function addPayment(payment) {
  return {
    type : ACTION.ADD_PAYMENT,
    payload: payment
  }
}

export function setPayments(payments) {
  return {
    type : ACTION.SET_PAYMENTS,
    payload: payments
  }
}