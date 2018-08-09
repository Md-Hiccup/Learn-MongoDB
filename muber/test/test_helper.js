const mongoose = require("mongoose");

//  'before': is run once before all the tests in a 'describe' and 
//  'beforeEach':  is run before each test in a 'describe', and 
//  'afterEach': after each test 
//  'after' : is run once after all the tests in a 'describe', whereas 
before(done => {
  mongoose.connect("mongodb://localhost/muber_test");
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error)
    })
});

// beforeEach Test case run
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
});
