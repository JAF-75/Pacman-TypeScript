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
define(["require", "exports", "./GhostMovementMode", "./GhostMover"], function (require, exports, GhostMovementMode_1, GhostMover_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostChaseMover = void 0;
    /**
     * Moves the ghost to the 'chase target' cell (provided by the ghost)
     */
    var GhostChaseMover = /** @class */ (function (_super) {
        __extends(GhostChaseMover, _super);
        function GhostChaseMover(ghost, maze) {
            return _super.call(this, ghost, GhostMovementMode_1.GhostMovementMode.Chase, maze, ghost.getChaseTarget) || this;
        }
        return GhostChaseMover;
    }(GhostMover_1.GhostMover));
    exports.GhostChaseMover = GhostChaseMover;
});
//# sourceMappingURL=GhostChaseMover.js.map