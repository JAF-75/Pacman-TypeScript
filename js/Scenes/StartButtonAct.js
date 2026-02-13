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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./PlayerIntroAct", "../Engine", "./ActUpdateResult", "./Act"], function (require, exports, _exports_1, _exports_2, PlayerIntroAct_1, Engine_1, ActUpdateResult_1, Act_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StartButtonAct = void 0;
    /**
     * The 'act' that shows the '1 or 2 players' screen.
     */
    var StartButtonAct = /** @class */ (function (_super) {
        __extends(StartButtonAct, _super);
        function StartButtonAct() {
            var _this = _super.call(this) || this;
            Engine_1.Engine.showControlPanel();
            return _this;
        }
        Object.defineProperty(StartButtonAct.prototype, "nextAct", {
            get: function () {
                if (this._nextAct === undefined) {
                    throw new Error("No next act yet!");
                }
                return this._nextAct;
            },
            enumerable: false,
            configurable: true
        });
        StartButtonAct.prototype.update = function (gameContext) {
            if (_exports_1.GameContext.keyboard.wasKeyPressed(_exports_1.Keyboard.one)) {
                _exports_2.MainWindow.newGame(1);
                Engine_1.Engine.useCredits(1);
                this._nextAct = new PlayerIntroAct_1.PlayerIntroAct(true);
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            if (_exports_1.GameContext.keyboard.wasKeyPressed(_exports_1.Keyboard.two) && Engine_1.Engine.credits >= 2) {
                _exports_2.MainWindow.newGame(2);
                Engine_1.Engine.useCredits(2);
                this._nextAct = new PlayerIntroAct_1.PlayerIntroAct(true);
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            if (_exports_1.GameContext.keyboard.wasKeyPressed(_exports_1.Keyboard.five)) {
                Engine_1.Engine.coinInserted();
            }
            return ActUpdateResult_1.ActUpdateResult.Running;
        };
        StartButtonAct.prototype.draw = function (canvas) {
            canvas.drawText("PUSH START BUTTON", "orange", new _exports_1.Point(50, 115));
            var text;
            if (Engine_1.Engine.credits < 2) {
                text = "1 PLAYER ONLY";
            }
            else {
                text = "1 OR 2 PLAYERS";
            }
            canvas.drawText(text, "cyan", new _exports_1.Point(70, 145));
            canvas.drawText("BONUS PAC-MAN FOR 10000 PTS", "white", new _exports_1.Point(0, 175));
            canvas.drawText("(C) 1980 MIDWAY MFG. CO.", "white", new _exports_1.Point(15, 190));
        };
        return StartButtonAct;
    }(Act_1.Act));
    exports.StartButtonAct = StartButtonAct;
});
//# sourceMappingURL=StartButtonAct.js.map