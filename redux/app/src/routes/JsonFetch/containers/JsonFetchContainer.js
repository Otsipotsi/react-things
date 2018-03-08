import { connect } from 'react-redux';
import * as actions from '../actions';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import JsonFetch from '../components/JsonFetchView';

// Maps state from store to props
const mapStateToProps = (state = [], ownProps) => {
  console.log(ownProps)
  return {
    // You can now say this.props.books
    //images: state.images
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.createBook
    fetchImagesStatic: image => actions.payload

  }
  console.log(image)
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(JsonFetch);
