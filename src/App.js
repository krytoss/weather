import { useState } from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';

function App() {

  const [timeClass, setTimeClass] = useState(null)

  return (
    <div className="App">
      <header className={["App-header", timeClass].join(" ")}>
        <WeatherApp setTimeClass={ setTimeClass }/>
      </header>
    </div>
  );
}

export default App;
