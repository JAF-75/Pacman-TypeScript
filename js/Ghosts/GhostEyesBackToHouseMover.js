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
define(["require", "exports", "../Game/_exports", "../Core/_exports", "./GhostMovementMode", "./GhostMover", "./DirectionInfo", "./MovementResult"], function (require, exports, _exports_1, _exports_2, GhostMovementMode_1, GhostMover_1, DirectionInfo_1, MovementResult_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostEyesBackToHouseMover = void 0;
    /**
     * Moves the ghost back to the house.
     */
    var GhostEyesBackToHouseMover = /** @class */ (function (_super) {
        __extends(GhostEyesBackToHouseMover, _super);
        function GhostEyesBackToHouseMover(ghost, maze) {
            var _this = _super.call(this, ghost, GhostMovementMode_1.GhostMovementMode.GoingToHouse, maze, function () { return _exports_1.Maze.tileHouseEntrance.index; }) || this;
            _this._ghostPosInHouse = _exports_1.Maze.pixelCenterOfHouse.add(new _exports_2.Point(ghost.offsetInHouse * 16, 0));
            _this._currentAction = _this.navigateEyesBackToJustOutsideHouse;
            return _this;
        }
        GhostEyesBackToHouseMover.prototype.navigateEyesBackToJustOutsideHouse = function (context) {
            _super.prototype.update.call(this, context);
            if (this.isNearHouseEntrance) {
                this.ghost.position = _exports_1.Maze.pixelHouseEntrancePoint;
                this._currentAction = this.navigateToCenterOfHouse;
            }
            return MovementResult_1.MovementResult.NotFinished;
        };
        GhostEyesBackToHouseMover.prototype.navigateToCenterOfHouse = function (context) {
            var diff = _exports_1.Maze.pixelCenterOfHouse.minus(_exports_1.Maze.pixelHouseEntrancePoint).toVector2D();
            if (!diff.equals(_exports_2.Vector2D.zero)) {
                diff.normalize();
                this.ghost.position = this.ghost.position.add(diff.toPoint());
            }
            if (this.ghost.position.round().equals(_exports_1.Maze.pixelCenterOfHouse)) {
                this._currentAction = this.navigateToGhostIndexInHouse;
            }
            return MovementResult_1.MovementResult.NotFinished;
        };
        GhostEyesBackToHouseMover.prototype.navigateToGhostIndexInHouse = function (context) {
            var diff = this._ghostPosInHouse.minus(_exports_1.Maze.pixelCenterOfHouse).toVector2D();
            if (!diff.equals(_exports_2.Vector2D.zero)) {
                diff.normalize();
                this.ghost.position = this.ghost.position.add(diff.toPoint());
            }
            if (this.ghost.position.round().equals(this._ghostPosInHouse)) {
                this.ghost.direction = new DirectionInfo_1.DirectionInfo(_exports_1.Direction.Down, _exports_1.Direction.Down);
                this.ghost.setMovementMode(GhostMovementMode_1.GhostMovementMode.InHouse);
                return MovementResult_1.MovementResult.Finished;
            }
            return MovementResult_1.MovementResult.NotFinished;
        };
        GhostEyesBackToHouseMover.prototype.update = function (context) {
            return this._currentAction(context);
        };
        Object.defineProperty(GhostEyesBackToHouseMover.prototype, "isNearHouseEntrance", {
            get: function () {
                return _exports_2.Point.areNear(this.ghost.position, _exports_1.Maze.pixelHouseEntrancePoint, .75);
            },
            enumerable: false,
            configurable: true
        });
        return GhostEyesBackToHouseMover;
    }(GhostMover_1.GhostMover));
    exports.GhostEyesBackToHouseMover = GhostEyesBackToHouseMover;
});
//# sourceMappingURL=GhostEyesBackToHouseMover.js.map