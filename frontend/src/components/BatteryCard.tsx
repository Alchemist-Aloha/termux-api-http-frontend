import { useState, useEffect } from 'react';
import { Battery } from 'lucide-react';
import { termux } from '../api';

const BatteryCard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await termux.getBattery();
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="card">Loading Battery...</div>;
  if (!data) return <div className="card">Error loading battery data</div>;

  const getStatusColor = () => {
    if (data.status === 'CHARGING') return 'tag-success';
    if (data.percentage < 20) return 'tag-danger';
    return 'tag-warning';
  };

  return (
    <div className="card">
      <h2><Battery size={20} /> Battery Status</h2>
      <div className="stat-item">
        <span className="stat-label">Percentage</span>
        <span className="stat-value">{data.percentage}%</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Status</span>
        <span className={`tag ${getStatusColor()}`}>{data.status}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Health</span>
        <span className="stat-value">{data.health}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Temperature</span>
        <span className="stat-value">{(data.temperature / 10).toFixed(1)}°C</span>
      </div>
      <button onClick={fetchData} className="secondary" style={{ width: '100%', marginTop: '10px' }}>Refresh</button>
    </div>
  );
};

export default BatteryCard;
