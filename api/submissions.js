const mongoose = require('mongoose');

const typeString = { type: String, trim: true };
const typeNumber = { type: Number }; 
const typeBoolean = { type: Boolean };
const typeReqString = { type: String, required: true, trim: true };
const typeReqDate = { type: Date, required: true, default: Date.now };

const dbUri = process.env.MONGODB_URI;

let submissionSchema = new mongoose.Schema({
  brand: typeReqString,
  name: typeReqString,
  iso: typeNumber,
  formatThirtyFive: typeBoolean,
  formatOneTwenty: typeBoolean,
  color: typeBoolean,
  process: typeString,
  staticImageUrl: typeString,
  description: typeString,
  contributor: typeString,
  notes: typeString,
  dateAdded: typeReqDate
});

let Submission = mongoose.model('submission', submissionSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('Connected To MongoDB For Film Type Submissions!')
  } catch (error) {
    console.log(error);
  }
};
connectDB();

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const newSubmission = new Submission(req.body);
    newSubmission.save()
    .then(newSubmission => {
      res.status(201).json(newSubmission)
    })
    .catch(error => res.status(500).json(error.message))
  }
};