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
define(["require", "exports", "./PlayerStats"], function (require, exports, PlayerStats_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DemoStats = void 0;
    var DemoStats = /** @class */ (function (_super) {
        __extends(DemoStats, _super);
        function DemoStats() {
            var _this = _super.call(this, 0) || this;
            _this._livesRemaining = 1;
            return _this;
        }
        DemoStats.prototype.increaseScoreBy = function (amount) {
        };
        DemoStats.prototype.update = function (context) {
            _super.prototype.update.call(this, context);
        };
        return DemoStats;
    }(PlayerStats_1.PlayerStats));
    exports.DemoStats = DemoStats;
});
//# sourceMappingURL=DemoStats.js.map