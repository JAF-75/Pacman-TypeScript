define(["require", "exports", "./Direction"], function (require, exports, Direction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DemoKeyPresses = void 0;
    var DemoKeyPresses = /** @class */ (function () {
        function DemoKeyPresses() {
            this._index = 0;
        }
        DemoKeyPresses.prototype.reset = function () {
            this._index = 0;
        };
        DemoKeyPresses.prototype.next = function () {
            if (this._index >= DemoKeyPresses.presses.length) {
                throw new Error("Used up all key presses!");
            }
            var t = DemoKeyPresses.presses[this._index++];
            if (t === "u") {
                return Direction_1.Direction.Up;
            }
            if (t === "d") {
                return Direction_1.Direction.Down;
            }
            if (t === "l") {
                return Direction_1.Direction.Left;
            }
            if (t === "r") {
                return Direction_1.Direction.Right;
            }
            throw new Error("Don't know what direction ".concat(t, " is!"));
        };
        //                         01234567890123456789012345678901234567890123456789012345678901234567890123456789
        DemoKeyPresses.presses = "ldrdrruluruluuulllllddlllddldlul";
        return DemoKeyPresses;
    }());
    exports.DemoKeyPresses = DemoKeyPresses;
});
//# sourceMappingURL=DemoKeyPresses.js.map