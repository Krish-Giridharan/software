-- Init SQL for Fleet Operations Platform

CREATE TABLE IF NOT EXISTS vehicles (
  vehicle_id SERIAL PRIMARY KEY,
  vehicle_number VARCHAR(50) NOT NULL,
  vehicle_type VARCHAR(50),
  model VARCHAR(100),
  manufacturer VARCHAR(100),
  year INT,
  mileage INT,
  status VARCHAR(30),
  last_service_date DATE,
  next_service_date DATE
);

CREATE TABLE IF NOT EXISTS maintenance (
  maintenance_id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(vehicle_id),
  maintenance_type VARCHAR(100),
  maintenance_date DATE,
  description TEXT,
  cost NUMERIC,
  technician VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS fuel (
  fuel_id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(vehicle_id),
  fuel_date DATE,
  fuel_quantity NUMERIC,
  fuel_cost NUMERIC,
  odometer_reading INT
);

CREATE TABLE IF NOT EXISTS drivers (
  driver_id SERIAL PRIMARY KEY,
  driver_name VARCHAR(200),
  license_number VARCHAR(100),
  phone VARCHAR(50),
  performance_score NUMERIC
);

CREATE TABLE IF NOT EXISTS maintenance_alerts (
  alert_id SERIAL PRIMARY KEY,
  vehicle_id INT REFERENCES vehicles(vehicle_id),
  alert_type VARCHAR(100),
  risk_level VARCHAR(20),
  message TEXT,
  created_at TIMESTAMP DEFAULT now()
);
