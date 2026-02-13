define(["require", "exports", "./MathHelper", "./Vector2D", "./Rect"], function (require, exports, MathHelper_1, Vector2D_1, Rect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Point = void 0;
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.toVector2D = function () {
            return new Vector2D_1.Vector2D(this.x, this.y);
        };
        Point.prototype.round = function () {
            return new Point(Math.round(this.x), Math.round(this.y));
        };
        Point.prototype.floor = function () {
            return new Point(Math.floor(this.x), Math.floor(this.y));
        };
        Point.prototype.add = function (other) {
            return new Point(this.x + other.x, this.y + other.y);
        };
        Point.prototype.minus = function (other) {
            return new Point(this.x - other.x, this.y - other.y);
        };
        Point.prototype.divide = function (amount) {
            return new Point(this.x / amount, this.y / amount);
        };
        Point.prototype.multiply = function (amount) {
            return new Point(this.x * amount, this.y * amount);
        };
        Point.prototype.toString = function () {
            return "".concat(Math.floor(this.x), ", ").concat(Math.floor(this.y));
        };
        Point.prototype.equals = function (other) {
            return this.x === other.x && this.y === other.y;
        };
        Point.areNear = function (first, second, range) {
            var r1 = new Rect_1.Rect(first, Vector2D_1.Vector2D.one);
            r1 = r1.expand(range);
            var r2 = new Rect_1.Rect(second, Vector2D_1.Vector2D.one);
            r2 = r2.expand(range);
            return Rect_1.Rect.intersects(r1, r2);
        };
        Point.distanceBetween = function (p1, p2) {
            var a = p1.x - p2.x;
            var b = p1.y - p2.y;
            return Math.sqrt(a * a + b * b);
        };
        Point.zero = new Point(0, 0);
        Point.one = new Point(1, 1);
        Point.four = new Point(4, 4);
        Point.eight = new Point(8, 8);
        Point.sixteen = new Point(16, 16);
        Point.lerp = function (value1, value2, amount) {
            return new Point(MathHelper_1.MathHelper.lerp(value1.x, value2.x, amount), MathHelper_1.MathHelper.lerp(value1.y, value2.y, amount));
        };
        return Point;
    }());
    exports.Point = Point;
});
//# sourceMappingURL=Point.js.map