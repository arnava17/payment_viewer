const initial = {
  sortBy : 'orderDate',
  searchTerm : '',
  paymentStatus : '',
  currentPage: 1,
  maxResults: 5
};


function set(state, key, payload) {

  return {
    ...state,
    [key]: payload,
    currentPage : key === 'currentPage' ? payload : 1
  }
}


export default function filters(state = initial, action) {

  switch (action.type){
    case 'SET_SORT_BY' :
      return set(state, 'sortBy', action.payload);
    case 'SET_STATUS_FILTER' :
      return set(state, 'paymentStatus', action.payload);
    case 'SET_SEARCH_TERM' :
      return set(state, 'searchTerm', action.payload);
    case 'SET_MAX_RESULTS' :
      return set(state, 'maxResults', action.payload);
    case 'SET_CURRENT_PAGE' :
      return set(state, 'currentPage', action.payload);
    default :
      return state;
  }

}

