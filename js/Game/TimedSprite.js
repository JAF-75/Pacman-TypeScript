define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimedSprite = void 0;
    var TimedSprite = /** @class */ (function () {
        function TimedSprite(ttl, sprite) {
            this.ttl = ttl;
            this.sprite = sprite;
        }
        TimedSprite.prototype.update = function (context) {
            this.ttl -= context.elapsed;
        };
        Object.defineProperty(TimedSprite.prototype, "expired", {
            get: function () {
                return this.ttl < 0;
            },
            enumerable: false,
            configurable: true
        });
        TimedSprite.prototype.draw = function (canvas) {
            this.sprite.draw(canvas);
        };
        return TimedSprite;
    }());
    exports.TimedSprite = TimedSprite;
});
//# sourceMappingURL=TimedSprite.js.map