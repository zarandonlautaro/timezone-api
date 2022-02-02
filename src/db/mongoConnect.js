const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB_NAME, NODE_ENV } =
    process.env;
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
        // Connect to the MongoDB cluster
        mongoose.connect(MONGO_CLUSTER, options, () =>
            console.log("Mongoose is connected"),
        );
    } catch (e) {
        console.log("could not connect");
    }
};

module.exports.checkConection = async () => {
    if (isConected === false) {
        const conection = await connectDB();
        return conection;
    }
    return isConected;
};
