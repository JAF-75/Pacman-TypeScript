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
define(["require", "exports", "./Sprite", "./TwoFrameAnimation"], function (require, exports, Sprite_1, TwoFrameAnimation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GeneralSprite = void 0;
    var GeneralSprite = /** @class */ (function (_super) {
        __extends(GeneralSprite, _super);
        function GeneralSprite(_pos, _spriteSize, _offsetForOrigin, _frame1, _frame2, animationSpeed) {
            var _this = _super.call(this) || this;
            _this._pos = _pos;
            _this._spriteSize = _spriteSize;
            _this._offsetForOrigin = _offsetForOrigin;
            _this._frame1 = _frame1;
            _this._frame2 = _frame2;
            _this.visible = true;
            _this._spriteSheet = document.getElementById("spritesheet");
            if (_frame2 !== undefined) {
                _this._animator = new TwoFrameAnimation_1.TwoFrameAnimation(Number(animationSpeed));
            }
            _this._currentFrame = _frame1;
            return _this;
        }
        Object.defineProperty(GeneralSprite.prototype, "spriteSheet", {
            get: function () {
                return this._spriteSheet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeneralSprite.prototype, "size", {
            get: function () {
                return this._spriteSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeneralSprite.prototype, "origin", {
            get: function () {
                return this._offsetForOrigin;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GeneralSprite.prototype, "spriteSheetPos", {
            get: function () {
                return this._currentFrame;
            },
            enumerable: false,
            configurable: true
        });
        GeneralSprite.prototype.update = function (context) {
            if (this._animator !== undefined) {
                this._animator.run(context);
                this._currentFrame = this._animator.flag ? this._frame2 : this._frame1;
            }
        };
        Object.defineProperty(GeneralSprite.prototype, "position", {
            get: function () {
                return this._pos;
            },
            set: function (pos) {
                this._pos = pos;
            },
            enumerable: false,
            configurable: true
        });
        GeneralSprite.prototype.draw = function (canvas) {
            if (!this.visible) {
                return;
            }
            canvas.drawSprite(this);
        };
        return GeneralSprite;
    }(Sprite_1.Sprite));
    exports.GeneralSprite = GeneralSprite;
});
//# sourceMappingURL=GeneralSprite.js.map