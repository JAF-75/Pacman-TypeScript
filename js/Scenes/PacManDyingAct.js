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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "../Engine", "./AttractAct", "./Act", "./ActUpdateResult", "./GameOverAct", "./PlayerIntroAct", "./PlayerGameOverAct", "../GameStorage"], function (require, exports, _exports_1, _exports_2, Engine_1, AttractAct_1, Act_1, ActUpdateResult_1, GameOverAct_1, PlayerIntroAct_1, PlayerGameOverAct_1, GameStorage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PacManDyingAct = void 0;
    /**
     * An act that shows Pacman dying.  Transitions to either: the 'attract act' (if in demo mode), the 'game over act' if all players are dead,
     * or the 'attract act' for the next player that's alive.
     */
    var PacManDyingAct = /** @class */ (function (_super) {
        __extends(PacManDyingAct, _super);
        function PacManDyingAct() {
            var _this = _super.call(this) || this;
            Engine_1.Engine.gameSounds.reset();
            _this._step = 0;
            _exports_2.MainWindow.actors.pacMan.startDigesting();
            _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.stopMoving(); });
            _this._timer = new _exports_1.LoopingTimer(2000, function () {
                _this._step += 1;
                Engine_1.Engine.gameSounds.pacManDying();
                _exports_2.MainWindow.actors.pacMan.startDying();
                _this._timer = new _exports_1.LoopingTimer(2000, function () {
                    _this._step += 1;
                    _this._finished = true;
                });
            });
            return _this;
        }
        PacManDyingAct.prototype.update = function (context) {
            this._timer.run(context.elapsed);
            _exports_2.MainWindow.actors.pacMan.update(context);
            _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.update(context); });
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        Object.defineProperty(PacManDyingAct.prototype, "nextAct", {
            get: function () {
                var gameStats = _exports_2.MainWindow.gameStats;
                if (gameStats.isDemo) {
                    return new AttractAct_1.AttractAct();
                }
                var allPlayersDead = gameStats.isGameOver;
                var currentPlayerStats = gameStats.currentPlayerStats;
                if (gameStats.highScore > GameStorage_1.GameStorage.highScore) {
                    GameStorage_1.GameStorage.highScore = gameStats.highScore;
                }
                gameStats.choseNextPlayer();
                // just the current player is dead
                if (!allPlayersDead && currentPlayerStats.livesRemaining === 0) {
                    return new PlayerGameOverAct_1.PlayerGameOverAct(currentPlayerStats.playerIndex, new PlayerIntroAct_1.PlayerIntroAct(true));
                }
                return allPlayersDead ? new GameOverAct_1.GameOverAct() : new PlayerIntroAct_1.PlayerIntroAct(true);
            },
            enumerable: false,
            configurable: true
        });
        PacManDyingAct.prototype.draw = function (canvas) {
            _exports_2.MainWindow.actors.maze.draw(canvas);
            _exports_2.MainWindow.actors.pacMan.draw(canvas);
            if (this._step === 0) {
                _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.draw(canvas); });
            }
        };
        return PacManDyingAct;
    }(Act_1.Act));
    exports.PacManDyingAct = PacManDyingAct;
});
//# sourceMappingURL=PacManDyingAct.js.map