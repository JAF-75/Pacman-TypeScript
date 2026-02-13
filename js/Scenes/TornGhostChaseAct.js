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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "../Engine", "./ActUpdateResult", "./AttractScenePacMan", "./Act", "./StartEndPos"], function (require, exports, _exports_1, _exports_2, Engine_1, ActUpdateResult_1, AttractScenePacMan_1, Act_1, StartEndPos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TornGhostChaseAct = void 0;
    var TornGhostChaseAct = /** @class */ (function (_super) {
        __extends(TornGhostChaseAct, _super);
        function TornGhostChaseAct(nextAct) {
            var _this = _super.call(this) || this;
            _this._finished = false;
            _this._nextAct = nextAct;
            var justOffScreen = new _exports_1.Point(250, 140);
            _this._ghostTimer = new _exports_1.EggTimer(4500, function () {
                _this.reverseChase();
            });
            _this._pacTimer = new _exports_1.EggTimer(4800, function () { });
            _this._pacMan = new AttractScenePacMan_1.AttractScenePacMan();
            _this._pacMan.direction = _exports_2.Direction.Left;
            _this._worm = new _exports_1.GeneralSprite(_exports_1.Point.zero, new _exports_1.Vector2D(22, 11), new _exports_1.Point(11, 5.5), new _exports_1.Point(594, 132), new _exports_1.Point(626, 132), 110);
            _this._worm.visible = false;
            _this._blinky = new _exports_1.GeneralSprite(_exports_1.Point.zero, new _exports_1.Vector2D(14, 14), new _exports_1.Point(7.5, 7.5), new _exports_1.Point(618, 113), new _exports_1.Point(634, 113), 110);
            _this._pacPositions = new StartEndPos_1.StartEndPos(justOffScreen, new _exports_1.Point(-70, justOffScreen.y));
            _this._pacMan.position = _this._pacPositions.start;
            _this._ghostStartEndPos = new StartEndPos_1.StartEndPos(justOffScreen.add(new _exports_1.Point(50, 0)), new _exports_1.Point(-40, justOffScreen.y));
            _this._blinky.position = _this._ghostStartEndPos.start;
            Engine_1.Engine.gameSounds.cutScene();
            return _this;
        }
        Object.defineProperty(TornGhostChaseAct.prototype, "nextAct", {
            get: function () {
                return this._nextAct;
            },
            enumerable: false,
            configurable: true
        });
        TornGhostChaseAct.prototype.update = function (gameContext) {
            this._ghostTimer.run(gameContext.elapsed);
            this._pacTimer.run(gameContext.elapsed);
            this._worm.update(gameContext);
            this.lerpBlinky();
            this.lerpPacMan();
            this._pacMan.update(gameContext);
            this._blinky.update(gameContext);
            this._worm.update(gameContext);
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        TornGhostChaseAct.prototype.draw = function (canvas) {
            this._blinky.draw(canvas);
            this._pacMan.draw(canvas);
            this._worm.draw(canvas);
        };
        TornGhostChaseAct.prototype.lerpBlinky = function () {
            var pc = this._ghostTimer.progress / 100;
            this._blinky.position = _exports_1.Point.lerp(this._ghostStartEndPos.start, this._ghostStartEndPos.end, pc);
            this._worm.position = _exports_1.Point.lerp(this._ghostStartEndPos.start, this._ghostStartEndPos.end, pc);
        };
        TornGhostChaseAct.prototype.lerpPacMan = function () {
            var pc = this._pacTimer.progress / 100;
            this._pacMan.position = _exports_1.Point.lerp(this._pacPositions.start, this._pacPositions.end, pc);
        };
        TornGhostChaseAct.prototype.reverseChase = function () {
            var _this = this;
            this._ghostTimer = new _exports_1.EggTimer(4600, function () { _this._finished = true; });
            this._pacMan.visible = false;
            this._blinky.visible = false;
            this._worm.visible = true;
            this._ghostStartEndPos = this._ghostStartEndPos.reverse();
        };
        return TornGhostChaseAct;
    }(Act_1.Act));
    exports.TornGhostChaseAct = TornGhostChaseAct;
});
//# sourceMappingURL=TornGhostChaseAct.js.map