define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoopingTimer = void 0;
    var LoopingTimer = /** @class */ (function () {
        function LoopingTimer(firesEvery, callback) {
            this.firesEvery = firesEvery;
            this.currentTime = firesEvery;
            this.callback = callback;
        }
        Object.defineProperty(LoopingTimer.prototype, "progress", {
            get: function () {
                var msGone = this.firesEvery - this.currentTime;
                var pc = msGone * 100 / this.firesEvery;
                return pc;
            },
            enumerable: false,
            configurable: true
        });
        LoopingTimer.prototype.run = function (elapsed) {
            this.currentTime -= elapsed;
            if (this.currentTime < 0) {
                this.currentTime += this.firesEvery;
                this.callback();
            }
        };
        return LoopingTimer;
    }());
    exports.LoopingTimer = LoopingTimer;
});
//# sourceMappingURL=LoopingTimer.js.map