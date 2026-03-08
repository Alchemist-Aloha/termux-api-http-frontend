import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { termux } from '../api';

const SMSCard = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSMS = async () => {
    try {
      const res = await termux.getSMS(5);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSMS();
  }, []);

  return (
    <div className="card">
      <h2><Mail size={20} /> Recent SMS</h2>
      {loading ? (
        <div className="stat-label">Loading messages...</div>
      ) : (
        <div className="list-container">
          {messages.length === 0 ? (
            <div className="stat-label">No messages found</div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="list-item">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="stat-value">{msg.number}</span>
                  <span className="stat-label" style={{ fontSize: '0.7rem' }}>{msg.received}</span>
                </div>
                <div className="stat-label" style={{ marginTop: '5px', color: 'var(--text)' }}>
                  {msg.body}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <button onClick={fetchSMS} className="secondary" style={{ width: '100%', marginTop: '10px' }}>Refresh</button>
    </div>
  );
};

export default SMSCard;
