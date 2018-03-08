import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

//import 'react-select/dist/react-select.css';
import './WeatherAPIView.scss';

const ApiKey = '1e4674fe85478fc4490f7bd874401bdf';

const testCities = [
  {
    "id": 658226,
    "name": "Helsinki",
    "country": "FI",
    "coord": {
      "lon": 24.93417,
      "lat": 60.17556
    }
  }, {
    "id": 634964,
    "name": "Tampere",
    "country": "FI",
    "coord": {
      "lon": 23.75,
      "lat": 61.5
    }
  }, {
    "id": 633679,
    "name": "Turku",
    "country": "FI",
    "coord": {
      "lon": 22.26869,
      "lat": 60.451481
    }
  }
];

class WeatherAPIView extends React.Component {
  static getCityOptions() {
    return testCities.map(city => ({value: city.id, label: city.name}));
  }

  static createRequest(cityId) {
    return `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${ApiKey}`;
  }

  static renderErrorMessage(errorCode, errorMessage) {
    return (<div className="error-container">
      <h3>Error occured!!!</h3>
      <p>{errorMessage}</p>
      <span>error code: {errorCode}</span>
    </div>);
  }

  static checkDate(date, id) {
    if (window.localStorage) {
      let storage = Object.assign({}, window.localStorage);
      storage = _.filter(storage, function(item) {
        let parsedItem = JSON.parse(item);
        const date = moment(parsedItem.headers.date).format('X');
        console.log(parsedItem, date);
        return parsedItem.data.city.id === id;
      });
      //console.log(storage);
    }
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.executeRequest = this.executeRequest.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.resetOption = this.resetOption.bind(this);
    this.saveToStorage = this.saveToStorage.bind(this);

    this.state = {
      initialized: false,
      selectedOption: null,
      loading: false,
      error: false,
      errorContent: null,
      data: []
    }
  }

  componentDidMount() {
    if (window.document) {
      this.setState({initialized: true});

      console.log(window.localStorage);
    }
  }

  getWeather() {
    if (this.state.loading || !this.state.initialized) {
      return;
    }
    let dateNow = Date.now();

    this.setState((prevState) => ({
      loading: !prevState.loading
    }));
    //const request = this.constructor.createRequest(this.state.selectedOption.value);
    const request = 'test.json';
    const ax = axios.create({baseURL: 'http://localhost:3000'});
    ax.get(request).then(response => {
      if (response) {
        let receivedData = response;
        const data = {
          ...this.state.data
        };
        const id = receivedData.data.city.id;
        data[`${id}`] = receivedData;

        this.setState((prevState) => ({data: data, loading: false}));
        this.constructor.checkDate(dateNow, id);
        this.saveToStorage(receivedData);
        this.resetOption();
      }
    }).catch((error) => {
      console.log(error);
      if (error) {
        this.setState({error: true, errorContent: error.response})
      }
    });

    this.setState({loading: false});
  }

  handleChange(selectedOption) {
    this.setState({selectedOption});
  }

  resetOption() {
    this.setState({selectedOption: null});
  }

  saveToStorage(dataToSave) {
    const timeStamp = Date.now();
    const storage = window.localStorage;
    storage.setItem(timeStamp, JSON.stringify(dataToSave));
  }

  executeRequest() {
    if (this.state.selectedOption === null) {
      console.log('choose a city');
      return null;
    }
    console.log('Getting weather for: ' + this.state.selectedOption.label);
  }

  render() {

    const {initialized, loading, error, errorContent, selectedOption} = this.state;
    const value = selectedOption && selectedOption.value;
    if (!initialized || loading) {
      return <p>Loading...</p>;
    }

    return (<div className="page-container">
      <h2>Weather Here</h2>
      {/*error ? this.constructor.renderErrorMessage(errorContent.data.cod, errorContent.data.message) : null*/}
      {
        error
          ? <p>error occured</p>
          : null
      }
      <div className="input-container">
        <Select name="form-field-name" className="city-field" value={value} onChange={this.handleChange} options={this.constructor.getCityOptions()}/>
      </div>

      <button disabled={loading || !selectedOption} onClick={this.getWeather}>
        Fetch weather
      </button>
    </div>);
  }
};

WeatherAPIView.propTypes = {
  name: PropTypes.string
};

export default WeatherAPIView;
