import { useState, useEffect, ChangeEvent } from 'react'

import { optionType, forecastType } from '../types'

const useWeather = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputOptions, setInputOptions] = useState<[]>([])
  const [location, setLocation] = useState<optionType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)

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
    const value = e.target.value
    setInputValue(value)
    if (value === '') return
    getSearchOptions(value)
  }

  const getForecast = (location: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        location.lat
      }&lon=${location.lon}&units=metric&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        setForecast(forecastData)
      })
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

  return {
    inputValue,
    inputOptions,
    forecast,
    onSubmit,
    onSelect,
    onInputChange,
  }
}

export default useWeather
