const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const timezonesSchema = new mongoose.Schema(
  {
    timezone: { type: String },
    unixtime: { type: String },
  },
  { collection: process.env.MONGO_COLLECTION_TIMEZONE },
);

timezonesSchema.plugin(mongoosePaginate);

module.exports.timezonesSchema = mongoose.model(
  "timezonesModel",
  timezonesSchema,
);
