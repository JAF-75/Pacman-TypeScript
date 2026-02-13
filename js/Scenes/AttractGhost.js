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
define(["require", "exports", "../Ghosts/_exports"], function (require, exports, _exports_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttractGhost = void 0;
    var AttractGhost = /** @class */ (function (_super) {
        __extends(AttractGhost, _super);
        function AttractGhost(nickName, _direction) {
            var _this = _super.call(this, nickName, _direction) || this;
            _this.nickName = nickName;
            _this._alive = true;
            return _this;
        }
        AttractGhost.prototype.setFrightened = function () {
            this._state = _exports_1.GhostState.Frightened;
        };
        Object.defineProperty(AttractGhost.prototype, "alive", {
            get: function () {
                return this._alive;
            },
            set: function (value) {
                this._alive = value;
            },
            enumerable: false,
            configurable: true
        });
        return AttractGhost;
    }(_exports_1.SimpleGhost));
    exports.AttractGhost = AttractGhost;
});
//# sourceMappingURL=AttractGhost.js.map