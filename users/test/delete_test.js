const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", done => {
    //  instance of class or model User
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method remove", done => {
    //  Remove a bunch of records with some given criteria
    User.remove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findOneAndRemove", done => {
    //  Remove one match the given criteria
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class method findByIdAndRemove", done => {
    //  Remove one with id which match the given id
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
