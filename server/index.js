const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes");
const connect = require("./utilities/database");

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

const port = process.env.PORT || 9000;
const start = () => {
  try {
    connect(process.env.DATABASE_URL);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (e) {
    console.error(e);
  }
};

start();
