const User = require("../models/user");

exports.signup = function(req, res, next) {
  // get data from the request object
  const email = req.body.email;
  const password = req.body.password;
  // see if a user with a given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    // if a user with the email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email already in use" }); // 'Unprocessable entity'
    }
    // If a user with email does NOT exist, create and save user record
    const user = new User({ email: email, password: password });
    user.save(err => {
      // save the record to the database
      if (err) {
        return next(err);
      }
      // Respond to request indicating the user was created
      res.json({ success: true });
    });
  });

  //
};
