var utils = {
    angles: require('./angleUtils.js')
};



function parseTransformValue(value) {

    var units = /([\-\+]?[0-9]+[\.0-9]*)(deg|rad|grad|px|%)*/;
    var parts = value.match(units) || [];

    return {
        value: parseFloat(parts[1]),
        units: parts[2],
        unparsed: value
    };
}

function parseTransformStatement(statement) {

    var nameAndArgs     = /(\w+)\(([^\)]+)\)/i;
    var statementParts  = statement.toString().match(nameAndArgs).slice(1);
    var functionName    = statementParts[0];
    var transformValues = statementParts[1].split(/, ?/);
    var parsedValues    = transformValues.map(parseTransformValue);

    return {
        key: functionName,
        value: parsedValues,
        unparsed: statement
    };
}

function parseTransformString(transformString) {
    var functionSignature   = /(\w+)\([^\)]+\)/ig;
    var transformStatements = transformString.match(functionSignature) || [];
    var statementIsMatrix   = function (t) { return (/^matrix/).test(t); };
    var onlyMatrices        = transformStatements && transformStatements.every(statementIsMatrix);

    if (onlyMatrices) {
        return [parseTransformStatement(transformStatements)];
    }
    else {
        return transformStatements.map(parseTransformStatement);
    }
}

module.exports = parseTransformString;
