import { useState } from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';
import WeatherAnimation from './components/Weather/WeatherAnimation';

function App() {

  const [timeClass, setTimeClass] = useState(null)
  const [weather, setWeather] = useState(null)

  return (
    <div className="App">
      <header className={["App-header", timeClass].join(" ")}>
        <WeatherApp setTimeClass={ setTimeClass } weather={ weather } setWeather = { setWeather }/>
      </header>
      <WeatherAnimation weather={ weather } />
    </div>
  );
}

export default App;
