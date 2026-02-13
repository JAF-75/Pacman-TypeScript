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
define(["require", "exports", "../Core/_exports", "../Game/_exports"], function (require, exports, _exports_1, _exports_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttractScenePacMan = void 0;
    var AttractScenePacMan = /** @class */ (function (_super) {
        __extends(AttractScenePacMan, _super);
        function AttractScenePacMan() {
            var _this = _super.call(this) || this;
            _this.visible = true;
            _this._spriteSize = new _exports_1.Vector2D(16, 16);
            _this._animDirection = new _exports_1.TwoFrameAnimation(65);
            _this._speed = .5;
            _this._spriteSheet = document.getElementById("spritesheet");
            _this._veolocitiesLookup = new Array();
            _this._direction = _exports_2.Direction.Left;
            var left = 456;
            var left2 = 472;
            _this._veolocitiesLookup[_exports_2.Direction.Up] = new _exports_1.FramePair(new _exports_1.Point(left, 32), new _exports_1.Point(left2, 32));
            _this._veolocitiesLookup[_exports_2.Direction.Down] = new _exports_1.FramePair(new _exports_1.Point(left, 48), new _exports_1.Point(left2, 48));
            _this._veolocitiesLookup[_exports_2.Direction.Left] = new _exports_1.FramePair(new _exports_1.Point(left, 16), new _exports_1.Point(left2, 16));
            _this._veolocitiesLookup[_exports_2.Direction.Right] = new _exports_1.FramePair(new _exports_1.Point(left, 0), new _exports_1.Point(left2, 0));
            _this.position = _exports_2.Tile.toCenterCanvas(new _exports_1.Vector2D(13.5, 23).toPoint());
            _this.setSpriteSheetPointers();
            return _this;
        }
        Object.defineProperty(AttractScenePacMan.prototype, "spriteSheet", {
            get: function () {
                return this._spriteSheet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AttractScenePacMan.prototype, "spriteSheetPos", {
            get: function () {
                return this._spriteSheetPos;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AttractScenePacMan.prototype, "size", {
            get: function () {
                return this._spriteSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AttractScenePacMan.prototype, "origin", {
            get: function () {
                return _exports_1.Point.eight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AttractScenePacMan.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        AttractScenePacMan.prototype.updateAnimation = function (context) {
            if (this._speed === 0) {
                return;
            }
            this._animDirection.run(context);
            this.setSpriteSheetPointers();
        };
        AttractScenePacMan.prototype.setSpriteSheetPointers = function () {
            this._frame1InSpriteMap = this._veolocitiesLookup[this._direction].first;
            this._frame2InSpriteMap = this._veolocitiesLookup[this._direction].second;
            if (this._animDirection.flag) {
                this._spriteSheetPos = this._frame1InSpriteMap;
            }
            else {
                this._spriteSheetPos = this._frame2InSpriteMap;
            }
        };
        AttractScenePacMan.prototype.update = function (context) {
            this.updateAnimation(context);
        };
        Object.defineProperty(AttractScenePacMan.prototype, "position", {
            get: function () {
                return this._canvasPosition;
            },
            set: function (pos) {
                this._canvasPosition = pos;
            },
            enumerable: false,
            configurable: true
        });
        AttractScenePacMan.prototype.draw = function (canvas) {
            if (!this.visible) {
                return;
            }
            canvas.drawSprite(this);
        };
        return AttractScenePacMan;
    }(_exports_1.Sprite));
    exports.AttractScenePacMan = AttractScenePacMan;
});
//# sourceMappingURL=AttractScenePacMan.js.map