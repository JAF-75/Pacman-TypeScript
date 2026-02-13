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
define(["require", "exports", "../Game/_exports", "../Core/_exports", "../Engine", "./Act", "./ActUpdateResult", "./PlayerIntroAct"], function (require, exports, _exports_1, _exports_2, Engine_1, Act_1, ActUpdateResult_1, PlayerIntroAct_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameAct = void 0;
    /**
     * The main 'Game' act.  Draws everything (maze, ghosts, pacman), and updates
     * everything (keyboard, sound etc.)
     * Transitions to the 'player intro' act
     */
    var GameAct = /** @class */ (function (_super) {
        __extends(GameAct, _super);
        function GameAct() {
            var _this = _super.call(this) || this;
            _this._gameSounds = Engine_1.Engine.gameSounds;
            Engine_1.Engine.resetPnrg();
            return _this;
        }
        GameAct.prototype.update = function (gameContext) {
            // play sounds first, as if we play them last, that state of the game
            // might've updated and the 'current act' might've changed
            // so we don't want to be playing our sounds if
            // another act is queued up.
            this._gameSounds.update();
            _exports_1.MainWindow.gameStats.update(gameContext);
            if (_exports_2.GameContext.keyboard.isKeyDown(_exports_2.Keyboard.p)) {
                return ActUpdateResult_1.ActUpdateResult.Running;
            }
            _exports_1.MainWindow.actors.maze.update(gameContext);
            _exports_1.MainWindow.actors.pacMan.update(gameContext);
            _exports_1.MainWindow.actors.fruit.update(gameContext);
            _exports_1.MainWindow.actors.ghosts.forEach(function (g) { return g.update(gameContext); });
            return ActUpdateResult_1.ActUpdateResult.Running;
        };
        GameAct.prototype.draw = function (canvas) {
            canvas.underlyingCanvas.fillStyle = "black";
            canvas.underlyingCanvas.fillRect(0, 0, canvas.underlyingCanvas.canvas.width, canvas.underlyingCanvas.canvas.height);
            _exports_1.MainWindow.actors.maze.draw(canvas);
            _exports_1.MainWindow.actors.pacMan.draw(canvas);
            _exports_1.MainWindow.actors.fruit.draw(canvas);
            _exports_1.MainWindow.actors.ghosts.forEach(function (g) { return g.draw(canvas); });
        };
        Object.defineProperty(GameAct.prototype, "nextAct", {
            get: function () {
                return new PlayerIntroAct_1.PlayerIntroAct(true);
            },
            enumerable: false,
            configurable: true
        });
        return GameAct;
    }(Act_1.Act));
    exports.GameAct = GameAct;
});
//# sourceMappingURL=GameAct.js.map