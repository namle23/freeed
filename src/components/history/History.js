import React, { Component } from 'react'
import './History.css'

const Chart = require('chart.js')

class History extends Component {
  render() {
    let temps = []
    let timestamps = []
    let feels_likes = []
    let winds = []
    let humidities = []
    const nodeTempChart = this.nodeTemp
    const nodeWindChart = this.nodeWind
    const nodeHumidChart = this.nodeHumid

    try {
      this.props.historyData.sort((a, b) => (a.id > b.id ? 1 : -1))

      for (let i = 0; i < this.props.historyData.length; i++) {
        temps.push([0, parseFloat(this.props.historyData[i].temp)])
        timestamps.push(
          new Date(
            parseInt(this.props.historyData[i].timestamp) * 1000
          ).toLocaleString()
        )
        winds.push(parseFloat(this.props.historyData[i].wind_speed))
        feels_likes.push([0, parseFloat(this.props.historyData[i].feels_like)])
      }

      humidities.push(
        parseFloat(
          this.props.historyData[this.props.historyData.length - 1].humidity
        )
      )
      humidities.push(
        100 -
          parseFloat(
            this.props.historyData[this.props.historyData.length - 1].humidity
          )
      )

      new Chart(nodeTempChart, {
        type: 'bar',
        data: {
          labels: timestamps,
          datasets: [
            {
              label: 'Temparature',
              data: temps,
              backgroundColor: 'rgb(237, 28, 28)'
            },
            {
              label: 'Feels like',
              data: feels_likes,
              backgroundColor: 'rgb(15, 164, 239)'
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Temparature vs Real feel'
          }
        }
      })

      new Chart(nodeWindChart, {
        type: 'line',
        data: {
          labels: timestamps,
          datasets: [
            {
              data: winds,
              backgroundColor: 'rgb(15, 164, 239)'
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Wind Speed'
          },
          legend: {
            display: false
          }
        }
      })

      new Chart(nodeHumidChart, {
        type: 'pie',
        data: {
          datasets: [
            {
              data: humidities,
              backgroundColor: ['aqua', 'white']
            }
          ],
          labels: ['Humidity', 'Dry']
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Humidity',
            position: 'bottom'
          },
          legend: {
            display: false
          }
        }
      })
    } catch (error) {}

    return (
      <div id="history">
        <div id="temp">
          <canvas height="75%" ref={node => (this.nodeTemp = node)} />
        </div>
        <br />
        <br />
        <div className="windHumid">
          <div id="wind">
            <canvas ref={node => (this.nodeWind = node)} />
          </div>
          <div id="humid">
            <canvas ref={node => (this.nodeHumid = node)} />
          </div>
        </div>
      </div>
    )
  }
}

export default History
