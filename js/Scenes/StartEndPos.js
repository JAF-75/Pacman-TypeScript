define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartEndPos = void 0;
    var StartEndPos = /** @class */ (function () {
        function StartEndPos(start, end) {
            this.start = start;
            this.end = end;
        }
        StartEndPos.prototype.reverse = function () {
            return new StartEndPos(this.end, this.start);
        };
        return StartEndPos;
    }());
    exports.StartEndPos = StartEndPos;
});
//# sourceMappingURL=StartEndPos.js.map