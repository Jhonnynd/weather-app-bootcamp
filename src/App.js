import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCity: "",
      currCity: "",
      currTemp: "",
      weatherType: "",
      weatherDesc: "",
      weatherIconCode: "",
    };
  }

  handleChange = (event) => {
    this.setState({ inputCity: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.inputCity}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const weatherData = response.data;

        this.setState({
          currCity: weatherData.name,
          currTemp: weatherData.main.temp,
          weatherType: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          weatherIconCode: weatherData.weather[0].icon,
          inputCity: "",
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.inputCity}
              onChange={this.handleChange}
            ></input>
            <br />
            <input type="submit" value="Check Weather" />
            {this.state.currCity ? (
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${this.state.weatherIconCode}@2x.png`}
                  alt="weather img"
                />
                <p>Current City: {this.state.currCity}</p>
                <p>Current Temperature: {this.state.currTemp}°C</p>
                <p>
                  Current Weather: {this.state.weatherType},{" "}
                  {this.state.weatherDesc}
                </p>
              </div>
            ) : (
              <p>Enter a city to see its info!</p>
            )}
          </form>
        </header>
      </div>
    );
  }
}

export default App;
