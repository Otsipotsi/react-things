import { combineReducers } from 'redux';
import ImageReducer from './ImagesReducer';

const reducer = combineReducers({
  images: ImageReducer,
})

export default reducer;
