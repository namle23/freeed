import React, { Component } from 'react'
import './Current.css'

class Current extends Component {
  render() {
    let weatherMain = ''
    let iconURL = ''
    let temp = ''
    let feels_like = ''
    let windSpeed = ''
    let humidity = ''
    let location = ''
    let timestamp = null

    let currentWeather = null

    try {
      weatherMain = this.props.weatherData.weather[0].main.toUpperCase()
      iconURL =
        'http://openweathermap.org/img/w/' +
        this.props.weatherData.weather[0].icon +
        '.png'
      temp = Math.round(this.props.weatherData.main.temp)
      feels_like = Math.round(this.props.weatherData.main.feels_like)
      windSpeed = this.props.weatherData.wind.speed
      humidity = this.props.weatherData.main.humidity
      location = this.props.weatherData.name
      timestamp =
        new Date(parseInt(this.props.weatherData.dt) * 1000).toLocaleString() +
        ''

      currentWeather = (
        <div id="current">
          <h1 className="location">{location}</h1>
          <h2 className="timestamp"> Last update: {timestamp}</h2>
          <img src={iconURL} alt="" className="weatherIcon"></img>
          <p className="temp">{temp}</p>
          <h3 className="additional temp">Feels like: {feels_like}</h3>
          <h3 className="additional">Wind: {windSpeed} km/h</h3>
          <h3 className="additional">Humidity: {humidity} %</h3>
          <p className="conditions">{weatherMain}</p>
        </div>
      )
    } catch (error) {}

    return <div>{currentWeather}</div>
  }
}

export default Current
