import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function createRedemption(giftId) {
  try {
    const { data } = await api.post('/redemptions', { gift_id: giftId });
    return data;
  } catch {
    console.log('Backend unavailable, continuing offline');
    return null;
  }
}

export async function fetchDashboard() {
  const { data } = await api.get('/admin/dashboard');
  return data;
}

export async function fetchRedemptions(params) {
  const { data } = await api.get('/admin/redemptions', { params });
  return data;
}

export async function fetchRedemptionDetail(id) {
  const { data } = await api.get(`/admin/redemptions/${id}`);
  return data;
}

export async function advanceStatus(id, note) {
  const { data } = await api.patch(`/admin/redemptions/${id}/status`, { note });
  return data;
}

export default api;
