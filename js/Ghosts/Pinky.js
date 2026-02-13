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
define(["require", "exports", "../Game/_exports", "../Core/_exports", "./GhostInsideHouseMover", "./GhostState", "./Ghost", "./GhostNickname", "./DirectionInfo", "./GhostMovementMode"], function (require, exports, _exports_1, _exports_2, GhostInsideHouseMover_1, GhostState_1, Ghost_1, GhostNickname_1, DirectionInfo_1, GhostMovementMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pinky = void 0;
    var Pinky = /** @class */ (function (_super) {
        __extends(Pinky, _super);
        function Pinky(maze) {
            var _this = _super.call(this, "Pinky", GhostNickname_1.GhostNickname.Pinky, maze, _exports_1.Tile.fromCell(15.5, 11), _exports_1.Direction.Down) || this;
            _this.maze = maze;
            // Pac-Man’s current position and orientation, and selecting the location four tiles straight 
            // ahead of him. Works when PacMan is facing left, down, or right, but when facing upwards, 
            // it's also four tiles to the left 
            _this._getChaseTargetCell = function () {
                var pacDir = _exports_1.MainWindow.actors.pacMan.getDirection();
                var pacTile = _exports_1.MainWindow.actors.pacMan.getTile().index;
                var offset = _this.maze.constrainCell(pacTile.add(_exports_1.DirectionToIndexLookup.indexVectorFor(pacDir).multiply(4).toPoint()));
                // for the bug in the original pacman
                if (pacDir === _exports_1.Direction.Up) {
                    offset = offset.add(new _exports_2.Point(-4, 0));
                }
                var newTarget = _this.maze.constrainCell(pacTile.add(offset));
                return newTarget;
            };
            _this.getScatterTarget = function () { return new _exports_2.Point(2, 0); };
            _this.getChaseTarget = _this._getChaseTargetCell;
            _this.houseOffset = 0;
            return _this;
        }
        Pinky.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.direction = new DirectionInfo_1.DirectionInfo(_exports_1.Direction.Down, _exports_1.Direction.Down);
            this._state = GhostState_1.GhostState.Normal;
            this._movementMode = GhostMovementMode_1.GhostMovementMode.InHouse;
            this.mover = new GhostInsideHouseMover_1.GhostInsideHouseMover(this, this.maze);
        };
        Pinky.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
            if (_exports_1.Diags.enabled) {
                this.maze.highlightCell(canvas, this._getChaseTargetCell(), "pink");
            }
        };
        ;
        return Pinky;
    }(Ghost_1.Ghost));
    exports.Pinky = Pinky;
});
//# sourceMappingURL=Pinky.js.map