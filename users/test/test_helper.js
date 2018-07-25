const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//  'before': is run once before all the tests in a 'describe' and 
//  'beforeEach':  is run before each test in a 'describe', and 
//  'afterEach': after each test 
//  'after' : is run once after all the tests in a 'describe', whereas 
before(done => {
  const db = mongoose.connect("mongodb://localhost/users_test");

  // db.then(() => console.log('MongoDB Connected'))
  // .catch((err) => console.log('error', error));
  //      OR
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// beforeEach Test case run
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    //  Ready to run the next test!
    done();
  });
});
