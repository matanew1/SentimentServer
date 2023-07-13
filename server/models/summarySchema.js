const db = require("./database.js");

const summarySchema = new db.mongoose.Schema({
  text: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Summary = db.mongoose.model("Summary", summarySchema);

module.exports = Summary;
