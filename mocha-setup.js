const fs = require('fs');
const path = require('path');

const Module = require('module');
const orig_findPath = Module._findPath;

/**
 * Fix image loading error on mocha
 */
require.extensions['.png'] = function(module, fileName) {
  return module._compile("module.exports = "+JSON.stringify(fileName), fileName)
}

/**
 * Fix platform specific code, require('a') will work if there's a
 * "a.android.js" or "a.ios.js" in react-native
 *
 * But it will not work on mocha
 */
Module._findPath = function(request, paths) {
  var filename = orig_findPath(request, paths)
  if (!filename) {
    var cacheKey = JSON.stringify({request: request, paths: paths});
    for (var i = 0, PL = paths.length; i < PL; i++) {
      var basePath = path.resolve(paths[i], request);
      try {
        filename = fs.realpathSync(path.resolve(basePath, 'index.ios.js'), Module._realpathCache);
      } catch (ex) {
        try {
          filename = fs.realpathSync(basePath+'.ios.js', Module._realpathCache);
        } catch (ex) {

        }
      }
      if (filename) {
        Module._pathCache[cacheKey] = filename;
      }
    }
  }
  return filename;
}

/**
 * Compiles npm es6 modules too, ignores the rest
 */
require("babel-register")({
  ignore: function(filename) {
    if (!(/\/node_modules\//).test(filename)) {
      return false; // if not in node_modules, we want to compile it
    } else if ((/\/node_modules\/react-native-barcodescanner\//).test(filename)) {
      return false;
    } else if ((/\/node_modules\/tcomb-form-native\//).test(filename)) {
      return false;
    } else {
      // it's in node modules and NOT RN source code
      return true;
    }
  }
});
