export default function payments(state = [], action) {
  switch (action.type) {
    case 'DELETE_PAYMENT':
      return deletePayment(state, action.payload);
    case 'EDIT_PAYMENT':
      return editPayment(state, action.payload);
    case 'ADD_PAYMENT':
      return addPayment(state, action.payload);
    case 'SET_PAYMENTS':
      setPaymentsInLocalStorage(action.payload);
      return [...action.payload];
    default :
      return state;
  }
}

function deletePayment(state, id) {
  let newState = [...state];
  for(let i=0; i < newState.length; i++) {
    if(newState[i].paymentId === id) {
      newState.splice(i,1);
      break;
    }
  }
  setPaymentsInLocalStorage(newState);
  return newState;
}

function editPayment(state, payload) {
  let newState = [...state];
  for(let i=0; i < newState.length; i++) {
    if(newState[i].paymentId === payload.paymentId) {
      newState[i] = {
        ...payload
      };
      break;
    }
  }
  setPaymentsInLocalStorage(newState);
  return newState;
}

function addPayment(state, payload) {
  let newState = [...state];
  newState.push(payload);
  setPaymentsInLocalStorage(newState);
  return newState;
}

function setPaymentsInLocalStorage(payments) {
  console.log('aya', payments);
  localStorage.setItem('payments', JSON.stringify(payments));
}