// Simulated real-time tracking updates that fire every minute
export const trackingStages = [
  {
    id: 1,
    title: 'Gift Redeemed Successfully',
    subtitle: 'Your reward has been confirmed',
    icon: '🎉',
    detail: 'Order ID: #ELR-2026-{orderId}',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  {
    id: 2,
    title: 'Gift Being Packed',
    subtitle: 'Our team is preparing your gift',
    icon: '📦',
    detail: 'Gift is being carefully packed with premium packaging',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 3,
    title: 'Quality Check Complete',
    subtitle: 'Gift passed quality inspection',
    icon: '✅',
    detail: 'Package weight: 2.4 kg | Dimensions: 30x20x15 cm',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 4,
    title: 'Docket Generated',
    subtitle: 'Shipping label created',
    icon: '🏷️',
    detail: 'Docket No: AWB-{docket} | Partner: BlueDart Express',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 5,
    title: 'Picked Up by Courier',
    subtitle: 'Package is with delivery partner',
    icon: '🚚',
    detail: 'Courier: Ravi Kumar | Contact: +91 98XXX XXXXX',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 6,
    title: 'In Transit - Hub 1',
    subtitle: 'Package at sorting facility',
    icon: '🏭',
    detail: 'Location: Mumbai Distribution Center',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 7,
    title: 'In Transit - Hub 2',
    subtitle: 'Package moving to destination city',
    icon: '✈️',
    detail: 'Location: Delhi Sorting Facility | ETA Updated',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
  },
  {
    id: 8,
    title: 'Out for Delivery',
    subtitle: 'Package is on its way to you!',
    icon: '🛵',
    detail: 'Delivery Agent: Suresh | Vehicle: MH-12-AB-1234',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 9,
    title: 'Arrived at Location',
    subtitle: 'Delivery agent is nearby',
    icon: '📍',
    detail: 'Agent is 200m away from your location',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  {
    id: 10,
    title: 'OTP Verification Required',
    subtitle: 'Confirm delivery with OTP',
    icon: '🔐',
    detail: 'Share the OTP with delivery agent to receive your gift',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
];

export function generateOrderId() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateDocket() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
