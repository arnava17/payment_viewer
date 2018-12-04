
export function setSearchTerm(searchTerm) {
  return {
    type : 'SET_SEARCH_TERM',
    payload: searchTerm
  }
}

export function setSortBy(sortBy) {
  return {
    type : 'SET_SORT_BY',
    payload: sortBy
  }
}

export function setStatusFilter(sortBy) {
  return {
    type : 'SET_STATUS_FILTER',
    payload: sortBy
  }
}

export function setMaxResults(maxRes) {
  return {
    type : 'SET_MAX_RESULTS',
    payload: maxRes
  }
}

export function setCurrentPage(maxRes) {
  return {
    type : 'SET_CURRENT_PAGE',
    payload: maxRes
  }
}

export function deletePayment(id) {
  return {
    type : 'DELETE_PAYMENT',
    payload: id
  }
}

export function editPayment(payment) {
  return {
    type : 'EDIT_PAYMENT',
    payload: payment
  }
}

export function addPayment(payment) {
  return {
    type : 'ADD_PAYMENT',
    payload: payment
  }
}

export function setPayments(payments) {
  return {
    type : 'SET_PAYMENTS',
    payload: payments
  }
}