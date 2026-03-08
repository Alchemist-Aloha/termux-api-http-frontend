import './App.css';
import BatteryCard from './components/BatteryCard';
import HardwareCard from './components/HardwareCard';
import UIShortcuts from './components/UIShortcuts';
import SMSCard from './components/SMSCard';
import NetworkCard from './components/NetworkCard';
import VolumeCard from './components/VolumeCard';
import ClipboardCard from './components/ClipboardCard';
import NotificationCard from './components/NotificationCard';
import { Smartphone } from 'lucide-react';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="container">
      <header>
        <h1><Smartphone /> Termux Remote Dashboard</h1>
        <div className="stat-label">API: {apiUrl}</div>
      </header>

      <div className="dashboard-grid">
        <BatteryCard />
        <NetworkCard />
        <HardwareCard />
        <VolumeCard />
        <UIShortcuts />
        <ClipboardCard />
        <NotificationCard />
        <SMSCard />
      </div>

      <footer style={{ marginTop: '40px', padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        Termux API HTTP Frontend &bull; Built with React + Vite &bull; Hosted via Docker
      </footer>
    </div>
  );
}

export default App;
