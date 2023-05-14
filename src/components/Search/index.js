import './index.css'

import {Component} from 'react'

import NavigationBar from '../NavigationBar'
import Details from '../Details'

class Search extends Component {
  state = {
    locationName: '',
    location: false,
  }

  changeLocation = () => {
    this.setState(prevState => ({
      location: !prevState.location,
    }))
  }

  renderForm = () => (
    <div className="search-content-container">
      <form className="form" onSubmit={this.onSubmitForm}>
        <p className="search-form-emoji">🌨️</p>
        <div className="input-container">
          <label htmlFor="location" className="label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="input"
            onChange={this.onChangeInput}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  )

  onSubmitForm = event => {
    event.preventDefault()
    const {locationName} = this.state
    if (locationName) {
      this.setState(prevState => ({
        location: !prevState.location,
      }))
    }
  }

  onChangeInput = event => {
    this.setState({locationName: event.target.value})
  }

  render() {
    const {location, locationName} = this.state
    console.log(location)
    return (
      <div className="search-container">
        <NavigationBar />
        {location ? (
          <Details
            locationName={locationName}
            changeLocation={this.changeLocation}
          />
        ) : (
          this.renderForm()
        )}
      </div>
    )
  }
}

export default Search
