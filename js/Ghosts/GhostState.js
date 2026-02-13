define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostState = void 0;
    var GhostState;
    (function (GhostState) {
        // heading towards pacman or their home corner (scatter)
        GhostState[GhostState["Normal"] = 0] = "Normal";
        // blue - running away from pacman (in a random pattern)
        GhostState[GhostState["Frightened"] = 1] = "Frightened";
        // heading back to the 'House'
        GhostState[GhostState["Eyes"] = 2] = "Eyes";
    })(GhostState || (exports.GhostState = GhostState = {}));
});
//# sourceMappingURL=GhostState.js.map