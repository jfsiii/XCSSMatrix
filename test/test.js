(function(e){if("function"==typeof bootstrap)bootstrap("test",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeTest=e}else"undefined"!=typeof window?window.test=e():global.test=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var XCSSMatrix = require('..');
var test       = require('tape');

// from http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-2d-interface.xhtml
test('2D', function (t) {
    test('constructors', function (t) {
        test('should return a value when called via the default constructor', function (t) {
            var m = new XCSSMatrix();
            t.ok(m);
            t.end();
        });

        test('should return a value when called via the object constructor', function (t) {
            var m = new XCSSMatrix();
            var m2 = new XCSSMatrix(m);
            t.ok(m);
            t.end();
        });

        test('should return a value when called via the string constructor', function (t) {
            var m = new XCSSMatrix("matrix(1, 0, 0, 1, 0, 0)");
            t.ok(m);
            t.end();
        });

        // TODO: uncomment and (possibly) allow a setting for `throw` behavior
        // test('should throw on bad input to string constructor', function (t) {
        //     t.throws(Error, function (t) {
        //         new XCSSMatrix("banana");
        //     });
        //     t.end();
        // });

        t.end();
    });

    test('attributes', function (t) {
        test('should have proper attibutes on the default matrix', function (t) {
            var m = new XCSSMatrix();

            t.equal(1, m.a);
            t.equal(0, m.b);
            t.equal(0, m.c);
            t.equal(1, m.d);
            t.equal(0, m.e);
            t.equal(0, m.f);

            t.end();
        });

        test('should have proper attributes on a custom matrix', function (t) {
            var m = new XCSSMatrix("matrix(11, 12, 21, 22, 41, 42)");

            t.equal(11, m.a);
            t.equal(12, m.b);
            t.equal(21, m.c);
            t.equal(22, m.d);
            t.equal(41, m.e);
            t.equal(42, m.f);

            t.end();
        });

        t.end();
    });

    test('methods', function (t) {
        test('toString()', function (t) {
            test('should return a correctly formatted string', function (t) {
                var m = new XCSSMatrix("matrix(1, 0, 0, 1, 0, 0)");
                var s = m.toString();
                var a = s.split('(');
                t.equal("matrix", a[0]);

                var a2 = a[1].split(',');
                t.equal(1, parseFloat(a2[0]));
                t.equal(0, parseFloat(a2[1]));
                t.equal(0, parseFloat(a2[2]));
                t.equal(1, parseFloat(a2[3]));
                t.equal(0, parseFloat(a2[4]));

                var a3 = a2[5].split(")");
                t.equal(0, parseFloat(a3[0]));

                t.end();
            });
            t.end();
        });

        test('setMatrixValue()', function (t) {
            test('should accept a `matrix()` string', function (t) {
                var m = new XCSSMatrix();

                m.setMatrixValue("matrix(11, 12, 21, 22, 41, 42)");
                t.equal(11, m.a);
                t.equal(12, m.b);
                t.equal(21, m.c);
                t.equal(22, m.d);
                t.equal(41, m.e);
                t.equal(42, m.f);

                t.end();
            });

            test('should accept 2D CSS transform function values', function (t) {
                var m = new XCSSMatrix();

                m.setMatrixValue("translate(10px, 20px) scale(2, 3)");
                t.equal(2, m.a);
                t.equal(0, m.b);
                t.equal(0, m.c);
                t.equal(3, m.d);
                t.equal(10, m.e);
                t.equal(20, m.f);

                // Test each transform function
                // list from http://dev.w3.org/csswg/css3-2d-transforms/#transform-functions

                // matrix
                var a=0.1, b=0.2, c=0.3, d=0.4, e=0.5, f=0.6;
                var constructorString = 'matrix(' + [a,b,c,d,e,f].join(',') + ')';
                m = new XCSSMatrix(constructorString);

                function floatApproxEquality (f1, f2) {
                    var precision = 6;
                    f1 = (+f1).toFixed(precision);
                    f2 = (+f2).toFixed(precision);
                    return t.equal(f1, f2);
                }

                floatApproxEquality(a, m.a);
                floatApproxEquality(b, m.b);
                floatApproxEquality(c, m.c);
                floatApproxEquality(d, m.d);
                floatApproxEquality(e, m.e);
                floatApproxEquality(f, m.f);

                // TODO:
                // translate
                // translateX
                // translateY
                // scale
                // scaleX
                // scaleY
                // rotate
                // skewX
                // skewY

                t.end();
            });

            // TODO: Uncomment and deal with throws
            // test('should throw exception on bad arguments', function (t) {
            //     var m = new XCSSMatrix();
            //     t.throws(Error, function (t) { m.setMatrixValue("banana"); });
            //     t.throws(Error, function (t) { m.setMatrixValue("translate(10em, 20%)"); });
            //     t.throws(Error, function (t) { m.setMatrixValue("translate(10px, 20px) scale()"); });

            //     t.end();
            // });
            t.end();
        });

        test('translate()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.translate(50,0);

                t.equal(1, m2.a);
                t.equal(0, m2.b);
                t.equal(0, m2.c);
                t.equal(1, m2.d);
                t.equal(50, m2.e);
                t.equal(0, m2.f);

                t.end();
            });

            test('should properly accumulate', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.translate(50,0);
                m2 = m2.translate(50,50);

                t.equal(1, m2.a);
                t.equal(0, m2.b);
                t.equal(0, m2.c);
                t.equal(1, m2.d);
                t.equal(100, m2.e);
                t.equal(50, m2.f);

                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.translate(50,0);

                t.equal(1, parseFloat(m.a));
                t.equal(0, parseFloat(m.b));
                t.equal(0, parseFloat(m.c));
                t.equal(1, parseFloat(m.d));
                t.equal(0, parseFloat(m.e));
                t.equal(0, parseFloat(m.f));

                t.end();
            });
            t.end();
        });

        test('skewX()', function (t) {
            test('should skew properly', function (t) {
                var degrees = 114.591559;
                var m = (new XCSSMatrix()).skewX(degrees);
                var refString = "matrix(1.000000, 0.000000, -2.185040, 1.000000, 0.000000, 0.000000)"

                t.equal(1, parseFloat(m.a));
                t.equal(0, parseFloat(m.b));
                t.equal(-2.185040, Number(parseFloat(m.c).toPrecision(7)));
                t.equal(1, parseFloat(m.d));
                t.equal(0, parseFloat(m.e));
                t.equal(0, parseFloat(m.f));

                t.end();
            });
            t.end();
        });

        test('skewY()', function (t) {
            test('should skew properly', function (t) {
                var degrees = 114.591559;
                var m = (new XCSSMatrix()).skewY(degrees);
                var refString = "matrix(1.000000, -2.185040, 0.000000, 1.000000, 0.000000, 0.000000)";

                t.equal(1, parseFloat(m.a));
                t.equal(-2.185040, Number(parseFloat(m.b).toPrecision(7)));
                t.equal(0, parseFloat(m.c));
                t.equal(1, parseFloat(m.d));
                t.equal(0, parseFloat(m.e));
                t.equal(0, parseFloat(m.f));

                t.end();
            });
            t.end();
        });

        test('scale()', function (t) {
            test('should return the correct value on a uniform scale', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.scale(5);

                t.equal(5, m2.a);
                t.equal(0, m2.b);
                t.equal(0, m2.c);
                t.equal(5, m2.d);
                t.equal(0, m2.e);
                t.equal(0, m2.f);

                t.end();
            });

            test('should be immutable on a uniform scale', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.scale(5);

                t.equal(1, parseFloat(m.a));
                t.equal(0, parseFloat(m.b));
                t.equal(0, parseFloat(m.c));
                t.equal(1, parseFloat(m.d));
                t.equal(0, parseFloat(m.e));
                t.equal(0, parseFloat(m.f));

                t.end();
            });

            test('should return the correct value on a non-nuniform scale', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.scale(2, 1);

                t.equal(2, m2.a);
                t.equal(0, m2.b);
                t.equal(0, m2.c);
                t.equal(1, m2.d);
                t.equal(0, m2.e);
                t.equal(0, m2.f);

                t.end();
            });

            test('should be immutable on a non-nuniform scale', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.scale(2, 1);

                t.equal(1, parseFloat(m.a));
                t.equal(0, parseFloat(m.b));
                t.equal(0, parseFloat(m.c));
                t.equal(1, parseFloat(m.d));
                t.equal(0, parseFloat(m.e));
                t.equal(0, parseFloat(m.f));

                t.end();
            });
            t.end();
        });

        test('rotate()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.rotate(10);

                t.equal(0.984808, parseFloat(m2.a.toPrecision(6)));
                t.equal(0.173648, parseFloat(m2.b.toPrecision(6)));
                t.equal(-0.173648, parseFloat(m2.c.toPrecision(6)));
                t.equal(0.984808, parseFloat(m2.d.toPrecision(6)));
                t.equal(0, m.e);
                t.equal(0, m.f);

                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.rotate(10);

                t.equal(1, parseFloat(m.a));
                t.equal(0, parseFloat(m.b));
                t.equal(0, parseFloat(m.c));
                t.equal(1, parseFloat(m.d));
                t.equal(0, parseFloat(m.e));
                t.equal(0, parseFloat(m.f));

                t.end();
            });
            t.end();
        });

        test('multiply()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix("matrix(1, 2, 3, 4, 5, 6)");
                var m2 = new XCSSMatrix("matrix(7, 8, 9, 10, 11, 12)");
                var m3 = m.multiply(m2);
                t.equal(31, parseFloat(m3.a));
                t.equal(46, parseFloat(m3.b));
                t.equal(39, parseFloat(m3.c));
                t.equal(58, parseFloat(m3.d));
                t.equal(52, parseFloat(m3.e));
                t.equal(76, parseFloat(m3.f));

                t.end();
            });

            test('should work in the correct direction', function (t) {
                var tx = new XCSSMatrix();
                var sx = new XCSSMatrix();
                tx = tx.translate(100,0);
                sx = sx.scale(2,1);
                var m = tx.multiply(sx);

                t.equal(2, m.a);
                t.equal(0, m.b);
                t.equal(0, m.c);
                t.equal(1, m.d);
                t.equal(100, m.e);
                t.equal(0, m.f);

                t.end();
            });

            test('should be immutable', function (t) {
                var tx = new XCSSMatrix();
                var sx = new XCSSMatrix();
                tx = tx.translate(100,0);
                sx = sx.scale(2,1);
                var m = tx.multiply(sx);

                t.equal(1, tx.a);
                t.equal(0, tx.b);
                t.equal(0, tx.c);
                t.equal(1, tx.d);
                t.equal(100, tx.e);
                t.equal(0, tx.f);
                t.equal(2, sx.a);
                t.equal(0, sx.b);
                t.equal(0, sx.c);
                t.equal(1, sx.d);
                t.equal(0, sx.e);
                t.equal(0, sx.f);

                t.end();
            });

            test('should be null when called with no arguments', function (t) {
                var m = new XCSSMatrix("matrix(1, 2, 3, 4, 5, 6)");
                var m2 = m.multiply();
                t.equal(null, m2);

                t.end();
            });
            t.end();
        });

        test('inverse()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix("matrix(2, 0, 0, 2, 10, 20)");
                var m2 = m.inverse();

                t.equal(0.5, parseFloat(m2.a));
                t.equal(0, parseFloat(m2.b));
                t.equal(0, parseFloat(m2.c));
                t.equal(0.5, parseFloat(m2.d));
                t.equal(-5, parseFloat(m2.e));
                t.equal(-10, parseFloat(m2.f));

                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix("matrix(2, 0, 0, 2, 10, 20)");
                var m2 = m.inverse();

                t.equal(2, parseFloat(m.a));
                t.equal(0, parseFloat(m.b));
                t.equal(0, parseFloat(m.c));
                t.equal(2, parseFloat(m.d));
                t.equal(10, parseFloat(m.e));
                t.equal(20, parseFloat(m.f));

                t.end();
            });

            // TODO: uncomment and fix throws
            // test('should throw an exception on when inversion is impossible', function (t) {
            //     var m = new XCSSMatrix("matrix(0, 0, 0, 0, 0, 0)"); // not invertible
            //     t.throws(Error, function (t) { m.inverse(); });

            //     t.end();
            // });
            t.end();
        });
        t.end();
    });

    t.end();
});

// from http://src.chromium.org/svn/branches/WebKit/472/LayoutTests/transforms/cssmatrix-3d-interface.xhtml
test('3D', function (t) {
    test('constructors', function (t) {
        test('should return a value when called via the default constructor', function (t) {
            var m = new XCSSMatrix();
            t.ok(m);
            t.end();
        });

        test('should return a value when called via the object constructor', function (t) {
            var m = new XCSSMatrix();
            var m2 = new XCSSMatrix(m);
            t.ok(m);
            t.end();
        });

        test('should return a value when called via the string constructor', function (t) {
            var m = new XCSSMatrix("matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)");
            t.ok(m);
            t.end();
        });

        // TODO: fix throws
        // test('should throw on bad input to string constructor', function (t) {
        //     t.throws(Error, function (t) {
        //         new XCSSMatrix("banana")
        //     });
        //     t.end();
        // });
        t.end();
    });

    test('attributes', function (t) {
        test('should have proper attibutes on the default matrix', function (t) {
            var m = new XCSSMatrix();
            t.equal(1, m.m11);
            t.equal(0, m.m12);
            t.equal(0, m.m13);
            t.equal(0, m.m14);
            t.equal(0, m.m21);
            t.equal(1, m.m22);
            t.equal(0, m.m23);
            t.equal(0, m.m24);
            t.equal(0, m.m31);
            t.equal(0, m.m32);
            t.equal(1, m.m33);
            t.equal(0, m.m34);
            t.equal(0, m.m41);
            t.equal(0, m.m42);
            t.equal(0, m.m43);
            t.equal(1, m.m44);
            t.end();
        });

        test('should have proper attributes on a custom matrix', function (t) {
            var m = new XCSSMatrix("matrix3d(11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44)");
            t.equal(11, m.m11);
            t.equal(12, m.m12);
            t.equal(13, m.m13);
            t.equal(14, m.m14);
            t.equal(21, m.m21);
            t.equal(22, m.m22);
            t.equal(23, m.m23);
            t.equal(24, m.m24);
            t.equal(31, m.m31);
            t.equal(32, m.m32);
            t.equal(33, m.m33);
            t.equal(34, m.m34);
            t.equal(41, m.m41);
            t.equal(42, m.m42);
            t.equal(43, m.m43);
            t.equal(44, m.m44);
            t.end();
        });
        t.end();
    });

    test('methods', function (t) {
        test('toString()', function (t) {
            test('should return a correctly formatted string', function (t) {
                var m = new XCSSMatrix("matrix3d(1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)");
                var s = m.toString();
                var a = s.split('(');
                t.equal("matrix3d", a[0]);
                var a2 = a[1].split(',');
                t.equal(1, parseFloat(a2[0]));
                t.equal(0, parseFloat(a2[1]));
                t.equal(0, parseFloat(a2[2]));
                t.equal(1, parseFloat(a2[3]));
                t.equal(0, parseFloat(a2[4]));
                t.equal(1, parseFloat(a2[5]));
                t.equal(0, parseFloat(a2[6]));
                t.equal(0, parseFloat(a2[7]));
                t.equal(0, parseFloat(a2[8]));
                t.equal(0, parseFloat(a2[9]));
                t.equal(1, parseFloat(a2[10]));
                t.equal(0, parseFloat(a2[11]));
                t.equal(0, parseFloat(a2[12]));
                t.equal(0, parseFloat(a2[13]));
                t.equal(0, parseFloat(a2[14]));
                var a3 = a2[15].split(")");
                t.equal(1, parseFloat(a3[0]));
                t.equal("", a3[1]);
                t.end();
            });
            t.end();
        });

        test('setMatrixValue()', function (t) {
            test('should accept a `matrix3d(...)` string', function (t) {
                var m = new XCSSMatrix();
                m.setMatrixValue("matrix3d(11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44)");
                t.equal(11, m.m11);
                t.equal(12, m.m12);
                t.equal(13, m.m13);
                t.equal(14, m.m14);
                t.equal(21, m.m21);
                t.equal(22, m.m22);
                t.equal(23, m.m23);
                t.equal(24, m.m24);
                t.equal(31, m.m31);
                t.equal(32, m.m32);
                t.equal(33, m.m33);
                t.equal(34, m.m34);
                t.equal(41, m.m41);
                t.equal(42, m.m42);
                t.equal(43, m.m43);
                t.equal(44, m.m44);
                t.end();
            });

            test('should accept 3D CSS transform function values', function (t) {
                var m = new XCSSMatrix();
                m.setMatrixValue("translate3d(10px, 20px, 30px) scale3d(2, 3, 4)");
                t.equal(2, m.m11);
                t.equal(0, m.m12);
                t.equal(0, m.m13);
                t.equal(0, m.m14);
                t.equal(0, m.m21);
                t.equal(3, m.m22);
                t.equal(0, m.m23);
                t.equal(0, m.m24);
                t.equal(0, m.m31);
                t.equal(0, m.m32);
                t.equal(4, m.m33);
                t.equal(0, m.m34);
                t.equal(10, m.m41);
                t.equal(20, m.m42);
                t.equal(30, m.m43);
                t.equal(1, m.m44);
                t.end();
            });

            // TODO: fix throws
            // test('should throw exception on bad arguments', function (t) {
            //     var m = new XCSSMatrix();
            //     t.throws(Error, function (t) { m.setMatrixValue("banana"); });
            //     t.throws(Error, function (t) { m.setMatrixValue("translate3d(10em, 20%, 40)"); });
            //     t.throws(Error, function (t) { m.setMatrixValue("translate3d(10px, 20px, 30px) scale3d()"); });
            //     t.end();
            // });
            t.end();
        });

        test('multiply()', function (t) {
            test('should return the correct product', function (t) {
                var m =  new XCSSMatrix("matrix3d( 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16)");
                var m2 = new XCSSMatrix("matrix3d(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)");
                var m3 = m.multiply(m2);

                t.equal(538, parseFloat(m3.m11));
                t.equal(612, parseFloat(m3.m12));
                t.equal(686, parseFloat(m3.m13));
                t.equal(760, parseFloat(m3.m14));
                t.equal(650, parseFloat(m3.m21));
                t.equal(740, parseFloat(m3.m22));
                t.equal(830, parseFloat(m3.m23));
                t.equal(920, parseFloat(m3.m24));
                t.equal(762, parseFloat(m3.m31));
                t.equal(868, parseFloat(m3.m32));
                t.equal(974, parseFloat(m3.m33));
                t.equal(1080, parseFloat(m3.m34));
                t.equal(874, parseFloat(m3.m41));
                t.equal(996, parseFloat(m3.m42));
                t.equal(1118, parseFloat(m3.m43));
                t.equal(1240, parseFloat(m3.m44));
                t.end();
            });

            test('should be immutable', function (t) {
                var m =  new XCSSMatrix("matrix3d( 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16)");
                var m2 = new XCSSMatrix("matrix3d(17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32)");
                var m3 = m.multiply(m2);

                t.equal(1, parseFloat(m.m11));
                t.equal(2, parseFloat(m.m12));
                t.equal(3, parseFloat(m.m13));
                t.equal(4, parseFloat(m.m14));
                t.equal(5, parseFloat(m.m21));
                t.equal(6, parseFloat(m.m22));
                t.equal(7, parseFloat(m.m23));
                t.equal(8, parseFloat(m.m24));
                t.equal(9, parseFloat(m.m31));
                t.equal(10, parseFloat(m.m32));
                t.equal(11, parseFloat(m.m33));
                t.equal(12, parseFloat(m.m34));
                t.equal(13, parseFloat(m.m41));
                t.equal(14, parseFloat(m.m42));
                t.equal(15, parseFloat(m.m43));
                t.equal(16, parseFloat(m.m44));
                t.end();
            });

            test('should correctly multiply an affine matrix', function (t) {
                var m =  new XCSSMatrix("matrix3d(1, 2, 0, 0, 3, 4, 0, 0, 0, 0, 1, 0, 5, 6, 0, 1)");
                var m2 = new XCSSMatrix("matrix3d(7, 8, 0, 0, 9, 10, 0, 0, 0, 0, 1, 0, 11, 12, 0, 1)");
                var m3 = m.multiply(m2);

                t.equal(31, parseFloat(m3.m11));
                t.equal(46, parseFloat(m3.m12));
                t.equal(0, parseFloat(m3.m13));
                t.equal(0, parseFloat(m3.m14));
                t.equal(39, parseFloat(m3.m21));
                t.equal(58, parseFloat(m3.m22));
                t.equal(0, parseFloat(m3.m23));
                t.equal(0, parseFloat(m3.m24));
                t.equal(0, parseFloat(m3.m31));
                t.equal(0, parseFloat(m3.m32));
                t.equal(1, parseFloat(m3.m33));
                t.equal(0, parseFloat(m3.m34));
                t.equal(52, parseFloat(m3.m41));
                t.equal(76, parseFloat(m3.m42));
                t.equal(0, parseFloat(m3.m43));
                t.equal(1, parseFloat(m3.m44));
                t.end();
            });

            test('should work in the correct direction', function (t) {
                var tx = new XCSSMatrix("matrix3d( 1,  0,  0,  0,  0,  1,  0,  0,  0, 0, 1, 0, 100, 0, 0, 1)");
                var sx = new XCSSMatrix("matrix3d( 2,  0,  0,  0,  0,  1,  0,  0,  0, 0, 1, 0, 0, 0, 0, 1)");
                var m = tx.multiply(sx);

                t.equal(2, m.m11);
                t.equal(0, m.m12);
                t.equal(0, m.m13);
                t.equal(0, m.m14);
                t.equal(0, m.m21);
                t.equal(1, m.m22);
                t.equal(0, m.m23);
                t.equal(0, m.m24);
                t.equal(0, m.m31);
                t.equal(0, m.m32);
                t.equal(1, m.m33);
                t.equal(0, m.m34);
                t.equal(100, m.m41);
                t.equal(0, m.m42);
                t.equal(0, m.m43);
                t.equal(1, m.m44);
                t.end();
            });
            t.end();
        });

        test('inverse()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix("matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 10, 20, 30, 1)");
                var m2 = m.inverse();

                t.equal(0.5, parseFloat(m2.m11));
                t.equal(0, parseFloat(m2.m12));
                t.equal(0, parseFloat(m2.m13));
                t.equal(0, parseFloat(m2.m14));
                t.equal(0, parseFloat(m2.m21));
                t.equal(0.5, parseFloat(m2.m22));
                t.equal(0, parseFloat(m2.m23));
                t.equal(0, parseFloat(m2.m24));
                t.equal(0, parseFloat(m2.m31));
                t.equal(0, parseFloat(m2.m32));
                t.equal(0.5, parseFloat(m2.m33));
                t.equal(0, parseFloat(m2.m34));
                t.equal(-5, parseFloat(m2.m41));
                t.equal(-10, parseFloat(m2.m42));
                t.equal(-15, parseFloat(m2.m43));
                t.equal(1, parseFloat(m2.m44));
                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix("matrix3d(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 10, 20, 30, 1)");
                var m2 = m.inverse();

                t.equal(2, parseFloat(m.m11));
                t.equal(0, parseFloat(m.m12));
                t.equal(0, parseFloat(m.m13));
                t.equal(0, parseFloat(m.m14));
                t.equal(0, parseFloat(m.m21));
                t.equal(2, parseFloat(m.m22));
                t.equal(0, parseFloat(m.m23));
                t.equal(0, parseFloat(m.m24));
                t.equal(0, parseFloat(m.m31));
                t.equal(0, parseFloat(m.m32));
                t.equal(2, parseFloat(m.m33));
                t.equal(0, parseFloat(m.m34));
                t.equal(10, parseFloat(m.m41));
                t.equal(20, parseFloat(m.m42));
                t.equal(30, parseFloat(m.m43));
                t.equal(1, parseFloat(m.m44));
                t.end();
            });

            // TODO: fix throws
            // test('should throw an exception on when inversion is impossible', function (t) {
            //     var m = new XCSSMatrix("matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)"); // not invertible
            //     t.throws(Error, function (t) { m.inverse(); });
            //     t.end();
            // });
            t.end();
        });

        test('translate()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.translate(10, 20, 30);

                t.equal(1, m2.m11);
                t.equal(0, m2.m12);
                t.equal(0, m2.m13);
                t.equal(0, m2.m14);
                t.equal(0, m2.m21);
                t.equal(1, m2.m22);
                t.equal(0, m2.m23);
                t.equal(0, m2.m24);
                t.equal(0, m2.m31);
                t.equal(0, m2.m32);
                t.equal(1, m2.m33);
                t.equal(0, m2.m34);
                t.equal(10, m2.m41);
                t.equal(20, m2.m42);
                t.equal(30, m2.m43);
                t.equal(1, m2.m44);
                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.translate(10, 20, 30);

                t.equal(1, m.m11);
                t.equal(0, m.m12);
                t.equal(0, m.m13);
                t.equal(0, m.m14);
                t.equal(0, m.m21);
                t.equal(1, m.m22);
                t.equal(0, m.m23);
                t.equal(0, m.m24);
                t.equal(0, m.m31);
                t.equal(0, m.m32);
                t.equal(1, m.m33);
                t.equal(0, m.m34);
                t.equal(0, m.m41);
                t.equal(0, m.m42);
                t.equal(0, m.m43);
                t.equal(1, m.m44);
                t.end();
            });
            t.end();
        });

        test('scale()', function (t) {
            test('should scale correctly', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.scale(10, 20, 30);

                t.equal(10, m2.m11);
                t.equal(0, m2.m12);
                t.equal(0, m2.m13);
                t.equal(0, m2.m14);
                t.equal(0, m2.m21);
                t.equal(20, m2.m22);
                t.equal(0, m2.m23);
                t.equal(0, m2.m24);
                t.equal(0, m2.m31);
                t.equal(0, m2.m32);
                t.equal(30, m2.m33);
                t.equal(0, m2.m34);
                t.equal(0, m2.m41);
                t.equal(0, m2.m42);
                t.equal(0, m2.m43);
                t.equal(1, m2.m44);
                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.scale(10, 20, 30);

                t.equal(1, m.m11);
                t.equal(0, m.m12);
                t.equal(0, m.m13);
                t.equal(0, m.m14);
                t.equal(0, m.m21);
                t.equal(1, m.m22);
                t.equal(0, m.m23);
                t.equal(0, m.m24);
                t.equal(0, m.m31);
                t.equal(0, m.m32);
                t.equal(1, m.m33);
                t.equal(0, m.m34);
                t.equal(0, m.m41);
                t.equal(0, m.m42);
                t.equal(0, m.m43);
                t.equal(1, m.m44);
                t.end();
            });
            t.end();
        });

        test('rotate()', function (t) {
            test('should rotate correctly', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.rotate(10, 20, 30);

                t.equal(0.813798, parseFloat(m2.m11.toPrecision(6)));
                t.equal(0.469846, parseFloat(m2.m12.toPrecision(6)));
                t.equal(-0.34202, parseFloat(m2.m13.toPrecision(6)));
                t.equal(0, parseFloat(m2.m14.toPrecision(6)));
                t.equal(-0.44097, parseFloat(m2.m21.toPrecision(6)));
                t.equal(0.882564, parseFloat(m2.m22.toPrecision(6)));
                t.equal(0.163176, parseFloat(m2.m23.toPrecision(6)));
                t.equal(0, parseFloat(m2.m24.toPrecision(6)));
                t.equal(0.378522, parseFloat(m2.m31.toPrecision(6)));
                t.equal(0.0180283, parseFloat(m2.m32.toPrecision(6)));
                t.equal(0.925417, parseFloat(m2.m33.toPrecision(6)));
                t.equal(0, parseFloat(m2.m34.toPrecision(6)));
                t.equal(0, parseFloat(m2.m41.toPrecision(6)));
                t.equal(0, parseFloat(m2.m42.toPrecision(6)));
                t.equal(0, parseFloat(m2.m43.toPrecision(6)));
                t.equal(1, parseFloat(m2.m44.toPrecision(6)));
                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.rotate(10, 20, 30);

                t.equal(1, m.m11);
                t.equal(0, m.m12);
                t.equal(0, m.m13);
                t.equal(0, m.m14);
                t.equal(0, m.m21);
                t.equal(1, m.m22);
                t.equal(0, m.m23);
                t.equal(0, m.m24);
                t.equal(0, m.m31);
                t.equal(0, m.m32);
                t.equal(1, m.m33);
                t.equal(0, m.m34);
                t.equal(0, m.m41);
                t.equal(0, m.m42);
                t.equal(0, m.m43);
                t.equal(1, m.m44);
                t.end();
            });
            t.end();
        });

        test('rotateAxisAngle()', function (t) {
            test('should return the correct value', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.rotateAxisAngle(0.707, 0.707, 0.707, 45);

                t.equal(0.804738, parseFloat(m2.m11.toPrecision(6)));
                t.equal(0.505879, parseFloat(m2.m12.toPrecision(6)));
                t.equal(-0.310617, parseFloat(m2.m13.toPrecision(6)));
                t.equal(0, parseFloat(m2.m14.toPrecision(6)));
                t.equal(-0.310617, parseFloat(m2.m21.toPrecision(6)));
                t.equal(0.804738, parseFloat(m2.m22.toPrecision(6)));
                t.equal(0.505879, parseFloat(m2.m23.toPrecision(6)));
                t.equal(0, parseFloat(m2.m24.toPrecision(6)));
                t.equal(0.505879, parseFloat(m2.m31.toPrecision(6)));
                t.equal(-0.310617, parseFloat(m2.m32.toPrecision(6)));
                t.equal(0.804738, parseFloat(m2.m33.toPrecision(6)));
                t.equal(0, parseFloat(m2.m34.toPrecision(6)));
                t.equal(0, parseFloat(m2.m41.toPrecision(6)));
                t.equal(0, parseFloat(m2.m42.toPrecision(6)));
                t.equal(0, parseFloat(m2.m43.toPrecision(6)));
                t.equal(1, parseFloat(m2.m44.toPrecision(6)));
                t.end();
            });

            test('should be immutable', function (t) {
                var m = new XCSSMatrix();
                var m2 = m.rotateAxisAngle(0.707, 0.707, 0.707, 45);

                t.equal(1, m.m11);
                t.equal(0, m.m12);
                t.equal(0, m.m13);
                t.equal(0, m.m14);
                t.equal(0, m.m21);
                t.equal(1, m.m22);
                t.equal(0, m.m23);
                t.equal(0, m.m24);
                t.equal(0, m.m31);
                t.equal(0, m.m32);
                t.equal(1, m.m33);
                t.equal(0, m.m34);
                t.equal(0, m.m41);
                t.equal(0, m.m42);
                t.equal(0, m.m43);
                t.equal(1, m.m44);
                t.end();
            });
            t.end();
        });
        t.end();
    });
    t.end();
});

},{"..":2,"tape":3}],2:[function(require,module,exports){
var XCSSMatrix = require('./lib/XCSSMatrix.js');
module.exports = XCSSMatrix;

},{"./lib/XCSSMatrix.js":4}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
(function(process){var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResultStream = require('./lib/results');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function'
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    return function () {
        if (!harness) harness = createExitHarness();
        return harness.apply(this, arguments);
    };
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness();
    var stream = harness.createStream();
    stream.pipe(createDefaultStream());

    var ended = false;
    stream.on('end', function () { ended = true });

    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    process.on('exit', function (code) {
        if (!ended) {
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                t._exit();
            }
        }
        process.exit(code || harness._exitCode);
    });
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat

var exitInterval;

function createHarness (conf_) {
    var results;

    var test = function (name, conf, cb) {
        if (!results) {
            results = createResultStream();
            results.pause();
        }

        var t = new Test(name, conf, cb);
        test._tests.push(t);

        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok) test._exitCode = 1
            });
        })(t);

        results.push(t);
        return t;
    };

    test._tests = [];

    test.createStream = function () {
        if (!results) results = createResultStream();

        var _pause = results.pause;
        var paused = false;
        results.pause = function () { paused = true };

        nextTick(function () {
            if (!paused) results.resume();
        });
        return results;
    };

    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;

    return test;
}

})(require("__browserify_process"))
},{"./lib/default_stream":6,"./lib/test":7,"./lib/results":8,"__browserify_process":5}],6:[function(require,module,exports){
var Stream = require('stream');

module.exports = function () {
    var out = new Stream;
    out.writable = true;
    var buffered = '';

    out.write = function (buf) {
        var s = buffered + String(buf);
        var lines = s.split('\n');
        for (var i = 0; i < lines.length - 1; i++) {
            console.log(lines[i]);
        }
        buffered = lines[i];
    };

    out.destroy = function () {
        out.writable = false;
        out.emit('close');
    };

    out.end = function (msg) {
        if (msg !== undefined) out.write(msg);
        if (buffered) console.log(buffered);
        out.writable = false;
        out.emit('close');
    };

    return out;
};

},{"stream":9}],4:[function(require,module,exports){
var utils = {
    angles: require('./utils/angle'),
    matrix: require('./utils/matrix'),
    transp: require('./utils/cssTransformString'),
    funcs: {
        // Given a function `fn`, return a function which calls `fn` with only 1
        //   argument, no matter how many are given.
        // Most useful where you only want the first value from a map/foreach/etc
        onlyFirstArg: function (fn, context) {
            context = context || this;

            return function (first) {
                return fn.call(context, first);
            };
        }
    }
};


/**
 *  Given a CSS transform string (like `rotate(3rad)`, or
 *    `matrix(1, 0, 0, 0, 1, 0)`), return an instance compatible with
 *    [`WebKitCSSMatrix`](http://developer.apple.com/library/safari/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/WebKitCSSMatrix/WebKitCSSMatrix.html)
 *  @constructor
 *  @param {string} domstr - a string representation of a 2D or 3D transform matrix
 *    in the form given by the CSS transform property, i.e. just like the
 *    output from [[@link#toString]].
 *  @member {number} a - The first 2D vector value.
 *  @member {number} b - The second 2D vector value.
 *  @member {number} c - The third 2D vector value.
 *  @member {number} d - The fourth 2D vector value.
 *  @member {number} e - The fifth 2D vector value.
 *  @member {number} f - The sixth 2D vector value.
 *  @member {number} m11 - The 3D matrix value in the first row and first column.
 *  @member {number} m12 - The 3D matrix value in the first row and second column.
 *  @member {number} m13 - The 3D matrix value in the first row and third column.
 *  @member {number} m14 - The 3D matrix value in the first row and fourth column.
 *  @member {number} m21 - The 3D matrix value in the second row and first column.
 *  @member {number} m22 - The 3D matrix value in the second row and second column.
 *  @member {number} m23 - The 3D matrix value in the second row and third column.
 *  @member {number} m24 - The 3D matrix value in the second row and fourth column.
 *  @member {number} m31 - The 3D matrix value in the third row and first column.
 *  @member {number} m32 - The 3D matrix value in the third row and second column.
 *  @member {number} m33 - The 3D matrix value in the third row and third column.
 *  @member {number} m34 - The 3D matrix value in the third row and fourth column.
 *  @member {number} m41 - The 3D matrix value in the fourth row and first column.
 *  @member {number} m42 - The 3D matrix value in the fourth row and second column.
 *  @member {number} m43 - The 3D matrix value in the fourth row and third column.
 *  @member {number} m44 - The 3D matrix value in the fourth row and fourth column.
 *  @returns {XCSSMatrix} matrix
 */
function XCSSMatrix(domstr) {
    this.m11 = this.m22 = this.m33 = this.m44 = 1;

               this.m12 = this.m13 = this.m14 =
    this.m21 =            this.m23 = this.m24 =
    this.m31 = this.m32 =            this.m34 =
    this.m41 = this.m42 = this.m43            = 0;

    if (typeof domstr === 'string') {
        this.setMatrixValue(domstr);
    }
}

/**
 *  XCSSMatrix.displayName = 'XCSSMatrix'
 */
XCSSMatrix.displayName = 'XCSSMatrix';

var points2d = ['a', 'b', 'c', 'd', 'e', 'f'];
var points3d = [
    'm11', 'm12', 'm13', 'm14',
    'm21', 'm22', 'm23', 'm24',
    'm31', 'm32', 'm33', 'm34',
    'm41', 'm42', 'm43', 'm44'
];

([
    ['m11', 'a'],
    ['m12', 'b'],
    ['m21', 'c'],
    ['m22', 'd'],
    ['m41', 'e'],
    ['m42', 'f']
]).forEach(function (pair) {
    var key3d = pair[0], key2d = pair[1];

    Object.defineProperty(XCSSMatrix.prototype, key2d, {
        set: function (val) {
            this[key3d] = val;
        },

        get: function () {
            return this[key3d];
        },
        enumerable : true,
        configurable : true
    });
});


/**
 *  Multiply one matrix by another
 *  @method
 *  @member
 *  @param {XCSSMatrix} otherMatrix - The matrix to multiply this one by.
 */
XCSSMatrix.prototype.multiply = function (otherMatrix) {
    return utils.matrix.multiply(this, otherMatrix);
};

/**
 *  If the matrix is invertible, returns its inverse, otherwise returns null.
 *  @method
 *  @member
 *  @returns {XCSSMatrix|null}
 */
XCSSMatrix.prototype.inverse = function () {
    return utils.matrix.inverse(this);
};

/**
 *  Returns the result of rotating the matrix by a given vector.
 *
 *  If only the first argument is provided, the matrix is only rotated about
 *  the z axis.
 *  @method
 *  @member
 *  @param {number} rotX - The rotation around the x axis.
 *  @param {number} rotY - The rotation around the y axis. If undefined, the x component is used.
 *  @param {number} rotZ - The rotation around the z axis. If undefined, the x component is used.
 *  @returns XCSSMatrix
 */
XCSSMatrix.prototype.rotate = function (rx, ry, rz) {

    if (typeof rx !== 'number' || isNaN(rx)) rx = 0;

    if ((typeof ry !== 'number' || isNaN(ry)) &&
        (typeof rz !== 'number' || isNaN(rz))) {
        rz = rx;
        rx = 0;
        ry = 0;
    }

    if (typeof ry !== 'number' || isNaN(ry)) ry = 0;
    if (typeof rz !== 'number' || isNaN(rz)) rz = 0;

    rx = utils.angles.deg2rad(rx);
    ry = utils.angles.deg2rad(ry);
    rz = utils.angles.deg2rad(rz);

    var tx = new XCSSMatrix(),
        ty = new XCSSMatrix(),
        tz = new XCSSMatrix(),
        sinA, cosA, sq;

    rz /= 2;
    sinA  = Math.sin(rz);
    cosA  = Math.cos(rz);
    sq = sinA * sinA;

    // Matrices are identity outside the assigned values
    tz.m11 = tz.m22 = 1 - 2 * sq;
    tz.m12 = tz.m21 = 2 * sinA * cosA;
    tz.m21 *= -1;

    ry /= 2;
    sinA  = Math.sin(ry);
    cosA  = Math.cos(ry);
    sq = sinA * sinA;

    ty.m11 = ty.m33 = 1 - 2 * sq;
    ty.m13 = ty.m31 = 2 * sinA * cosA;
    ty.m13 *= -1;

    rx /= 2;
    sinA = Math.sin(rx);
    cosA = Math.cos(rx);
    sq = sinA * sinA;

    tx.m22 = tx.m33 = 1 - 2 * sq;
    tx.m23 = tx.m32 = 2 * sinA * cosA;
    tx.m32 *= -1;

    var identityMatrix = new XCSSMatrix(); // returns identity matrix by default
    var isIdentity     = this.toString() === identityMatrix.toString();
    var rotatedMatrix  = isIdentity ?
            tz.multiply(ty).multiply(tx) :
            this.multiply(tx).multiply(ty).multiply(tz);

    return rotatedMatrix;
};

/**
 *  Returns the result of rotating the matrix around a given vector by a given
 *  angle.
 *
 *  If the given vector is the origin vector then the matrix is rotated by the
 *  given angle around the z axis.
 *  @method
 *  @member
 *  @param {number} rotX - The rotation around the x axis.
 *  @param {number} rotY - The rotation around the y axis. If undefined, the x component is used.
 *  @param {number} rotZ - The rotation around the z axis. If undefined, the x component is used.
 *  @param {number} angle - The angle of rotation about the axis vector, in degrees.
 *  @returns XCSSMatrix
 */
XCSSMatrix.prototype.rotateAxisAngle = function (x, y, z, a) {
    if (typeof x !== 'number' || isNaN(x)) x = 0;
    if (typeof y !== 'number' || isNaN(y)) y = 0;
    if (typeof z !== 'number' || isNaN(z)) z = 0;
    if (typeof a !== 'number' || isNaN(a)) a = 0;
    if (x === 0 && y === 0 && z === 0) z = 1;
    a = (utils.angles.deg2rad(a) || 0) / 2;
    var t         = new XCSSMatrix(),
        len       = Math.sqrt(x * x + y * y + z * z),
        cosA      = Math.cos(a),
        sinA      = Math.sin(a),
        sq        = sinA * sinA,
        sc        = sinA * cosA,
        precision = function(v) { return parseFloat((v).toFixed(6)); },
        x2, y2, z2;

    // Bad vector, use something sensible
    if (len === 0) {
        x = 0;
        y = 0;
        z = 1;
    } else if (len !== 1) {
        x /= len;
        y /= len;
        z /= len;
    }

    // Optimise cases where axis is along major axis
    if (x === 1 && y === 0 && z === 0) {
        t.m22 = t.m33 = 1 - 2 * sq;
        t.m23 = t.m32 = 2 * sc;
        t.m32 *= -1;
    } else if (x === 0 && y === 1 && z === 0) {
        t.m11 = t.m33 = 1 - 2 * sq;
        t.m13 = t.m31 = 2 * sc;
        t.m13 *= -1;
    } else if (x === 0 && y === 0 && z === 1) {
        t.m11 = t.m22 = 1 - 2 * sq;
        t.m12 = t.m21 = 2 * sc;
        t.m21 *= -1;
    } else {
        x2  = x * x;
        y2  = y * y;
        z2  = z * z;
        // http://dev.w3.org/csswg/css-transforms/#mathematical-description
        t.m11 = precision(1 - 2 * (y2 + z2) * sq);
        t.m12 = precision(2 * (x * y * sq + z * sc));
        t.m13 = precision(2 * (x * z * sq - y * sc));
        t.m21 = precision(2 * (x * y * sq - z * sc));
        t.m22 = precision(1 - 2 * (x2 + z2) * sq);
        t.m23 = precision(2 * (y * z * sq + x * sc));
        t.m31 = precision(2 * (x * z * sq + y * sc));
        t.m32 = precision(2 * (y * z * sq - x * sc));
        t.m33 = precision(1 - 2 * (x2 + y2) * sq);
    }

    return this.multiply(t);
};

/**
 *  Returns the result of scaling the matrix by a given vector.
 *  @method
 *  @member
 *  @param {number} scaleX - the scaling factor in the x axis.
 *  @param {number} scaleY - the scaling factor in the y axis. If undefined, the x component is used.
 *  @param {number} scaleZ - the scaling factor in the z axis. If undefined, 1 is used.
 *  @returns XCSSMatrix
 */
XCSSMatrix.prototype.scale = function (scaleX, scaleY, scaleZ) {
    var transform = new XCSSMatrix();

    if (typeof scaleX !== 'number' || isNaN(scaleX)) scaleX = 1;
    if (typeof scaleY !== 'number' || isNaN(scaleY)) scaleY = scaleX;
    if (typeof scaleZ !== 'number' || isNaN(scaleZ)) scaleZ = 1;

    transform.m11 = scaleX;
    transform.m22 = scaleY;
    transform.m33 = scaleZ;

    return this.multiply(transform);
};

/**
 *  Returns the result of skewing the matrix by a given vector.
 *  @method
 *  @member
 *  @param {number} skewX - The scaling factor in the x axis.
 *  @returns XCSSMatrix
 */
XCSSMatrix.prototype.skewX = function (degrees) {
    var radians   = utils.angles.deg2rad(degrees);
    var transform = new XCSSMatrix();

    transform.c = Math.tan(radians);

    return this.multiply(transform);
};

/**
 *  Returns the result of skewing the matrix by a given vector.
 *  @method
 *  @member
 *  @param {number} skewY - the scaling factor in the x axis.
 *  @returns XCSSMatrix
 */
XCSSMatrix.prototype.skewY = function (degrees) {
    var radians   = utils.angles.deg2rad(degrees);
    var transform = new XCSSMatrix();

    transform.b = Math.tan(radians);

    return this.multiply(transform);
};

/**
 *  Returns the result of translating the matrix by a given vector.
 *  @method
 *  @member
 *  @param {number} x - The x component of the vector.
 *  @param {number} y - The y component of the vector.
 *  @param {number} z - The z component of the vector. If undefined, 0 is used.
 *  @returns XCSSMatrix
 */
XCSSMatrix.prototype.translate = function (x, y, z) {
    var t = new XCSSMatrix();

    if (typeof x !== 'number' || isNaN(x)) x = 0;
    if (typeof y !== 'number' || isNaN(y)) y = 0;
    if (typeof z !== 'number' || isNaN(z)) z = 0;

    t.m41 = x;
    t.m42 = y;
    t.m43 = z;

    return this.multiply(t);
};

/**
 *  Sets the matrix values using a string representation, such as that produced
 *  by the [[XCSSMatrix#toString]] method.
 *  @method
 *  @member
 *  @params {string} domstr - A string representation of a 2D or 3D transform matrix
 *    in the form given by the CSS transform property, i.e. just like the
 *    output from [[XCSSMatrix#toString]].
 *  @returns undefined
 */
XCSSMatrix.prototype.setMatrixValue = function (domstr) {

    var matrixString = toMatrixString(domstr.trim());
    var matrixObject = utils.transp.statementToObject(matrixString);

    if (!matrixObject) return;

    var is3d   = matrixObject.key === utils.transp.matrixFn3d;
    var keygen = is3d ? indextoKey3d : indextoKey2d;
    var values = matrixObject.value;
    var count  = values.length;

    if ((is3d && count !== 16) || !(is3d || count === 6)) return;

    values.forEach(function (obj, i) {
        var key = keygen(i);
        this[key] = obj.value;
    }, this);
};

function indextoKey2d (index) {
    return String.fromCharCode(index + 97); // ASCII char 97 == 'a'
}

function indextoKey3d (index) {
    return ('m' + (Math.floor(index / 4) + 1)) + (index % 4 + 1);
}
/**
 *  Returns a string representation of the matrix.
 *  @method
 *  @memberof XCSSMatrix
 *  @returns {string} matrixString - a string like `matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)`
 *
 **/
XCSSMatrix.prototype.toString = function () {
    var points, prefix;

    if (utils.matrix.isAffine(this)) {
        prefix = utils.transp.matrixFn2d;
        points = points2d;
    } else {
        prefix = utils.transp.matrixFn3d;
        points = points3d;
    }

    return prefix + '(' +
        points.map(function (p) {
            return this[p].toFixed(6);
        }, this) .join(', ') +
        ')';
};

// ====== toMatrixString ====== //
var jsFunctions = {
    matrix: function (m, o) {
        var m2 = new XCSSMatrix(o.unparsed);

        return m.multiply(m2);
    },
    matrix3d: function (m, o) {
        var m2 = new XCSSMatrix(o.unparsed);

        return m.multiply(m2);
    },

    perspective: function (m, o) {
        var m2 = new XCSSMatrix();
        m2.m34 -= 1 / o.value[0].value;

        return m.multiply(m2);
    },

    rotate: function (m, o) {
        return m.rotate.apply(m, o.value.map(objectValues));
    },
    rotate3d: function (m, o) {
        return m.rotateAxisAngle.apply(m, o.value.map(objectValues));
    },
    rotateX: function (m, o) {
        return m.rotate.apply(m, [o.value[0].value, 0, 0]);
    },
    rotateY: function (m, o) {
        return m.rotate.apply(m, [0, o.value[0].value, 0]);
    },
    rotateZ: function (m, o) {
        return m.rotate.apply(m, [0, 0, o.value[0].value]);
    },

    scale: function (m, o) {
        return m.scale.apply(m, o.value.map(objectValues));
    },
    scale3d: function (m, o) {
        return m.scale.apply(m, o.value.map(objectValues));
    },
    scaleX: function (m, o) {
        return m.scale.apply(m, o.value.map(objectValues));
    },
    scaleY: function (m, o) {
        return m.scale.apply(m, [0, o.value[0].value, 0]);
    },
    scaleZ: function (m, o) {
        return m.scale.apply(m, [0, 0, o.value[0].value]);
    },

    skew: function (m, o) {
        var mX = new XCSSMatrix('skewX(' + o.value[0].unparsed + ')');
        var mY = new XCSSMatrix('skewY(' + (o.value[1]&&o.value[1].unparsed || 0) + ')');
        var sM = 'matrix(1.00000, '+ mY.b +', '+ mX.c +', 1.000000, 0.000000, 0.000000)';
        var m2 = new XCSSMatrix(sM);

        return m.multiply(m2);
    },
    skewX: function (m, o) {
        return m.skewX.apply(m, [o.value[0].value]);
    },
    skewY: function (m, o) {
        return m.skewY.apply(m, [o.value[0].value]);
    },

    translate: function (m, o) {
        return m.translate.apply(m, o.value.map(objectValues));
    },
    translate3d: function (m, o) {
        return m.translate.apply(m, o.value.map(objectValues));
    },
    translateX: function (m, o) {
        return m.translate.apply(m, [o.value[0].value, 0, 0]);
    },
    translateY: function (m, o) {
        return m.translate.apply(m, [0, o.value[0].value, 0]);
    },
    translateZ: function (m, o) {
        return m.translate.apply(m, [0, 0, o.value[0].value]);
    }
};

function objectValues(obj) {
    return obj.value;
}

function cssFunctionToJsFunction(cssFunctionName) {
    return jsFunctions[cssFunctionName];
}

function parsedToDegrees(parsed) {
    if (parsed.units === 'rad') {
        parsed.value = utils.angles.rad2deg(parsed.value);
        parsed.units = 'deg';
    }
    else if (parsed.units === 'grad') {
        parsed.value = utils.angles.grad2deg(parsed.value);
        parsed.units = 'deg';
    }

    return parsed;
}

function transformMatrix(matrix, operation) {
    // convert to degrees because all CSSMatrix methods expect degrees
    operation.value = operation.value.map(parsedToDegrees);

    var jsFunction = cssFunctionToJsFunction(operation.key);
    var result     = jsFunction(matrix, operation);

    return result || matrix;
}

/**
 *  Tranforms a `el.style.WebkitTransform`-style string
 *  (like `rotate(18rad) translate3d(50px, 100px, 10px)`)
 *  into a `getComputedStyle(el)`-style matrix string
 *  (like `matrix3d(0.660316, -0.750987, 0, 0, 0.750987, 0.660316, 0, 0, 0, 0, 1, 0, 108.114560, 28.482308, 10, 1)`)
 *  @private
 *  @method
 *  @param {string} transformString - `el.style.WebkitTransform`-style string (like `rotate(18rad) translate3d(50px, 100px, 10px)`)
 */
function toMatrixString(transformString) {
    var statements = utils.transp.stringToStatements(transformString);

    if (statements.length === 1 && (/^matrix/).test(transformString)) {
        return transformString;
    }

    // We only want the statement to pass to `utils.transp.statementToObject`
    //   not the other values (index, list) from `map`
    var statementToObject = utils.funcs.onlyFirstArg(utils.transp.statementToObject);
    var operations        = statements.map(statementToObject);
    var startingMatrix    = new XCSSMatrix();
    var transformedMatrix = operations.reduce(transformMatrix, startingMatrix);
    var matrixString      = transformedMatrix.toString();

    return matrixString;
}

module.exports = XCSSMatrix;

},{"./utils/angle":10,"./utils/matrix":11,"./utils/cssTransformString":12}],10:[function(require,module,exports){
module.exports = {
  deg2rad: deg2rad,
  rad2deg: rad2deg,
  grad2deg: grad2deg
};

/**
 *  Converts angles in degrees, which are used by the external API, to angles
 *  in radians used in internal calculations.
 *  @param {number} angle - An angle in degrees.
 *  @returns {number} radians
 */
function deg2rad(angle) {
    return angle * Math.PI / 180;
}

function rad2deg(radians) {
    return radians * (180 / Math.PI);
}

function grad2deg(gradians) {
    // 400 gradians in 360 degrees
    return gradians / (400 / 360);
}

},{}],11:[function(require,module,exports){
module.exports = {
  determinant2x2: determinant2x2,
  determinant3x3: determinant3x3,
  determinant4x4: determinant4x4,
  isAffine: isAffine,
  isIdentityOrTranslation: isIdentityOrTranslation,
  adjoint: adjoint,
  inverse: inverse,
  multiply: multiply
};

/**
 *  Calculates the determinant of a 2x2 matrix.
 *  @param {number} a - Top-left value of the matrix.
 *  @param {number} b - Top-right value of the matrix.
 *  @param {number} c - Bottom-left value of the matrix.
 *  @param {number} d - Bottom-right value of the matrix.
 *  @returns {number}
 */
function determinant2x2(a, b, c, d) {
    return a * d - b * c;
}

/**
 *  Calculates the determinant of a 3x3 matrix.
 *  @param {number} a1 - Matrix value in position [1, 1].
 *  @param {number} a2 - Matrix value in position [1, 2].
 *  @param {number} a3 - Matrix value in position [1, 3].
 *  @param {number} b1 - Matrix value in position [2, 1].
 *  @param {number} b2 - Matrix value in position [2, 2].
 *  @param {number} b3 - Matrix value in position [2, 3].
 *  @param {number} c1 - Matrix value in position [3, 1].
 *  @param {number} c2 - Matrix value in position [3, 2].
 *  @param {number} c3 - Matrix value in position [3, 3].
 *  @returns {number}
 */
function determinant3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3) {

    return a1 * determinant2x2(b2, b3, c2, c3) -
           b1 * determinant2x2(a2, a3, c2, c3) +
           c1 * determinant2x2(a2, a3, b2, b3);
}

/**
 *  Calculates the determinant of a 4x4 matrix.
 *  @param {XCSSMatrix} matrix - The matrix to calculate the determinant of.
 *  @returns {number}
 */
function determinant4x4(matrix) {
    var
        m = matrix,
        // Assign to individual variable names to aid selecting correct elements
        a1 = m.m11, b1 = m.m21, c1 = m.m31, d1 = m.m41,
        a2 = m.m12, b2 = m.m22, c2 = m.m32, d2 = m.m42,
        a3 = m.m13, b3 = m.m23, c3 = m.m33, d3 = m.m43,
        a4 = m.m14, b4 = m.m24, c4 = m.m34, d4 = m.m44;

    return a1 * determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4) -
           b1 * determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4) +
           c1 * determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4) -
           d1 * determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
}

/**
 *  Determines whether the matrix is affine.
 *  @returns {boolean}
 */
function isAffine(matrix) {
    return matrix.m13 === 0 && matrix.m14 === 0 &&
           matrix.m23 === 0 && matrix.m24 === 0 &&
           matrix.m31 === 0 && matrix.m32 === 0 &&
           matrix.m33 === 1 && matrix.m34 === 0 &&
           matrix.m43 === 0 && matrix.m44 === 1;
}

/**
 *  Returns whether the matrix is the identity matrix or a translation matrix.
 *  @return {boolean}
 */
function isIdentityOrTranslation(matrix) {
    var m = matrix;

    return m.m11 === 1 && m.m12 === 0 && m.m13 === 0 && m.m14 === 0 &&
           m.m21 === 0 && m.m22 === 1 && m.m23 === 0 && m.m24 === 0 &&
           m.m31 === 0 && m.m31 === 0 && m.m33 === 1 && m.m34 === 0 &&
    /* m41, m42 and m43 are the translation points */   m.m44 === 1;
}

/**
 *  Returns the adjoint matrix.
 *  @return {XCSSMatrix}
 */
function adjoint(matrix) {
    var m = matrix,
        // make `result` the same type as the given metric
        result = new matrix.constructor(),

        a1 = m.m11, b1 = m.m12, c1 = m.m13, d1 = m.m14,
        a2 = m.m21, b2 = m.m22, c2 = m.m23, d2 = m.m24,
        a3 = m.m31, b3 = m.m32, c3 = m.m33, d3 = m.m34,
        a4 = m.m41, b4 = m.m42, c4 = m.m43, d4 = m.m44;

    // Row column labeling reversed since we transpose rows & columns
    result.m11 =  determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4);
    result.m21 = -determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4);
    result.m31 =  determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4);
    result.m41 = -determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);

    result.m12 = -determinant3x3(b1, b3, b4, c1, c3, c4, d1, d3, d4);
    result.m22 =  determinant3x3(a1, a3, a4, c1, c3, c4, d1, d3, d4);
    result.m32 = -determinant3x3(a1, a3, a4, b1, b3, b4, d1, d3, d4);
    result.m42 =  determinant3x3(a1, a3, a4, b1, b3, b4, c1, c3, c4);

    result.m13 =  determinant3x3(b1, b2, b4, c1, c2, c4, d1, d2, d4);
    result.m23 = -determinant3x3(a1, a2, a4, c1, c2, c4, d1, d2, d4);
    result.m33 =  determinant3x3(a1, a2, a4, b1, b2, b4, d1, d2, d4);
    result.m43 = -determinant3x3(a1, a2, a4, b1, b2, b4, c1, c2, c4);

    result.m14 = -determinant3x3(b1, b2, b3, c1, c2, c3, d1, d2, d3);
    result.m24 =  determinant3x3(a1, a2, a3, c1, c2, c3, d1, d2, d3);
    result.m34 = -determinant3x3(a1, a2, a3, b1, b2, b3, d1, d2, d3);
    result.m44 =  determinant3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3);

    return result;
}

function inverse(matrix) {
  var inv;

  if (isIdentityOrTranslation(matrix)) {
      inv = new matrix.constructor();

      if (!(matrix.m41 === 0 && matrix.m42 === 0 && matrix.m43 === 0)) {
          inv.m41 = -matrix.m41;
          inv.m42 = -matrix.m42;
          inv.m43 = -matrix.m43;
      }

      return inv;
  }

  // Calculate the adjoint matrix
  var result = adjoint(matrix);

  // Calculate the 4x4 determinant
  var det = determinant4x4(matrix);

  // If the determinant is zero, then the inverse matrix is not unique
  if (Math.abs(det) < 1e-8) return null;

  // Scale the adjoint matrix to get the inverse
  for (var i = 1; i < 5; i++) {
      for (var j = 1; j < 5; j++) {
          result[('m' + i) + j] /= det;
      }
  }

  return result;
}

function multiply(matrix, otherMatrix) {
  if (!otherMatrix) return null;

  var a = otherMatrix,
      b = matrix,
      c = new matrix.constructor();

  c.m11 = a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31 + a.m14 * b.m41;
  c.m12 = a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32 + a.m14 * b.m42;
  c.m13 = a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33 + a.m14 * b.m43;
  c.m14 = a.m11 * b.m14 + a.m12 * b.m24 + a.m13 * b.m34 + a.m14 * b.m44;

  c.m21 = a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31 + a.m24 * b.m41;
  c.m22 = a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32 + a.m24 * b.m42;
  c.m23 = a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33 + a.m24 * b.m43;
  c.m24 = a.m21 * b.m14 + a.m22 * b.m24 + a.m23 * b.m34 + a.m24 * b.m44;

  c.m31 = a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31 + a.m34 * b.m41;
  c.m32 = a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32 + a.m34 * b.m42;
  c.m33 = a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33 + a.m34 * b.m43;
  c.m34 = a.m31 * b.m14 + a.m32 * b.m24 + a.m33 * b.m34 + a.m34 * b.m44;

  c.m41 = a.m41 * b.m11 + a.m42 * b.m21 + a.m43 * b.m31 + a.m44 * b.m41;
  c.m42 = a.m41 * b.m12 + a.m42 * b.m22 + a.m43 * b.m32 + a.m44 * b.m42;
  c.m43 = a.m41 * b.m13 + a.m42 * b.m23 + a.m43 * b.m33 + a.m44 * b.m43;
  c.m44 = a.m41 * b.m14 + a.m42 * b.m24 + a.m43 * b.m34 + a.m44 * b.m44;

  return c;
}

function transpose(matrix) {
  var result = new matrix.constructor();
  var rows = 4, cols = 4;
  var i = cols, j;
  while (i) {
    j = rows;
    while (j) {
      result['m' + i + j] = matrix['m'+ j + i];
      j--;
    }
    i--;
  }
  return result;
}

},{}],9:[function(require,module,exports){
var events = require('events');
var util = require('util');

function Stream() {
  events.EventEmitter.call(this);
}
util.inherits(Stream, events.EventEmitter);
module.exports = Stream;
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once, and
  // only when all sources have ended.
  if (!dest._isStdio && (!options || options.end !== false)) {
    dest._pipeCount = dest._pipeCount || 0;
    dest._pipeCount++;

    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest._pipeCount--;

    // remove the listeners
    cleanup();

    if (dest._pipeCount > 0) {
      // waiting for other incoming streams to end.
      return;
    }

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest._pipeCount--;

    // remove the listeners
    cleanup();

    if (dest._pipeCount > 0) {
      // waiting for other incoming streams to end.
      return;
    }

    dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (this.listeners('error').length === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('end', cleanup);
    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":13,"util":14}],12:[function(require,module,exports){
module.exports = {
    matrixFn2d: 'matrix',
    matrixFn3d: 'matrix3d',
    valueToObject: valueToObject,
    statementToObject: statementToObject,
    stringToStatements: stringToStatements
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
    var nameAndArgs    = /(\w+)\(([^\)]+)\)/i;
    var statementParts = statement.toString().match(nameAndArgs).slice(1);
    var functionName   = statementParts[0];
    var stringValues   = statementParts[1].split(/, ?/);
    var parsedValues   = !skipValues && stringValues.map(valueToObject);

    return {
        key: functionName,
        value: parsedValues || stringValues,
        unparsed: statement
    };
}

function stringToStatements(transformString) {
    var functionSignature   = /(\w+)\([^\)]+\)/ig;
    var transformStatements = transformString.match(functionSignature) || [];

    return transformStatements;
}

},{}],15:[function(require,module,exports){
(function(process){function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

})(require("__browserify_process"))
},{"__browserify_process":5}],14:[function(require,module,exports){
var events = require('events');

exports.isArray = isArray;
exports.isDate = function(obj){return Object.prototype.toString.call(obj) === '[object Date]'};
exports.isRegExp = function(obj){return Object.prototype.toString.call(obj) === '[object RegExp]'};


exports.print = function () {};
exports.puts = function () {};
exports.debug = function() {};

exports.inspect = function(obj, showHidden, depth, colors) {
  var seen = [];

  var stylize = function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
          'italic' : [3, 23],
          'underline' : [4, 24],
          'inverse' : [7, 27],
          'white' : [37, 39],
          'grey' : [90, 39],
          'black' : [30, 39],
          'blue' : [34, 39],
          'cyan' : [36, 39],
          'green' : [32, 39],
          'magenta' : [35, 39],
          'red' : [31, 39],
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\033[' + styles[style][0] + 'm' + str +
             '\033[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  };
  if (! colors) {
    stylize = function(str, styleType) { return str; };
  }

  function format(value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (value && typeof value.inspect === 'function' &&
        // Filter out the util module, it's inspect function is special
        value !== exports &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      return value.inspect(recurseTimes);
    }

    // Primitive types cannot have properties
    switch (typeof value) {
      case 'undefined':
        return stylize('undefined', 'undefined');

      case 'string':
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return stylize(simple, 'string');

      case 'number':
        return stylize('' + value, 'number');

      case 'boolean':
        return stylize('' + value, 'boolean');
    }
    // For some reason typeof null is "object", so special case here.
    if (value === null) {
      return stylize('null', 'null');
    }

    // Look up the keys of the object.
    var visible_keys = Object_keys(value);
    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;

    // Functions without properties can be shortcutted.
    if (typeof value === 'function' && keys.length === 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        var name = value.name ? ': ' + value.name : '';
        return stylize('[Function' + name + ']', 'special');
      }
    }

    // Dates without properties can be shortcutted
    if (isDate(value) && keys.length === 0) {
      return stylize(value.toUTCString(), 'date');
    }

    var base, type, braces;
    // Determine the object type
    if (isArray(value)) {
      type = 'Array';
      braces = ['[', ']'];
    } else {
      type = 'Object';
      braces = ['{', '}'];
    }

    // Make functions say that they are functions
    if (typeof value === 'function') {
      var n = value.name ? ': ' + value.name : '';
      base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
    } else {
      base = '';
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + value.toUTCString();
    }

    if (keys.length === 0) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        return stylize('[Object]', 'special');
      }
    }

    seen.push(value);

    var output = keys.map(function(key) {
      var name, str;
      if (value.__lookupGetter__) {
        if (value.__lookupGetter__(key)) {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Getter/Setter]', 'special');
          } else {
            str = stylize('[Getter]', 'special');
          }
        } else {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Setter]', 'special');
          }
        }
      }
      if (visible_keys.indexOf(key) < 0) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (seen.indexOf(value[key]) < 0) {
          if (recurseTimes === null) {
            str = format(value[key]);
          } else {
            str = format(value[key], recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (isArray(value)) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = stylize('[Circular]', 'special');
        }
      }
      if (typeof name === 'undefined') {
        if (type === 'Array' && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    });

    seen.pop();

    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.length + 1;
    }, 0);

    if (length > 50) {
      output = braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];

    } else {
      output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    return output;
  }
  return format(obj, (typeof depth === 'undefined' ? 2 : depth));
};


function isArray(ar) {
  return ar instanceof Array ||
         Array.isArray(ar) ||
         (ar && ar !== Object.prototype && isArray(ar.__proto__));
}


function isRegExp(re) {
  return re instanceof RegExp ||
    (typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]');
}


function isDate(d) {
  if (d instanceof Date) return true;
  if (typeof d !== 'object') return false;
  var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
  var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
  return JSON.stringify(proto) === JSON.stringify(properties);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

exports.log = function (msg) {};

exports.pump = null;

var Object_keys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
};

var Object_create = Object.create || function (prototype, properties) {
    // from es5-shim
    var object;
    if (prototype === null) {
        object = { '__proto__' : null };
    }
    else {
        if (typeof prototype !== 'object') {
            throw new TypeError(
                'typeof prototype[' + (typeof prototype) + '] != \'object\''
            );
        }
        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
    }
    if (typeof properties !== 'undefined' && Object.defineProperties) {
        Object.defineProperties(object, properties);
    }
    return object;
};

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object_create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(exports.inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for(var x = args[i]; i < len; x = args[++i]){
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + exports.inspect(x);
    }
  }
  return str;
};

},{"events":13}],13:[function(require,module,exports){
(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":5}],7:[function(require,module,exports){
(function(process,__dirname){var Stream = require('stream');
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

module.exports = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

inherits(Test, EventEmitter);

function Test (name_, opts_, cb_) {
    var self = this;
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        switch (typeof arguments[i]) {
            case 'string':
                name = arguments[i];
                break;
            case 'object':
                opts = arguments[i] || opts;
                break;
            case 'function':
                cb = arguments[i];
        }
    }

    this.readable = true;
    this.name = name || '(anonymous)';
    this.assertCount = 0;
    this._skip = opts.skip || false;
    this._plan = undefined;
    this._cb = cb;
    this._progeny = [];
    this._ok = true;
}

Test.prototype.run = function () {
    if (this._skip) {
        return this.end();
    }
    this.emit('prerun');
    try {
        this._cb(this);
    }
    catch (err) {
        this.error(err);
        this.end();
        return;
    }
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.emit('test', t);
};

Test.prototype.comment = function (msg) {
    this.emit('result', msg.trim().replace(/^#\s*/, ''));
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.end = function () {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self.end() });
        return;
    }

    if (!this.ended) this.emit('end');
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};

    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator),
        actual : defined(extra.actual, opts.actual),
        expected : defined(extra.expected, opts.expected)
    };
    this._ok = Boolean(this._ok && ok);

    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }

    var e = new Error('exception');
    var err = (e.stack || '').split('\n');
    var dir = path.dirname(__dirname) + '/';

    for (var i = 0; i < err.length; i++) {
        var m = /^\s*\bat\s+(.+)/.exec(err[i]);
        if (!m) continue;

        var s = m[1].split(/\s+/);
        var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
        if (!filem) continue;

        if (filem[1].slice(0, dir.length) === dir) continue;

        res.functionName = s[0];
        res.file = filem[1];
        res.line = Number(filem[2]);
        if (filem[3]) res.column = filem[3];

        res.at = m[1];
        break;
    }

    self.emit('result', res);

    if (self._plan === self.assertCount && extra.exiting) {
        if (!self.ended) self.end();
    }
    else if (self._plan === self.assertCount) {
        nextTick(function () {
            if (!self.ended) self.end();
        });
    }

    if (!self._planError && self.assertCount > self._plan) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self.assertCount
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    this._assert(passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

// vim: set softtabstop=4 shiftwidth=4:

})(require("__browserify_process"),"/../node_modules/tape/lib")
},{"stream":9,"path":15,"util":14,"events":13,"deep-equal":16,"defined":17,"__browserify_process":5}],8:[function(require,module,exports){
(function(process){var Stream = require('stream');
var json = typeof JSON === 'object' ? JSON : require('jsonify');
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function () {
    var output = through();
    output.pause();
    output.queue('TAP version 13\n');

    var results = new Results(output);
    output.push = function (t) { results.push(t) };

    output.only = function (name) {
        results.only = name;
    };

    nextTick(function next () {
        var t = results.tests.shift();
        if (!t && results.running) return;
        if (!t) return results.close();
        t.run();
    });

    return output;
};

function Results (stream) {
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this.stream = stream;
    this.tests = [];
    this.running = 0;
}

Results.prototype.push = function (t, parentT) {
    var self = this;
    var write = function (s) { self.stream.queue(s) };
    t.once('prerun', function () {
        if (self.only && self.only !== t.name && !parentT) {
            var nt = self.tests.shift();
            if (nt) nt.run()
            else self.close();
            return;
        }

        self.running ++;
        write('# ' + t.name + '\n');
    });
    if (parentT) {
        var ix = self.tests.indexOf(parentT);
        if (ix >= 0) self.tests.splice(ix, 0, t);
    }
    else self.tests.push(t);

    var plan;
    t.on('plan', function (n) { plan = n });

    var subtests = 0;

    t.on('test', function (st) {
        subtests ++;
        st.on('end', function () {
            subtests --;
            if (subtests === 1) nextTick(function () { st.run() });
            else if (subtests === 0 && !t.ended) {
                t.end();
            }
        });
        self.push(st, t);
        if (subtests === 1) {
            if (plan === undefined) st.run();
            else nextTick(function () {
                st.run();
            });
        }
    });

    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });

    t.once('end', function () {
        if (t._skip) {
            var nt = self.tests.shift();
            if (nt) nt.run();
            else self.close();
            return;
        }

        self.running --;
        if (subtests !== 0) return;

        if (self.running === 0 && self.tests.length) {
            var nt = self.tests.shift();
            nt.run();
        }
        else if (self.running === 0) {
            self.close();
        }
    });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self.stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self.stream.queue(s) };

    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self.stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.replace(/\s+/g, ' ') : '';

    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';

    output += '\n';
    if (res.ok) return output;

    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';

    var ex = json.stringify(res.expected, getSerialize()) || '';
    var ac = json.stringify(res.actual, getSerialize()) || '';

    if (Math.max(ex.length, ac.length) > 65) {
        output += inner + 'expected:\n' + inner + '  ' + ex + '\n';
        output += inner + 'actual:\n' + inner + '  ' + ac + '\n';
    }
    else {
        output += inner + 'expected: ' + ex + '\n';
        output += inner + 'actual:   ' + ac + '\n';
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack:\n';
        output += inner + '  ' + lines[0] + '\n';
        for (var i = 1; i < lines.length; i++) {
            output += inner + lines[i] + '\n';
        }
    }

    output += outer + '...\n';
    return output;
}

function getSerialize () {
    var seen = [];

    return function (key, value) {
        var ret = value;
        if (typeof value === 'object' && value) {
            var found = false;
            for (var i = 0; i < seen.length; i++) {
                if (seen[i] === value) {
                    found = true
                    break;
                }
            }

            if (found) ret = '[Circular]'
            else seen.push(value)
        }
        return ret;
    };
}

})(require("__browserify_process"))
},{"stream":9,"jsonify":18,"through":19,"__browserify_process":5}],16:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var Object_keys = typeof Object.keys === 'function'
    ? Object.keys
    : function (obj) {
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    }
;

var deepEqual = module.exports = function (actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b);
  }
  try {
    var ka = Object_keys(a),
        kb = Object_keys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}

},{}],17:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],18:[function(require,module,exports){
exports.parse = require('./lib/parse');
exports.stringify = require('./lib/stringify');

},{"./lib/parse":20,"./lib/stringify":21}],19:[function(require,module,exports){
(function(process){var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data == null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


})(require("__browserify_process"))
},{"stream":9,"__browserify_process":5}],20:[function(require,module,exports){
var at, // The index of the current character
    ch, // The current character
    escapee = {
        '"':  '"',
        '\\': '\\',
        '/':  '/',
        b:    '\b',
        f:    '\f',
        n:    '\n',
        r:    '\r',
        t:    '\t'
    },
    text,

    error = function (m) {
        // Call error when something is wrong.
        throw {
            name:    'SyntaxError',
            message: m,
            at:      at,
            text:    text
        };
    },

    next = function (c) {
        // If a c parameter is provided, verify that it matches the current character.
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }

        // Get the next character. When there are no more characters,
        // return the empty string.

        ch = text.charAt(at);
        at += 1;
        return ch;
    },

    number = function () {
        // Parse a number value.
        var number,
            string = '';

        if (ch === '-') {
            string = '-';
            next('-');
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while (next() && ch >= '0' && ch <= '9') {
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
        }
        number = +string;
        if (!isFinite(number)) {
            error("Bad number");
        } else {
            return number;
        }
    },

    string = function () {
        // Parse a string value.
        var hex,
            i,
            string = '',
            uffff;

        // When parsing for string values, we must look for " and \ characters.
        if (ch === '"') {
            while (next()) {
                if (ch === '"') {
                    next();
                    return string;
                } else if (ch === '\\') {
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for (i = 0; i < 4; i += 1) {
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                } else {
                    string += ch;
                }
            }
        }
        error("Bad string");
    },

    white = function () {

// Skip whitespace.

        while (ch && ch <= ' ') {
            next();
        }
    },

    word = function () {

// true, false, or null.

        switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
        }
        error("Unexpected '" + ch + "'");
    },

    value,  // Place holder for the value function.

    array = function () {

// Parse an array value.

        var array = [];

        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array;   // empty array
            }
            while (ch) {
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error("Bad array");
    },

    object = function () {

// Parse an object value.

        var key,
            object = {};

        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return object;   // empty object
            }
            while (ch) {
                key = string();
                white();
                next(':');
                if (Object.hasOwnProperty.call(object, key)) {
                    error('Duplicate key "' + key + '"');
                }
                object[key] = value();
                white();
                if (ch === '}') {
                    next('}');
                    return object;
                }
                next(',');
                white();
            }
        }
        error("Bad object");
    };

value = function () {

// Parse a JSON value. It could be an object, an array, a string, a number,
// or a word.

    white();
    switch (ch) {
    case '{':
        return object();
    case '[':
        return array();
    case '"':
        return string();
    case '-':
        return number();
    default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

module.exports = function (source, reviver) {
    var result;

    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? (function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = walk(value, k);
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        delete value[k];
                    }
                }
            }
        }
        return reviver.call(holder, key, value);
    }({'': result}, '')) : result;
};

},{}],21:[function(require,module,exports){
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    },
    rep;

function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}

function str(key, holder) {
    // Produce a string from holder[key].
    var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.
    switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);

        case 'object':
            if (!value) return 'null';
            gap += indent;
            partial = [];

            // Array.isArray
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                // Join all of the elements together, separated with commas, and
                // wrap them in brackets.
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            // If the replacer is an array, use it to select the members to be
            // stringified.
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            else {
                // Otherwise, iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? '{}' : gap ?
            '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
            '{' + partial.join(',') + '}';
        gap = mind;
        return v;
    }
}

module.exports = function (value, replacer, space) {
    var i;
    gap = '';
    indent = '';

    // If the space parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    }
    // If the space parameter is a string, it will be used as the indent string.
    else if (typeof space === 'string') {
        indent = space;
    }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== 'function'
    && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', {'': value});
};

},{}]},{},[1])(1)
});
;
