const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema ({
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test (val),
        message: 'Please enter a valid email',
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be 8 characters or longer'],
    },
  },
  {timestamps: true}
);


//As our UserSchema doesn't contain a field for confirmPassword (and we really wouldn't want to save that to our database) we will need to add in a touch of code to allow us to compare password with it. We can make use of mongoose virtuals—basically fields we don't want to save in MongoDB—to accomplish this. We will chain calls to get and set to the returned virtual object, allowing us to establish both a getter and a setter for the virtual field.
UserSchema.virtual ('confirm')
  .get (function () {
    return this._confirm;
  })
  .set (function (value) {
    this._confirm = value;

  });

//Next we need to make use of some Middleware to add in another validation. Specifically we will be using the "pre hook" and having it run before validations. Note: avoid rewriting the callback function using an arrow function as it will not have the correct scope for this.
UserSchema.pre ('validate', function (next) {
  if (this.password !== this._confirm) {
    this.invalidate ('confirm', 'Password must match confirm password');
  }
  // One common feature of Middleware is the "next" function. Essentially when our Middleware has finished whatever it needs to do, we need to call this to have the next Middleware or next function (in this case normal validations) run.
  next ();
});


//We want to make sure that our passwords are not saved in actual text. Bcrypt is a very popular library for hashing passwords and easy for us to install as well. Using NPM we can install this with a simple npm i bcrypt. Next we can make use of another "pre hook", this time before the User is saved into the database. It's recommended to use Bcrypt in an asynchronous way so we will be using it with Promises. The "10" inside the bcrypt.hash() function refers to the number of salt rounds that Bcrypt will use when generating a salt. For our purposes "10" will be a fine value here. As in our previous Middleware we will need to call the "next" function once the Promise is fulfilled.
UserSchema.pre ('save', function (next) {
  bcrypt
    .hash (this.password, 10)
    .then (hash => {
      this.password = hash;
      next ();
    })
    .catch (err => {
      console.log ('hashing failed', err);
      next ();
    });
});



module.exports = mongoose.model ('User', UserSchema);
