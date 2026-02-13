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
define(["require", "exports", "./GameOverAct", "./TextPoints"], function (require, exports, GameOverAct_1, TextPoints_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerGameOverAct = void 0;
    /**
     * Draws game over and player X
     */
    var PlayerGameOverAct = /** @class */ (function (_super) {
        __extends(PlayerGameOverAct, _super);
        function PlayerGameOverAct(_playerNumber, _nextAct) {
            var _this = _super.call(this) || this;
            _this._playerNumber = _playerNumber;
            _this._nextAct = _nextAct;
            return _this;
        }
        PlayerGameOverAct.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
            var text = "";
            if (this._playerNumber === 0) {
                text = "PLAYER ONE";
            }
            else {
                text = "PLAYER TWO";
            }
            canvas.drawText(text, "cyan", TextPoints_1.TextPoints.playerTextPoint);
        };
        Object.defineProperty(PlayerGameOverAct.prototype, "nextAct", {
            get: function () {
                return this._nextAct;
            },
            enumerable: false,
            configurable: true
        });
        return PlayerGameOverAct;
    }(GameOverAct_1.GameOverAct));
    exports.PlayerGameOverAct = PlayerGameOverAct;
});
//# sourceMappingURL=PlayerGameOverAct.js.map