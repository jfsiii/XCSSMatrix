// Generated by uRequire v0.2.1
(function (root, factory) {
  if (typeof exports === 'object') {
    var nr = new (require('urequire').NodeRequirer) ('cssTransformStringUtils.js', __dirname, 'false');
    module.exports = factory(nr.require, exports, module);
  } else if (typeof define === 'function' && define.amd) {
      define( factory);
  }
}) (this, function (require, exports, module) {
  var isWeb = (typeof define === 'function' && define.amd);
  var isNode = !isWeb;
  // uRequire: start body of original node module
  var utils = {
    angles: require("./angleUtils")
};

function valueToObject(value) {
    var units = /([\-\+]?[0-9]+[\.0-9]*)(deg|rad|grad|px|%)*/;
    var parts = value.match(units) || [];
    return {
        value: parseFloat(parts[1]),
        units: parts[2],
        unparsed: value
    };
}

function statementToObject(statement, skipValues) {
    var nameAndArgs = /(\w+)\(([^\)]+)\)/i;
    var statementParts = statement.toString().match(nameAndArgs).slice(1);
    var functionName = statementParts[0];
    var stringValues = statementParts[1].split(/, ?/);
    var parsedValues = !skipValues && stringValues.map(valueToObject);
    return {
        key: functionName,
        value: parsedValues || stringValues,
        unparsed: statement
    };
}

function stringToStatements(transformString) {
    var functionSignature = /(\w+)\([^\)]+\)/ig;
    var transformStatements = transformString.match(functionSignature) || [];
    return transformStatements;
}

module.exports = {
    matrixFn2d: "matrix",
    matrixFn3d: "matrix3d",
    valueToObject: valueToObject,
    statementToObject: statementToObject,
    stringToStatements: stringToStatements
};
  // uRequire: end body of original node module 
return module.exports;
});