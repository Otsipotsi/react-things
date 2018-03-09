import React, { Component } from 'react';
import axios from 'axios';

const ipApiUrl = 'http://ip-api.com/json';

const apikey = 'e7e3382130f4acab977c87d967f005be';

//const byCity = 'api.openweathermap.org/data/2.5/weather?q=London,uk';

//const latlonUrl = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}';

const WithLocationAndWeather = WrappedComponent =>
  class  extends Component {

  static createRequest(city, country) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${apikey}`;
  }

  static createRequestWithCords(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apikey}`;
  }

  constructor(props) {
    super();

    this.fetchLocationByIp = this.fetchLocationByIp.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchLocationFromBrowser = this.fetchLocationFromBrowser.bind(this);
  }

  state = {
    location: {
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
    weather: {
      data: {},
      error: false,
      errorContent: null,
    },
    weatherFetched: false,
  }

  componentDidMount() {
    this.fetchLocationFromBrowser()
  }

  fetchLocationFromBrowser() {
    if (!navigator.geolocation) {
      this.fetchLocationByIp()
      return;
    }
    const success = (position) => {
      this.setState({
        location: {
          located: true,
          cords: {
            lat: parseInt(position.coords.latitude),
            lon: parseInt(position.coords.longitude),
          }
        }
      });
      this.fetchWeather();
    };
    const error = () => { this.fetchLocationByIp() };

    navigator.geolocation.getCurrentPosition(success, error);
   }

  fetchLocationByIp() {
    axios.get(ipApiUrl).then(response => {
      if (response) {
        this.setState({
          location: {
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
    .then(() => {
      this.fetchWeather();
    })
    .catch((error) => {
      console.log(error);
      this.setState({location: { error: true, errorContent: error.response }})
    });
    return null;
  }

  fetchWeather() {
    const { city, countryCode, cords } = this.state.location;
    //const request = this.constructor.createRequest(city, countryCode);
    const request = this.constructor.createRequestWithCords(cords.lat, cords.lon);
    axios.get(request).then(response => {
      if (response) {
        this.setState({
          weather: {
            data: response.data,
          },
        });
      }
    })
    .then(() => {
      this.setState({
       weatherFetched: true,
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({weather: { error: true, errorContent: error.response }});
    });

    return null;
  };
 
  render() {
    return (
      <WrappedComponent 
        { ...this.props }
        location={this.state.location}
        weather={this.state.weather}
        weatherFetched={this.state.weatherFetched}
      />
    );
  }
}

export default WithLocationAndWeather;
