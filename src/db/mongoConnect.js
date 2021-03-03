const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_CLUSTER,
  MONGO_DB_NAME,
  NODE_ENV,
} = process.env;
mongoose.Promise = global.Promise;
mongoose.set("debug", NODE_ENV === "development");
mongoose.set("useFindAndModify", false);

const options = {
  autoIndex: false,
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: MONGO_USER,
  pass: MONGO_PASS,
  dbName: MONGO_DB_NAME,
};

let isConected = false;

const connectDB = async () => {
  try {
    const URI = `mongodb${
      NODE_ENV !== "development" ? "+srv" : ""
    }://${MONGO_CLUSTER}.mongodb.net`;
    const dbs = await mongoose.connect(URI, options);
    if (dbs.connections[0].readyState === 1) {
      console.log("🌱 Connected to MongoDB");
      isConected = dbs.connections[0].readyState;
    }
  } catch (err) {
    throw ("🔥 Error on mongodb conection ", err);
  }
};

module.exports.checkConection = async () => {
  if (isConected === false) {
    const conection = await connectDB();
    return conection;
  }
  return isConected;
};
