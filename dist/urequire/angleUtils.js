// Generated by uRequire v0.2.1
(function (root, factory) {
  if (typeof exports === 'object') {
    var nr = new (require('urequire').NodeRequirer) ('angleUtils.js', __dirname, 'false');
    module.exports = factory(nr.require, exports, module);
  } else if (typeof define === 'function' && define.amd) {
      define( factory);
  }
}) (this, function (require, exports, module) {
  var isWeb = (typeof define === 'function' && define.amd);
  var isNode = !isWeb;
  // uRequire: start body of original node module
  function deg2rad(angle) {
    return angle * Math.PI / 180;
}

function rad2deg(radians) {
    return radians * (180 / Math.PI);
}

function grad2deg(gradians) {
    return gradians / (400 / 360);
}

module.exports = {
    deg2rad: deg2rad,
    rad2deg: rad2deg,
    grad2deg: grad2deg
};
  // uRequire: end body of original node module 
return module.exports;
});