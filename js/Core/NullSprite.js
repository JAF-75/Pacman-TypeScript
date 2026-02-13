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
define(["require", "exports", "./Vector2D", "./Point", "./GeneralSprite"], function (require, exports, Vector2D_1, Point_1, GeneralSprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullSprite = void 0;
    var NullSprite = /** @class */ (function (_super) {
        __extends(NullSprite, _super);
        function NullSprite() {
            return _super.call(this, Point_1.Point.zero, Vector2D_1.Vector2D.zero, Point_1.Point.zero, Point_1.Point.zero) || this;
        }
        return NullSprite;
    }(GeneralSprite_1.GeneralSprite));
    exports.NullSprite = NullSprite;
});
//# sourceMappingURL=NullSprite.js.map