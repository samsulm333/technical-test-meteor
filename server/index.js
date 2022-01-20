require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./src/routes");
const app = express();

app.use(express.json());
app.use(cors());

const port = 5004;

app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
