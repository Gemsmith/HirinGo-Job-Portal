import { combineReducers } from 'redux';

// import all reducers
import { jobsReducer } from './jobsReducer';
import { loaderReducer } from './loaderReducer';

// combine all reducers into 1 root reducer
const reducers = combineReducers({ jobsReducer, loaderReducer });

export default reducers;
