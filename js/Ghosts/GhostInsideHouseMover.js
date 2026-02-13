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
    exports.GhostInsideHouseMover = void 0;
    /**
     * Moves the ghosts while they are inside of the house
     */
    var GhostInsideHouseMover = /** @class */ (function (_super) {
        __extends(GhostInsideHouseMover, _super);
        function GhostInsideHouseMover(ghost, maze) {
            var _this = _super.call(this, ghost, GhostMovementMode_1.GhostMovementMode.InHouse, maze, function () { return _exports_2.Point.zero; }) || this;
            _this._readyToExit = false;
            _this._indexInRouteOut = 0;
            _this._finished = false;
            _this.whenAtTargetCell = function () {
                _this._cellToMoveFrom = _this._cellToMoveTo;
                if (!_this._readyToExit) {
                    if (_this._cellToMoveTo.equals(_this._topPos)) {
                        _this._cellToMoveTo = _this._bottomPos;
                    }
                    else {
                        _this._cellToMoveTo = _this._topPos;
                    }
                    return;
                }
                if (_this._indexInRouteOut === _this._routeOut.length) {
                    _this._finished = true;
                }
                else {
                    _this._cellToMoveTo = _this._routeOut[_this._indexInRouteOut++];
                }
            };
            _this.switch = function () {
                _this._readyToExit = true;
            };
            _this._door = _exports_1.MainWindow.gameStats.currentPlayerStats.ghostHouseDoor;
            var center = _exports_1.Maze.pixelCenterOfHouse;
            var x = (center.x + (ghost.offsetInHouse * 16));
            _this._topPos = new _exports_2.Point(x, 13.5 * 8 + 4);
            _this._bottomPos = new _exports_2.Point(x, 15.5 * 8 - 4);
            _this._centerOfUpDown = new _exports_2.Point(_this._topPos.x, _exports_1.Maze.pixelCenterOfHouse.y);
            ghost.position = _this._topPos.add(_this._bottomPos.minus(_this._topPos).divide(2));
            _this._cellToMoveFrom = ghost.position;
            if (ghost.direction.currentDirection === _exports_1.Direction.Down) {
                _this._cellToMoveTo = _this._bottomPos;
            }
            else if (ghost.direction.currentDirection === _exports_1.Direction.Up) {
                _this._cellToMoveTo = _this._topPos;
            }
            else {
                throw new Error("Ghost must be pointing up or down at start.");
            }
            _this._routeOut = [_this._centerOfUpDown, _exports_1.Maze.pixelCenterOfHouse, _exports_1.Maze.pixelHouseEntrancePoint];
            return _this;
        }
        GhostInsideHouseMover.prototype.update = function (context) {
            if (!this._readyToExit && this._door.canGhostLeave(this.ghost)) {
                this._readyToExit = true;
                return MovementResult_1.MovementResult.NotFinished;
            }
            if (this._finished) {
                this.ghost.direction = new DirectionInfo_1.DirectionInfo(_exports_1.Direction.Left, _exports_1.Direction.Left);
                this.ghost.setMovementMode(GhostMovementMode_1.GhostMovementMode.Undecided);
                return MovementResult_1.MovementResult.Finished;
            }
            var diff = this._cellToMoveTo.minus(this._cellToMoveFrom).toVector2D();
            if (!diff.equals(_exports_2.Vector2D.zero)) {
                diff.normalize();
                this.ghost.position = this.ghost.position.add(diff.divide(2).toPoint());
                var dir = _exports_1.DirectionToIndexLookup.getDirectionFromVector(diff);
                this.ghost.direction = new DirectionInfo_1.DirectionInfo(dir, dir);
            }
            if (this.ghost.position.floor().equals(this._cellToMoveTo.floor())) {
                this.ghost.position = this._cellToMoveTo;
                this.whenAtTargetCell();
            }
            return MovementResult_1.MovementResult.NotFinished;
        };
        return GhostInsideHouseMover;
    }(GhostMover_1.GhostMover));
    exports.GhostInsideHouseMover = GhostInsideHouseMover;
});
//# sourceMappingURL=GhostInsideHouseMover.js.map