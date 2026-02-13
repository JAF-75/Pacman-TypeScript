define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FruitSession = void 0;
    var FruitSession = /** @class */ (function () {
        function FruitSession(fruitItem, points) {
            this.fruitItem = fruitItem;
            this.points = points;
            this._toShowAt = 70;
            this._counter = 0;
        }
        Object.defineProperty(FruitSession.prototype, "nextPillToShowAt", {
            get: function () {
                return this._toShowAt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FruitSession.prototype, "shouldShow", {
            get: function () {
                return this._shouldShow;
            },
            enumerable: false,
            configurable: true
        });
        FruitSession.prototype.pillEaten = function () {
            if (++this._counter === this._toShowAt) {
                this._shouldShow = true;
                if (this._toShowAt === 70) {
                    this._toShowAt = 170;
                }
                else {
                    this._toShowAt = -1;
                }
            }
            else {
                this._shouldShow = false;
            }
        };
        FruitSession.prototype.fruitEaten = function () {
            this._shouldShow = false;
        };
        return FruitSession;
    }());
    exports.FruitSession = FruitSession;
});
//# sourceMappingURL=FruitSession.js.map