define(["require", "exports", "./Direction"], function (require, exports, Direction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DirectionChoices = void 0;
    var DirectionChoices = /** @class */ (function () {
        function DirectionChoices() {
            this.lookup = new Array();
        }
        DirectionChoices.prototype.set = function (direction) {
            this.lookup[direction] = true;
            this.possibilities = this.calcPossibilites();
        };
        DirectionChoices.prototype.unset = function (direction) {
            this.lookup[direction] = false;
            this.possibilities = this.calcPossibilites();
        };
        DirectionChoices.prototype.isSet = function (direction) {
            return this.lookup[direction];
        };
        DirectionChoices.prototype.clear = function () {
            this.lookup[Direction_1.Direction.Up] = false;
            this.lookup[Direction_1.Direction.Down] = false;
            this.lookup[Direction_1.Direction.Left] = false;
            this.lookup[Direction_1.Direction.Right] = false;
        };
        DirectionChoices.prototype.calcPossibilites = function () {
            var count = 0;
            if (this.lookup[Direction_1.Direction.Up]) {
                ++count;
            }
            if (this.lookup[Direction_1.Direction.Down]) {
                ++count;
            }
            if (this.lookup[Direction_1.Direction.Left]) {
                ++count;
            }
            if (this.lookup[Direction_1.Direction.Right]) {
                ++count;
            }
            return count;
        };
        return DirectionChoices;
    }());
    exports.DirectionChoices = DirectionChoices;
});
//# sourceMappingURL=DirectionChoices.js.map