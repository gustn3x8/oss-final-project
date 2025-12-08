const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/kakao-api',
    createProxyMiddleware({
      target: 'https://dapi.kakao.com', 
      changeOrigin: true,
      pathRewrite: { '^/kakao-api': '' }, 
    })
  );
};