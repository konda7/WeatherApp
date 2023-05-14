import './index.css'

import {Component} from 'react'

class Details extends Component {
  state = {
    locationDetails: {},
  }

  componentDidMount() {
    this.getLocationDetails()
  }

  getLocationDetails = async () => {
    const {locationName} = this.props

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=702bcb61d0b875bcef98e7abb2a02e94`,
    )

    const data = await response.json()

    this.setState({
      locationDetails: data,
    })
  }

  onClickBtn = () => {
    const {changeLocation} = this.props

    changeLocation()
  }

  render() {
    const {locationDetails} = this.state
    return (
      <div className="home-success-view">
        <div className="home-temperature-container">
          <div className="">
            <p className="temperature-container-names">
              {locationDetails.name}
            </p>
            <p className="sun-emoji">🌤️</p>
            {locationDetails.weather ? (
              <p className="temperature-container-names">
                {locationDetails.weather[0].main}
              </p>
            ) : null}
          </div>
          {locationDetails.main ? (
            <h1 className="temperature">{`${Math.round(
              locationDetails.main.temp - 273.15,
            ).toFixed(1)}°C`}</h1>
          ) : null}
        </div>
        <div className="small-card-container">
          <div className="small-cards">
            <p className="small-card-content-heading">MIN</p>
            {locationDetails.main ? (
              <h1 className="small-card-value">{`${Math.round(
                locationDetails.main.temp_min - 273.15,
              ).toFixed(1)} °C`}</h1>
            ) : null}
          </div>
          <div className="small-cards">
            <p className="small-card-content-heading">MAX</p>
            {locationDetails.main ? (
              <h1 className="small-card-value">{`${Math.round(
                locationDetails.main.temp_max - 273.15,
              ).toFixed(1)} °C`}</h1>
            ) : null}
          </div>
        </div>
        <div className="small-card-container">
          <div className="small-cards">
            <p className="small-card-content-heading">Feels Like</p>
            {locationDetails.main ? (
              <h1 className="small-card-value">{`${Math.round(
                locationDetails.main.feels_like - 273.15,
              ).toFixed(1)} °C`}</h1>
            ) : null}
          </div>
          <div className="small-cards">
            <p className="small-card-content-heading">Pressure</p>
            {locationDetails.main ? (
              <h1 className="small-card-value">{`${locationDetails.main.pressure} hPa`}</h1>
            ) : null}
          </div>
        </div>
        <div className="small-card-container">
          <div className="small-cards">
            <p className="small-card-content-heading">Humidity</p>
            {locationDetails.main ? (
              <h1 className="small-card-value">{`${Math.floor(
                locationDetails.main.humidity,
              )} %`}</h1>
            ) : null}
          </div>
          <div className="small-cards">
            <p className="small-card-content-heading">Wind Speed</p>
            {locationDetails.wind ? (
              <h1 className="small-card-value">{`${Math.floor(
                locationDetails.wind.speed,
              )} m/s`}</h1>
            ) : null}
          </div>
        </div>
        <button type="button" className="details-btn" onClick={this.onClickBtn}>
          Search for different location
        </button>
      </div>
    )
  }
}

export default Details
