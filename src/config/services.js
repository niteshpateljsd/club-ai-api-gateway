module.exports = {
  USER: process.env.USER_SERVICE_URL || "http://127.0.0.1:4002/users",
  AI_MANAGER: process.env.AI_MANAGER_SERVICE_URL || "http://127.0.0.1:4003/admin",
};
