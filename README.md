XCSSMatrix
==========

The `XCSSMatrix` class is intended to bring the functionality from
[`WebKitCSSMatrix`][WebKitCSSMatrixDocs] to other browsers. The `CSSMatrix` interface was defined in the [CSS 2D Transforms][2d] and [CSS 3D Transforms][3d] Module specifications.

## Extracted from Firmin ##
The implementation was largely copied from [Firmin](http://extralogical.net/projects/firmin/)'s [`FirminCSSMatrix`](https://github.com/beastaugh/firmin/blob/master/src/matrix.js) object.

## Tests ##
Its API is intended to match the spec. Tests have been copied from the WebKitCSSMatrix tests for [2D](2dtests) and [3D](3dtests).

At the moment, it does not throw errors, which is (was) against the spec. This is by design. I didn't want to require wrapping it in `try/catch`. However, I do plan on adding a flag or other way to control whether it throws errors or not.

Please create tickets(and/or tests) for any failing cases.

  [WebKitCSSMatrixDocs]: http://developer.apple.com/library/safari/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/WebKitCSSMatrix/WebKitCSSMatrix.html
  [2d]: http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface
  [2dtests]: [http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-2d-interface.xhtml]
  [3d]: http://www.w3.org/TR/2009/WD-css3-3d-transforms-20090320/#cssmatrix-interface
  [3dtests]: [http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-3d-interface.xhtml]
