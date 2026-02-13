define(["require", "exports", "./MathHelper", "./Point"], function (require, exports, MathHelper_1, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector2D = void 0;
    var Vector2D = /** @class */ (function () {
        function Vector2D(x, y) {
            var _this = this;
            this.x = x;
            this.y = y;
            this.length = function () {
                return Math.sqrt((_this.x * _this.x) + (_this.y * _this.y));
            };
            this.lengthSquared = function () {
                return (_this.x * _this.x) + (_this.y * _this.y);
            };
            this.normalize = function () {
                var val = 1.0 / Math.sqrt((_this.x * _this.x) + (_this.y * _this.y));
                _this.x *= val;
                _this.y *= val;
            };
        }
        Vector2D.prototype.toPoint = function () {
            return new Point_1.Point(this.x, this.y);
        };
        Vector2D.prototype.copy = function () {
            return new Vector2D(this.x, this.y);
        };
        Vector2D.prototype.add = function (other) {
            return new Vector2D(this.x + other.x, this.y + other.y);
        };
        Vector2D.prototype.minus = function (other) {
            return new Vector2D(this.x - other.x, this.y - other.y);
        };
        Vector2D.prototype.divide = function (amount) {
            return new Vector2D(this.x / amount, this.y / amount);
        };
        Vector2D.prototype.multiply = function (amount) {
            return new Vector2D(this.x * amount, this.y * amount);
        };
        Vector2D.prototype.toString = function () {
            return "".concat(Math.floor(this.x), ", ").concat(Math.floor(this.y));
        };
        Vector2D.prototype.equals = function (other) {
            return this.x === other.x && this.y === other.y;
        };
        Vector2D.prototype.floor = function () {
            return new Vector2D(Math.floor(this.x), Math.floor(this.y));
        };
        Vector2D.prototype.round = function () {
            return new Vector2D(Math.round(this.x), Math.round(this.y));
        };
        Vector2D.distanceBetween = function (cell1, cell2) {
            var a = cell1.x - cell2.x;
            var b = cell1.y - cell2.y;
            return Math.sqrt(a * a + b * b);
        };
        Vector2D.half = new Vector2D(.5, .5);
        Vector2D.zero = new Vector2D(0, 0);
        Vector2D.one = new Vector2D(1, 1);
        Vector2D.two = new Vector2D(2, 2);
        Vector2D.four = new Vector2D(4, 4);
        Vector2D.eight = new Vector2D(8, 8);
        Vector2D.sixteen = new Vector2D(16, 16);
        Vector2D.unitX = new Vector2D(1, 0);
        Vector2D.unitY = new Vector2D(0, 1);
        Vector2D.barycentric = function (value1, value2, value3, amount1, amount2) {
            return new Vector2D(MathHelper_1.MathHelper.barycentric(value1.x, value2.x, value3.x, amount1, amount2), MathHelper_1.MathHelper.barycentric(value1.y, value2.y, value3.y, amount1, amount2));
        };
        Vector2D.clamp = function (value1, min, max) {
            return new Vector2D(MathHelper_1.MathHelper.clamp(value1.x, min.x, max.x), MathHelper_1.MathHelper.clamp(value1.y, min.y, max.y));
        };
        Vector2D.distance = function (value1, value2) {
            var v1 = value1.x - value2.x;
            var v2 = value1.y - value2.y;
            return Math.sqrt((v1 * v1) + (v2 * v2));
        };
        Vector2D.distanceSquared = function (value1, value2) {
            var v1 = value1.x - value2.x;
            var v2 = value1.y - value2.y;
            return (v1 * v1) + (v2 * v2);
        };
        Vector2D.divide = function (value1, divider) {
            var factor = 1 / divider;
            value1.x *= factor;
            value1.y *= factor;
            return value1;
        };
        Vector2D.max = function (value1, value2) {
            return new Vector2D(value1.x > value2.x ? value1.x : value2.x, value1.y > value2.y ? value1.y : value2.y);
        };
        Vector2D.min = function (value1, value2) {
            return new Vector2D(value1.x < value2.x ? value1.x : value2.x, value1.y < value2.y ? value1.y : value2.y);
        };
        Vector2D.negate = function (value) {
            value.x = -value.x;
            value.y = -value.y;
            return value;
        };
        Vector2D.centerOf = function (first, second) {
            return first.add(second.minus(first).divide(2));
        };
        Vector2D.normalize = function (value) {
            var val = 1.0 / Math.sqrt((value.x * value.x) + (value.y * value.y));
            value.x *= val;
            value.y *= val;
            return value;
        };
        Vector2D.smoothStep = function (value1, value2, amount) {
            return new Vector2D(MathHelper_1.MathHelper.smoothStep(value1.x, value2.x, amount), MathHelper_1.MathHelper.smoothStep(value1.y, value2.y, amount));
        };
        return Vector2D;
    }());
    exports.Vector2D = Vector2D;
});
//# sourceMappingURL=Vector2D.js.map