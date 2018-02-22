'use strict';

var isNil       = require('is-nil');
var toPath      = require('to-path');
var isIndex     = require('is-index');
var isLength    = require('is-length');
var isArrayLike = require('is-array-like');

function hasOwn(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return Object.prototype.hasOwnProperty.call(object, key) ||
    (typeof object === 'object' && key in object && Object.getPrototypeOf(object) === null);
}

module.exports = function (object, path) {

  if (isNil(object)) {
    return false;
  }

  var paths  = toPath(path);
  var index  = -1;
  var length = paths.length;

  var key;
  var result;

  while (++index < length) {

    key    = paths[index];
    result = !isNil(object) && hasOwn(object, key);

    if (!result) {
      break;
    }

    object = object[key];
  }


  if (result) {
    return result;
  }


  length = object ? object.length : 0;

  return !!length && isLength(length) && isIndex(key, length) && isArrayLike(object);

};
