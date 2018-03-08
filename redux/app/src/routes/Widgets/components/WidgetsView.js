import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ipApiUrl = 'http://ip-api.com/json';

const apikey = 'e7e3382130f4acab977c87d967f005be';

const byCity = 'api.openweathermap.org/data/2.5/weather?q=London,uk';

const latlonUrl = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}';


class WidgetsView extends Component {
  static createRequest(city, country) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${apikey}`;
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
      fetched: false,
      data: {},
      error: false,
      errorContent: null,
    },
  }

  componentWillMount() {
    this.fetchLocation()
  }

  fetchLocation = () => {
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
      this.setState({location: {error: true, errorContent: error.response}})
    });
  }

  fetchWeather = () => {
    const {city, countryCode} = this.state.location;
    const request = this.constructor.createRequest(city, countryCode);

    axios.get(request).then(response => {
      if (response) {
        this.setState({
          weather: {
            fetched: true,
            data: response.data,
          },
        });
      }
    }).catch((error) => {
      console.log(error);
      this.setState({weather: {error: true, errorContent: error.response}});
    });
  }; 

  render() {
    const {location, weather} = this.state;
    return (
      <WidgetContainer>
        {location.located
          ? <span> Your location is: {location.city}, {location.country}</span>
          : 'Your location could not be found.'
        }
        {weather.fetched
          ? <span>Current weather is: {weather.data.main.temp}</span>
          : 'Weather could not be fetched.'
        }
      </WidgetContainer>
    );
  }
}

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default WidgetsView;
