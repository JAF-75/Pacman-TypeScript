define(["require", "exports", "../Core/_exports", "./PacMan", "../Engine", "./Fruit", "./MainWindow"], function (require, exports, _exports_1, PacMan_1, Engine_1, Fruit_1, MainWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusPanel = void 0;
    var StatusPanel = /** @class */ (function () {
        function StatusPanel(_canvas) {
            var _this = this;
            this._canvas = _canvas;
            this._creditTextPoint = new _exports_1.Point(10, 30);
            this._tickTock = true;
            this._timer = new _exports_1.LoopingTimer(250, function () { return _this._tickTock = !_this._tickTock; });
            this._spriteSheet = document.getElementById("spritesheet");
            this._fruit = new Fruit_1.SimpleFruit();
        }
        StatusPanel.prototype.update = function (context) {
            this._timer.run(context.elapsed);
        };
        StatusPanel.prototype.draw = function () {
            if (MainWindow_1.MainWindow.gameStats.anyonePlaying) {
                this.drawPlayerLives();
                this.drawFruit();
            }
            else {
                this.drawCredits();
            }
        };
        StatusPanel.prototype.drawPlayerLives = function () {
            var x = 0;
            var xpos = new _exports_1.Point(x, 0);
            for (var i = 0; i < MainWindow_1.MainWindow.gameStats.currentPlayerStats.livesRemaining; i++, x += 16) {
                this._canvas.draw(xpos, _exports_1.Point.zero, _exports_1.Point.sixteen, PacMan_1.PacMan.facingLeftSpritesheetPos, this._spriteSheet);
            }
        };
        StatusPanel.prototype.drawCredits = function () {
            this._canvas.drawText("CREDIT ".concat(Engine_1.Engine.credits), "white", this._creditTextPoint);
        };
        StatusPanel.prototype.drawPlayerText = function (playerIndex, text, pos) {
            var shouldFlash = MainWindow_1.MainWindow.gameStats.currentPlayerStats.playerIndex === playerIndex;
            var shouldDraw = !shouldFlash || this._tickTock;
            if (shouldDraw) {
                this._canvas.drawText(text, "white", pos);
            }
        };
        // drawSprite max 7 fruit from max level 21
        StatusPanel.prototype.drawFruit = function () {
            var highestLevel = Math.min(20, MainWindow_1.MainWindow.gameStats.currentPlayerStats.levelStats.levelNumber);
            var lowestLevel = Math.max(0, highestLevel - 6);
            var x = 204;
            // starting from the right
            for (var i = lowestLevel; i <= highestLevel; i++, x -= 16) {
                var item = MainWindow_1.MainWindow.gameStats.currentPlayerStats.levelStats.getLevelProps(i).fruit;
                this._fruit.setFruitItem(item);
                this._fruit.position = new _exports_1.Point(x, 10);
                this._canvas.drawSprite(this._fruit);
            }
        };
        return StatusPanel;
    }());
    exports.StatusPanel = StatusPanel;
});
//# sourceMappingURL=StatusPanel.js.map