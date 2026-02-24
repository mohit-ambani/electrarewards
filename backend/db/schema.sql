-- ElectraRewards Admin Backend Schema

CREATE TABLE IF NOT EXISTS gifts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  points INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(10),
  rating NUMERIC(2,1) DEFAULT 0,
  tag VARCHAR(50),
  color VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  points INTEGER DEFAULT 50000,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS redemptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  gift_id INTEGER REFERENCES gifts(id),
  order_id VARCHAR(20) NOT NULL UNIQUE,
  docket_number VARCHAR(20),
  otp VARCHAR(6),
  status VARCHAR(30) DEFAULT 'redeemed',
  points_spent INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS redemption_status_log (
  id SERIAL PRIMARY KEY,
  redemption_id INTEGER REFERENCES redemptions(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_redemptions_status ON redemptions(status);
CREATE INDEX IF NOT EXISTS idx_redemptions_order_id ON redemptions(order_id);
CREATE INDEX IF NOT EXISTS idx_redemption_status_log_redemption_id ON redemption_status_log(redemption_id);
