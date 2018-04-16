import React, { Component } from 'react';
import styled from 'styled-components';
import WithLocation from './WithLocation';
import CurrentWeatherWidget from './CurrentWeatherWidget';
import ForecastWidget from './ForecastWidget';


class WidgetsView extends Component {
  state = {
    activeWidget: '',
  }
  render() {
    return (
      <WidgetContainer>
        <CurrentWeatherWidget userLocation={this.props.userLocation} />
        <ForecastWidget userLocation={this.props.userLocation} />
      </WidgetContainer>
    );
  }
}

const WidgetContainer = styled.div`
  display: flex;
  font-family: Helvetica, sans-serif;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 25rem;
`;

export default WithLocation(WidgetsView);
