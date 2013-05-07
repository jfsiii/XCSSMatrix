var XCSSMatrix = require('..');
var test       = require('tape');

// from http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-2d-interface.xhtml
test('decompose', function (t) {
	var m = new XCSSMatrix();
	m = m.rotate(45);

    t.ok(m);
    t.equal("matrix(0.707107, 0.707107, -0.707107, 0.707107, 0.000000, 0.000000)", m.toString());
    console.log(m);
    console.log(m.decompose());
    console.log('matrix(0.707107, 0.707107, -0.707107, 0.707107, 0.000000, 0.000000)');

    var e3d = "matrix3d(0.211325, 0.926746, -0.310617, 0.000000, -0.788675, 0.349396, 0.505879, 0.000000, 0.577350, 0.138071, 0.804738, 0.000000, 0.000000, 0.000000, 0.000000, 1.000000)";
    var a3d = m.rotateAxisAngle(1,1,1, 45).toString();
    console.log(e3d === a3d, a3d);
    t.equal(e3d, a3d);

    var m2 = (new XCSSMatrix).rotateAxisAngle(0.707, 0.707, 0.707, 45);
    console.log(m2);
    t.end();
});

// Rotation matrix
// http://dev.w3.org/csswg/css-transforms/#mathematical-description
// var sc = sin(a/2) * cos(a/2)
// var sq = (sin(a/2))^2 // Guessing. `sin^2(a/2)` was the notation
// [
//     1 - 2 * (y2+z2) * sq,   2 * (x*y*sq - z*sc),    2 * (x*z*sq+y*sc),      0,
//     2 * (x*y*sq+z*sc),      1-2*(x2+z2) *sq,        2 * (y*z*sq-x*sc),      0,
//     2 * (x*z*sq-y*sc),      2 * (y*z*sq+x*sc),      1 - 2 * (x2+y2) * sq,   0,
//     0,                      0,                      0,                  ,   1
// ]
