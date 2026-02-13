define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimedSpriteList = void 0;
    var TimedSpriteList = /** @class */ (function () {
        function TimedSpriteList() {
            this.sprites = [];
        }
        TimedSpriteList.prototype.add = function (sprite) {
            this.sprites.push(sprite);
        };
        TimedSpriteList.prototype.update = function (context) {
            this.sprites.forEach(function (s) { return s.update(context); });
            for (var i = this.sprites.length - 1; i >= 0; i--) {
                if (this.sprites[i].expired) {
                    this.sprites.splice(i, 1);
                    break;
                }
            }
        };
        TimedSpriteList.prototype.draw = function (canvas) {
            this.sprites.forEach(function (s) { return s.draw(canvas); });
        };
        return TimedSpriteList;
    }());
    exports.TimedSpriteList = TimedSpriteList;
});
//# sourceMappingURL=TimedSpriteList.js.map