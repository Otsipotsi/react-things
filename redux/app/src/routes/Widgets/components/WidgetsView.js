import React, { Component } from 'react';
import styled from 'styled-components';
import CurrentWeatherWidget from './CurrentWeatherWidget';


class WidgetsView extends Component {
  state = {
    activeWidget: '',
  }
  render() {
    return (
      <WidgetContainer>
        <CurrentWeatherWidget />
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
  max-width: 15rem;
`;

export default WidgetsView;
