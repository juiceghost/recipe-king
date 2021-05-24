import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Recipe from './Recipe';

function App() {
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Recipe App</h1>
      </header>
      <Recipe />
    </div>
  );
}

export default App;
