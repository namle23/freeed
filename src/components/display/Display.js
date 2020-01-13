import React, { Component } from 'react'
import axios from 'axios'
import './Display.css'
import Current from '../current/Current'
import History from '../history/History'

let urlCurrent = 'https://evening-oasis-60569.herokuapp.com/current'
let urlHistory = 'https://evening-oasis-60569.herokuapp.com/history'
// let urlCurrent = 'http://localhost:8080/current'
// let urlHistory = 'http://localhost:8080/history'

class Display extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weatherData: null,
      historyData: []
    }
  }

  async getCurrentWeatherData() {
    try {
      return await axios.get(urlCurrent)
    } catch (error) {
      console.error(error)
    }
  }

  async getHistoryData() {
    try {
      return await axios.get(urlHistory)
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount() {
    this.getCurrentWeatherData().then(weather => {
      this.setState({ weatherData: weather.data })
    })

    this.getHistoryData().then(history => {
      this.setState({ historyData: history.data })
    })

    setInterval(this.getCurrentWeatherData, 30000)
    setInterval(this.getHistoryData, 30000)

    setInterval(() => {
      this.getCurrentWeatherData().then(weather => {
        this.setState({ weatherData: weather.data })
      })

      this.getHistoryData().then(history => {
        this.setState({ historyData: history.data })
      })
    }, 30000)
  }

  render() {
    return (
      <div>
        <Current weatherData={this.state.weatherData}></Current>
        <History historyData={this.state.historyData}></History>
      </div>
    )
  }
}

export default Display
