import { useState, useEffect } from 'react';
import { Bell, Send, Trash2 } from 'lucide-react';
import { termux } from '../api';

const NotificationCard = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await termux.getNotifications();
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async () => {
    if (!title || !content) return;
    try {
      await termux.sendNotification(title, content);
      setTitle('');
      setContent('');
      setTimeout(fetchNotifications, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const removeNotification = async (id: string) => {
    try {
      await termux.removeNotification(id);
      setTimeout(fetchNotifications, 500);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="card">
      <h2><Bell size={20} /> Notifications</h2>
      
      <div className="controls" style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%' }}
        />
        <div className="input-row">
          <input 
            type="text" 
            placeholder="Content..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
          <button onClick={sendNotification}><Send size={16} /></button>
        </div>
      </div>

      <div className="list-container">
        {loading ? (
          <div className="stat-label">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="stat-label">No active notifications</div>
        ) : (
          notifications.map((n, i) => (
            <div key={i} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="stat-value">{n.title}</div>
                <div className="stat-label">{n.content}</div>
              </div>
              <button onClick={() => removeNotification(n.id)} className="secondary" style={{ padding: '5px' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
      <button onClick={fetchNotifications} className="secondary" style={{ width: '100%', marginTop: '10px' }}>Refresh</button>
    </div>
  );
};

export default NotificationCard;
