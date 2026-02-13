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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pill = void 0;
    var Pill = /** @class */ (function (_super) {
        __extends(Pill, _super);
        function Pill() {
            return _super.call(this, _exports_1.Point.zero, _exports_1.Vector2D.eight, _exports_1.Point.four, new _exports_1.Point(8, 8)) || this;
        }
        return Pill;
    }(_exports_1.GeneralSprite));
    exports.Pill = Pill;
});
//# sourceMappingURL=Pill.js.map