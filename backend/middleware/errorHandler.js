export default function errorHandler(err, req, res, _next) {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (req.path.startsWith('/api/')) {
    return res.status(status).json({ error: message });
  }

  res.status(status).render('layout', {
    title: 'Error',
    body: `<div class="flex items-center justify-center h-64"><p class="text-red-500 text-lg">${message}</p></div>`,
    activePage: '',
  });
}
