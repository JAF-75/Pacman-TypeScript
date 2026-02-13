define(["require", "exports", "../Core/_exports", "./Direction"], function (require, exports, _exports_1, Direction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tile = void 0;
    var Tile = /** @class */ (function () {
        function Tile() {
            this._index = _exports_1.Point.zero;
            this._topLeft = _exports_1.Point.zero;
            this._center = _exports_1.Point.zero;
            this._setWith = _exports_1.Point.zero;
            this.set(_exports_1.Point.zero);
        }
        Tile.prototype.set = function (spritePos) {
            this._setWith = spritePos;
            this._index = spritePos.divide(8).floor();
            this._topLeft = this._index.multiply(8);
            this._center = this._topLeft.add(new _exports_1.Point(4, 4));
            this._isInCenter = this._center.equals(spritePos.round());
        };
        Object.defineProperty(Tile.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "topLeft", {
            get: function () {
                return this._topLeft;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "center", {
            // get's the canvas center position
            get: function () {
                return this._center;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "isInCenter", {
            get: function () {
                return _exports_1.Point.areNear(this._setWith, this._center, .75);
            },
            enumerable: false,
            configurable: true
        });
        Tile.prototype.isNearCenter = function (precision) {
            return _exports_1.Point.areNear(this._setWith, this._center, precision);
        };
        Tile.prototype.nextTile = function (direction) {
            var offset = _exports_1.Point.zero;
            if (direction === Direction_1.Direction.Right) {
                offset = new _exports_1.Point(1, 0);
            }
            else if (direction === Direction_1.Direction.Left) {
                offset = new _exports_1.Point(-1, 0);
            }
            else if (direction === Direction_1.Direction.Up) {
                offset = new _exports_1.Point(0, -1);
            }
            else if (direction === Direction_1.Direction.Down) {
                offset = new _exports_1.Point(0, 1);
            }
            var tile = new Tile();
            tile.set(this._center.add(offset.multiply(8)));
            return tile;
        };
        Tile.prototype.nextTileWrapped = function (direction) {
            var offset = _exports_1.Point.zero;
            if (direction === Direction_1.Direction.Right) {
                offset = new _exports_1.Point(1, 0);
            }
            else if (direction === Direction_1.Direction.Left) {
                offset = new _exports_1.Point(-1, 0);
            }
            else if (direction === Direction_1.Direction.Up) {
                offset = new _exports_1.Point(0, -1);
            }
            else if (direction === Direction_1.Direction.Down) {
                offset = new _exports_1.Point(0, 1);
            }
            var tile = new Tile();
            var newPos = this._center.add(offset.multiply(8));
            tile.set(newPos);
            tile = this.handleWrapping(tile);
            return tile;
        };
        Tile.prototype.handleWrapping = function (tile) {
            if (tile.index.x <= -1) {
                return Tile.fromIndex(tile.index.add(new _exports_1.Point(29, 0)));
            }
            else if (tile.index.x >= 29) {
                return Tile.fromIndex(tile.index.minus(new _exports_1.Point(29, 0)));
            }
            return tile;
        };
        Tile.toCenterCanvas = function (tilePos) {
            return tilePos.multiply(8).add(_exports_1.Point.four);
        };
        // x & y might not be a round number
        Tile.fromCell = function (x, y) {
            var centerCanvasPosition = new _exports_1.Vector2D(x, y).multiply(8);
            return centerCanvasPosition.divide(8).toPoint();
        };
        Tile.fromIndex = function (index) {
            var tile = new Tile();
            tile.set(index.multiply(8));
            return tile;
        };
        Tile.prototype.toString = function () {
            return "set with=".concat(this._setWith, ", in center=").concat(this._isInCenter, " TL=").concat(this._topLeft, ", index=").concat(this._index);
        };
        return Tile;
    }());
    exports.Tile = Tile;
});
//# sourceMappingURL=Tile.js.map