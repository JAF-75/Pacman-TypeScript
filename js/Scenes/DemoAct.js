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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./AttractAct", "./StartButtonAct", "./Act", "./ActUpdateResult", "../Engine", "./TextPoints"], function (require, exports, _exports_1, _exports_2, AttractAct_1, StartButtonAct_1, Act_1, ActUpdateResult_1, Engine_1, TextPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DemoAct = void 0;
    /**
     * This is almost identical to the game act, except it transitions to the 'attract screen act'.
     */
    var DemoAct = /** @class */ (function (_super) {
        __extends(DemoAct, _super);
        function DemoAct() {
            var _this = _super.call(this) || this;
            _this._nextAct = new AttractAct_1.AttractAct();
            Engine_1.Engine.resetPnrg();
            return _this;
        }
        DemoAct.prototype.update = function (gameContext) {
            // PAC EATEN
            // show pac dying
            // get next player
            // show NORMAL STARTUP if lives left otherwise show game over for 5 seconds then back to attract screenl
            if (_exports_1.GameContext.keyboard.isKeyDown(_exports_1.Keyboard.five)) {
                Engine_1.Engine.coinInserted();
                this._nextAct = new StartButtonAct_1.StartButtonAct();
                Engine_1.Engine.gameSounds.unmuteAll();
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            _exports_2.MainWindow.gameStats.update(gameContext);
            _exports_2.MainWindow.actors.maze.update(gameContext);
            _exports_2.MainWindow.actors.pacMan.update(gameContext);
            _exports_2.MainWindow.actors.fruit.update(gameContext);
            _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.update(gameContext); });
            return ActUpdateResult_1.ActUpdateResult.Running;
        };
        DemoAct.prototype.draw = function (canvas) {
            canvas.underlyingCanvas.fillStyle = "black";
            canvas.underlyingCanvas.fillRect(0, 0, canvas.underlyingCanvas.canvas.width, canvas.underlyingCanvas.canvas.height);
            _exports_2.MainWindow.actors.maze.draw(canvas);
            _exports_2.MainWindow.actors.pacMan.draw(canvas);
            _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.draw(canvas); });
            canvas.drawText("GAME OVER", "red", TextPoints_1.TextPoints.gameOverPoint);
        };
        Object.defineProperty(DemoAct.prototype, "nextAct", {
            get: function () {
                return new AttractAct_1.AttractAct();
            },
            enumerable: false,
            configurable: true
        });
        return DemoAct;
    }(Act_1.Act));
    exports.DemoAct = DemoAct;
});
//# sourceMappingURL=DemoAct.js.map