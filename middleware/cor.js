// middleware/corsMiddleware.js

export function cors(req, res, next) {
  const origin = req.headers.origin;

  /*
  const allowedOrigins = [
    'http://localhost:5173',        // your dev frontend
    'https://yourfrontend.com',     // your production frontend
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'null'); // or skip setting it
  }
  */

  // ✅ If allowing all origins (for development or temporary use)
  res.setHeader('Access-Control-Allow-Origin', origin || '*');

  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Preflight request
  }

  next();
}
