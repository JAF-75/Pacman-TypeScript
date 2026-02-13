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
define(["require", "exports", "../Game/_exports", "../Ghosts/_exports", "../Core/_exports", "../Engine", "./ActUpdateResult", "./AttractScenePacMan", "./Act", "./AttractGhost", "./StartEndPos"], function (require, exports, _exports_1, _exports_2, _exports_3, Engine_1, ActUpdateResult_1, AttractScenePacMan_1, Act_1, AttractGhost_1, StartEndPos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostTearAct = void 0;
    var Stage;
    (function (Stage) {
        Stage[Stage["MovingBlinky"] = 0] = "MovingBlinky";
        Stage[Stage["TearingBlinky"] = 1] = "TearingBlinky";
        Stage[Stage["BlinkyLooking"] = 2] = "BlinkyLooking";
    })(Stage || (Stage = {}));
    var GhostTearAct = /** @class */ (function (_super) {
        __extends(GhostTearAct, _super);
        function GhostTearAct(nextAct) {
            var _this = _super.call(this) || this;
            _this._centerPoint = new _exports_3.Point(120, 140);
            _this._tearSize = new _exports_3.Vector2D(13, 13);
            _this._tearOffset = new _exports_3.Point(7, 6.5);
            _this._finished = false;
            _this._nextAct = nextAct;
            _this._stage = Stage.MovingBlinky;
            _this._animFrame = 0;
            _this._tearFrames = [
                new _exports_3.Point(589, 98),
                new _exports_3.Point(609, 98),
                new _exports_3.Point(622, 98),
                new _exports_3.Point(636, 98),
                new _exports_3.Point(636, 98),
                new _exports_3.Point(636, 98),
                new _exports_3.Point(649, 98)
            ];
            _this._blinkyLookFrames = [
                new _exports_3.Point(584, 113),
                new _exports_3.Point(600, 113)
            ];
            _this._blinkyTimer = new _exports_3.EggTimer(4500, function () {
                _this.blinkyCaught();
            });
            _this._tearTimer = new _exports_3.LoopingTimer(500, function () {
                if (_this._stage === Stage.TearingBlinky) {
                    _this.updateTearAnimation();
                }
            });
            _this._lookTimer = new _exports_3.LoopingTimer(Number.MAX_VALUE, function () { });
            _this._pacTimer = new _exports_3.EggTimer(4750, function () { });
            _this._pacMan = new AttractScenePacMan_1.AttractScenePacMan();
            _this._pacMan.direction = _exports_1.Direction.Left;
            _this._snagSprite = new _exports_3.GeneralSprite(_this._centerPoint, _this._tearSize, _this._tearOffset, _this._tearFrames[0]);
            _this._snagSprite.visible = true;
            _this._blinky = new AttractGhost_1.AttractGhost(_exports_2.GhostNickname.Blinky, _exports_1.Direction.Left);
            _this._lookingBlinky = new _exports_3.NullSprite();
            var justOffScreen = new _exports_3.Point(250, 140);
            _this._pacPositions = new StartEndPos_1.StartEndPos(justOffScreen, new _exports_3.Point(-70, justOffScreen.y));
            _this._pacMan.position = _this._pacPositions.start;
            _this._blinkyPositions = new StartEndPos_1.StartEndPos(justOffScreen.add(new _exports_3.Point(120, 0)), _this._centerPoint.minus(new _exports_3.Point(10, 0)));
            _this._blinky.position = _this._blinkyPositions.start;
            Engine_1.Engine.gameSounds.cutScene();
            return _this;
        }
        Object.defineProperty(GhostTearAct.prototype, "nextAct", {
            get: function () {
                return this._nextAct;
            },
            enumerable: false,
            configurable: true
        });
        GhostTearAct.prototype.update = function (gameContext) {
            this._blinkyTimer.run(gameContext.elapsed);
            this._pacTimer.run(gameContext.elapsed);
            this._tearTimer.run(gameContext.elapsed);
            this._lookTimer.run(gameContext.elapsed);
            if (this._stage === Stage.MovingBlinky) {
                this.lerpBlinky();
            }
            this.lerpPacMan();
            this._pacMan.update(gameContext);
            this._blinky.update(gameContext);
            this._lookingBlinky.update(gameContext);
            this._snagSprite.update(gameContext);
            return this._finished ? ActUpdateResult_1.ActUpdateResult.Finished : ActUpdateResult_1.ActUpdateResult.Running;
        };
        GhostTearAct.prototype.draw = function (canvas) {
            //canvas.drawRect(this.snagSprite, "white");
            //canvas.drawRect(this.blinky, "green");
            this._pacMan.draw(canvas);
            this._blinky.draw(canvas);
            this._lookingBlinky.draw(canvas);
            this._snagSprite.draw(canvas);
        };
        GhostTearAct.prototype.lerpBlinky = function () {
            var pc = this._blinkyTimer.progress / 100;
            this._blinky.position = _exports_3.Point.lerp(this._blinkyPositions.start, this._blinkyPositions.end, pc);
        };
        GhostTearAct.prototype.lerpPacMan = function () {
            var pc = this._pacTimer.progress / 100;
            this._pacMan.position = _exports_3.Point.lerp(this._pacPositions.start, this._pacPositions.end, pc);
        };
        GhostTearAct.prototype.blinkyCaught = function () {
            this._stage = Stage.TearingBlinky;
        };
        GhostTearAct.prototype.updateTearAnimation = function () {
            var _this = this;
            ++this._animFrame;
            if (this._animFrame < this._tearFrames.length) {
                this._snagSprite = new _exports_3.GeneralSprite(this._centerPoint, this._tearSize, this._tearOffset, this._tearFrames[this._animFrame]);
                //this.snagSprite.position = this.snagSprite.position.minus(new Point(1, 0));
                this._blinky.position = this._blinky.position.minus(new _exports_3.Point(1, 0));
                return;
            }
            this._animFrame = 0;
            this._blinky.visible = false;
            this.setLookingBlinky(0);
            this._lookTimer = new _exports_3.LoopingTimer(1500, function () {
                _this.updateBlinkyLookAnimation();
            });
            this._lookingBlinky.visible = true;
            this._stage = Stage.BlinkyLooking;
        };
        GhostTearAct.prototype.setLookingBlinky = function (frame) {
            this._lookingBlinky = new _exports_3.GeneralSprite(this._blinky.position, this._blinky.size, this._blinky.origin, this._blinkyLookFrames[frame]);
            this._lookingBlinky.visible = true;
        };
        GhostTearAct.prototype.updateBlinkyLookAnimation = function () {
            ++this._animFrame;
            this.setLookingBlinky(this._animFrame);
            if (this._animFrame === 2) {
                this._animFrame = 0;
                this._finished = true;
            }
        };
        return GhostTearAct;
    }(Act_1.Act));
    exports.GhostTearAct = GhostTearAct;
});
//# sourceMappingURL=GhostTearAct.js.map