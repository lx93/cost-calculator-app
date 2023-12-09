import React, { useState } from 'react';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';
import './CostCalculator.css';

function CostCalculator() {
  const [distance, setDistance] = useState('');
  const [evEfficiency, setEvEfficiency] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [mpg, setMpg] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [evResult, setEvResult] = useState('');
  const [iceResult, setIceResult] = useState('');
  const [useMiPerkWh, setUseMiPerkWh] = useState(true); // Default to miles per kWh
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const calculateCost = () => {
    const distanceNum = parseFloat(distance);
    const efficiencyNum = parseFloat(evEfficiency);
    const electricityCostNum = parseFloat(electricityCost);
    const mpgNum = parseFloat(mpg);
    const gasPriceNum = parseFloat(gasPrice);

    const efficiencyFactor = useMiPerkWh ? efficiencyNum : 1 / efficiencyNum;

    const evCost = (distanceNum * efficiencyFactor) * electricityCostNum;
    const iceCost = (distanceNum / mpgNum) * gasPriceNum;

    if (!isNaN(evCost)) {
      setEvResult(`Using an EV for this trip would cost $${evCost.toFixed(2)}.`);
    }

    if (!isNaN(iceCost)) {
      setIceResult(`Using an ICE vehicle for this trip would cost $${iceCost.toFixed(2)}.`);
    }
  };

  return (
    <div className={`calculator-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dark-mode-toggle">
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label={darkMode ? 'Light Mode' : 'Dark Mode'}
        />
      </div>

      <h1>Cost Calculator</h1>
    
      <div className="distance-container">
        <TextField
          label="Distance"
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>
      <div className="input-fields">
        <h2>EV Cost Calculation</h2>
        <div className="toggle-container">
          <FormControlLabel
            control={
              <Switch
                checked={useMiPerkWh}
                onChange={() => setUseMiPerkWh(!useMiPerkWh)}
              />
            }
            label={useMiPerkWh ? 'Miles/kWh' : 'kWh/mile'}
          />
        </div>
        <TextField
          label={`Efficiency (${useMiPerkWh ? 'Miles/kWh' : 'kWh/mile'}) for EV`}
          type="number"
          value={evEfficiency}
          onChange={(e) => setEvEfficiency(e.target.value)}
        />
        <TextField
          label="Electricity cost per kWh"
          type="number"
          value={electricityCost}
          onChange={(e) => setElectricityCost(e.target.value)}
        />
        <Button variant="contained" onClick={calculateCost}>
          Calculate EV Cost
        </Button>
        {evResult && <div className="result-container"><p className="result">{evResult}</p></div>}
      </div>
      <div className="input-fields">
        <h2>ICE Cost Calculation</h2>
        <TextField
          label="MPG"
          type="number"
          value={mpg}
          onChange={(e) => setMpg(e.target.value)}
        />
        <TextField
          label="Gas price per gallon"
          type="number"
          value={gasPrice}
          onChange={(e) => setGasPrice(e.target.value)}
        />
        <Button variant="contained" onClick={calculateCost}>
          Calculate ICE Cost
        </Button>
        {iceResult && <div className="result-container"><p className="result">{iceResult}</p></div>}
      </div>
    </div>
  );
  
}

export default CostCalculator;
