import React, { Component } from 'react';
import axios from 'axios';
import { ggApiKey } from '../../../config/Apikeys.js';

const ipApiUrl = 'http://ip-api.com/json';

//const byCity = 'api.openweathermap.org/data/2.5/weather?q=London,uk';

//const latlonUrl = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}';

const WithLocation = WrappedComponent =>
  class  extends Component {

    static getLocUrl(lat, lon) {
      return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=political&key=${ggApiKey}`;
    }

    constructor(props) {
      super();

      this.fetchLocationByIp = this.fetchLocationByIp.bind(this);
      this.fetchLocationFromBrowser = this.fetchLocationFromBrowser.bind(this);
      this.fetchLocationDetailsByLonLat = this.fetchLocationDetailsByLonLat.bind(this);
    }

    state = {
      userLocation: {
        located: false,
        city: null,
        country: null,
        countryCode: null,
        formatted_address: null,
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
      if (this.state.userLocation.located !== nextState.userLocation.located) {
        console.log('updated', this.state, nextState);
        const { lat, lon } = nextState.userLocation.cords;
        this.fetchLocationDetailsByLonLat(lat, lon);
        return true;
      }
      return false;
    }

    fetchLocationDetailsByLonLat(lat, lon) {
      axios.get(this.constructor.getLocUrl(lat, lon)).then(response => {
        if (response) {
          const { results } = response.data;
          console.log(results[0].formatted_address);
          this.setState((prevState) => ({
            userLocation: {
              ...prevState.userLocation,
              formatted_address: results[0].formatted_address,
            }
          }))
        }
      })
      .catch((error) => {
        console.log(error);
      });
      return;
    }

    fetchLocationFromBrowser() {
      if (!navigator.geolocation) {
        this.fetchLocationByIp()
        return;
      }
      const success = (position) => {
        this.setState((prevState) => ({
          userLocation: {
            ...prevState.userLocation,
            located: true,
            cords: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }
          }
        }));
      };
      const error = () => { this.fetchLocationByIp() };

      navigator.geolocation.getCurrentPosition(success, error);
     }

    fetchLocationByIp() {
      axios.get(ipApiUrl).then(response => {
        if (response) {
          this.setState((prevState) => ({
            userLocation: {
              ...prevState.userLocation,
              located: true,
              city: response.data.city,
              country: response.data.country,
              countryCode: response.data.countryCode,
              cords: {
                lat: response.data.lat,
                lon: response.data.lon,
              },
            },
          }));
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
