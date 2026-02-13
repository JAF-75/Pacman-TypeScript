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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./GameAct", "./DemoAct", "./Act", "./ActUpdateResult", "../Engine", "./TextPoints"], function (require, exports, _exports_1, _exports_2, GameAct_1, DemoAct_1, Act_1, ActUpdateResult_1, Engine_1, TextPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerIntroAct = void 0;
    /**
     * Introduces the current player, shows player X and ready for 3 seconds, then ghosts and ready for 3 seconds.
     * Transitions to either the 'demo act' (if in demo mode), otherwise the 'game act'
     */
    var PlayerIntroAct = /** @class */ (function (_super) {
        __extends(PlayerIntroAct, _super);
        function PlayerIntroAct(_shouldDecreasePacLives, _isDemoMode) {
            if (_isDemoMode === void 0) { _isDemoMode = false; }
            var _this = _super.call(this) || this;
            _this._shouldDecreasePacLives = _shouldDecreasePacLives;
            _this._isDemoMode = _isDemoMode;
            _this._progress = 0;
            _exports_2.MainWindow.actors.fruit.reset();
            _exports_2.MainWindow.actors.pacMan.reset(_this._isDemoMode);
            _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.reset(); });
            _this._progress = 0;
            var timeToShowPlayerNumberAndHideGhosts = _isDemoMode ? 0 : 2000;
            if (!_exports_2.MainWindow.gameStats.hasPlayedIntroTune) {
                _exports_2.MainWindow.gameStats.playerIntroTune();
                Engine_1.Engine.gameSounds.playerStart();
            }
            _this._currentTimer = new _exports_1.LoopingTimer(timeToShowPlayerNumberAndHideGhosts, function () {
                _this._progress += 1;
                if (_this._shouldDecreasePacLives) {
                    _exports_2.MainWindow.gameStats.currentPlayerStats.decreaseLives();
                }
                _this._currentTimer = new _exports_1.LoopingTimer(2000, function () {
                    _this._finished = true;
                });
            });
            return _this;
        }
        PlayerIntroAct.prototype.update = function (context) {
            this._currentTimer.run(context.elapsed);
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        PlayerIntroAct.prototype.draw = function (canvas) {
            _exports_2.MainWindow.actors.maze.draw(canvas);
            if (this._isDemoMode) {
                canvas.drawText("GAME OVER", "red", TextPoints_1.TextPoints.gameOverPoint);
            }
            else {
                this.drawPlayerAndReadyText(canvas);
            }
            if (this._progress === 1) {
                _exports_2.MainWindow.actors.pacMan.draw(canvas);
                _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.draw(canvas); });
            }
        };
        PlayerIntroAct.prototype.drawPlayerAndReadyText = function (canvas) {
            var text;
            if (this._progress === 0) {
                if (_exports_2.MainWindow.gameStats.currentPlayerStats.playerIndex === 0) {
                    text = "PLAYER ONE";
                }
                else {
                    text = "PLAYER TWO";
                }
                canvas.drawText(text, "cyan", TextPoints_1.TextPoints.playerTextPoint);
            }
            canvas.drawText("READY!", "yellow", TextPoints_1.TextPoints.readyPoint);
        };
        Object.defineProperty(PlayerIntroAct.prototype, "nextAct", {
            get: function () {
                return this._isDemoMode ? new DemoAct_1.DemoAct() : new GameAct_1.GameAct();
            },
            enumerable: false,
            configurable: true
        });
        return PlayerIntroAct;
    }(Act_1.Act));
    exports.PlayerIntroAct = PlayerIntroAct;
});
//# sourceMappingURL=PlayerIntroAct.js.map