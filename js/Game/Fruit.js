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
define(["require", "exports", "../Core/_exports", "./Tile", "./MainWindow", "./FruitItem"], function (require, exports, _exports_1, Tile_1, MainWindow_1, FruitItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fruit = exports.SimpleFruit = void 0;
    var SimpleFruit = /** @class */ (function (_super) {
        __extends(SimpleFruit, _super);
        function SimpleFruit() {
            var _this = _super.call(this) || this;
            _this._spriteSize = new _exports_1.Vector2D(14, 14);
            _this._spriteSheet = document.getElementById("spritesheet");
            _this.position = _exports_1.Point.zero;
            _this.setFruitItem(FruitItem_1.FruitItem.Apple);
            return _this;
        }
        SimpleFruit.prototype.setFruitItem = function (item) {
            var x = 16 * item;
            this._spriteSheetPos = new _exports_1.Point(490 + x, 50);
        };
        Object.defineProperty(SimpleFruit.prototype, "spriteSheet", {
            get: function () {
                return this._spriteSheet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleFruit.prototype, "spriteSheetPos", {
            get: function () {
                return this._spriteSheetPos;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleFruit.prototype, "size", {
            get: function () {
                return this._spriteSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SimpleFruit.prototype, "origin", {
            get: function () {
                return _exports_1.Point.eight;
            },
            enumerable: false,
            configurable: true
        });
        SimpleFruit.prototype.update = function (context) {
        };
        Object.defineProperty(SimpleFruit.prototype, "position", {
            get: function () {
                return this._canvasPosition;
            },
            set: function (pos) {
                this._canvasPosition = pos;
            },
            enumerable: false,
            configurable: true
        });
        SimpleFruit.prototype.draw = function (canvas) {
            canvas.drawSprite(this);
        };
        return SimpleFruit;
    }(_exports_1.Sprite));
    exports.SimpleFruit = SimpleFruit;
    var Fruit = /** @class */ (function (_super) {
        __extends(Fruit, _super);
        function Fruit() {
            var _this = _super.call(this) || this;
            _this._showTimer = new _exports_1.EggTimer(10000, function () { _this.visible = false; });
            _this.position = Tile_1.Tile.toCenterCanvas(new _exports_1.Vector2D(14, 17.2).toPoint());
            _this.reset();
            return _this;
        }
        Fruit.prototype.reset = function (isDemoMode) {
            if (isDemoMode === void 0) { isDemoMode = false; }
            this.visible = false;
        };
        Object.defineProperty(Fruit.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: false,
            configurable: true
        });
        Fruit.prototype.update = function (context) {
            if (this.visible) {
                this._showTimer.run(context.elapsed);
                if (_exports_1.Point.areNear(MainWindow_1.MainWindow.actors.pacMan.position, this.position, 4)) {
                    MainWindow_1.MainWindow.fruitEaten();
                    this.visible = false;
                }
                return;
            }
            var levelStats = MainWindow_1.MainWindow.gameStats.currentPlayerStats.levelStats;
            if (levelStats.fruitSession.shouldShow) {
                this.visible = true;
                this._showTimer.reset();
            }
            this.setFruitItem(levelStats.levelProps.fruit);
        };
        Fruit.prototype.draw = function (canvas) {
            if (this.visible) {
                _super.prototype.draw.call(this, canvas);
            }
        };
        return Fruit;
    }(SimpleFruit));
    exports.Fruit = Fruit;
});
//# sourceMappingURL=Fruit.js.map