import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:43333/api';
const API_KEY = import.meta.env.VITE_API_KEY || '';

const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});

export const termux = {
  // System Info & Status
  getBattery: () => api.get('/battery'),
  getWifi: () => api.get('/wifi'),
  getWifiScan: () => api.get('/wifi/scan'),
  setWifiEnabled: (enabled: boolean) => api.post('/wifi/enable', { enabled }),
  getDeviceInfo: () => api.get('/info'),
  getLocation: () => api.get('/location'),
  
  // Hardware Control
  setBrightness: (value: number | 'auto') => api.post('/brightness', { value }),
  setTorch: (enabled: boolean) => api.post('/torch', { enabled }),
  vibrate: (duration: number = 500) => api.post('/vibrate', { duration }),
  getVolume: () => api.get('/volume'),
  setVolume: (stream: string, volume: number) => api.post('/volume', { stream, volume }),
  
  // Communications
  getSMS: (limit: number = 10) => api.get(`/sms?limit=${limit}`),
  sendSMS: (number: string, text: string) => api.post('/sms/send', { number, text }),
  getCallLog: (limit: number = 10) => api.get(`/call-log?limit=${limit}`),
  getContacts: () => api.get('/contacts'),
  
  // UI Interaction
  showToast: (text: string, short: boolean = true) => api.post('/toast', { text, short }),
  ttsSpeak: (text: string) => api.post('/tts', { text }),
  getClipboard: () => api.get('/clipboard'),
  setClipboard: (text: string) => api.post('/clipboard', { text }),
  
  // Notifications
  getNotifications: () => api.get('/notifications'),
  sendNotification: (title: string, content: string, priority: string = 'high') => 
    api.post('/notification', { title, content, priority }),
  removeNotification: (id: string) => api.post('/notification/remove', { id }),
};

export default api;
