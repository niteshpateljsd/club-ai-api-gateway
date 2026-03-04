require("dotenv").config();
const app = require("./app");
const connectSwagger = require("./config/swagger");

const PORT = process.env.PORT || 4001;

// attach swagger after app init
connectSwagger(app);

app.listen(PORT, () => console.log(`API Gateway listening on ${PORT}`));
