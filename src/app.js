const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const gatewayAuth = require("./middlewares/AuthMiddleware");
const proxyRoutes = require("./routes/ProxyRoutes");
const healthRoutes = require("./routes/HealthRoutes");

const app = express();

// Middlewares
app.use(cors());
//app.use(express.json());
app.use(morgan("dev"));
app.use(gatewayAuth);

// Routes
app.use("/api/v1", proxyRoutes);
app.use("/api/v1", healthRoutes);

module.exports = app;
