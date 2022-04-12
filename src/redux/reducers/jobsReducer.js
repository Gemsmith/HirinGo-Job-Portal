const initialState = { jobs: [], searchedData: [], appliedUsers: [] };

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_JOBS':
      return { ...state, jobs: action.payload };
    case 'STORE_APPLIED_USERS':
      return { ...state, appliedUsers: action.payload };
    case 'STORE_SEARCHED_DATA':
      return { ...state, searchedData: action.payload };
    default:
      return state;
  }
};
