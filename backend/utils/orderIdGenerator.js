export function generateOrderId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ELR-${year}-${random}`;
}

export function generateDocketNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let docket = '';
  for (let i = 0; i < 12; i++) {
    docket += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return docket;
}

export function generateOTP() {
  return String(Math.floor(1000 + Math.random() * 9000));
}
