XCSSMatrix
==========

The `XCSSMatrix` class is intended to bring the functionality from
[`WebKitCSSMatrix`][WebKitCSSMatrixDocs] to other browsers, and NodeJS. The `CSSMatrix` interface was defined in the [CSS 2D Transforms][2d] and [CSS 3D Transforms][3d] Module specifications.

## Getting started
### nodejs
```
npm install xcssmatrix
var XCSSMatrix = require('xcssmatrix')
```

### Browser
See the examples in the `dist` directory

#### via require.js
```
 <script src="http://requirejs.org/docs/release/2.1.0/minified/require.js"></script>
 <script>
   require(['XCSSMatrix'], function(XCSSMatrix) {
     // use XCSSMatrix
   });
 </script>    
```

#### via browserify
```
 <script src="XCSSMatrix.js"></script>
 <script>
   var XCSSMatrix = require('./XCSSMatrix');
 </script>
```

### Usage

```
// create a new Matrix
> var matrix = new XCSSMatrix('translate(12px) rotateX(34deg) rotateY(45rad) skew(67deg)')
undefined
> matrix.toString()
'matrix3d(0.525322, 0.475819, -0.705431, 0.000000, 1.237581, 1.949997, -1.102698, 0.000000, 0.850904, -0.293756, 0.435512, 0.000000, 12.000000, 0.000000, 0.000000, 1.000000)'
// matrix operations aren't destructive
> var originalCSS = matrix.toString()
> matrix.rotate(90)
> matrix.toString() === originalCSS
true
// assign the result to the itself to update the matrix
> matrix = matrix.rotate(90)
> matrix.toString() === originalCSS
false
```

## Extracted from Firmin ##
The implementation was largely copied from [Firmin](http://extralogical.net/projects/firmin/)'s [`FirminCSSMatrix`](https://github.com/beastaugh/firmin/blob/master/src/matrix.js) object.

## Tests ##
Its API is intended to match the spec. Tests have been copied from the WebKitCSSMatrix tests for [2D](2dtests) and [3D](3dtests).

At the moment, it does not throw errors, which is (was) against the spec. See [issue #1](https://github.com/jfsiii/XCSSMatrix/issues/1) for more.

Please create tickets(and/or tests) for any failing cases.

  [WebKitCSSMatrixDocs]: http://developer.apple.com/library/safari/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/WebKitCSSMatrix/WebKitCSSMatrix.html
  [2d]: http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface
  [2dtests]: [http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-2d-interface.xhtml]
  [3d]: http://www.w3.org/TR/2009/WD-css3-3d-transforms-20090320/#cssmatrix-interface
  [3dtests]: [http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-3d-interface.xhtml]
