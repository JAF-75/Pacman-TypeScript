define(["require", "exports", "./PlayerStats", "./DemoStats", "../GameStorage"], function (require, exports, PlayerStats_1, DemoStats_1, GameStorage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameStats = void 0;
    var GameStats = /** @class */ (function () {
        function GameStats() {
            this._highScore = 0;
            this._highScore = GameStorage_1.GameStorage.highScore;
            this.reset(0);
        }
        GameStats.prototype.reset = function (players) {
            this._isDemo = false;
            this._playedIntroTune = false;
            this._playerStats = [];
            for (var i = 0; i < players; i++) {
                this._playerStats.push(new PlayerStats_1.PlayerStats(i));
            }
            this._currentPlayerIndex = -1;
        };
        Object.defineProperty(GameStats.prototype, "isDemo", {
            get: function () {
                return this._isDemo;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameStats.prototype, "hasPlayedIntroTune", {
            get: function () {
                return this._playedIntroTune;
            },
            enumerable: false,
            configurable: true
        });
        GameStats.prototype.playerIntroTune = function () {
            this._playedIntroTune = true;
        };
        GameStats.prototype.resetForDemo = function () {
            this._isDemo = true;
            this._playerStats = [];
            var playerStats = new DemoStats_1.DemoStats();
            this._playerStats.push(playerStats);
            this._currentPlayerIndex = -1;
        };
        GameStats.prototype.update = function (context) {
            if (this.currentPlayerStats === undefined) {
                return;
            }
            this.currentPlayerStats.update(context);
        };
        GameStats.prototype.getPlayerStats = function (index) {
            return this._playerStats[index];
        };
        GameStats.prototype.fruitEaten = function () {
            this.currentPlayerStats.fruitEaten();
        };
        Object.defineProperty(GameStats.prototype, "highScore", {
            get: function () {
                return this._highScore;
            },
            enumerable: false,
            configurable: true
        });
        GameStats.prototype.hasPlayerStats = function (playerNumber) {
            return this._playerStats.length > playerNumber;
        };
        Object.defineProperty(GameStats.prototype, "amountOfPlayers", {
            get: function () {
                return this._playerStats.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameStats.prototype, "anyonePlaying", {
            get: function () {
                return this._currentPlayerIndex !== -1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameStats.prototype, "currentPlayerStats", {
            get: function () {
                return this._currentPlayerStats;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GameStats.prototype, "isGameOver", {
            get: function () {
                return this._playerStats.filter(function (p) { return p.livesRemaining > 0; }).length === 0;
            },
            enumerable: false,
            configurable: true
        });
        GameStats.prototype.choseNextPlayer = function () {
            var _this = this;
            var players = this._playerStats.filter(function (p) { return p.playerIndex > _this._currentPlayerIndex && p.livesRemaining > 0; });
            if (players.length === 0) {
                players = this._playerStats.filter(function (p) { return p.livesRemaining > 0; });
            }
            if (players.length > 0) {
                this._currentPlayerIndex = players[0].playerIndex;
                this._currentPlayerStats = this._playerStats[this._currentPlayerIndex];
            }
            else {
                this._currentPlayerIndex = -1;
            }
        };
        GameStats.prototype.updateHighScore = function () {
            if (this._playerStats.length === 1) {
                this._highScore = Math.max(this._playerStats[0].score, this._highScore);
            }
            if (this._playerStats.length === 2) {
                this._highScore = Math.max(this._playerStats[1].score, this._highScore);
            }
        };
        GameStats.prototype.pillEaten = function (point) {
            this._playerStats[this._currentPlayerIndex].pillEaten(point);
            this.updateHighScore();
        };
        GameStats.prototype.powerPillEaten = function (point) {
            this._playerStats[this._currentPlayerIndex].powerPillEaten(point);
            this.updateHighScore();
        };
        GameStats.prototype.pacManEaten = function () {
            this._playerStats[this._currentPlayerIndex].pacManEaten();
        };
        GameStats.prototype.ghostEaten = function () {
            var points = this._playerStats[this._currentPlayerIndex].ghostEaten();
            this.updateHighScore();
            return points;
        };
        GameStats.prototype.levelFinished = function () {
            this.currentPlayerStats.newLevel();
        };
        return GameStats;
    }());
    exports.GameStats = GameStats;
});
//# sourceMappingURL=GameStats.js.map