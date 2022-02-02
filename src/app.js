require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./utils/corsOptions");
const mongodb = require("./db/mongoConnect");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/timezones", require("./components/Timezones/timezones"));

mongodb.checkConection();

module.exports = app;
