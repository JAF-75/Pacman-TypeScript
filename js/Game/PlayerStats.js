define(["require", "exports", "../Engine", "../Ghosts/GhostMovementConductor", "./GhostFrightSession", "./LevelStats", "./GhostHouseDoor"], function (require, exports, Engine_1, GhostMovementConductor_1, GhostFrightSession_1, LevelStats_1, GhostHouseDoor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerStats = void 0;
    var PlayerStats = /** @class */ (function () {
        function PlayerStats(playerIndex) {
            this._playerIndex = playerIndex;
            this._score = 0;
            //cheat
            this._livesRemaining = 3;
            this._levelNumber = -1;
            this._extraLives = [];
            this._extraLives.push(10000);
            this.newLevel();
        }
        PlayerStats.prototype.update = function (context) {
            if (this._ghostFrightSession !== undefined && !this._ghostFrightSession.isFinished) {
                this._ghostFrightSession.update(context);
            }
            else {
                this._ghostMovementConductor.update(context);
            }
            this._ghostHouseDoor.update(context);
        };
        Object.defineProperty(PlayerStats.prototype, "ghostMoveConductor", {
            get: function () {
                return this._ghostMovementConductor;
            },
            enumerable: false,
            configurable: true
        });
        PlayerStats.prototype.ghostLeftHouse = function (ghost) {
            this._ghostHouseDoor.ghostLeftHouse(ghost);
        };
        Object.defineProperty(PlayerStats.prototype, "ghostHouseDoor", {
            get: function () {
                return this._ghostHouseDoor;
            },
            enumerable: false,
            configurable: true
        });
        PlayerStats.prototype.newLevel = function () {
            this._levelStats = new LevelStats_1.LevelStats(++this._levelNumber);
            this._ghostHouseDoor = new GhostHouseDoor_1.GhostHouseDoor(0);
            var props = this.levelStats.getGhostPatternProperties();
            this._ghostMovementConductor = new GhostMovementConductor_1.GhostMovementConductor(props);
        };
        Object.defineProperty(PlayerStats.prototype, "playerIndex", {
            get: function () {
                return this._playerIndex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PlayerStats.prototype, "levelStats", {
            get: function () {
                return this._levelStats;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PlayerStats.prototype, "livesRemaining", {
            get: function () {
                return this._livesRemaining;
            },
            enumerable: false,
            configurable: true
        });
        PlayerStats.prototype.increaseScoreBy = function (amount) {
            this._score += amount;
            if (this._extraLives.length === 0) {
                return;
            }
            if (this._score > this._extraLives[0]) {
                Engine_1.Engine.gameSounds.gotExtraLife();
                this._livesRemaining += 1;
                this._extraLives.splice(0, 1);
            }
        };
        PlayerStats.prototype.pillEaten = function (point) {
            this._ghostHouseDoor.pillEaten();
            this.increaseScoreBy(10);
            this._levelStats.pillEaten(point);
        };
        PlayerStats.prototype.fruitEaten = function () {
            this.increaseScoreBy(this._levelStats.levelProps.fruitPoints);
            this.levelStats.fruitSession.fruitEaten();
        };
        Object.defineProperty(PlayerStats.prototype, "frightSession", {
            get: function () {
                return this._ghostFrightSession;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PlayerStats.prototype, "isInFrightSession", {
            get: function () {
                return this.frightSession !== undefined && !this.frightSession.isFinished;
            },
            enumerable: false,
            configurable: true
        });
        PlayerStats.prototype.powerPillEaten = function (point) {
            this._ghostFrightSession = new GhostFrightSession_1.GhostFrightSession(this._levelStats.levelProps);
            this._ghostHouseDoor.pillEaten();
            this.increaseScoreBy(50);
            this._levelStats.pillEaten(point);
        };
        PlayerStats.prototype.pacManEaten = function () {
            this._ghostHouseDoor.switchToUseGlobalCounter();
            var props = this.levelStats.getGhostPatternProperties();
            this._ghostMovementConductor = new GhostMovementConductor_1.GhostMovementConductor(props);
        };
        PlayerStats.prototype.decreaseLives = function () {
            this._livesRemaining -= 1;
        };
        PlayerStats.prototype.ghostEaten = function () {
            var points = this._ghostFrightSession.ghostEaten();
            this.increaseScoreBy(points);
            return points;
        };
        Object.defineProperty(PlayerStats.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: false,
            configurable: true
        });
        return PlayerStats;
    }());
    exports.PlayerStats = PlayerStats;
});
//# sourceMappingURL=PlayerStats.js.map