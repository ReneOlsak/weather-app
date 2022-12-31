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

type Props = {
  data: forecastType
}

const Temperature = ({ temp }: { temp: number }): JSX.Element => (
  <span>{temp}°C</span>
)

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0]
  return (
    <div className="forecast-container">
      <div>
        <section className="forecast-top">
          <h2 className="forecast-location">
            {data.name}, {data.country}
          </h2>
          <h1>
            <Temperature temp={Math.round(today.main.temp)} />
          </h1>
          <p>
            {today.weather[0].main} {today.weather[0].description}
          </p>
          H: <Temperature temp={Math.ceil(today.main.temp_max)} /> L:{' '}
          <Temperature temp={Math.floor(today.main.temp_min)} />
        </section>

        <section className="forecast-cloud-images">
          {data.list.map((item, i) => (
            <div key={i}>
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

        <section className="forecast-details">
          <div className="sunrise">
            <Sunrise /> <span>{getSunTime(data.sunrise)}</span>
          </div>
          <div className="sunset">
            <Sunset /> <span>{getSunTime(data.sunset)}</span>
          </div>
        </section>

        <section className="boxes-container">
          <Box
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
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
          <Box
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Box
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop)} %`}
            description={`${getPop(today.pop)}, clouds at ${
              today.clouds.all
            } %`}
          />
          <Box
            icon="pressure"
            title="Pressure"
            info={`${Math.round(today.main.pressure)} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          <Box
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
        <div className="forecast-right-part">
          <input type="text" />
          <button>Search</button>
          <h2 className="forecast-location">
            {data.name}, {data.country}
          </h2>
          <h1>
            <Temperature temp={Math.round(today.main.temp)} />
          </h1>
          <p>
            {today.weather[0].main} {today.weather[0].description}
          </p>
          H: <Temperature temp={Math.ceil(today.main.temp_max)} /> L:{' '}
          <Temperature temp={Math.floor(today.main.temp_min)} />
        </div>
      </div>
    </div>
  )
}

export default Forecast
