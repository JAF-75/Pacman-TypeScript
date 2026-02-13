define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DirectionInfo = void 0;
    var DirectionInfo = /** @class */ (function () {
        function DirectionInfo(_current, _next) {
            this._current = _current;
            this._next = _next;
        }
        Object.defineProperty(DirectionInfo.prototype, "currentDirection", {
            get: function () {
                return this._current;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DirectionInfo.prototype, "nextDirection", {
            get: function () {
                return this._next;
            },
            enumerable: false,
            configurable: true
        });
        DirectionInfo.prototype.update = function (nextDirection) {
            this._current = this._next;
            this._next = nextDirection;
        };
        return DirectionInfo;
    }());
    exports.DirectionInfo = DirectionInfo;
});
//# sourceMappingURL=DirectionInfo.js.map