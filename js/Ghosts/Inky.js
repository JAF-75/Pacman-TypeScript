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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./GhostInsideHouseMover", "./GhostState", "../Game/Diags", "../Game/Tile", "./GhostNickname", "./Ghost", "./DirectionInfo", "./GhostMovementMode"], function (require, exports, _exports_1, _exports_2, GhostInsideHouseMover_1, GhostState_1, Diags_1, Tile_1, GhostNickname_1, Ghost_1, DirectionInfo_1, GhostMovementMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Inky = void 0;
    var Inky = /** @class */ (function (_super) {
        __extends(Inky, _super);
        function Inky(maze, blinky) {
            var _this = _super.call(this, "Inky", GhostNickname_1.GhostNickname.Inky, maze, Tile_1.Tile.fromCell(15.5, 11), _exports_2.Direction.Up) || this;
            _this.maze = maze;
            _this._scatterTarget = new _exports_1.Point(27, 29);
            // To locate Inky’s target, we first start by selecting the position two tiles in front of Pac-Man 
            // in his current direction of travel.
            // From there, imagine drawing a vector from Blinky’s position to this tile, and then doubling 
            // the length of the vector. The tile that this new, extended vector ends on will be Inky’s actual target
            _this._getChaseTargetCell = function () {
                var pacDir = _exports_2.MainWindow.actors.pacMan.getDirection();
                var pacCellPos = _exports_2.MainWindow.actors.pacMan.getTile().index;
                var twoCellsInFront = _this.maze.constrainCell(pacCellPos.add(_exports_2.DirectionToIndexLookup.indexVectorFor(pacDir).multiply(2).toPoint()));
                var blinkyCellPos = _this._blinky.getTile().index;
                var diff = twoCellsInFront.minus(blinkyCellPos).toVector2D();
                var diff2 = diff.multiply(2);
                var newTarget = _this.maze.constrainCell(blinkyCellPos.add(diff2.toPoint()));
                return newTarget;
            };
            _this.houseOffset = -1;
            _this._blinky = blinky;
            _this.getScatterTarget = function () { return _this._scatterTarget; };
            _this.getChaseTarget = _this._getChaseTargetCell;
            return _this;
        }
        Inky.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.direction = new DirectionInfo_1.DirectionInfo(_exports_2.Direction.Up, _exports_2.Direction.Up);
            this._state = GhostState_1.GhostState.Normal;
            this._movementMode = GhostMovementMode_1.GhostMovementMode.InHouse;
            this.mover = new GhostInsideHouseMover_1.GhostInsideHouseMover(this, this.maze);
        };
        Inky.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
            if (Diags_1.Diags.enabled) {
                this.maze.highlightCell(canvas, this._getChaseTargetCell(), "aqua");
            }
        };
        ;
        return Inky;
    }(Ghost_1.Ghost));
    exports.Inky = Inky;
});
//# sourceMappingURL=Inky.js.map