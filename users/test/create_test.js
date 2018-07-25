//  to make an assertion to 'it' block
//  It expect to be passed a boolean of some type
const assert = require("assert");

const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", (done) => {
    const joe = new User({ name: "Joe" });

    joe.save()
      .then(() => {
        // Has User been save successfully
        assert(!joe.isNew); 
        done()
      });
  });
});
