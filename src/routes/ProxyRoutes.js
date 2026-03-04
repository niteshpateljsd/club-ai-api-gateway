// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const { USER, AI_MANAGER } = require("../config/services");

// const router = express.Router();

// // 📝 Global Logger Middleware
// router.use((req, res, next) => {
//   const now = new Date().toISOString();
//   console.log(`[${now}] ${req.method} ${req.originalUrl}`);
//   next();
// });

// // ✅ User Service Proxy
// router.use(
//   "/users",
//   createProxyMiddleware({
//     target: USER, // e.g., http://localhost:4002
//     changeOrigin: true,
//     proxyTimeout: 10000,
//     onProxyReq: (proxyReq, req) => {
//       console.log(`➡️ [USER SERVICE] Targetting: ${target} ${req.originalUrl}`);
//       console.log(`➡️ [USER SERVICE] Forwarding: ${req.method} ${req.originalUrl}`);
//     },
//     onError: (err, req, res) => {
//       console.error(`❌ [USER SERVICE] Error:`, err.message);
//       res.status(500).json({ error: "User service unavailable" });
//     },
//   })
// );

// // ✅ Admin Service Proxy
// router.use(
//   "/manager",
//   createProxyMiddleware({
//     target: AI_MANAGER,
//     changeOrigin: true,
//     proxyTimeout: 10000,
//     onProxyReq: (proxyReq, req) => {
//       console.log(`➡️ [AI MANAGER SERVICE] Forwarding: ${req.method} ${req.originalUrl}`);
//     },
//     onError: (err, req, res) => {
//       console.error(`❌ [AI MANAGER SERVICE] Error:`, err.message);
//       res.status(500).json({ error: "Ai manager service unavailable" });
//     },
//   })
// );



// module.exports = router;



const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { USER, AI_MANAGER } = require("../config/services");
const logger = require("../utils/logger");

const router = express.Router();

// 📝 Global Logger Middleware
router.use((req, res, next) => {
  const now = new Date().toISOString();
  logger.info(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ User Service Proxy
router.use(
  "/users",
  createProxyMiddleware({
    target: USER,
    changeOrigin: true,
    proxyTimeout: 10000,

    pathRewrite: (path, req) => {
      return path; // 👈 DO NOT rewrite anything
    },

    onProxyReq: (proxyReq, req) => {
      logger.info(`➡️ [USER SERVICE] Forwarding: ${req.method} ${req.originalUrl}`);
    },

    onError: (err, req, res) => {
      logger.error("❌ [USER SERVICE] Error", {
        message: err.message,
      });
      res.status(500).json({ error: "User service unavailable" });
    },
  })
);

// ✅ AI Manager Service Proxy
router.use(
  "/manager",
  createProxyMiddleware({
    target: AI_MANAGER,
    changeOrigin: true,
    proxyTimeout: 10000,

    onProxyReq: (proxyReq, req) => {
      logger.info(`➡️ [AI MANAGER SERVICE] Target: ${AI_MANAGER}`);
      logger.info(`➡️ [AI MANAGER SERVICE] Forwarding: ${req.method} ${req.originalUrl}`);
    },

    onError: (err, req, res) => {
      logger.error("❌ [AI MANAGER SERVICE] Error", {
        message: err.message,
        stack: err.stack,
      });
      res.status(500).json({ error: "AI manager service unavailable" });
    },
  })
);

module.exports = router;