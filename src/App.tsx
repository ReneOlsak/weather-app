import './App.scss'
import useWeather from './Hooks/useWeather'
import Search from './components/Search'
import Forecast from './components/Forecast'

const App = (): JSX.Element => {
  const {
    inputValue,
    inputOptions,
    forecast,
    onSubmit,
    onSelect,
    onInputChange,
  } = useWeather()

  return (
    <main className="app">
      {forecast ? (
        <Forecast
          data={forecast}
          inputValue={inputValue}
          inputOptions={inputOptions}
          onInputChange={onInputChange}
          onSelect={onSelect}
          onSubmit={onSubmit}
        />
      ) : (
        <Search
          inputValue={inputValue}
          inputOptions={inputOptions}
          onInputChange={onInputChange}
          onSelect={onSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App
