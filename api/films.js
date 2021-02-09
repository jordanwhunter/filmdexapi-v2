const mongoose = require('mongoose');

const typeString = { type: String, trim: true };
const typeReqString = { type: String, required: true, trim: true };
const typeReqNumber = { type: Number, required: true };
const typeReqBoolean = { type: Boolean, required: true };
const typeReqDate = { type: Date, required: true, default: Date.now };

const customDescriptionSchema = new mongoose.Schema({ uniqueTag: typeString });
const keyFeaturesSchema = new mongoose.Schema({ feature: typeString });

const dbUri = process.env.MONGODB_URI;

let filmSchema = new mongoose.Schema({
  brand: typeReqString,
  name: typeReqString,
  iso: typeReqNumber,
  formatThirtyFive: typeReqBoolean,
  formatOneTwenty: typeReqBoolean,
  color: typeReqBoolean,
  process: typeReqString,
  staticImageUrl: typeReqString,
  description: typeReqString,
  customDescription: [customDescriptionSchema],
  keyFeatures: [keyFeaturesSchema],
  dateAdded: typeReqDate
});

let Film = mongoose.model('film', filmSchema);

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    console.log('Connected To MongoDB For Film Types!')
  } catch (error) {
    console.log(error);
  }
};
connectDB();

module.exports = (req, res) => {
  if (req.method === 'GET') {
    Film.find()
    .then(films => {
      return res.status(200).json(films)
    })
    .catch(error => res.status(204).json(error.message))
  } 
};