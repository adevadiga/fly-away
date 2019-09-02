import React from 'react';
import './app.css';
import FlyAwayHeader from "./components/FlyAwayBanner";
import FlyAway from './components/FlyAway';

function App() {
  return (
      <div className="container">
          <FlyAwayHeader/>
          <FlyAway/>
      </div>
  );
}

export default App;
