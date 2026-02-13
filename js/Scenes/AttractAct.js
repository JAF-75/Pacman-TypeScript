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
define(["require", "exports", "../Game/_exports", "../Ghosts/_exports", "../Core/_exports", "./PlayerIntroAct", "./StartButtonAct", "../Engine", "./ChaseSubAct", "./ActUpdateResult", "./Act"], function (require, exports, _exports_1, _exports_2, _exports_3, PlayerIntroAct_1, StartButtonAct_1, Engine_1, ChaseSubAct_1, ActUpdateResult_1, Act_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttractAct = void 0;
    /**
     * The 'attact scene' act.  Show's the attract screen.  Transitions to either
     * the 'player intro' act (to start the demo mode if nothings was pressed/clicked/touched),
     * or the 'start button' act if a coin was 'inserted'.
     */
    var AttractAct = /** @class */ (function (_super) {
        __extends(AttractAct, _super);
        function AttractAct() {
            var _this = _super.call(this) || this;
            _this._pos = new _exports_3.Point(45, 65);
            _this.drawGhostDescriptor = function (canvas, ghost, color, name, nickname, pos) {
                ghost.position = pos;
                canvas.drawSprite(ghost);
                pos = pos.add(new _exports_3.Point(18, -4));
                setTimeout(function () {
                    canvas.drawText("-".concat(name), color, pos);
                    pos = pos.add(new _exports_3.Point(90, 0));
                }, 1000);
                setTimeout(function () {
                    canvas.drawText("\"".concat(nickname, "\""), color, pos);
                }, 1500);
            };
            _this._pos = new _exports_3.Point(45, 65);
            _this._powerDotLegend = new _exports_1.PowerPill();
            _this._powerDotLegend.position = new _exports_3.Point(150, 250);
            _this._powerDotLegend.visible = false;
            _this._blinky = new _exports_2.SimpleGhost(_exports_2.GhostNickname.Blinky, _exports_1.Direction.Right);
            _this._pinky = new _exports_2.SimpleGhost(_exports_2.GhostNickname.Pinky, _exports_1.Direction.Right);
            _this._inky = new _exports_2.SimpleGhost(_exports_2.GhostNickname.Inky, _exports_1.Direction.Right);
            _this._clyde = new _exports_2.SimpleGhost(_exports_2.GhostNickname.Clyde, _exports_1.Direction.Right);
            _this._offScreenCanvas = _exports_3.Canvas.createOffscreenCanvas(new _exports_3.Vector2D(600, 400));
            _this._offScreenCanvas.fillRect("black", _exports_3.Point.zero, _this._offScreenCanvas.size);
            _this._chaseSubAct = new ChaseSubAct_1.ChaseSubAct();
            setTimeout(function () { return _this.writeTextSlowly(); }, 500);
            Engine_1.Engine.showControlPanel();
            return _this;
        }
        Object.defineProperty(AttractAct.prototype, "nextAct", {
            get: function () {
                if (this._nextAct === undefined) {
                    throw new Error("no next act defined!");
                }
                return this._nextAct;
            },
            enumerable: false,
            configurable: true
        });
        AttractAct.prototype.writeTextSlowly = function () {
            var _this = this;
            this._offScreenCanvas.drawText("CHARACTER / NICKNAME", "white", new _exports_3.Point(32, 12));
            var gap = new _exports_3.Point(0, 24);
            var pos = new _exports_3.Point(16, 30);
            var timeForEachOne = 2100;
            this.drawGhostDescriptor(this._offScreenCanvas, this._blinky, "red", "SHADOW", "BLINKY", pos);
            setTimeout(function () {
                pos = pos.add(gap);
                _this.drawGhostDescriptor(_this._offScreenCanvas, _this._pinky, "pink", "SPEEDY", "PINKY", pos);
            }, timeForEachOne);
            setTimeout(function () {
                pos = pos.add(gap);
                _this.drawGhostDescriptor(_this._offScreenCanvas, _this._inky, "cyan", "BASHFUL", "INKY", pos);
            }, timeForEachOne * 2);
            setTimeout(function () {
                pos = pos.add(gap);
                _this.drawGhostDescriptor(_this._offScreenCanvas, _this._clyde, "yellow", "POKEY", "CLYDE", pos);
            }, timeForEachOne * 3);
            setTimeout(function () {
                _this._chaseSubActReady = true;
            }, timeForEachOne * 4);
        };
        AttractAct.prototype.startDemoGame = function () {
            _exports_1.MainWindow.newDemoGame();
            Engine_1.Engine.gameSounds.muteAll();
            this._nextAct = new PlayerIntroAct_1.PlayerIntroAct(false, true);
        };
        AttractAct.prototype.update = function (gameContext) {
            if (_exports_3.GameContext.keyboard.wasKeyPressed(_exports_3.Keyboard.left)) {
                this.startDemoGame();
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            if (_exports_3.GameContext.keyboard.wasKeyPressed(_exports_3.Keyboard.enter)) {
                Engine_1.Engine.gameSounds.unmuteAll();
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            if (_exports_3.GameContext.keyboard.wasKeyPressed(_exports_3.Keyboard.five)) {
                Engine_1.Engine.gameSounds.unmuteAll();
                Engine_1.Engine.coinInserted();
                this._nextAct = new StartButtonAct_1.StartButtonAct();
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            if (this._chaseSubActReady) {
                if (this._chaseSubAct.update(gameContext) === ActUpdateResult_1.ActUpdateResult.Finished) {
                    this.startDemoGame();
                    return ActUpdateResult_1.ActUpdateResult.Finished;
                }
            }
            return ActUpdateResult_1.ActUpdateResult.Running;
        };
        AttractAct.prototype.draw = function (canvas) {
            canvas.drawOtherCanvas(this._offScreenCanvas, this._pos);
            if (this._chaseSubActReady) {
                this._chaseSubAct.draw(canvas);
            }
        };
        return AttractAct;
    }(Act_1.Act));
    exports.AttractAct = AttractAct;
});
//# sourceMappingURL=AttractAct.js.map