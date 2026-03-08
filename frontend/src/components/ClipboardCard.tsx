import { useState, useEffect } from 'react';
import { Clipboard, Copy, FileInput } from 'lucide-react';
import { termux } from '../api';

const ClipboardCard = () => {
  const [text, setText] = useState('');

  const getClipboard = async () => {
    try {
      const res = await termux.getClipboard();
      // Backend returns { output: "..." }
      setText(res.data.output || '');
    } catch (err) {
      console.error(err);
    }
  };

  const setClipboard = async () => {
    if (!text) return;
    try {
      await termux.setClipboard(text);
      alert('Clipboard set!');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClipboard();
  }, []);

  return (
    <div className="card">
      <h2><Clipboard size={20} /> Clipboard</h2>
      <div className="controls">
        <textarea 
          style={{ 
            width: '100%', 
            minHeight: '100px', 
            borderRadius: '8px', 
            border: '1px solid var(--border)',
            padding: '10px',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Clipboard content..."
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={getClipboard} className="secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FileInput size={16} /> Get
          </button>
          <button onClick={setClipboard} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Copy size={16} /> Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClipboardCard;
