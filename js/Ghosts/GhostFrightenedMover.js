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
define(["require", "exports", "../Game/_exports", "../Core/_exports", "./GhostMovementMode", "./GhostMover", "../Engine"], function (require, exports, _exports_1, _exports_2, GhostMovementMode_1, GhostMover_1, Engine_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostFrightenedMover = void 0;
    /**
     * Moves the ghost in a psuedo-random fashion while they are 'frightened' (i.e. blue)
     */
    var GhostFrightenedMover = /** @class */ (function (_super) {
        __extends(GhostFrightenedMover, _super);
        function GhostFrightenedMover(ghost, maze) {
            var _this = _super.call(this, ghost, GhostMovementMode_1.GhostMovementMode.Frightened, maze, function () { return _this._getChaseTargetCell(); }) || this;
            _this._getChaseTargetCell = function () {
                var random = Engine_1.Engine.pnrg;
                if (random % 4 === 0) {
                    return _exports_1.MazeBounds.topLeft;
                }
                if (random % 4 === 1) {
                    return new _exports_2.Point(_exports_1.MazeBounds.dimensions.x, 0);
                }
                if (random % 4 === 2) {
                    return _exports_1.MazeBounds.dimensions.toPoint();
                }
                return new _exports_2.Point(0, _exports_1.MazeBounds.dimensions.y);
            };
            return _this;
        }
        return GhostFrightenedMover;
    }(GhostMover_1.GhostMover));
    exports.GhostFrightenedMover = GhostFrightenedMover;
});
//# sourceMappingURL=GhostFrightenedMover.js.map