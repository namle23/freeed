import React, { Component } from 'react'
import './Display.css'
import Current from '../current/Current'
import History from '../history/History'
import socketIOClient from 'socket.io-client'

class Display extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weatherData: false,
      historyData: [],
      endpoint: 'https://evening-oasis-60569.herokuapp.com',
      test: false
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('FromAPI', data => this.setState({ weatherData: data }))
    socket.on('FromHistoryAPI', data => this.setState({ historyData: data }))
  }

  render() {
    const { weatherData } = this.state

    return (
      <div>
        <Current weatherData={this.state.weatherData}></Current>
        <History historyData={this.state.historyData}></History>

        {weatherData ? <section></section> : <i>Loading...</i>}
      </div>
    )
  }
}

export default Display
