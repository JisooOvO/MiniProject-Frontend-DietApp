const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/',
      createProxyMiddleware({
        target: 'http://10.125.121.212:8080',
        changeOrigin: true,
      })
    );
  };