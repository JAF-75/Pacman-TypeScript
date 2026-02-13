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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./TornGhostChaseAct", "./GhostTearAct", "../Game/IntroCutScene", "../Engine", "./Act", "./ActUpdateResult", "./PlayerIntroAct", "./BigPacChaseAct"], function (require, exports, _exports_1, _exports_2, TornGhostChaseAct_1, GhostTearAct_1, IntroCutScene_1, Engine_1, Act_1, ActUpdateResult_1, PlayerIntroAct_1, BigPacChaseAct_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelFinishedAct = void 0;
    /**
     * When the level is finished, the screen flashes white and blue.
     * Transitions into either the cut-scene act if a 'cut-scene' is due, or the 'player intro' act.
     * *
     */
    var LevelFinishedAct = /** @class */ (function (_super) {
        __extends(LevelFinishedAct, _super);
        function LevelFinishedAct() {
            var _this = _super.call(this) || this;
            _this._step = 0;
            Engine_1.Engine.gameSounds.reset();
            _exports_2.MainWindow.actors.pacMan.startDigesting();
            _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.stopMoving(); });
            _this._timer = new _exports_1.LoopingTimer(2000, function () {
                _this._step += 1;
                _exports_2.MainWindow.actors.maze.startFlashing();
                _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.visible = false; });
                _this._timer = new _exports_1.LoopingTimer(2000, function () {
                    _this._step += 1;
                    _exports_2.MainWindow.actors.maze.stopFlashing();
                    _exports_2.MainWindow.actors.maze.reset();
                    _exports_2.MainWindow.gameStats.levelFinished();
                    _this._finished = true;
                });
            });
            return _this;
        }
        LevelFinishedAct.prototype.update = function (context) {
            this._timer.run(context.elapsed);
            _exports_2.MainWindow.actors.maze.update(context);
            _exports_2.MainWindow.actors.pacMan.update(context);
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        Object.defineProperty(LevelFinishedAct.prototype, "nextAct", {
            get: function () {
                var cutScene = _exports_2.MainWindow.gameStats.currentPlayerStats.levelStats.levelProps.introCutScene;
                var playerIntroAct = new PlayerIntroAct_1.PlayerIntroAct(false);
                if (cutScene === IntroCutScene_1.IntroCutScene.None) {
                    return playerIntroAct;
                }
                if (cutScene === IntroCutScene_1.IntroCutScene.BigPac) {
                    return new BigPacChaseAct_1.BigPacChaseAct(playerIntroAct);
                }
                if (cutScene === IntroCutScene_1.IntroCutScene.GhostSnagged) {
                    return new GhostTearAct_1.GhostTearAct(playerIntroAct);
                }
                if (cutScene === IntroCutScene_1.IntroCutScene.TornGhostAndWorm) {
                    return new TornGhostChaseAct_1.TornGhostChaseAct(playerIntroAct);
                }
                throw new Error("Don't know how to handle cut scene of ".concat(cutScene));
            },
            enumerable: false,
            configurable: true
        });
        LevelFinishedAct.prototype.draw = function (canvas) {
            _exports_2.MainWindow.actors.maze.draw(canvas);
            _exports_2.MainWindow.actors.pacMan.draw(canvas);
            if (this._step === 0) {
                _exports_2.MainWindow.actors.ghosts.forEach(function (g) { return g.draw(canvas); });
            }
        };
        return LevelFinishedAct;
    }(Act_1.Act));
    exports.LevelFinishedAct = LevelFinishedAct;
});
//# sourceMappingURL=LevelFinishedAct.js.map