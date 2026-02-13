define(["require", "exports", "./Point", "./Vector2D"], function (require, exports, Point_1, Vector2D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rect = void 0;
    var Rect = /** @class */ (function () {
        function Rect(topLeft, size) {
            this.topLeft = topLeft;
            this.size = size;
        }
        Object.defineProperty(Rect.prototype, "top", {
            get: function () {
                return this.topLeft.y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "left", {
            get: function () {
                return this.topLeft.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "right", {
            get: function () {
                return this.topLeft.x + this.size.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "bottom", {
            get: function () {
                return this.topLeft.y + this.size.y;
            },
            enumerable: false,
            configurable: true
        });
        Rect.prototype.expand = function (amount) {
            return new Rect(new Point_1.Point(this.topLeft.x - amount, this.topLeft.y - amount), this.size.add(new Vector2D_1.Vector2D(amount, amount)));
        };
        Rect.intersects = function (r1, r2) {
            return !(r2.left > r1.right ||
                r2.right < r1.left ||
                r2.top > r1.bottom ||
                r2.bottom < r1.top);
        };
        return Rect;
    }());
    exports.Rect = Rect;
});
//# sourceMappingURL=Rect.js.map