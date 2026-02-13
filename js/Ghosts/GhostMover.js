define(["require", "exports", "../Game/_exports", "./GhostLogic", "./MovementResult"], function (require, exports, _exports_1, GhostLogic_1, MovementResult_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostMover = void 0;
    /**
     * Represents the different ghost movers.  Ghost movements are either:
     * * Chase (chase after Pacman),
     * * Scatter (they scatter back to their 'home corners')
     * * Frightened (run away from Pacman)
     * * 'Eyes back to house' (they've been eaten by Pacman and are making their way back to the 'house')
     * * 'Inside house' (they're inside the house waiting to come out)
     */
    var GhostMover = /** @class */ (function () {
        function GhostMover(ghost, movementMode, maze, _getTargetCell) {
            this.ghost = ghost;
            this.movementMode = movementMode;
            this._getTargetCell = _getTargetCell;
            this.directionLookup = new _exports_1.DirectionToIndexLookup();
            this._intersectionLogic = new GhostLogic_1.GhostLogic(maze, ghost);
        }
        GhostMover.prototype.update = function (context) {
            var tile = this.ghost.getTile();
            // if a ghost is near the center of a cell, then get the 'next cell' and 
            // store where to go from there
            if (tile.isInCenter) {
                var targetCell = this._getTargetCell();
                var direction = this._intersectionLogic.getWhichWayToGo(targetCell);
                if (direction !== _exports_1.Direction.None) {
                    this.setDirection(direction);
                }
            }
            this.ghost.moveForwards();
            return MovementResult_1.MovementResult.NotFinished;
        };
        GhostMover.prototype.activate = function () {
            this.ghost.setMovementMode(this.movementMode);
        };
        GhostMover.prototype.setDirection = function (direction) {
            this.ghost.direction.update(direction);
        };
        return GhostMover;
    }());
    exports.GhostMover = GhostMover;
});
//# sourceMappingURL=GhostMover.js.map