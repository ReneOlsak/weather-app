import './App.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import { optionType } from './types'

const App = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputOptions, setInputOptions] = useState<[]>([])
  const [location, setLocation] = useState<optionType | null>(null)

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setInputOptions(data))
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value === '') return
    getSearchOptions(value)
  }

  const getForecast = (location: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        location.lat
      }&lon=${location.lon}&units=metric&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }))
  }

  const onSubmit = () => {
    if (!location) return

    getForecast(location)
  }

  const onSelect = (option: optionType) => {
    setLocation(option)
  }

  useEffect(() => {
    if (location) {
      setInputValue(location.name)
      setInputOptions([])
    }
  }, [location])

  return (
    <main className="app">
      <section className="app-box">
        <h1 className="title">
          Weather <span className="title-forecast">Forecast</span>
        </h1>
        <p className="title-info">
          Enter a place you want to know the weather of
        </p>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            className="app-input"
            onChange={onInputChange}
          ></input>

          <button onClick={onSubmit} className="search-button">
            search
          </button>

          <ul className="options-list">
            {inputOptions.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button onClick={() => onSelect(option)} className="one-option">
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App
