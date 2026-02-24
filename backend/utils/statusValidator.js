const STATUS_FLOW = [
  'redeemed',
  'accepted',
  'packed',
  'in_transit',
  'out_for_delivery',
  'delivered',
];

export function isValidTransition(currentStatus, newStatus) {
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);
  const newIdx = STATUS_FLOW.indexOf(newStatus);

  if (currentIdx === -1 || newIdx === -1) return false;
  return newIdx === currentIdx + 1;
}

export function getNextStatus(currentStatus) {
  const currentIdx = STATUS_FLOW.indexOf(currentStatus);
  if (currentIdx === -1 || currentIdx >= STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[currentIdx + 1];
}

export { STATUS_FLOW };
