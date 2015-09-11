module.exports = function (data, fn) {
  data.jobs = data.jobs.reverse();
  return fn(null, data);
};
