define(["require", "exports", "../Core/_exports", "./MainWindow"], function (require, exports, _exports_1, MainWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScorePanel = void 0;
    var ScorePanel = /** @class */ (function () {
        function ScorePanel(_canvas) {
            var _this = this;
            this._canvas = _canvas;
            this._scorePos2Up = new _exports_1.Point(206, 8);
            this._scorePos1Up = new _exports_1.Point(62, 8);
            this._highScorePos = new _exports_1.Point(140, 8);
            this._highScoreTextPos = new _exports_1.Point(72, 0);
            this._playerOneTextPos = new _exports_1.Point(30, 0);
            this._playerTwoTextPos = new _exports_1.Point(180, 0);
            this._tickTock = true;
            this._timer = new _exports_1.LoopingTimer(250, function () { return _this._tickTock = !_this._tickTock; });
        }
        ScorePanel.prototype.update = function (context) {
            this._timer.run(context.elapsed);
        };
        ScorePanel.prototype.draw = function () {
            this.drawPlayerOneScore();
            this.drawPlayerTwoScore();
            this.drawHighScore();
        };
        ScorePanel.prototype.drawHighScore = function () {
            this._canvas.drawText("HIGH SCORE", "white", this._highScoreTextPos);
            this.drawRightAlignedScoreText(MainWindow_1.MainWindow.gameStats.highScore, this._highScorePos);
        };
        ScorePanel.prototype.drawPlayerOneScore = function () {
            this.drawPlayerText(0, "1UP", this._playerOneTextPos);
            var score = 0;
            if (MainWindow_1.MainWindow.gameStats.hasPlayerStats(0)) {
                score = MainWindow_1.MainWindow.gameStats.getPlayerStats(0).score;
            }
            ;
            this.drawRightAlignedScoreText(score, this._scorePos1Up);
        };
        ScorePanel.prototype.drawRightAlignedScoreText = function (score, pos) {
            var scoreText = score.toString();
            if (scoreText === "0") {
                scoreText = "00";
            }
            var length = new _exports_1.Point(scoreText.length * 8, 0);
            var left = pos.minus(length);
            this._canvas.drawText(scoreText, "white", left);
        };
        ScorePanel.prototype.drawPlayerTwoScore = function () {
            if (MainWindow_1.MainWindow.gameStats.amountOfPlayers > 1) {
                this.drawPlayerText(1, "2UP", this._playerTwoTextPos);
                var score = 0;
                if (MainWindow_1.MainWindow.gameStats.hasPlayerStats(1)) {
                    score = MainWindow_1.MainWindow.gameStats.getPlayerStats(1).score;
                }
                ;
                this.drawRightAlignedScoreText(score, this._scorePos2Up);
            }
        };
        ScorePanel.prototype.drawPlayerText = function (playerIndex, text, pos) {
            var shouldFlash = MainWindow_1.MainWindow.gameStats.anyonePlaying && MainWindow_1.MainWindow.gameStats.currentPlayerStats.playerIndex === playerIndex;
            var shouldDraw = !shouldFlash || this._tickTock;
            if (shouldDraw) {
                this._canvas.drawText(text, "white", pos);
            }
        };
        return ScorePanel;
    }());
    exports.ScorePanel = ScorePanel;
});
//# sourceMappingURL=ScorePanel.js.map