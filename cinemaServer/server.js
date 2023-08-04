const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/dbConn");
const routes = require("./routes");

const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 8801;

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(routes);

app.listen(PORT, () =>
  console.log(`Backend server is running on PORT ${PORT}`)
);
