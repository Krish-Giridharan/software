const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory stores for scaffold/demo
let vehicles = [];

// Routes
app.get('/api/vehicles', (req, res) => {
  res.json(vehicles);
});

app.post('/api/vehicles', (req, res) => {
  const v = req.body;
  v.vehicle_id = vehicles.length + 1;
  vehicles.push(v);
  res.status(201).json(v);
});

app.get('/api/dashboard', (req, res) => {
  const total = vehicles.length;
  const maintenanceRequired = vehicles.filter(v => {
    // simple rule: mileage > threshold or next_service_date within 7 days
    const mileageRisk = (v.mileage || 0) > 70000;
    let dateRisk = false;
    if (v.next_service_date) {
      const next = new Date(v.next_service_date);
      const diff = (next - new Date()) / (1000 * 60 * 60 * 24);
      dateRisk = diff <= 7;
    }
    return mileageRisk || dateRisk;
  }).length;
  res.json({ totalVehicles: total, maintenanceRequired });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Fleet backend running on port ${PORT}`);
});
