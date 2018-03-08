import { connect } from 'react-redux';

//import * as actions from '../actions';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import WidgetsView from '../components/WidgetsView';

//console.log(db, base);
// Maps state from store to props
const mapStateToProps = (state = [], ownProps) => {
  return {
    // You can now say this.props.books
    //images: state.images
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {

  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(WidgetsView);
