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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./GhostState", "./GhostNickname", "./Ghost", "./GhostMovementMode"], function (require, exports, _exports_1, _exports_2, GhostState_1, GhostNickname_1, Ghost_1, GhostMovementMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Blinky = void 0;
    var Blinky = /** @class */ (function (_super) {
        __extends(Blinky, _super);
        function Blinky(maze) {
            var _this = _super.call(this, "Blinky", GhostNickname_1.GhostNickname.Blinky, maze, new _exports_1.Point(13.5, 11), _exports_2.Direction.Left) || this;
            _this.maze = maze;
            _this._scatterTarget = new _exports_1.Point(25, 0);
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
                return pacCellPos;
            };
            _this.getScatterTarget = function () { return _this._scatterTarget; };
            _this.getChaseTarget = _this._getChaseTargetCell;
            _this.houseOffset = 0;
            return _this;
        }
        Blinky.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._state = GhostState_1.GhostState.Normal;
            this._movementMode = GhostMovementMode_1.GhostMovementMode.Undecided;
        };
        // we are reading these properties:
        // elroy1DotsLeft
        // elroy1SpeedPc 
        // elroy2DotsLeft
        // elroy2SpeedPc 
        Blinky.prototype.getNormalGhostSpeedPercent = function () {
            var levelProps = _exports_2.MainWindow.gameStats.currentPlayerStats.levelStats.levelProps;
            var pillsRemaining = _exports_2.MainWindow.gameStats.currentPlayerStats.levelStats.pillsRemaining;
            if (pillsRemaining > levelProps.elroy1DotsLeft) {
                return levelProps.ghostSpeedPc;
            }
            if (pillsRemaining < levelProps.elroy2DotsLeft) {
                return levelProps.elroy2SpeedPc;
            }
            return levelProps.elroy1SpeedPc;
        };
        Blinky.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
            if (_exports_2.Diags.enabled) {
                this.maze.highlightCell(canvas, this._getChaseTargetCell(), "red");
            }
        };
        ;
        return Blinky;
    }(Ghost_1.Ghost));
    exports.Blinky = Blinky;
});
//# sourceMappingURL=Blinky.js.map