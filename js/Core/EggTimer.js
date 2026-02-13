define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EggTimer = void 0;
    var EggTimer = /** @class */ (function () {
        function EggTimer(duration, whenFinished) {
            this._duration = duration;
            this._currentTime = duration;
            this.whenFinished = whenFinished;
        }
        EggTimer.prototype.reset = function () {
            this._currentTime = this._duration;
        };
        Object.defineProperty(EggTimer.prototype, "progress", {
            get: function () {
                var msGone = this._duration - this._currentTime;
                var pc = msGone * 100 / this._duration;
                return pc;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EggTimer.prototype, "finished", {
            get: function () {
                return this._isFinished;
            },
            enumerable: false,
            configurable: true
        });
        EggTimer.prototype.run = function (elapsed) {
            if (this._isFinished) {
                return;
            }
            if (this._isPaused) {
                return;
            }
            this._currentTime -= elapsed;
            if (this._currentTime < 0) {
                this._isFinished = true;
                this.whenFinished();
            }
        };
        EggTimer.prototype.pause = function () {
            this._isPaused = true;
        };
        EggTimer.prototype.resume = function () {
            this._isPaused = false;
        };
        return EggTimer;
    }());
    exports.EggTimer = EggTimer;
});
//# sourceMappingURL=EggTimer.js.map