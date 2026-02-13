var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./StartButtonAct", "../Engine", "./AttractAct", "./Act", "./ActUpdateResult", "./TextPoints"], function (require, exports, _exports_1, _exports_2, StartButtonAct_1, Engine_1, AttractAct_1, Act_1, ActUpdateResult_1, TextPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameOverAct = void 0;
    var GameOverAct = /** @class */ (function (_super) {
        __extends(GameOverAct, _super);
        function GameOverAct() {
            var _this = _super.call(this) || this;
            _this._progress = 0;
            _this._progress = 0;
            _this._currentTimer = new _exports_1.LoopingTimer(2000, function () {
                _this._progress += 1;
                _this._currentTimer = new _exports_1.LoopingTimer(2000, function () {
                    _this._finished = true;
                });
            });
            return _this;
        }
        GameOverAct.prototype.update = function (context) {
            this._currentTimer.run(context.elapsed);
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        GameOverAct.prototype.draw = function (canvas) {
            _exports_2.MainWindow.actors.maze.draw(canvas);
            canvas.drawText("GAME OVER", "red", TextPoints_1.TextPoints.gameOverPoint);
        };
        Object.defineProperty(GameOverAct.prototype, "nextAct", {
            get: function () {
                if (Engine_1.Engine.credits === 0) {
                    return new AttractAct_1.AttractAct();
                }
                return new StartButtonAct_1.StartButtonAct();
            },
            enumerable: false,
            configurable: true
        });
        return GameOverAct;
    }(Act_1.Act));
    exports.GameOverAct = GameOverAct;
});
//# sourceMappingURL=GameOverAct.js.map