XCSSMatrix
==========

The `XCSSMatrix` class is intended to be a spec-compliant implementation of
the `CSSMatrix` interface defined in the [CSS 2D Transforms][2d] and
[CSS 3D Transforms][3d] Module specifications.

The implementation was largely copied from [Firmin](http://extralogical.net/projects/firmin/)'s [`FirminCSSMatrix`](https://github.com/beastaugh/firmin/blob/master/src/matrix.js) object.

Its API is intended to match the spec. Tests have been copied from the WebKitCSSMatrix tests for [2D](2dtests) and [3D](3dtests).

Please create tickets(and/or tests) for any failing cases.

  [2d]: http://www.w3.org/TR/2011/WD-css3-2d-transforms-20111215/#cssmatrix-interface
  [2dtests]: [http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-2d-interface.xhtml]
  [3d]: http://www.w3.org/TR/2009/WD-css3-3d-transforms-20090320/#cssmatrix-interface
  [3dtests]: [http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-3d-interface.xhtml]
