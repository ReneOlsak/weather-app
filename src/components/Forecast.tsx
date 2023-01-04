import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helper functions/Helpers'
import { forecastType } from '../types'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Box from './Box'
import { ChangeEvent } from 'react'
import { optionType } from '../types'

type Props = {
  data: forecastType
  inputValue: string
  inputOptions: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSelect: (option: optionType) => void
  onSubmit: () => void
}

const Temperature = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
)

const Forecast = ({
  data,
  inputValue,
  inputOptions,
  onInputChange,
  onSelect,
  onSubmit,
}: Props): JSX.Element => {
  const today = data.list[0]
  const date = new Date()
  const hours = date.getHours()
  const thisDay = date.getDate()
  const thisMonth = date.getMonth() + 1
  const thisYear = date.getFullYear()

  const thisBetterDay = () => {
    if (thisDay < 10) {
      return '0' + thisDay
    } else return thisDay
  }

  const thisBetterMonth = () => {
    if (thisMonth < 10) {
      return '0' + thisMonth
    } else return thisMonth
  }

  let message
  if (hours < 12) {
    message = 'Good Morning'
  } else if (hours < 18) {
    message = 'Good Afternoon'
  } else {
    message = 'Good Evening'
  }

  return (
    <div className="forecast-container">
      <div className="forecast-left-part">
        <section className="forecast-top">
          <div>
            <h2 className="forecast-location">
              {data.name}, {data.country}
            </h2>

            <h3>{message}</h3>
          </div>
          <h4 className="date">
            {thisBetterDay()}.{thisBetterMonth()}.{thisYear}
          </h4>
        </section>

        <section className="forecast-cloud-images">
          {data.list.map((item, i) => (
            <div className="one-cloud-img" key={i}>
              <p>{i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`weather-icon-${item.weather[0].description}`}
              />
              <p>
                <Temperature temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="boxes-container">
          <div className="left-boxes">
            <div className="pressure">
              <Box
                icon="pressure"
                title="Pressure"
                info={`${Math.round(today.main.pressure)} hPa`}
                description={`${
                  Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
                } than standard`}
              />
            </div>
            <div className="visibility">
              <Box
                icon="visibility"
                title="Visibility"
                info={`${(today.visibility / 1000).toFixed()} km`}
                description={getVisibilityValue(today.visibility)}
              />
            </div>

            <div className="precipitation">
              <Box
                icon="pop"
                title="Precipitation"
                info={`${Math.round(today.pop)} %`}
                description={`${getPop(today.pop)}, clouds at ${
                  today.clouds.all
                } %`}
              />
            </div>
          </div>

          <div className="sunrise-sunset">
            <h4 className="sunrise-sunset-title">Sunrise & Sunset</h4>
            <div className="sunrise">
              <Sunrise />
              {getSunTime(data.sunrise)}
              <span className="sunrise-info">Sunset</span>
            </div>
            <div className="sunset">
              <Sunset />
              {getSunTime(data.sunset)}
              <span className="sunset-info">Sunset</span>
            </div>
            <h4 className="high-low-temp">
              <span className="max-color">Maximum</span> and{' '}
              <span className="min-color">Minimum</span>
            </h4>
            <div className="max-min-temp">
              <div className="max">
                <Temperature temp={Math.ceil(today.main.temp_max)} />{' '}
              </div>
              <div className="min">
                <Temperature temp={Math.floor(today.main.temp_min)} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="forecast-right-part">
        <div className="forecast-input-button">
          <input
            className="right-part-search-input"
            type="text"
            value={inputValue}
            onChange={onInputChange}
          />
          <button className="right-part-search-button" onClick={onSubmit}>
            Search
          </button>

          <ul id="0" className="forecast-options-list">
            {inputOptions.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button onClick={() => onSelect(option)} className="one-option">
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="forecast-location-details">
          <h3 className="forecast-location-right">{data.name}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
            className="forecast-location-img"
          />
          <h4 className="forecast-location-main-temp">
            <Temperature temp={Math.round(today.main.temp)} />
          </h4>
          <p className="forecast-location-description">
            {today.weather[0].main} {today.weather[0].description}
          </p>
        </div>
              
        <div className="feels-like">
          <Box
            icon="feels"
            title="Feels like"
            info={<Temperature temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
        </div>
        <div className="forecast-wind">
          <Box
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
        </div>
        <div className="forecast-humidity">
          <Box
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
        </div>
      </div>
    </div>
  )
}

export default Forecast
