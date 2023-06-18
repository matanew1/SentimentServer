import db from './database.js';

const summarySchema = new db.mongoose.Schema({
  text: String,
  favorite: {
    type: Boolean,
    default: false
  }
});


const Summary = db.mongoose.model('Summary', summarySchema);

export default Summary;
