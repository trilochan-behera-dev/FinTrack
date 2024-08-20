const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./database/connection");
const userRouter = require("./router/userRouter");
const chartRouter = require("./router/chartRouter");
const detailsRouter = require("./router/detailsRouter");
const categoryRouter = require("./router/categoryRouter");
const financeRouter = require("./router/financeRouter");

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", chartRouter);
app.use("/api", detailsRouter);
app.use("/api", categoryRouter);
app.use("/api", financeRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
