import { forecastType } from '../types'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'

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
              <p>{i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
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
            <Sunrise />
          </div>
          <div className="sunset">
            <Sunset />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Forecast
