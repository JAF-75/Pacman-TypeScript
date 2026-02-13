define(["require", "exports", "../Core/_exports", "../Game/_exports"], function (require, exports, _exports_1, _exports_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EyesSpritesheetInfo = void 0;
    var EyesSpritesheetInfo = /** @class */ (function () {
        function EyesSpritesheetInfo(position) {
            this.position = position;
            this._width = 16;
            this._positions = new Array();
            var toMove = new _exports_1.Point(this._width, 0);
            this._positions[_exports_2.Direction.Right] = position;
            var marker = position;
            marker = marker.add(toMove);
            this._positions[_exports_2.Direction.Left] = marker;
            marker = marker.add(toMove);
            this._positions[_exports_2.Direction.Up] = marker;
            marker = marker.add(toMove);
            this._positions[_exports_2.Direction.Down] = marker;
        }
        EyesSpritesheetInfo.prototype.getSourcePosition = function (direction) {
            return this._positions[direction];
        };
        return EyesSpritesheetInfo;
    }());
    exports.EyesSpritesheetInfo = EyesSpritesheetInfo;
});
//# sourceMappingURL=EyesSpritesheetInfo.js.map