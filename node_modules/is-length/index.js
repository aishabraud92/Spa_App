'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;

module.exports = function (value) {

  return typeof value === 'number'
    && value > -1
    && value % 1 === 0
    && value <= MAX_SAFE_INTEGER; // max safe integer
};
