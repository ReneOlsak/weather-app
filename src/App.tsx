import './App.scss'

function App() {
  return (
    <main className="app">
      <section className="app-box">
        <h1 className="title">
          Weather <span className="title-forecast">Forecast</span>
        </h1>
        <p className="title-info">
          Enter a place you want to know the weather of
        </p>
        <div>
          <input type="text" value={''} className="app-input"></input>
          <button className="search-button">search</button>
        </div>
      </section>
    </main>
  )
}

export default App
