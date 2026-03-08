import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { termux } from '../api';

const UIShortcuts = () => {
  const [toastText, setToastText] = useState('');
  const [ttsText, setTtsText] = useState('');

  const sendToast = async () => {
    if (!toastText) return;
    try {
      await termux.showToast(toastText);
      setToastText('');
    } catch (err) {
      console.error(err);
    }
  };

  const speakText = async () => {
    if (!ttsText) return;
    try {
      await termux.ttsSpeak(ttsText);
      setTtsText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2><MessageSquare size={20} /> UI & Interaction</h2>
      <div className="controls">
        <div className="control-group">
          <label className="stat-label">Show Toast</label>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="Message..." 
              value={toastText} 
              onChange={(e) => setToastText(e.target.value)} 
            />
            <button onClick={sendToast}>Send</button>
          </div>
        </div>
        
        <div className="control-group">
          <label className="stat-label">Text to Speech</label>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="Speak..." 
              value={ttsText} 
              onChange={(e) => setTtsText(e.target.value)} 
            />
            <button onClick={speakText} className="secondary">Speak</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIShortcuts;
