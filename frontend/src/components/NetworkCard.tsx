import { useState, useEffect } from 'react';
import { Wifi, RefreshCcw } from 'lucide-react';
import { termux } from '../api';

const NetworkCard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWifi = async () => {
    try {
      const res = await termux.getWifi();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWifi = async (state: boolean) => {
    try {
      await termux.setWifiEnabled(state);
      setTimeout(fetchWifi, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWifi();
  }, []);

  if (loading) return <div className="card">Loading Network...</div>;

  return (
    <div className="card">
      <h2><Wifi size={20} /> Network</h2>
      {data ? (
        <>
          <div className="stat-item">
            <span className="stat-label">SSID</span>
            <span className="stat-value">{data.ssid || 'N/A'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">IP Address</span>
            <span className="stat-value">{data.ip || 'N/A'}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Signal Strength</span>
            <span className="stat-value">{data.rssi} dBm</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Link Speed</span>
            <span className="stat-value">{data.link_speed_mbps} Mbps</span>
          </div>
        </>
      ) : (
        <div className="stat-label">Wifi details unavailable</div>
      )}
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button onClick={() => toggleWifi(true)} className="tag-success" style={{ flex: 1 }}>Enable</button>
        <button onClick={() => toggleWifi(false)} className="tag-danger" style={{ flex: 1 }}>Disable</button>
        <button onClick={fetchWifi} className="secondary"><RefreshCcw size={16} /></button>
      </div>
    </div>
  );
};

export default NetworkCard;
