import payment from "../payments";

export default function payments(state = payment, action) {
  switch (action.type) {
    case 'DELETE_PAYMENT':
      return deletePayment(state, action.payload);
    case 'EDIT_PAYMENT':
      return editPayment(state, action.payload);
    case 'ADD_PAYMENT':
      return addPayment(state, action.payload);
    case 'SET_PAYMENTS':
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
  return newState;
}

function addPayment(state, payload) {
  let newState = [...state];
  newState.push(payload);
  return newState;
}