'use strict';

const preHandler = {};

preHandler.getSampleData = (request, h) => {
  return {id: 0, name: 'sample data'};
};

module.exports = preHandler;
