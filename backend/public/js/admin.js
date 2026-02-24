// ElectraRewards Admin JS

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('advance-status-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const redemptionId = button.dataset.redemptionId;
    const note = form.querySelector('textarea[name="note"]').value;

    button.disabled = true;
    button.textContent = 'Updating...';

    try {
      const res = await fetch(`/api/admin/redemptions/${redemptionId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update status');
      }

      // Reload page to reflect new status
      window.location.reload();
    } catch (err) {
      alert('Error: ' + err.message);
      button.disabled = false;
      button.textContent = 'Retry';
    }
  });
});
