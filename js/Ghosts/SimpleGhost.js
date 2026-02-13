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
define(["require", "exports", "../Core/_exports", "./GhostState", "./DirectionInfo", "./GhostSpritesheet", "./GhostMovementMode"], function (require, exports, _exports_1, GhostState_1, DirectionInfo_1, GhostSpritesheet_1, GhostMovementMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleGhost = void 0;
    var SimpleGhost = /** @class */ (function (_super) {
        __extends(SimpleGhost, _super);
        function SimpleGhost(nickName, direction) {
            var _this = _super.call(this) || this;
            _this.nickName = nickName;
            _this.spriteSize = new _exports_1.Vector2D(16, 16);
            _this._toggle = new _exports_1.TwoFrameAnimation(65);
            _this.getGhostFrame = function () {
                if (_this._frightSession === undefined) {
                    throw new Error("Cannot get ghost frame - not in a fright session");
                }
                var pair = _this._frightSession.isWhite
                    ? _this.spritesheetInfoFrightened.white
                    : _this.spritesheetInfoFrightened.blue;
                if (_this._toggle.flag) {
                    return pair.first;
                }
                return pair.second;
            };
            _this._direction = new DirectionInfo_1.DirectionInfo(direction, direction);
            _this.visible = true;
            _this._spriteSheet = document.getElementById("spritesheet");
            var spriteSheet = new GhostSpritesheet_1.GhostSpritesheet();
            _this.spritesheetInfoNormal = spriteSheet.getEntry(nickName);
            _this.spritesheetInfoFrightened = new GhostSpritesheet_1.GhostSpritesheet().getFrightened();
            _this.spriteSheetEyes = spriteSheet.eyes;
            _this._spritesheetPos = _this.spritesheetInfoNormal.getSourcePosition(_this._direction.nextDirection, true);
            return _this;
        }
        Object.defineProperty(SimpleGhost.prototype, "frightSession", {
            set: function (session) {
                this._frightSession = session;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "isInHouse", {
            get: function () {
                return this._movementMode === GhostMovementMode_1.GhostMovementMode.InHouse;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (direction) {
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "spriteSheet", {
            get: function () {
                return this._spriteSheet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "spriteSheetPos", {
            get: function () {
                return this._spritesheetPos;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "size", {
            get: function () {
                return this.spriteSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "origin", {
            get: function () {
                return _exports_1.Point.eight;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleGhost.prototype, "position", {
            get: function () {
                return this.canvasPos;
            },
            set: function (pos) {
                this.canvasPos = pos;
            },
            enumerable: false,
            configurable: true
        });
        SimpleGhost.prototype.update = function (context) {
            this.updateAnimation(context);
        };
        SimpleGhost.prototype.draw = function (canvas) {
            if (this.visible) {
                canvas.drawSprite(this);
            }
        };
        SimpleGhost.prototype.updateAnimation = function (context) {
            this._toggle.run(context);
            if (this._state === GhostState_1.GhostState.Frightened) {
                this._spritesheetPos = this.getGhostFrame();
            }
            else if (this._state === GhostState_1.GhostState.Eyes) {
                this._spritesheetPos = this.spriteSheetEyes.getSourcePosition(this._direction.nextDirection);
            }
            else {
                this._spritesheetPos = this.spritesheetInfoNormal.getSourcePosition(this._direction.nextDirection, this._toggle.flag);
            }
        };
        SimpleGhost.prototype.powerPillEaten = function (session) {
            this._frightSession = session;
        };
        return SimpleGhost;
    }(_exports_1.Sprite));
    exports.SimpleGhost = SimpleGhost;
});
//# sourceMappingURL=SimpleGhost.js.map