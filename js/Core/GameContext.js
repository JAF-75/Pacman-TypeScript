define(["require", "exports", "./Keyboard"], function (require, exports, Keyboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameContext = void 0;
    var GameContext = /** @class */ (function () {
        function GameContext() {
            this.totalGameTime = 0;
        }
        GameContext.showDiags = false;
        GameContext.keyboard = new Keyboard_1.Keyboard();
        return GameContext;
    }());
    exports.GameContext = GameContext;
});
//# sourceMappingURL=GameContext.js.map