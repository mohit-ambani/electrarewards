const API_BASE = '/api';

export async function createRedemption(giftId) {
  try {
    const res = await fetch(`${API_BASE}/redemptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gift_id: giftId }),
    });
    if (!res.ok) throw new Error('API error');
    return await res.json();
  } catch {
    // Silently fail — frontend works standalone
    console.log('Backend unavailable, continuing offline');
    return null;
  }
}
