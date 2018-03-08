import React from 'react';
import _ from 'lodash';
import axios from 'axios';

export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCH_USERS = 'FETCH_USERS';

export function fetchImagesStatic() {
  return {
    type: FETCH_IMAGES,
    payload: [
      'http://lorempixel.com/400/200/',
      'http://lorempixel.com/400/200/',
      'http://lorempixel.com/400/200/',
    ]
  }
}

export default fetchImagesStatic;