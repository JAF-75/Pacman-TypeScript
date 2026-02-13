define(["require", "exports", "../Core/_exports", "../Game/_exports"], function (require, exports, _exports_1, _exports_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostSpritesheetInfo = void 0;
    var GhostSpritesheetInfo = /** @class */ (function () {
        function GhostSpritesheetInfo(nickname, position) {
            this.nickname = nickname;
            this.position = position;
            this._width = 16;
            this.frames = new Array();
            var toMove = new _exports_1.Point(this._width, 0);
            var marker = position;
            this.frames[_exports_2.Direction.Right] = new _exports_1.FramePair(position, position.add(toMove));
            marker = marker.add(toMove);
            marker = marker.add(toMove);
            this.frames[_exports_2.Direction.Left] = new _exports_1.FramePair(marker, marker.add(toMove));
            marker = marker.add(toMove);
            marker = marker.add(toMove);
            this.frames[_exports_2.Direction.Up] = new _exports_1.FramePair(marker, marker.add(toMove));
            marker = marker.add(toMove);
            marker = marker.add(toMove);
            this.frames[_exports_2.Direction.Down] = new _exports_1.FramePair(marker, marker.add(toMove));
        }
        GhostSpritesheetInfo.prototype.getSourcePosition = function (direction, useFirstFrame) {
            var frame = this.frames[direction];
            if (useFirstFrame) {
                return frame.first;
            }
            return frame.second;
        };
        return GhostSpritesheetInfo;
    }());
    exports.GhostSpritesheetInfo = GhostSpritesheetInfo;
});
//# sourceMappingURL=GhostSpritesheetInfo.js.map