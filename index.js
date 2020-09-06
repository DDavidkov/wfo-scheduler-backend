require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes");
const { handleError } = require("./middleware/handle-error");
const passport = require("./middleware/passport");

const port = process.env.PORT || 3015;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

app.use((err, _, res, __) => {
  handleError(err, res);
});

app.use(passport());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
