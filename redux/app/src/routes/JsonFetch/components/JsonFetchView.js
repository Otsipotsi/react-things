import React from 'react';
import { connect } from 'react-redux';
import Images from './Images';
import { fetchImagesStatic } from '../actions/index';

class JsonFetchView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const images = this.props.fetchImagesStatic();
  }

  render() {
    console.log(this)
    return (
      <div>
        <h1>Fetch Json things here!</h1>

        <Images images={this.props.images} />
      </div>
    );
  }
}

export default JsonFetchView;
