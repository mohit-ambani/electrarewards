-- ElectraRewards Seed Data: 50 Gifts + 1 Default User

-- Default demo user
INSERT INTO users (name, email, phone, points) VALUES
  ('Demo Electrician', 'demo@electrarewards.com', '+91-9876543210', 50000)
ON CONFLICT (email) DO NOTHING;

-- PRO TOOLS (10)
INSERT INTO gifts (id, name, description, points, category, image, rating, tag, color) VALUES
  (1, 'Fluke 117 Digital Multimeter', 'Professional-grade True-RMS multimeter with non-contact voltage detection.', 2500, 'tools', '🔬', 4.9, 'Best Seller', 'from-yellow-500 to-amber-600'),
  (2, 'Milwaukee M18 Drill Kit', 'Brushless cordless drill/driver with 2 batteries and charger.', 4500, 'tools', '🔩', 4.8, 'Pro Choice', 'from-red-500 to-red-700'),
  (3, 'Klein Tools Wire Stripper Set', 'Professional wire stripper and cutter combo set.', 1200, 'tools', '✂️', 4.7, NULL, 'from-orange-500 to-orange-700'),
  (4, 'DeWalt 20V Impact Driver', '3-speed impact driver with brushless motor technology.', 3800, 'tools', '⚡', 4.9, 'Top Rated', 'from-yellow-500 to-yellow-700'),
  (5, 'Knipex Pliers Cobra Set', 'German-engineered precision pliers set of 3.', 2200, 'tools', '🔧', 4.8, NULL, 'from-blue-500 to-blue-700'),
  (6, 'Milwaukee Headlamp 600L', 'USB rechargeable hard hat headlamp, 600 lumens.', 800, 'tools', '🔦', 4.6, 'Value Pick', 'from-green-500 to-green-700'),
  (7, 'Wera Kraftform Screwdriver Set', 'Ergonomic 12-piece insulated screwdriver set.', 1800, 'tools', '🪛', 4.7, NULL, 'from-teal-500 to-teal-700'),
  (8, 'FLIR Thermal Camera C5', 'Compact thermal imaging camera with WiFi.', 8000, 'tools', '📷', 4.9, 'Premium', 'from-purple-500 to-purple-700'),
  (9, 'Stanley FatMax Tool Box', 'Large professional tool box with organizer top.', 1500, 'tools', '🧰', 4.5, NULL, 'from-gray-500 to-gray-700'),
  (10, 'Bosch Laser Level GLL 3-80', '360-degree 3-plane laser level with mount.', 5500, 'tools', '📐', 4.8, 'Pro Choice', 'from-cyan-500 to-cyan-700')
ON CONFLICT (id) DO NOTHING;

-- ELECTRONICS (10)
INSERT INTO gifts (id, name, description, points, category, image, rating, tag, color) VALUES
  (11, 'Apple iPad 10th Gen', '10.9" Liquid Retina display, A14 Bionic chip, 64GB.', 12000, 'electronics', '📱', 4.9, 'Hot Pick', 'from-slate-500 to-slate-700'),
  (12, 'Samsung Galaxy Buds Pro', 'Active noise cancelling wireless earbuds with 360 Audio.', 3500, 'electronics', '🎧', 4.7, NULL, 'from-violet-500 to-violet-700'),
  (13, 'JBL Charge 5 Speaker', 'Portable waterproof Bluetooth speaker with powerbank.', 3200, 'electronics', '🔊', 4.8, 'Best Seller', 'from-blue-500 to-indigo-600'),
  (14, 'Apple Watch SE', 'GPS, heart rate monitor, water resistant 50m.', 8500, 'electronics', '⌚', 4.8, 'Premium', 'from-rose-500 to-rose-700'),
  (15, 'Fire TV Stick 4K Max', 'Streaming media player with Alexa voice remote.', 1500, 'electronics', '📺', 4.6, 'Value Pick', 'from-orange-500 to-orange-700'),
  (16, 'Anker PowerCore 26800', 'Portable charger 26800mAh with dual input.', 1200, 'electronics', '🔋', 4.7, NULL, 'from-blue-400 to-blue-600'),
  (17, 'GoPro HERO12 Black', '5.3K video, HyperSmooth 6.0, waterproof to 33ft.', 9500, 'electronics', '🎥', 4.8, 'Top Rated', 'from-gray-600 to-gray-800'),
  (18, 'Sony WH-1000XM5', 'Industry-leading noise cancelling headphones.', 7500, 'electronics', '🎵', 4.9, 'Premium', 'from-neutral-500 to-neutral-700'),
  (19, 'Kindle Paperwhite', '6.8" display, adjustable warm light, 16GB, waterproof.', 3000, 'electronics', '📖', 4.7, NULL, 'from-emerald-500 to-emerald-700'),
  (20, 'DJI Mini 3 Drone', 'Ultra-lightweight camera drone, 4K HDR video, 38min flight.', 15000, 'electronics', '🚁', 4.9, 'Exclusive', 'from-sky-500 to-sky-700')
ON CONFLICT (id) DO NOTHING;

-- HOME & LIVING (10)
INSERT INTO gifts (id, name, description, points, category, image, rating, tag, color) VALUES
  (21, 'Dyson V12 Detect Slim', 'Cordless vacuum with laser dust detection.', 14000, 'home', '🧹', 4.8, 'Premium', 'from-purple-500 to-fuchsia-600'),
  (22, 'Philips Hue Starter Kit', '4 smart bulbs + bridge, 16M colors, voice control.', 3500, 'home', '💡', 4.7, 'Smart Home', 'from-amber-400 to-orange-500'),
  (23, 'Ninja Foodi 9-in-1', 'Pressure cooker, air fryer & more in one.', 4500, 'home', '🍳', 4.8, 'Best Seller', 'from-red-500 to-red-700'),
  (24, 'Nespresso Vertuo Plus', 'Coffee machine with 30 capsule varieties.', 3800, 'home', '☕', 4.7, NULL, 'from-amber-700 to-amber-900'),
  (25, 'Ring Video Doorbell Pro', '1080p HD video, night vision, two-way talk.', 4200, 'home', '🔔', 4.6, 'Smart Home', 'from-blue-500 to-blue-700'),
  (26, 'iRobot Roomba i5+', 'Self-emptying robot vacuum with smart mapping.', 8000, 'home', '🤖', 4.7, 'Top Rated', 'from-green-500 to-green-700'),
  (27, 'Weber Spirit E-310 Grill', '3-burner gas grill with porcelain-enameled grates.', 11000, 'home', '🔥', 4.8, 'Premium', 'from-stone-500 to-stone-700'),
  (28, 'Egyptian Cotton Sheet Set', '1000 thread count, king size, luxury bedding.', 2500, 'home', '🛏️', 4.6, NULL, 'from-indigo-400 to-indigo-600'),
  (29, 'Smart Thermostat Nest', 'Energy-saving smart thermostat with app control.', 3500, 'home', '🌡️', 4.7, 'Smart Home', 'from-teal-500 to-cyan-600'),
  (30, 'LG 43" 4K Smart TV', '4K UHD Smart TV with webOS and ThinQ AI.', 10000, 'home', '🖥️', 4.7, 'Hot Pick', 'from-gray-600 to-gray-800')
ON CONFLICT (id) DO NOTHING;

-- LIFESTYLE (10)
INSERT INTO gifts (id, name, description, points, category, image, rating, tag, color) VALUES
  (31, 'Ray-Ban Aviator Classic', 'Gold frame with green G-15 lenses.', 3500, 'lifestyle', '🕶️', 4.8, 'Classic', 'from-amber-500 to-amber-700'),
  (32, 'Nike Air Max 90', 'Iconic comfort sneakers, visible Air cushioning.', 3000, 'lifestyle', '👟', 4.7, 'Popular', 'from-red-500 to-red-700'),
  (33, 'Yeti Rambler 30oz Set', 'Stainless steel insulated tumbler set of 2.', 1200, 'lifestyle', '🥤', 4.8, NULL, 'from-slate-400 to-slate-600'),
  (34, 'Fossil Gen 6 Smartwatch', 'Wear OS smartwatch with SpO2 and heart rate.', 5500, 'lifestyle', '⌚', 4.5, NULL, 'from-amber-600 to-amber-800'),
  (35, 'Coleman 6-Person Tent', 'WeatherTec system, dark room technology, easy setup.', 4000, 'lifestyle', '⛺', 4.6, NULL, 'from-green-600 to-green-800'),
  (36, 'Fitbit Charge 6', 'Fitness tracker with GPS, heart rate & stress.', 3200, 'lifestyle', '💪', 4.7, 'Health', 'from-pink-500 to-pink-700'),
  (37, 'Samsonite Carry-On Luggage', 'Hardside spinner with USB port, TSA lock.', 4500, 'lifestyle', '🧳', 4.7, NULL, 'from-neutral-500 to-neutral-700'),
  (38, 'Oakley Flak 2.0 XL', 'High-definition optics with Unobtainium grips.', 4000, 'lifestyle', '🥽', 4.8, 'Sport', 'from-gray-500 to-gray-700'),
  (39, 'Hydro Flask 32oz Bundle', 'Insulated water bottle with flex cap + boot.', 900, 'lifestyle', '💧', 4.6, 'Value Pick', 'from-sky-400 to-sky-600'),
  (40, 'Columbia Jacket - Waterproof', 'Omni-Tech waterproof breathable rain jacket.', 3500, 'lifestyle', '🧥', 4.7, NULL, 'from-blue-600 to-blue-800')
ON CONFLICT (id) DO NOTHING;

-- PREMIUM (10)
INSERT INTO gifts (id, name, description, points, category, image, rating, tag, color) VALUES
  (41, 'MacBook Air M2', '13.6" Liquid Retina, M2 chip, 8GB RAM, 256GB SSD.', 35000, 'premium', '💻', 5.0, 'Exclusive', 'from-gray-400 to-gray-600'),
  (42, 'PlayStation 5 Console', 'Next-gen gaming console with DualSense controller.', 15000, 'premium', '🎮', 4.9, 'Hot Pick', 'from-blue-600 to-indigo-700'),
  (43, 'Bose QuietComfort Ultra', 'Spatial audio, world-class noise cancellation.', 8500, 'premium', '🎶', 4.9, 'Premium', 'from-stone-500 to-stone-700'),
  (44, 'Canon EOS R50 Camera', 'Mirrorless camera with 24.2MP, 4K video, dual lens kit.', 18000, 'premium', '📸', 4.8, 'Pro', 'from-red-600 to-red-800'),
  (45, 'Samsung 55" OLED TV', '4K OLED, Neural Quantum Processor, Dolby Atmos.', 30000, 'premium', '📺', 4.9, 'Exclusive', 'from-slate-600 to-slate-800'),
  (46, 'Garmin Fenix 7 Pro', 'Multisport GPS watch with LED flashlight & solar.', 16000, 'premium', '⌚', 4.9, 'Premium', 'from-orange-500 to-orange-700'),
  (47, 'Sonos Arc Soundbar', 'Premium smart soundbar with Dolby Atmos 3D audio.', 20000, 'premium', '🔈', 4.8, 'Top Rated', 'from-zinc-500 to-zinc-700'),
  (48, 'Breville Barista Express', 'Espresso machine with built-in grinder, steam wand.', 16000, 'premium', '☕', 4.8, 'Premium', 'from-amber-600 to-amber-800'),
  (49, 'iPad Pro 11" M2', 'M2 chip, Liquid Retina XDR, ProMotion, Face ID.', 22000, 'premium', '📲', 4.9, 'Exclusive', 'from-gray-500 to-gray-700'),
  (50, 'Herman Miller Aeron Chair', 'Iconic ergonomic office chair, size B, fully loaded.', 35000, 'premium', '🪑', 5.0, 'Legendary', 'from-emerald-600 to-emerald-800')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence to avoid conflicts with future inserts
SELECT setval('gifts_id_seq', 50, true);
