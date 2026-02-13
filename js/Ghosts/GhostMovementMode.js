define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostMovementMode = void 0;
    var GhostMovementMode;
    (function (GhostMovementMode) {
        GhostMovementMode[GhostMovementMode["Undecided"] = 0] = "Undecided";
        // the ghost is chasing pacman
        GhostMovementMode[GhostMovementMode["Chase"] = 1] = "Chase";
        // the ghost is heading back to his 'home corner'
        GhostMovementMode[GhostMovementMode["Scatter"] = 2] = "Scatter";
        // the ghost is heading back to the house (after he's been eaten)
        GhostMovementMode[GhostMovementMode["GoingToHouse"] = 3] = "GoingToHouse";
        // the ghost is in the house
        GhostMovementMode[GhostMovementMode["InHouse"] = 4] = "InHouse";
        // the ghost is blue
        GhostMovementMode[GhostMovementMode["Frightened"] = 5] = "Frightened";
    })(GhostMovementMode || (exports.GhostMovementMode = GhostMovementMode = {}));
});
//# sourceMappingURL=GhostMovementMode.js.map