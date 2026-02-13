define(["require", "exports", "../Engine", "../Core/_exports", "../Scenes/_exports", "./TimedSprite", "./TimedSpriteList", "./ScoreSprite", "./GameStats", "./StatusPanel", "./ScorePanel", "./Actors"], function (require, exports, Engine_1, _exports_1, _exports_2, TimedSprite_1, TimedSpriteList_1, ScoreSprite_1, GameStats_1, StatusPanel_1, ScorePanel_1, Actors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainWindow = void 0;
    var MainWindow = /** @class */ (function () {
        function MainWindow() {
            MainWindow.actors = new Actors_1.Actors();
            MainWindow.gameStats = new GameStats_1.GameStats();
            MainWindow.tempSprites = new TimedSpriteList_1.TimedSpriteList();
            MainWindow.pauser = new _exports_1.EggTimer(0, function () { });
            this._gameContext = new _exports_1.GameContext();
            var canvasElement = document.getElementById("gameContainer");
            this._canvasContext = canvasElement.getContext("2d");
            this._canvasSize = new _exports_1.Vector2D(this._canvasContext.canvas.width, this._canvasContext.canvas.height);
            this._gameCanvas = new _exports_1.Canvas(new _exports_1.Point(0, 26), this._canvasContext);
            this._scoreCanvas = new _exports_1.Canvas(_exports_1.Point.zero, this._canvasContext);
            this._statusCanvas = new _exports_1.Canvas(new _exports_1.Point(0, 274), this._canvasContext);
            this._scorePanel = new ScorePanel_1.ScorePanel(this._scoreCanvas);
            this._statusPanel = new StatusPanel_1.StatusPanel(this._statusCanvas);
            MainWindow.currentAct = new _exports_2.AttractAct();
            // POINTER: You can change the starting Act by using something like:
            //MainWindow.currentAct = new TornGhostChaseAct(new AttractAct());
        }
        MainWindow.newGame = function (players) {
            MainWindow.gameStats.reset(players);
            MainWindow.actors.maze.reset();
            MainWindow.gameStats.choseNextPlayer();
        };
        MainWindow.newDemoGame = function () {
            MainWindow.gameStats.resetForDemo();
            MainWindow.actors.maze.reset();
            MainWindow.gameStats.choseNextPlayer();
        };
        Object.defineProperty(MainWindow.prototype, "name", {
            get: function () {
                return "game";
            },
            enumerable: false,
            configurable: true
        });
        MainWindow.prototype.update = function (elapsed) {
            this._gameContext.elapsed = elapsed;
            this._gameContext.totalGameTime += elapsed;
            MainWindow.tempSprites.update(this._gameContext);
            MainWindow.pauser.run(elapsed);
            //cheat:
            if (_exports_1.GameContext.keyboard.wasKeyPressed(_exports_1.Keyboard.three)) {
                MainWindow.currentAct = new _exports_2.LevelFinishedAct();
            }
            //     MainWindow.gameStats.update(this.gameContext);
            if (MainWindow.pauser.finished) {
                var actResult = MainWindow.currentAct.update(this._gameContext);
                if (actResult === _exports_2.ActUpdateResult.Finished) {
                    MainWindow.currentAct = MainWindow.currentAct.nextAct;
                }
            }
            this._scorePanel.update(this._gameContext);
            this._statusPanel.update(this._gameContext);
            return _exports_1.SceneUpdateResult.Running;
        };
        MainWindow.prototype.draw = function () {
            this._canvasContext.fillStyle = "black";
            this._canvasContext.fillRect(0, 0, this._canvasSize.x, this._canvasSize.y);
            MainWindow.currentAct.draw(this._gameCanvas);
            MainWindow.tempSprites.draw(this._gameCanvas);
            this._scorePanel.draw();
            this._statusPanel.draw();
        };
        MainWindow.fruitEaten = function () {
            Engine_1.Engine.gameSounds.fruitEaten();
            MainWindow.gameStats.fruitEaten();
            var points = MainWindow.gameStats.currentPlayerStats.levelStats.levelProps.fruitPoints;
            MainWindow.tempSprites.add(new TimedSprite_1.TimedSprite(3000, new ScoreSprite_1.ScoreSprite(MainWindow.actors.fruit.position, points)));
        };
        MainWindow.pacManEaten = function () {
            MainWindow.gameStats.pacManEaten();
            MainWindow.currentAct = new _exports_2.PacManDyingAct();
        };
        MainWindow.ghostEaten = function (ghost) {
            Engine_1.Engine.gameSounds.ghostEaten();
            var points = MainWindow.gameStats.ghostEaten();
            this.tempSprites.add(new TimedSprite_1.TimedSprite(900, new ScoreSprite_1.ScoreSprite(MainWindow.actors.pacMan.position, points)));
            ghost.visible = false;
            MainWindow.actors.pacMan.visible = false;
            MainWindow.pauser = new _exports_1.EggTimer(1000, function () {
                ghost.visible = true;
                MainWindow.actors.pacMan.visible = true;
            });
        };
        MainWindow.pillEaten = function (cell) {
            MainWindow.gameStats.currentPlayerStats.levelStats.pillsEaten % 2 === 0
                ? Engine_1.Engine.gameSounds.munch1()
                : Engine_1.Engine.gameSounds.munch2();
            MainWindow.gameStats.pillEaten(cell);
            MainWindow.actors.pacMan.pillEaten();
            this.checkForNoMorePills();
        };
        MainWindow.powerPillEaten = function (cell) {
            Engine_1.Engine.gameSounds.powerPillEaten();
            MainWindow.gameStats.powerPillEaten(cell);
            MainWindow.actors.ghosts.forEach(function (g) {
                g.powerPillEaten(MainWindow.gameStats.currentPlayerStats.frightSession);
                //g.changeModeIfDifferent(GhostMovementMode.Frightened);
            });
            this.checkForNoMorePills();
        };
        MainWindow.checkForNoMorePills = function () {
            if (MainWindow.gameStats.currentPlayerStats.levelStats.pillsRemaining === 0) {
                // MainWindow.gameStats.levelFinished();
                //dont' call levelFinished - the act does that when it's finished
                MainWindow.currentAct = new _exports_2.LevelFinishedAct();
            }
        };
        return MainWindow;
    }());
    exports.MainWindow = MainWindow;
});
//# sourceMappingURL=MainWindow.js.map