const Artist = require("../models/artist");

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this { all: [Artist], count: count, offset: offset, limit: limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  // Write a query that will follow sort, offset , limit options only
  // do not worry about 'criteria' yet

  //  ES5 Code sortProperty
  // const sortOrder = {};
  // sortOrder[sortProperty] = 1;
  // Artist.find({}).sort(sortOrder);

  //  By using ES6
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.find(buildQuery(criteria)).count()]).then(result => {
    return {
      all: result[0],
      count: result[1],
      offset,
      limit
    };
  });
};

const buildQuery = criteria => {
  const query = {};

  if (criteria.name) {
    // User.find({ name: 'joe })
    query.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  return query;
};
