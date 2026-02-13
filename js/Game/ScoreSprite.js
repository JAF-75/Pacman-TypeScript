var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../Core/_exports"], function (require, exports, _exports_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScoreSprite = void 0;
    var PointAndWidth = /** @class */ (function () {
        function PointAndWidth(pos, width) {
            this.pos = pos;
            this.width = width;
        }
        return PointAndWidth;
    }());
    var ScoreSprite = /** @class */ (function (_super) {
        __extends(ScoreSprite, _super);
        function ScoreSprite(position, amount) {
            var _this = _super.call(this, position, new _exports_1.Vector2D(ScoreSprite.scorePositions[amount.toString()].width, 7), new _exports_1.Point(ScoreSprite.scorePositions[amount.toString()].width / 2, 7 / 2), ScoreSprite.scorePositions[amount.toString()].pos) || this;
            if (_this.spriteSheetPos === undefined) {
                throw new Error("Don't have a score for ".concat(amount));
            }
            return _this;
        }
        ScoreSprite.scorePositions = (_a = {},
            _a["200"] = new PointAndWidth(new _exports_1.Point(457, 133), 15),
            _a["400"] = new PointAndWidth(new _exports_1.Point(473, 133), 15),
            _a["800"] = new PointAndWidth(new _exports_1.Point(489, 133), 15),
            _a["1600"] = new PointAndWidth(new _exports_1.Point(505, 133), 16),
            _a["100"] = new PointAndWidth(new _exports_1.Point(456, 148), 13),
            _a["300"] = new PointAndWidth(new _exports_1.Point(473, 148), 15),
            _a["500"] = new PointAndWidth(new _exports_1.Point(489, 148), 15),
            _a["700"] = new PointAndWidth(new _exports_1.Point(505, 148), 15),
            _a["1000"] = new PointAndWidth(new _exports_1.Point(521, 148), 18),
            _a["2000"] = new PointAndWidth(new _exports_1.Point(518, 164), 20),
            _a["3000"] = new PointAndWidth(new _exports_1.Point(518, 180), 20),
            _a["5000"] = new PointAndWidth(new _exports_1.Point(518, 196), 20),
            _a);
        return ScoreSprite;
    }(_exports_1.GeneralSprite));
    exports.ScoreSprite = ScoreSprite;
});
//# sourceMappingURL=ScoreSprite.js.map