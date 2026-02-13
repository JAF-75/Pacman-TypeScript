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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "../Engine", "./ActUpdateResult", "../Ghosts/_exports", "./AttractScenePacMan", "./Act", "./AttractGhost", "./StartEndPos"], function (require, exports, _exports_1, _exports_2, Engine_1, ActUpdateResult_1, _exports_3, AttractScenePacMan_1, Act_1, AttractGhost_1, StartEndPos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BigPacChaseAct = void 0;
    var BigPacChaseAct = /** @class */ (function (_super) {
        __extends(BigPacChaseAct, _super);
        function BigPacChaseAct(nextAct) {
            var _this = _super.call(this) || this;
            _this._finished = false;
            _this._nextAct = nextAct;
            var justOffScreen = new _exports_1.Point(250, 140);
            _this._blinkyTimer = new _exports_1.EggTimer(4500, function () {
                _this.reverseChase();
            });
            _this._pacTimer = new _exports_1.EggTimer(4750, function () { });
            _this._pacMan = new AttractScenePacMan_1.AttractScenePacMan();
            _this._pacMan.direction = _exports_2.Direction.Left;
            _this._bigPacMan = new _exports_1.GeneralSprite(_exports_1.Point.zero, new _exports_1.Vector2D(31, 32), new _exports_1.Point(16, 16), new _exports_1.Point(488, 16), new _exports_1.Point(520, 16), 110);
            _this._bigPacMan.visible = false;
            _this._blinky = new AttractGhost_1.AttractGhost(_exports_3.GhostNickname.Blinky, _exports_2.Direction.Left);
            _this._pacPositions = new StartEndPos_1.StartEndPos(justOffScreen, new _exports_1.Point(-70, justOffScreen.y));
            _this._pacMan.position = _this._pacPositions.start;
            _this._blinkyPositions = new StartEndPos_1.StartEndPos(justOffScreen.add(new _exports_1.Point(20, 0)), new _exports_1.Point(-40, justOffScreen.y));
            _this._blinky.position = _this._blinkyPositions.start;
            Engine_1.Engine.gameSounds.cutScene();
            return _this;
        }
        Object.defineProperty(BigPacChaseAct.prototype, "nextAct", {
            get: function () {
                return this._nextAct;
            },
            enumerable: false,
            configurable: true
        });
        BigPacChaseAct.prototype.update = function (gameContext) {
            this._blinkyTimer.run(gameContext.elapsed);
            this._pacTimer.run(gameContext.elapsed);
            this._bigPacMan.update(gameContext);
            this.lerpBlinky();
            this.lerpPacMan();
            this._pacMan.update(gameContext);
            this._blinky.update(gameContext);
            this._bigPacMan.update(gameContext);
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        BigPacChaseAct.prototype.draw = function (canvas) {
            this._blinky.draw(canvas);
            this._pacMan.draw(canvas);
            this._bigPacMan.draw(canvas);
        };
        BigPacChaseAct.prototype.lerpBlinky = function () {
            var pc = this._blinkyTimer.progress / 100;
            this._blinky.position = _exports_1.Point.lerp(this._blinkyPositions.start, this._blinkyPositions.end, pc);
        };
        BigPacChaseAct.prototype.lerpPacMan = function () {
            var pc = this._pacTimer.progress / 100;
            this._pacMan.position = _exports_1.Point.lerp(this._pacPositions.start, this._pacPositions.end, pc);
            this._bigPacMan.position = _exports_1.Point.lerp(this._pacPositions.start, this._pacPositions.end, pc);
        };
        BigPacChaseAct.prototype.reverseChase = function () {
            var _this = this;
            this._blinkyTimer = new _exports_1.EggTimer(4600, function () { });
            this._pacTimer = new _exports_1.EggTimer(4350, function () { _this._finished = true; });
            this._pacMan.visible = false;
            this._bigPacMan.visible = true;
            var s = new _exports_2.LevelStats(0);
            var sess = new _exports_2.GhostFrightSession(s.levelProps);
            this._blinky.direction = new _exports_3.DirectionInfo(_exports_2.Direction.Right, _exports_2.Direction.Right);
            this._blinky.frightSession = sess;
            this._blinky.setFrightened();
            this._blinkyPositions = this._blinkyPositions.reverse();
            var bigPacPos = this._pacPositions.reverse();
            bigPacPos = new StartEndPos_1.StartEndPos(bigPacPos.start.minus(new _exports_1.Point(100, 0)), bigPacPos.end);
            this._pacPositions = bigPacPos;
        };
        return BigPacChaseAct;
    }(Act_1.Act));
    exports.BigPacChaseAct = BigPacChaseAct;
});
//# sourceMappingURL=BigPacChaseAct.js.map