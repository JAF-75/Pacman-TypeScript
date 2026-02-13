define(["require", "exports", "../Ghosts/_exports", "./DotCounter", "./MainWindow"], function (require, exports, _exports_1, DotCounter_1, MainWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostHouseDoor = void 0;
    var GhostHouseDoor = /** @class */ (function () {
        function GhostHouseDoor(level) {
            this._pillConsumptionTimeIdle = 0;
            this._ghostCounters = {};
            this._nullCounter = new DotCounter_1.DotCounter(Number.MAX_VALUE);
            this._globalCounter = new DotCounter_1.GlobalDotCounter(0);
            this._globalCounter.isActive = false;
            var pinkyCounter = new DotCounter_1.DotCounter(0);
            if (level === 0) {
                this._ghostCounters[_exports_1.GhostNickname.Pinky] = pinkyCounter;
                this._ghostCounters[_exports_1.GhostNickname.Inky] = new DotCounter_1.DotCounter(30);
                this._ghostCounters[_exports_1.GhostNickname.Clyde] = new DotCounter_1.DotCounter(60);
            }
            if (level === 1) {
                this._ghostCounters[_exports_1.GhostNickname.Pinky] = pinkyCounter;
                this._ghostCounters[_exports_1.GhostNickname.Inky] = new DotCounter_1.DotCounter(0);
                this._ghostCounters[_exports_1.GhostNickname.Clyde] = new DotCounter_1.DotCounter(50);
            }
            if (level >= 2) {
                this._ghostCounters[_exports_1.GhostNickname.Pinky] = pinkyCounter;
                this._ghostCounters[_exports_1.GhostNickname.Inky] = new DotCounter_1.DotCounter(0);
                this._ghostCounters[_exports_1.GhostNickname.Clyde] = new DotCounter_1.DotCounter(0);
            }
            this._ghostCounterEnum = [
                this._ghostCounters[_exports_1.GhostNickname.Pinky],
                this._ghostCounters[_exports_1.GhostNickname.Inky],
                this._ghostCounters[_exports_1.GhostNickname.Clyde]
            ];
            this._pillConsumptionTimeIdle = 0;
            this._activeCounter = pinkyCounter;
            this._activeCounter.isActive = true;
            this.switchToUseCounterOfNextGhost();
        }
        GhostHouseDoor.prototype.update = function (context) {
            this._pillConsumptionTimeIdle += context.elapsed;
            if (this._pillConsumptionTimeIdle > 4000) {
                this.whenNoPillsEaten();
            }
        };
        GhostHouseDoor.prototype.whenNoPillsEaten = function () {
            this._pillConsumptionTimeIdle = 0;
            this._activeCounter.setTimedOut();
            this.switchToUseCounterOfNextGhost();
        };
        GhostHouseDoor.prototype.ghostLeftHouse = function (ghost) {
            if (this._activeCounter !== this._ghostCounters[ghost]) {
                throw new Error("".concat(ghost.toString(), " cannot leave the house as he's not the current counter!"));
            }
        };
        GhostHouseDoor.prototype.switchToUseCounterOfNextGhost = function () {
            if (this._activeCounter === this._globalCounter) {
                if (this._activeCounter.isFinished) {
                    this.switchActive(this._nullCounter);
                }
                return;
            }
            if (this._activeCounter === this._nullCounter) {
                console.info("!!! SWITCHED TO NULL COUNTER !!!");
                return;
            }
            if (this._activeCounter === this._ghostCounters[_exports_1.GhostNickname.Pinky]) {
                this.switchActive(this._ghostCounters[_exports_1.GhostNickname.Inky]);
            }
            else if (this._activeCounter === this._ghostCounters[_exports_1.GhostNickname.Inky]) {
                this.switchActive(this._ghostCounters[_exports_1.GhostNickname.Clyde]);
            }
            else if (this._activeCounter === this._ghostCounters[_exports_1.GhostNickname.Clyde]) {
                this.switchActive(this._nullCounter);
            }
            else {
                throw new Error("don't know where to switch the active dot counter to!");
            }
        };
        GhostHouseDoor.prototype.canGhostLeave = function (ghost) {
            if (ghost.nickName === _exports_1.GhostNickname.Blinky) {
                return true;
            }
            if (this._globalCounter.isActive) {
                return this._globalCounter.canGhostLeave(ghost.nickName);
            }
            if (this._activeCounter === this._nullCounter) {
                return true;
            }
            return this._ghostCounters[ghost.nickName].limitReached;
        };
        GhostHouseDoor.prototype.switchToUseGlobalCounter = function () {
            this._globalCounter.reset();
            this.switchActive(this._globalCounter);
        };
        GhostHouseDoor.prototype.switchActive = function (counter) {
            this._activeCounter.isActive = false;
            this._activeCounter = counter;
            this._activeCounter.isActive = true;
        };
        GhostHouseDoor.prototype.pillEaten = function () {
            this._pillConsumptionTimeIdle = 0;
            if (this._activeCounter === this._globalCounter) {
                if (this._globalCounter.counter === 32
                    && MainWindow_1.MainWindow.actors.getGhost(_exports_1.GhostNickname.Clyde).isInHouse) {
                }
            }
            this._activeCounter.increment();
            if (this._activeCounter.limitReached) {
                this.switchToUseCounterOfNextGhost();
            }
        };
        return GhostHouseDoor;
    }());
    exports.GhostHouseDoor = GhostHouseDoor;
});
//# sourceMappingURL=GhostHouseDoor.js.map