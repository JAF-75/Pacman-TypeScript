define(["require", "exports", "../Game/_exports", "../Core/_exports", "./GhostState", "./DistanceAndDirection"], function (require, exports, _exports_1, _exports_2, GhostState_1, DistanceAndDirection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostLogic = void 0;
    var GhostLogic = /** @class */ (function () {
        function GhostLogic(_maze, _ghost) {
            this._maze = _maze;
            this._ghost = _ghost;
            this._lastDecisionMadeAt = new _exports_2.Point(-1, -1);
        }
        // Find which way to go from the ghost's next cell (in the direction of travel)
        // to the target cell.
        GhostLogic.prototype.getWhichWayToGo = function (targetCell) {
            var currentTile = this._ghost.getTile();
            var cellPosition = currentTile.index;
            if (cellPosition.equals(this._lastDecisionMadeAt)) {
                return _exports_1.Direction.None;
            }
            var nextTile = currentTile.nextTileWrapped(this._ghost.direction.nextDirection);
            var decision = this.calculateWhichWayToGo(nextTile, targetCell);
            this._lastDecisionMadeAt = cellPosition;
            this._lastDecisionMade = decision;
            return decision;
        };
        GhostLogic.prototype.calculateWhichWayToGo = function (tile, targetCell) {
            var cellPosition = tile.index;
            var choices = this._maze.getChoicesAtCellPosition(cellPosition);
            var dir = this._ghost.direction.nextDirection;
            var avail = new Array();
            if (choices.isSet(_exports_1.Direction.Up) && dir !== _exports_1.Direction.Down) {
                avail.push(_exports_1.Direction.Up);
            }
            ;
            if (choices.isSet(_exports_1.Direction.Left) && dir !== _exports_1.Direction.Right) {
                avail.push(_exports_1.Direction.Left);
            }
            ;
            if (choices.isSet(_exports_1.Direction.Down) && dir !== _exports_1.Direction.Up) {
                avail.push(_exports_1.Direction.Down);
            }
            if (choices.isSet(_exports_1.Direction.Right) && dir !== _exports_1.Direction.Left) {
                avail.push(_exports_1.Direction.Right);
            }
            if (avail.length === 1) {
                return avail[0];
            }
            else {
                if (this._maze.isSpecialIntersection(cellPosition) && this._ghost.state === GhostState_1.GhostState.Normal) {
                    var index = avail.indexOf(_exports_1.Direction.Up);
                    // special intersection - remove Up from choices
                    if (index !== -1) {
                        avail.splice(index, 1);
                    }
                }
                if (avail.length === 0) {
                    throw new Error("No choices to pick from!");
                }
                var dir_1 = this.pickShortest(tile, targetCell, avail);
                return dir_1;
            }
        };
        GhostLogic.prototype.pickShortest = function (ghostTile, targetCell, choices) {
            var _this = this;
            if (choices.length === 0) {
                throw new Error("No choices to pick from!");
            }
            var pair = choices.map(function (direction) {
                var nextTileInThatDirection = ghostTile.nextTile(direction);
                var targetTile = _exports_1.Tile.fromIndex(targetCell);
                var centerOfTarget = targetTile.center.toVector2D();
                var distance = _exports_2.Vector2D.distanceBetween(nextTileInThatDirection.center.toVector2D(), centerOfTarget);
                var roundedDistance = _this.round(distance);
                return new DistanceAndDirection_1.DistanceAndDirection(distance, roundedDistance, direction);
            });
            var sortedByDistance = pair.sort(function (l, r) { return _this.sort(l, r); });
            return sortedByDistance[0].direction;
        };
        GhostLogic.prototype.sort = function (l, r) {
            var dist = Math.floor(l.distance - r.distance);
            if (dist !== 0) {
                return dist;
            }
            var ret = this.weightDir(l.direction) - (this.weightDir(r.direction));
            return ret;
        };
        //From the spec: To break the tie, the ghost prefers directions in this order: up, left, down, right
        GhostLogic.prototype.weightDir = function (direction) {
            if (direction === _exports_1.Direction.Up) {
                return 0;
            }
            if (direction === _exports_1.Direction.Left) {
                return 1;
            }
            if (direction === _exports_1.Direction.Down) {
                return 2;
            }
            return 3;
        };
        GhostLogic.prototype.round = function (n) {
            return Math.round(n * 10) / 10;
        };
        return GhostLogic;
    }());
    exports.GhostLogic = GhostLogic;
});
//# sourceMappingURL=GhostLogic.js.map