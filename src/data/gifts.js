export const giftCategories = [
  { id: 'all', name: 'All Gifts', icon: '🎁' },
  { id: 'tools', name: 'Pro Tools', icon: '🔧' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'home', name: 'Home & Living', icon: '🏠' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '✨' },
  { id: 'premium', name: 'Premium', icon: '👑' },
];

export const gifts = [
  // PRO TOOLS (10)
  { id: 1, name: 'Fluke 117 Digital Multimeter', category: 'tools', points: 2500, image: '🔬', rating: 4.9, tag: 'Best Seller', color: 'from-yellow-500 to-amber-600', description: 'Professional-grade True-RMS multimeter with non-contact voltage detection.' },
  { id: 2, name: 'Milwaukee M18 Drill Kit', category: 'tools', points: 4500, image: '🔩', rating: 4.8, tag: 'Pro Choice', color: 'from-red-500 to-red-700', description: 'Brushless cordless drill/driver with 2 batteries and charger.' },
  { id: 3, name: 'Klein Tools Wire Stripper Set', category: 'tools', points: 1200, image: '✂️', rating: 4.7, tag: '', color: 'from-orange-500 to-orange-700', description: 'Professional wire stripper and cutter combo set.' },
  { id: 4, name: 'DeWalt 20V Impact Driver', category: 'tools', points: 3800, image: '⚡', rating: 4.9, tag: 'Top Rated', color: 'from-yellow-500 to-yellow-700', description: '3-speed impact driver with brushless motor technology.' },
  { id: 5, name: 'Knipex Pliers Cobra Set', category: 'tools', points: 2200, image: '🔧', rating: 4.8, tag: '', color: 'from-blue-500 to-blue-700', description: 'German-engineered precision pliers set of 3.' },
  { id: 6, name: 'Milwaukee Headlamp 600L', category: 'tools', points: 800, image: '🔦', rating: 4.6, tag: 'Value Pick', color: 'from-green-500 to-green-700', description: 'USB rechargeable hard hat headlamp, 600 lumens.' },
  { id: 7, name: 'Wera Kraftform Screwdriver Set', category: 'tools', points: 1800, image: '🪛', rating: 4.7, tag: '', color: 'from-teal-500 to-teal-700', description: 'Ergonomic 12-piece insulated screwdriver set.' },
  { id: 8, name: 'FLIR Thermal Camera C5', category: 'tools', points: 8000, image: '📷', rating: 4.9, tag: 'Premium', color: 'from-purple-500 to-purple-700', description: 'Compact thermal imaging camera with WiFi.' },
  { id: 9, name: 'Stanley FatMax Tool Box', category: 'tools', points: 1500, image: '🧰', rating: 4.5, tag: '', color: 'from-gray-500 to-gray-700', description: 'Large professional tool box with organizer top.' },
  { id: 10, name: 'Bosch Laser Level GLL 3-80', category: 'tools', points: 5500, image: '📐', rating: 4.8, tag: 'Pro Choice', color: 'from-cyan-500 to-cyan-700', description: '360-degree 3-plane laser level with mount.' },

  // ELECTRONICS (10)
  { id: 11, name: 'Apple iPad 10th Gen', category: 'electronics', points: 12000, image: '📱', rating: 4.9, tag: 'Hot Pick', color: 'from-slate-500 to-slate-700', description: '10.9" Liquid Retina display, A14 Bionic chip, 64GB.' },
  { id: 12, name: 'Samsung Galaxy Buds Pro', category: 'electronics', points: 3500, image: '🎧', rating: 4.7, tag: '', color: 'from-violet-500 to-violet-700', description: 'Active noise cancelling wireless earbuds with 360 Audio.' },
  { id: 13, name: 'JBL Charge 5 Speaker', category: 'electronics', points: 3200, image: '🔊', rating: 4.8, tag: 'Best Seller', color: 'from-blue-500 to-indigo-600', description: 'Portable waterproof Bluetooth speaker with powerbank.' },
  { id: 14, name: 'Apple Watch SE', category: 'electronics', points: 8500, image: '⌚', rating: 4.8, tag: 'Premium', color: 'from-rose-500 to-rose-700', description: 'GPS, heart rate monitor, water resistant 50m.' },
  { id: 15, name: 'Fire TV Stick 4K Max', category: 'electronics', points: 1500, image: '📺', rating: 4.6, tag: 'Value Pick', color: 'from-orange-500 to-orange-700', description: 'Streaming media player with Alexa voice remote.' },
  { id: 16, name: 'Anker PowerCore 26800', category: 'electronics', points: 1200, image: '🔋', rating: 4.7, tag: '', color: 'from-blue-400 to-blue-600', description: 'Portable charger 26800mAh with dual input.' },
  { id: 17, name: 'GoPro HERO12 Black', category: 'electronics', points: 9500, image: '🎥', rating: 4.8, tag: 'Top Rated', color: 'from-gray-600 to-gray-800', description: '5.3K video, HyperSmooth 6.0, waterproof to 33ft.' },
  { id: 18, name: 'Sony WH-1000XM5', category: 'electronics', points: 7500, image: '🎵', rating: 4.9, tag: 'Premium', color: 'from-neutral-500 to-neutral-700', description: 'Industry-leading noise cancelling headphones.' },
  { id: 19, name: 'Kindle Paperwhite', category: 'electronics', points: 3000, image: '📖', rating: 4.7, tag: '', color: 'from-emerald-500 to-emerald-700', description: '6.8" display, adjustable warm light, 16GB, waterproof.' },
  { id: 20, name: 'DJI Mini 3 Drone', category: 'electronics', points: 15000, image: '🚁', rating: 4.9, tag: 'Exclusive', color: 'from-sky-500 to-sky-700', description: 'Ultra-lightweight camera drone, 4K HDR video, 38min flight.' },

  // HOME & LIVING (10)
  { id: 21, name: 'Dyson V12 Detect Slim', category: 'home', points: 14000, image: '🧹', rating: 4.8, tag: 'Premium', color: 'from-purple-500 to-fuchsia-600', description: 'Cordless vacuum with laser dust detection.' },
  { id: 22, name: 'Philips Hue Starter Kit', category: 'home', points: 3500, image: '💡', rating: 4.7, tag: 'Smart Home', color: 'from-amber-400 to-orange-500', description: '4 smart bulbs + bridge, 16M colors, voice control.' },
  { id: 23, name: 'Ninja Foodi 9-in-1', category: 'home', points: 4500, image: '🍳', rating: 4.8, tag: 'Best Seller', color: 'from-red-500 to-red-700', description: 'Pressure cooker, air fryer & more in one.' },
  { id: 24, name: 'Nespresso Vertuo Plus', category: 'home', points: 3800, image: '☕', rating: 4.7, tag: '', color: 'from-amber-700 to-amber-900', description: 'Coffee machine with 30 capsule varieties.' },
  { id: 25, name: 'Ring Video Doorbell Pro', category: 'home', points: 4200, image: '🔔', rating: 4.6, tag: 'Smart Home', color: 'from-blue-500 to-blue-700', description: '1080p HD video, night vision, two-way talk.' },
  { id: 26, name: 'iRobot Roomba i5+', category: 'home', points: 8000, image: '🤖', rating: 4.7, tag: 'Top Rated', color: 'from-green-500 to-green-700', description: 'Self-emptying robot vacuum with smart mapping.' },
  { id: 27, name: 'Weber Spirit E-310 Grill', category: 'home', points: 11000, image: '🔥', rating: 4.8, tag: 'Premium', color: 'from-stone-500 to-stone-700', description: '3-burner gas grill with porcelain-enameled grates.' },
  { id: 28, name: 'Egyptian Cotton Sheet Set', category: 'home', points: 2500, image: '🛏️', rating: 4.6, tag: '', color: 'from-indigo-400 to-indigo-600', description: '1000 thread count, king size, luxury bedding.' },
  { id: 29, name: 'Smart Thermostat Nest', category: 'home', points: 3500, image: '🌡️', rating: 4.7, tag: 'Smart Home', color: 'from-teal-500 to-cyan-600', description: 'Energy-saving smart thermostat with app control.' },
  { id: 30, name: 'LG 43" 4K Smart TV', category: 'home', points: 10000, image: '🖥️', rating: 4.7, tag: 'Hot Pick', color: 'from-gray-600 to-gray-800', description: '4K UHD Smart TV with webOS and ThinQ AI.' },

  // LIFESTYLE (10)
  { id: 31, name: 'Ray-Ban Aviator Classic', category: 'lifestyle', points: 3500, image: '🕶️', rating: 4.8, tag: 'Classic', color: 'from-amber-500 to-amber-700', description: 'Gold frame with green G-15 lenses.' },
  { id: 32, name: 'Nike Air Max 90', category: 'lifestyle', points: 3000, image: '👟', rating: 4.7, tag: 'Popular', color: 'from-red-500 to-red-700', description: 'Iconic comfort sneakers, visible Air cushioning.' },
  { id: 33, name: 'Yeti Rambler 30oz Set', category: 'lifestyle', points: 1200, image: '🥤', rating: 4.8, tag: '', color: 'from-slate-400 to-slate-600', description: 'Stainless steel insulated tumbler set of 2.' },
  { id: 34, name: 'Fossil Gen 6 Smartwatch', category: 'lifestyle', points: 5500, image: '⌚', rating: 4.5, tag: '', color: 'from-amber-600 to-amber-800', description: 'Wear OS smartwatch with SpO2 and heart rate.' },
  { id: 35, name: 'Coleman 6-Person Tent', category: 'lifestyle', points: 4000, image: '⛺', rating: 4.6, tag: '', color: 'from-green-600 to-green-800', description: 'WeatherTec system, dark room technology, easy setup.' },
  { id: 36, name: 'Fitbit Charge 6', category: 'lifestyle', points: 3200, image: '💪', rating: 4.7, tag: 'Health', color: 'from-pink-500 to-pink-700', description: 'Fitness tracker with GPS, heart rate & stress.' },
  { id: 37, name: 'Samsonite Carry-On Luggage', category: 'lifestyle', points: 4500, image: '🧳', rating: 4.7, tag: '', color: 'from-neutral-500 to-neutral-700', description: 'Hardside spinner with USB port, TSA lock.' },
  { id: 38, name: 'Oakley Flak 2.0 XL', category: 'lifestyle', points: 4000, image: '🥽', rating: 4.8, tag: 'Sport', color: 'from-gray-500 to-gray-700', description: 'High-definition optics with Unobtainium grips.' },
  { id: 39, name: 'Hydro Flask 32oz Bundle', category: 'lifestyle', points: 900, image: '💧', rating: 4.6, tag: 'Value Pick', color: 'from-sky-400 to-sky-600', description: 'Insulated water bottle with flex cap + boot.' },
  { id: 40, name: 'Columbia Jacket - Waterproof', category: 'lifestyle', points: 3500, image: '🧥', rating: 4.7, tag: '', color: 'from-blue-600 to-blue-800', description: 'Omni-Tech waterproof breathable rain jacket.' },

  // PREMIUM (10)
  { id: 41, name: 'MacBook Air M2', category: 'premium', points: 35000, image: '💻', rating: 5.0, tag: 'Exclusive', color: 'from-gray-400 to-gray-600', description: '13.6" Liquid Retina, M2 chip, 8GB RAM, 256GB SSD.' },
  { id: 42, name: 'PlayStation 5 Console', category: 'premium', points: 15000, image: '🎮', rating: 4.9, tag: 'Hot Pick', color: 'from-blue-600 to-indigo-700', description: 'Next-gen gaming console with DualSense controller.' },
  { id: 43, name: 'Bose QuietComfort Ultra', category: 'premium', points: 8500, image: '🎶', rating: 4.9, tag: 'Premium', color: 'from-stone-500 to-stone-700', description: 'Spatial audio, world-class noise cancellation.' },
  { id: 44, name: 'Canon EOS R50 Camera', category: 'premium', points: 18000, image: '📸', rating: 4.8, tag: 'Pro', color: 'from-red-600 to-red-800', description: 'Mirrorless camera with 24.2MP, 4K video, dual lens kit.' },
  { id: 45, name: 'Samsung 55" OLED TV', category: 'premium', points: 30000, image: '📺', rating: 4.9, tag: 'Exclusive', color: 'from-slate-600 to-slate-800', description: '4K OLED, Neural Quantum Processor, Dolby Atmos.' },
  { id: 46, name: 'Garmin Fenix 7 Pro', category: 'premium', points: 16000, image: '⌚', rating: 4.9, tag: 'Premium', color: 'from-orange-500 to-orange-700', description: 'Multisport GPS watch with LED flashlight & solar.' },
  { id: 47, name: 'Sonos Arc Soundbar', category: 'premium', points: 20000, image: '🔈', rating: 4.8, tag: 'Top Rated', color: 'from-zinc-500 to-zinc-700', description: 'Premium smart soundbar with Dolby Atmos 3D audio.' },
  { id: 48, name: 'Breville Barista Express', category: 'premium', points: 16000, image: '☕', rating: 4.8, tag: 'Premium', color: 'from-amber-600 to-amber-800', description: 'Espresso machine with built-in grinder, steam wand.' },
  { id: 49, name: 'iPad Pro 11" M2', category: 'premium', points: 22000, image: '📲', rating: 4.9, tag: 'Exclusive', color: 'from-gray-500 to-gray-700', description: 'M2 chip, Liquid Retina XDR, ProMotion, Face ID.' },
  { id: 50, name: 'Herman Miller Aeron Chair', category: 'premium', points: 35000, image: '🪑', rating: 5.0, tag: 'Legendary', color: 'from-emerald-600 to-emerald-800', description: 'Iconic ergonomic office chair, size B, fully loaded.' },
];

export const getGiftById = (id) => gifts.find(g => g.id === id);

export const getGiftsByCategory = (category) => {
  if (category === 'all') return gifts;
  return gifts.filter(g => g.category === category);
};
