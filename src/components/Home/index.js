import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../NavigationBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    currentLocationReport: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCurrentLocationWeather()
  }

  showPosition = async position => {
    const {longitude, latitude} = position.coords

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=702bcb61d0b875bcef98e7abb2a02e94`,
    )

    const data = await response.json()

    this.setState({
      currentLocationReport: data,
      apiStatus: apiStatusConstants.success,
    })
  }

  getCurrentLocationWeather = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const currentLocation = navigator.geolocation

    if (currentLocation) {
      currentLocation.getCurrentPosition(this.showPosition)
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      console.log('Please allow the site access the location')
    }
  }

  renderCurrentLocationWeatherSuccessView = () => {
    const {currentLocationReport} = this.state
    console.log(currentLocationReport)

    const mystyle = {
      backgroundImage:
        "url('https://res.cloudinary.com/dvhrrtgpt/image/upload/v1684073653/sunny-lake-landscape_xveczh.jpg')",
      minHeight: '100vh',
      backgroundSize: 'cover',
    }

    return (
      <div style={mystyle}>
        <Navbar />
        <div className="home-success-view">
          <div className="home-temperature-container">
            <div className="">
              <p className="temperature-container-names">
                {currentLocationReport.name}
              </p>
              <p className="sun-emoji">🌤️</p>
              {currentLocationReport.weather ? (
                <p className="temperature-container-names">
                  {currentLocationReport.weather[0].main}
                </p>
              ) : null}
            </div>
            {currentLocationReport.main ? (
              <h1 className="temperature">{`${Math.round(
                currentLocationReport.main.temp - 273.15,
              ).toFixed(1)}°C`}</h1>
            ) : null}
          </div>
          <div className="small-card-container">
            <div className="small-cards">
              <p className="small-card-content-heading">MIN</p>
              {currentLocationReport.main ? (
                <h1 className="small-card-value">{`${Math.round(
                  currentLocationReport.main.temp_min - 273.15,
                ).toFixed(1)} °C`}</h1>
              ) : null}
            </div>
            <div className="small-cards">
              <p className="small-card-content-heading">MAX</p>
              {currentLocationReport.main ? (
                <h1 className="small-card-value">{`${Math.round(
                  currentLocationReport.main.temp_max - 273.15,
                ).toFixed(1)} °C`}</h1>
              ) : null}
            </div>
          </div>
          <div className="small-card-container">
            <div className="small-cards">
              <p className="small-card-content-heading">Feels Like</p>
              {currentLocationReport.main ? (
                <h1 className="small-card-value">{`${Math.round(
                  currentLocationReport.main.feels_like - 273.15,
                ).toFixed(1)} °C`}</h1>
              ) : null}
            </div>
            <div className="small-cards">
              <p className="small-card-content-heading">Pressure</p>
              {currentLocationReport.main ? (
                <h1 className="small-card-value">{`${currentLocationReport.main.pressure} hPa`}</h1>
              ) : null}
            </div>
          </div>
          <div className="small-card-container">
            <div className="small-cards">
              <p className="small-card-content-heading">Humidity</p>
              {currentLocationReport.main ? (
                <h1 className="small-card-value">{`${Math.floor(
                  currentLocationReport.main.humidity,
                )} %`}</h1>
              ) : null}
            </div>
            <div className="small-cards">
              <p className="small-card-content-heading">Wind Speed</p>
              {currentLocationReport.wind ? (
                <h1 className="small-card-value">{`${Math.floor(
                  currentLocationReport.wind.speed,
                )} m/s`}</h1>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderCurrentLocationWeatherLoadingView = () => (
    <>
      <div className="loader-view-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  renderCurrentLocationWeather = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCurrentLocationWeatherSuccessView()
      case apiStatusConstants.failure:
        return this.renderCurrentLocationWeatherFailureView()
      case apiStatusConstants.inProgress:
        return this.renderCurrentLocationWeatherLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderCurrentLocationWeather()}</>
  }
}

export default Home
