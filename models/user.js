// definition of a user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the user model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// create the model class
// load the schema into mongoose
const ModelClass = mongoose.model("user", userSchema);

// export the model
module.exports = ModelClass;

// mongodb+srv://deono:n03nj5gh@cluster0-zra7i.mongodb.net/test?retryWrites=true&w=majority
