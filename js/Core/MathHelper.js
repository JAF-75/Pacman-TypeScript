define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MathHelper = void 0;
    var MathHelper = /** @class */ (function () {
        function MathHelper() {
        }
        MathHelper.E = Math.E;
        MathHelper.log10E = 0.4342945;
        MathHelper.log2E = 1.442695;
        MathHelper.pi = Math.PI;
        MathHelper.piOver2 = (Math.PI / 2.0);
        MathHelper.piOver4 = (Math.PI / 4.0);
        MathHelper.twoPi = (Math.PI * 2.0);
        MathHelper.barycentric = function (value1, value2, value3, amount1, amount2) {
            return value1 + (value2 - value1) * amount1 + (value3 - value1) * amount2;
        };
        MathHelper.catmullRom = function (value1, value2, value3, value4, amount) {
            // Using formula from http://www.mvps.org/directx/articles/catmull/
            // Internally using doubles not to lose precission
            var amountSquared = amount * amount;
            var amountCubed = amountSquared * amount;
            return (0.5 * (2.0 * value2 +
                (value3 - value1) * amount +
                (2.0 * value1 - 5.0 * value2 + 4.0 * value3 - value4) * amountSquared +
                (3.0 * value2 - value1 - 3.0 * value3 + value4) * amountCubed));
        };
        MathHelper.clamp = function (value, min, max) {
            // First we check to see if we're greater than the max
            value = (value > max) ? max : value;
            // Then we check to see if we're less than the min.
            value = (value < min) ? min : value;
            // There's no check to see if min > max.
            return value;
        };
        MathHelper.distance = function (value1, value2) {
            return Math.abs(value1 - value2);
        };
        MathHelper.hermite = function (value1, tangent1, value2, tangent2, amount) {
            // All transformed to double not to lose precission
            // Otherwise, for high numbers of param:amount the result is NaN instead of Infinity
            var v1 = value1;
            var v2 = value2;
            var t1 = tangent1;
            var t2 = tangent2;
            var s = amount;
            var result;
            var sCubed = s * s * s;
            var sSquared = s * s;
            if (amount === 0) {
                result = value1;
            }
            else if (amount === 1) {
                result = value2;
            }
            else {
                result = (2 * v1 - 2 * v2 + t2 + t1) * sCubed +
                    (3 * v2 - 3 * v1 - 2 * t1 - t2) * sSquared +
                    t1 * s +
                    v1;
            }
            return result;
        };
        MathHelper.lerp = function (value1, value2, amount) {
            return value1 + (value2 - value1) * amount;
        };
        MathHelper.max = function (value1, value2) {
            return Math.max(value1, value2);
        };
        MathHelper.min = function (value1, value2) {
            return Math.min(value1, value2);
        };
        MathHelper.smoothStep = function (value1, value2, amount) {
            // It is expected that 0 < amount < 1
            // If amount < 0, return value1
            // If amount > 1, return value2
            var result = MathHelper.clamp(amount, 0, 1);
            result = MathHelper.hermite(value1, 0, value2, 0, result);
            return result;
        };
        MathHelper.toDegrees = function (radians) {
            // This method uses double precission internally,
            // though it returns single float
            // Factor = 180 / pi
            return radians * 57.295779513082320876798154814105;
        };
        MathHelper.toRadians = function (degrees) {
            // This method uses double precission internally,
            // though it returns single float
            // Factor = pi / 180
            return degrees * 0.017453292519943295769236907684886;
        };
        return MathHelper;
    }());
    exports.MathHelper = MathHelper;
});
//# sourceMappingURL=MathHelper.js.map