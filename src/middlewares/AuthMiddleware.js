const jwt = require("jsonwebtoken");
const buildResponse = require("../utils/response");
const logger = require("../utils/logger");

function gatewayAuth(req, res, next) {
  // ✅ Paths that don't require authentication
  const openPaths = [
    "/api/v1/docs",
    "/api/v1/health",
    "/api/v1/users/requestOtp",
    "/api/v1/users/verifyOtp",
    "/api/v1/admin/user/requestOtp",
    "/api/v1/admin/user/verifyOtp",
    "/api/v1/admin/location/getAllCountry",
    "/api/v1/social/post/getGuestPost",
    "/api/v1/social/reel/getGuestReel",
    "/api/v1/social/event/getAllEvent",
    "/api/v1/social/vote/getLeaderBoard",
    "/api/v1/social/vote/getAllRankedPost"
  ];

  // Log incoming request
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);

  // Skip auth for open paths
  if (openPaths.some((p) => req.originalUrl.startsWith(p))) {
    logger.info(`Skipping auth for open path: ${req.originalUrl}`);
    return next();
  }

  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    logger.warn(`Missing token for request: ${req.method} ${req.originalUrl}`);
    return res.status(401).json(buildResponse(401, "Missing token", null));
  }

  try {
    // Verify JWT and attach user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_jwt_secret");
    req.user = decoded;
    logger.info(`✅ Authenticated user ${decoded.id || "unknown"} on ${req.originalUrl}`);
    return next();
  } catch (e) {
    logger.error(`❌ Invalid token on ${req.originalUrl}: ${e.message}`);
    return res.status(401).json(buildResponse(401, "Invalid token", null));
  }
}

module.exports = gatewayAuth;
