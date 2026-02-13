define(["require", "exports", "./LoopingTimer"], function (require, exports, LoopingTimer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TwoFrameAnimation = void 0;
    var TwoFrameAnimation = /** @class */ (function () {
        function TwoFrameAnimation(switchEveryMs) {
            var _this = this;
            this.timer = new LoopingTimer_1.LoopingTimer(switchEveryMs, function () { return _this.flag = !_this.flag; });
        }
        TwoFrameAnimation.prototype.run = function (context) {
            this.timer.run(context.elapsed);
        };
        return TwoFrameAnimation;
    }());
    exports.TwoFrameAnimation = TwoFrameAnimation;
});
//# sourceMappingURL=TwoFrameAnimation.js.map