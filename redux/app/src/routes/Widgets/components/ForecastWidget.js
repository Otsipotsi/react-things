import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import uniqBy from 'lodash/uniqby';

import { openWeatherApiKey } from '../../../config/ApiKeys.js';
import { getIcon } from '../helpers';

class ForecastWidget extends Component {

  static createRequestWithCords(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${openWeatherApiKey}`;
  }


  constructor(props) {
    super();

    this.fetchWeather = this.fetchWeather.bind(this);
    this.filterDays = this.filterDays.bind(this);
    this.renderForecast = this.renderForecast.bind(this);
    this.foreCastItem = this.foreCastItem.bind(this);
  }

  state = {
    weatherForeCast: {
      data: {},
      error: false,
      errorContent: null,
    },
    weatherForeCastFetched: false,
    weatherForeCastLoading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userLocation.located !== this.props.userLocation.located) {
      this.fetchWeather(this.props.userLocation);
    }
  }

  fetchWeather(userLocation) {
    const { city, countryCode, cords } = userLocation;
    this.setState({ weatherForeCastLoading: true });
    //const request = this.constructor.createRequest(city, countryCode);
    const request = this.constructor.createRequestWithCords(cords.lat, cords.lon);
    axios.get(request).then(response => {
      if (response) {
        this.setState({
          weatherForeCast: {
            data: response.data,
          },
        });
      }
    })
    .then(() => {
      this.setState({
       weatherForeCastFetched: true,
       weatherForeCastLoading: false,
      })
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        weatherForeCastLoading: false,
        weatherForeCast: { error: true, errorContent: error.response }});
    });

    return null;
  };

  filterDays() {
    if (!this.state.weatherForeCastFetched || !this.state.weatherForeCast) {
      return;
    }

    const weatherList = this.state.weatherForeCast.data.list;
    const dates = weatherList.map(d => {
      const date = moment(d.dt_txt).format('D.M', 'fi');
      const time = moment(d.dt_txt).format('H:mm', 'fi');
      const dateTime = {
        ...d,
        date_formatted: date,
        time_formatted: time,
      }
      return dateTime;
    });

    const datesFiltered = dates.filter(d => d.time_formatted === '12:00');

    return datesFiltered;
  }

  foreCastItem(data) {
    const ItemWrapper = styled.div`
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    `;

    const DateItem = styled.div`
      font-size: 1.1rem;
    `;

    const Temp = styled.span`
      font-size: 1.5rem;
    `;

    const Img = styled.span`
      color: #FFF;
      display: block;
      height: auto;
      width: 100%;

      &:after {
        display: block;
        color: #FFF;
        content: url(${props => props.iconUrl});
        height: auto;
        width: 2.5rem;
      }
    `;

    return (
      <ItemWrapper>
        <Img iconUrl={getIcon(data.weather[0].main)} />
        <Temp>{parseInt(data.main.temp, 10)}°</Temp>
        <DateItem>{data.date_formatted}</DateItem>
      </ItemWrapper>
    );
  }

  renderForecast() {
    if (!this.state.weatherForeCastFetched || !this.state.weatherForeCast) {
      return;
    }

    const items = this.filterDays();

    return items.map(item => {
      return (
        <div key={item.dt}>
          {this.foreCastItem(item)}
        </div>
      );
    })
  }

  render() {
    return (
      <ForeCastWrapper>
        {this.renderForecast()}
      </ForeCastWrapper>
    );
  }
}

const ForeCastWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem 0;
`;

export default ForecastWidget;
