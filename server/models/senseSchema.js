import db from './database.js';

const senseSchema = new db.mongoose.Schema({
  sentence: String,
  sentiment: String,
  data: {
    neg: Number,
    neu: Number,
    pos: Number,
    compound: Number
  }
});

const Sense = db.mongoose.model('Sense', senseSchema);

export default Sense;