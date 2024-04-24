const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: process.env.REACT_APP_API_URL,
      target: "http://10.53.160.160:5080",
      changeOrigin: true,
      secure: false,
    })
  );
};