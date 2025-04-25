// WeatherWidget.jsx
import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [location, setLocation] = useState('Seattle');
  const [temperature, setTemperature] = useState(55);
  const [responseMsg, setResponseMsg] = useState('');
  const [storedData, setStoredData] = useState(null);

  const widgetId = 'weather_01';

  const sendWidgetData = async () => {
    const widgetPayload = {
      widgetId,
      type: 'weather',
      data: { location, temperature },
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:3001/api/widgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widgetPayload),
      });

      const result = await res.json();
      setResponseMsg(result.message || result.error);
    } catch (err) {
      console.error('Error sending widget data:', err);
      setResponseMsg('Failed to send data.');
    }
  };

  const fetchStoredWidgetData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/widgets/${widgetId}`);
      const data = await res.json();
      setStoredData(data);
    } catch (err) {
      console.error('Error fetching widget data:', err);
      setStoredData(null);
    }
  };

  // Optional: auto-fetch on mount
  useEffect(() => {
    fetchStoredWidgetData();
  }, []);

  return (
    <div>
      <h3>Weather Widget</h3>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
        placeholder="Temperature"
      />
      <button onClick={sendWidgetData}>Send Data</button>
      <button onClick={fetchStoredWidgetData}>Fetch Stored Data</button>
      <p>{responseMsg}</p>

      {storedData && (
        <div style={{ marginTop: '10px' }}>
          <strong>Stored Widget Data:</strong>
          <pre>{JSON.stringify(storedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
