define(["require", "exports", "../Core/_exports", "./Direction"], function (require, exports, _exports_1, Direction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DirectionToIndexLookup = void 0;
    var DirectionToIndexLookup = /** @class */ (function () {
        function DirectionToIndexLookup() {
            DirectionToIndexLookup.lookup[Direction_1.Direction.Up] = new _exports_1.Vector2D(0, -1);
            DirectionToIndexLookup.lookup[Direction_1.Direction.Down] = new _exports_1.Vector2D(0, 1);
            DirectionToIndexLookup.lookup[Direction_1.Direction.Left] = new _exports_1.Vector2D(-1, 0);
            DirectionToIndexLookup.lookup[Direction_1.Direction.Right] = new _exports_1.Vector2D(1, 0);
        }
        DirectionToIndexLookup.indexVectorFor = function (direction) {
            return DirectionToIndexLookup.lookup[direction];
        };
        DirectionToIndexLookup.offset = function (direction, position) {
            return DirectionToIndexLookup.lookup[direction].add(position);
        };
        DirectionToIndexLookup.lookup = new Array();
        DirectionToIndexLookup.getDirectionFromVector = function (vector) {
            var unitVector = vector.copy();
            unitVector.normalize();
            if (unitVector.x < 0) {
                return Direction_1.Direction.Left;
            }
            if (unitVector.x > 0) {
                return Direction_1.Direction.Right;
            }
            if (unitVector.y < 0) {
                return Direction_1.Direction.Up;
            }
            if (unitVector.y > 0) {
                return Direction_1.Direction.Down;
            }
            return Direction_1.Direction.None;
        };
        return DirectionToIndexLookup;
    }());
    exports.DirectionToIndexLookup = DirectionToIndexLookup;
});
//# sourceMappingURL=DirectionToIndexLookup.js.map