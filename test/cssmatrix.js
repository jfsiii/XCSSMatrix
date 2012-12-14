var XCSSMatrix = require('..');
var test       = require('tap').test;

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
