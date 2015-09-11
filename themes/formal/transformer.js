/* jshint node: true, esnext: true */
'use strict';

const markdown = require('node-markdown').Markdown;

module.exports = function (data, fn) {
  // Revese jobs, apply markdown
  data.jobs = data.jobs.reverse();
  data.jobs = data.jobs.map(function (job) {
    if (job.description) {
      job.description = markdown(job.description);
    }
    if (job.projects) {
      job.projects = job.projects.map(function (project) {
        project.description = markdown(project.description);
        return project;
      });
    }
    return job;
  });
  return fn(null, data);
};
