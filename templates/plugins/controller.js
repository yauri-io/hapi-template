'use strict';

const controller = {};

controller.sample = ( request, h ) => request.pre.getSampleData;

module.exports = controller;
