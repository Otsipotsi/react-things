import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { openWeatherApiKey } from '../../../config/ApiKeys.js';

// POC purposes a dirty way to Import images.
import sunny from '../../../resources/images/wi-day-sunny.svg';
import snow from '../../../resources/images/wi-snow.svg';
import clouds from '../../../resources/images/wi-cloudy.svg';
import rain from '../../../resources/images/wi-rain.svg';
import thunder from '../../../resources/images/wi-thunderstorm.svg';
import drizzle from '../../../resources/images/wi-showers.svg';
import alien from '../../../resources/images/wi-alien.svg';


class CurrentWeatherWidget extends Component {
  // Default icons from openweathermap.org
  //static getWeatherIcon(url) {
  //  return `http://openweathermap.org/img/w/${url}.png`;
  //}

  static createRequest(city, country) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${openWeatherApiKey}`;
  }

  static createRequestWithCords(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${openWeatherApiKey}`;
  }

  static getIcon(type) {
    switch (type) {
      case 'Clear':
        return sunny;
      case 'Clouds':
        return clouds;
      case 'Rain':
        return rain;
      case 'Thunderstorm':
        return thunder;
      case 'Drizzle':
        return drizzle;
      case 'Snow':
        return snow;
      default:
        return alien;
    }
  }

  constructor(props) {
    super();

    this.renderWeather = this.renderWeather.bind(this);
    this.renderLocation = this.renderLocation.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.weatherStatus = this.weatherStatus.bind(this);
  }

  state = {
    weather: {
      data: {},
      error: false,
      errorContent: null,
    },
    weatherFetched: false,
    weatherLoading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userLocation.located !== this.props.userLocation.located) {
      this.fetchWeather(this.props.userLocation);
    }
  }


  fetchWeather(userLocation) {
    const { city, countryCode, cords } = userLocation;
    this.setState({ weatherLoading: true });
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
       weatherLoading: false,
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        weatherLoading: false,
        weather: { error: true, errorContent: error.response }});
    });

    return null;
  };

  weatherStatus(state) {
    if (state.weatherLoading) {return <span>Checking out the window...</span>}
    if (state.weather.error) {return <span>Something went wrong!!!</span>}
  }

  renderWeather(data) {
    const WeatherContainer = styled.div`
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    `;
    const Details = styled.div`
      display: flex;
      flex-direction: column;
    `;
    const Temp = styled.span`
      font-size: 2.5rem;
    `;
    const Desc = styled.span`
      font-size: 1.1rem;
    `;
    const Img = styled.span`
      color: #FFF;
      display: block;
      height: auto;
      width: 40%;

      &:after {
        display: block;
        color: #FFF;
        content: url(${props => props.iconUrl});
        height: auto;
        width: 4.5rem;
      }
    `;

    return (
      <WeatherContainer>
          <Img iconUrl={this.constructor.getIcon(data.weather[0].main)} />
        <Details>
          <Temp>{data.main.temp}°</Temp>
          <Desc>{data.weather[0].main}, {data.weather[0].description}</Desc>
        </Details>
      </WeatherContainer>
    );
  };

  renderLocation(userLocation) {
    const LocationContainer = styled.div`
      font-size: 1.5rem;
      margin-top: 1rem;
    `;
    if (!userLocation.formatted_address) {
      return (
        <LocationContainer>
          <span>Lan: {userLocation.cords.lat} Lon: {userLocation.cords.lon}</span>
        </LocationContainer>
      );
    }
    return (
      <LocationContainer>
        <span>{userLocation.formatted_address}</span>
      </LocationContainer>
    );
  }

  render() {
    const { userLocation } = this.props;
    const { weather, weatherFetched } = this.state;

    return (
      <WidgetContainer>
        {weatherFetched && weather.data
          ? this.renderWeather(weather.data)
          : this.weatherStatus(this.state)
        }
        {userLocation.located
          ? this.renderLocation(userLocation)
          : <span>Finding user...</span>
        }
      </WidgetContainer>
    );
  }
}

const WidgetContainer = styled.div`
  background-color: #00b5c8;
  color: #FFF;
  display: flex;
  font-family: Helvetica, sans-serif;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto 2rem auto;
  width: 100%;
`;

export default CurrentWeatherWidget;
