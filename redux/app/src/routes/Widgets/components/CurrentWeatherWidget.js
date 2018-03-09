import React, { Component } from 'react';
import styled from 'styled-components';
import WithLocationAndWeather from './WithLocationAndWeather';

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

  renderLocation(location) {
    const LocationContainer = styled.div`
      font-size: 1.5rem;
      margin-top: 1rem;
    `;
    if (!location.city || !location.country) {
      return (
        <LocationContainer>
          <span>Lan: {location.cords.lat} Lon: {location.cords.lon}</span>
        </LocationContainer>
      );
    }
    return (
      <LocationContainer>
        <span>{location.city}, {location.country}</span>
      </LocationContainer>
    );
  }

  render() {
    const { location, weather, weatherFetched } = this.props;

    return (
      <WidgetContainer>
        {weatherFetched && weather.data
          ? this.renderWeather(weather.data)
          : <span>Checking out the window...</span>
        }
        {location.located
          ? this.renderLocation(location)
          : <span>Looking up location...</span>
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
  margin: 0 auto;
  width: 100%;
`;

export default WithLocationAndWeather(CurrentWeatherWidget);
