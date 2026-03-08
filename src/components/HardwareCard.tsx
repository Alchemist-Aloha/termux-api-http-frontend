import { useState } from 'react';
import { Sun, Flashlight, Vibrate } from 'lucide-react';
import { termux } from '../api';

const HardwareCard = () => {
  const [brightness, setBrightness] = useState(128);
  const [torch, setTorch] = useState(false);

  const handleBrightness = async (val: number) => {
    setBrightness(val);
    try {
      await termux.setBrightness(val);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTorch = async () => {
    const newState = !torch;
    setTorch(newState);
    try {
      await termux.setTorch(newState);
    } catch (err) {
      console.error(err);
    }
  };

  const triggerVibrate = async () => {
    try {
      await termux.vibrate(500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2><Sun size={20} /> Hardware Controls</h2>
      <div className="controls">
        <div className="control-group">
          <label className="stat-label">Brightness: {brightness}</label>
          <input 
            type="range" 
            min="0" 
            max="255" 
            value={brightness} 
            onChange={(e) => handleBrightness(parseInt(e.target.value))} 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={toggleTorch} 
            className={torch ? '' : 'secondary'}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Flashlight size={18} /> {torch ? 'Torch ON' : 'Torch OFF'}
          </button>
          
          <button 
            onClick={triggerVibrate} 
            className="secondary"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Vibrate size={18} /> Vibrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default HardwareCard;
