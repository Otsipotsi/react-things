import { FETCH_IMAGES } from '../actions';
import * as actions from '../actions/index';

const fetchImages = (state = [], action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return [
        ...state,
        Object.assign({}, action.payload)
      ];
      
    default:
      return state;
  }
}

export default fetchImages;