import React, { Component } from 'react';
import axios from 'axios';

const ipApiUrl = 'http://ip-api.com/json';



//const byCity = 'api.openweathermap.org/data/2.5/weather?q=London,uk';

//const latlonUrl = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}';

const WithLocation = WrappedComponent =>
  class  extends Component {

  constructor(props) {
    super();

    this.fetchLocationByIp = this.fetchLocationByIp.bind(this);
    this.fetchLocationFromBrowser = this.fetchLocationFromBrowser.bind(this);
  }

  state = {
    userLocation: {
      located: false,
      city: null,
      country: null,
      countryCode: null,
      cords: {
        lat: null,
        lon: null,
      },
      error: false,
      errorContent: null,
    },
  }

  componentDidMount() {
    this.fetchLocationFromBrowser()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.userLocation !== nextState.userLocation) {
      console.log('updated');
      return true;
    }
    return false;
  }

  fetchLocationFromBrowser() {
    if (!navigator.geolocation) {
      this.fetchLocationByIp()
      return;
    }
    const success = (position) => {
      this.setState({
        userLocation: {
          located: true,
          cords: {
            lat: parseInt(position.coords.latitude),
            lon: parseInt(position.coords.longitude),
          }
        }
      });
    };
    const error = () => { this.fetchLocationByIp() };

    navigator.geolocation.getCurrentPosition(success, error);
   }

  fetchLocationByIp() {
    axios.get(ipApiUrl).then(response => {
      if (response) {
        this.setState({
          userLocation: {
            located: true,
            city: response.data.city,
            country: response.data.country,
            countryCode: response.data.countryCode,
            cords: {
              lat: response.data.lat,
              lon: response.data.lon,
            },
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({userLocation: { error: true, errorContent: error.response }})
    });
    return null;
  }
 
  render() {
    return (
      <WrappedComponent 
        { ...this.props }
        userLocation={this.state.userLocation}
      />
    );
  }
}

export default WithLocation;
