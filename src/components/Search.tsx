import { ChangeEvent } from 'react'
import { optionType } from '../types'

type Props = {
  inputValue: string
  inputOptions: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  inputValue,
  inputOptions,
  onInputChange,
  onSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
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
            Search
          </button>

          <ul className="options-list">
            {inputOptions.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button onClick={() => onSelect(option)} className="one-option">
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
  )
}

export default Search
