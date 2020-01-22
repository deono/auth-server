const bcrypt = require("bcrypt-nodejs");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the user model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// on save hook, hash the password
// before the model get saved, run this function
userSchema.pre("save", function(next) {
  // get access to the user model
  const user = this;
  console.log(user);
  // generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwite the password with the hash
      user.password = hash;
      next();
    });
  });
});

// create the model class
// load the schema into mongoose
const ModelClass = mongoose.model("user", userSchema);

// export the model
module.exports = ModelClass;

// mongodb+srv://deono:n03nj5gh@cluster0-zra7i.mongodb.net/test?retryWrites=true&w=majority
