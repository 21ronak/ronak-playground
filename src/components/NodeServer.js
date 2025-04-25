// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

// In-memory storage for widget data
const widgetStore = new Map();

app.post('/api/widgets', (req, res) => {
  const { widgetId, type, data, timestamp } = req.body;

  // Basic validation
  if (!widgetId || !type || !data || !timestamp) {
    return res.status(400).json({ error: 'Missing required widget fields.' });
  }

  // Store the widget data
  widgetStore.set(widgetId, { type, data, timestamp });

  console.log(`Stored widget: ${widgetId}`, widgetStore.get(widgetId));
  res.status(200).json({ message: 'Widget data received successfully.' });
});

app.get('/api/widgets/:id', (req, res) => {
  const { id } = req.params;

  if (!widgetStore.has(id)) {
    return res.status(404).json({ error: 'Widget not found.' });
  }

  const widgetData = widgetStore.get(id);
  res.status(200).json(widgetData);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const { getDataFromServiceA } = require('./serviceA');
const { getDataFromServiceB } = require('./serviceB');
const { getDataFromServiceC } = require('./serviceC');

async function getDasherPay(req, res) {
  try {
    const [a, b, c] = await Promise.all([
      getDataFromServiceA(),
      getDataFromServiceB(),
      getDataFromServiceC()
    ]);

    // Basic calculation combining data
    const totalPay = (a.baseRate * b.duration) + c.bonuses;

    res.json({
      driverId: a.driverId,
      baseRate: a.baseRate,
      distance: b.distance,
      duration: b.duration,
      bonuses: c.bonuses,
      totalPay
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve dasher data' });
  }
}

module.exports = { getDasherPay };

app.get('/api/dasher/pay', getDasherPay);
