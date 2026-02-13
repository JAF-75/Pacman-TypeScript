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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./GhostInsideHouseMover", "./GhostState", "./GhostNickname", "./Ghost", "./DirectionInfo", "./GhostMovementMode"], function (require, exports, _exports_1, _exports_2, GhostInsideHouseMover_1, GhostState_1, GhostNickname_1, Ghost_1, DirectionInfo_1, GhostMovementMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Clyde = void 0;
    var Clyde = /** @class */ (function (_super) {
        __extends(Clyde, _super);
        function Clyde(maze) {
            var _this = _super.call(this, "Clyde", GhostNickname_1.GhostNickname.Clyde, maze, new _exports_1.Point(11.5, 12), _exports_2.Direction.Up) || this;
            _this.maze = maze;
            _this._scatterTarget = new _exports_1.Point(0, 29);
            // Whenever Clyde needs to determine his target tile, he first calculates his distance from Pac-Man. 
            // If he is farther than eight tiles away, his targeting is identical to Blinky’s, 
            // using Pac-Man’s current tile as his target. However, as soon as his distance
            // to Pac-Man becomes less than eight tiles, Clyde’s target is set to the same tile as his fixed 
            // one in Scatter mode, just outside the bottom-left corner of the maze
            // Pac-Man’s current position and orientation, and selecting the location four tiles straight 
            // ahead of him. Works when PacMan is facing left, down, or right, but when facing upwards, 
            // it's also four tiles to the left 
            _this._getChaseTargetCell = function () {
                var pacCellPos = _exports_2.MainWindow.actors.pacMan.getTile().index;
                var myPos = _this.getTile().index;
                var distance = Math.abs(_exports_1.Vector2D.distanceBetween(myPos.toVector2D(), pacCellPos.toVector2D()));
                if (distance >= 8) {
                    return pacCellPos;
                }
                return _this._scatterTarget;
            };
            _this.getChaseTarget = _this._getChaseTargetCell;
            _this.getScatterTarget = function () { return _this._scatterTarget; };
            _this.houseOffset = 1;
            return _this;
        }
        Clyde.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.direction = new DirectionInfo_1.DirectionInfo(_exports_2.Direction.Up, _exports_2.Direction.Up);
            this._state = GhostState_1.GhostState.Normal;
            this._movementMode = GhostMovementMode_1.GhostMovementMode.InHouse;
            this.mover = new GhostInsideHouseMover_1.GhostInsideHouseMover(this, this.maze);
        };
        Clyde.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
            if (_exports_2.Diags.enabled) {
                this.maze.highlightCell(canvas, this._getChaseTargetCell(), "orange");
            }
        };
        ;
        return Clyde;
    }(Ghost_1.Ghost));
    exports.Clyde = Clyde;
});
//# sourceMappingURL=Clyde.js.map