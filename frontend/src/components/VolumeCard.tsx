import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { termux } from '../api';

const VolumeCard = () => {
  const [volumes, setVolumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVolume = async () => {
    try {
      const res = await termux.getVolume();
      setVolumes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVolumeChange = async (stream: string, val: number) => {
    try {
      await termux.setVolume(stream, val);
      setVolumes(prev => prev.map(v => v.stream === stream ? { ...v, volume: val } : v));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVolume();
  }, []);

  if (loading) return <div className="card">Loading Volume...</div>;

  return (
    <div className="card">
      <h2><Volume2 size={20} /> Volume</h2>
      <div className="controls">
        {volumes.map((v, i) => (
          <div key={i} className="control-group">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="stat-label" style={{ textTransform: 'capitalize' }}>
                {v.stream.replace('_', ' ')}
              </label>
              <span className="stat-value">{v.volume}/{v.max_volume}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={v.max_volume} 
              value={v.volume} 
              onChange={(e) => handleVolumeChange(v.stream, parseInt(e.target.value))} 
            />
          </div>
        ))}
      </div>
      <button onClick={fetchVolume} className="secondary" style={{ width: '100%', marginTop: '10px' }}>Refresh</button>
    </div>
  );
};

export default VolumeCard;
