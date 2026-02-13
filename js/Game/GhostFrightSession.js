define(["require", "exports", "../Core/_exports"], function (require, exports, _exports_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostFrightSession = void 0;
    var GhostFrightSession = /** @class */ (function () {
        function GhostFrightSession(levelProps) {
            var _this = this;
            this.eachFlashDurationMs = 166;
            this._amountOfGhostsEaten = 0;
            this._timeLeft = levelProps.frightGhostTime * 1000;
            this._flashesLeft = levelProps.frightGhostFlashes;
            this._timeLeftToStartFlashing = this._timeLeft - (this._flashesLeft * this.eachFlashDurationMs);
            this._timer = new _exports_1.LoopingTimer(this.eachFlashDurationMs, function () { return _this._tickTock = !_this._tickTock; });
        }
        GhostFrightSession.prototype.update = function (context) {
            this._timer.run(context.elapsed);
            this._timeLeft -= context.elapsed;
            this._timeLeftToStartFlashing -= context.elapsed;
        };
        Object.defineProperty(GhostFrightSession.prototype, "ghostsEaten", {
            get: function () {
                return this._amountOfGhostsEaten;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GhostFrightSession.prototype, "isWhite", {
            get: function () {
                return this._timeLeftToStartFlashing <= 0 && this._tickTock;
            },
            enumerable: false,
            configurable: true
        });
        GhostFrightSession.prototype.ghostEaten = function () {
            ++this._amountOfGhostsEaten;
            return Math.pow(2, this._amountOfGhostsEaten) * 100;
        };
        Object.defineProperty(GhostFrightSession.prototype, "isFinished", {
            get: function () {
                return this._timeLeft <= 0;
            },
            enumerable: false,
            configurable: true
        });
        return GhostFrightSession;
    }());
    exports.GhostFrightSession = GhostFrightSession;
});
//# sourceMappingURL=GhostFrightSession.js.map