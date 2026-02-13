define(["require", "exports", "./Vector2D", "./Point"], function (require, exports, Vector2D_1, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Canvas = void 0;
    var Canvas = /** @class */ (function () {
        function Canvas(_topLeft, _canvasRenderContext) {
            this._topLeft = _topLeft;
            this._canvasRenderContext = _canvasRenderContext;
            this._canvasRenderContext.font = "10px Joystix";
        }
        Canvas.prototype.setFont = function (font) {
            this._canvasRenderContext.font = font;
        };
        Canvas.canvasFromImage = function (image, imageOffset, imageSize) {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var oldContext = (canvas.getContext("2d"));
            if (imageOffset === undefined) {
                imageOffset = Point_1.Point.zero;
            }
            if (imageSize === undefined) {
                imageSize = new Vector2D_1.Vector2D(image.width, image.height);
            }
            oldContext.drawImage(image, imageOffset.x, imageOffset.y, imageSize.x, imageSize.y, 0, 0, imageSize.x, imageSize.y);
            return new Canvas(Point_1.Point.zero, oldContext);
        };
        Canvas.createOffscreenCanvas = function (size) {
            var c = document.createElement("canvas");
            c.width = size.x;
            c.height = size.y;
            var ctx = c.getContext("2d");
            ctx.scale(3, 3);
            return new Canvas(Point_1.Point.zero, ctx);
        };
        Object.defineProperty(Canvas.prototype, "underlyingCanvas", {
            get: function () {
                return this._canvasRenderContext;
            },
            enumerable: false,
            configurable: true
        });
        Canvas.prototype.drawOtherCanvas = function (otherCanvas, position) {
            position = position.add(this._topLeft);
            var image = otherCanvas._canvasRenderContext.getImageData(Point_1.Point.zero.x, Point_1.Point.zero.y, otherCanvas.width, otherCanvas.height);
            this._canvasRenderContext.putImageData(image, position.x, position.y);
        };
        Canvas.prototype.drawOtherCanvas2 = function (otherCanvas, position) {
            position = position.add(this._topLeft);
            this._canvasRenderContext.drawImage(otherCanvas._canvasRenderContext.canvas, position.x, position.y);
        };
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this._canvasRenderContext.canvas.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this._canvasRenderContext.canvas.height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "size", {
            get: function () {
                return new Vector2D_1.Vector2D(this.width, this.height);
            },
            enumerable: false,
            configurable: true
        });
        Canvas.prototype.drawText = function (input, color, where) {
            where = where.add(this._topLeft);
            this._canvasRenderContext.fillStyle = color;
            this._canvasRenderContext.textBaseline = "top";
            this._canvasRenderContext.fillText(input, where.x, where.y);
        };
        Canvas.prototype.drawSprite = function (sprite) {
            var topLeft = sprite.position.minus(sprite.origin);
            topLeft = topLeft.add(this._topLeft);
            var spriteSheetPos = sprite.spriteSheetPos;
            this._canvasRenderContext.drawImage(sprite.spriteSheet, spriteSheetPos.x, spriteSheetPos.y, sprite.size.x, sprite.size.y, topLeft.x, topLeft.y, sprite.size.x, sprite.size.y);
        };
        Canvas.prototype.draw = function (position, origin, size, spriteSheetPos, spriteSheet) {
            var topLeft = position.minus(origin);
            topLeft = topLeft.add(this._topLeft);
            this._canvasRenderContext.drawImage(spriteSheet, spriteSheetPos.x, spriteSheetPos.y, size.x, size.y, topLeft.x, topLeft.y, size.x, size.y);
        };
        Canvas.prototype.fillRect = function (color, topLeft, size) {
            this._canvasRenderContext.fillStyle = "black";
            topLeft = topLeft.add(this._topLeft);
            this._canvasRenderContext.fillRect(topLeft.x, topLeft.y, size.x, size.y);
        };
        Canvas.prototype.drawRect = function (sprite, color) {
            var topLeft = sprite.position.minus(sprite.origin);
            topLeft = topLeft.add(this._topLeft);
            this._canvasRenderContext.beginPath();
            this._canvasRenderContext.rect(topLeft.x, topLeft.y, sprite.size.x, sprite.size.y);
            this._canvasRenderContext.lineWidth = .5;
            this._canvasRenderContext.strokeStyle = color;
            this._canvasRenderContext.stroke();
        };
        Canvas.scale = 3;
        Canvas.fontName = "10px joytstix";
        return Canvas;
    }());
    exports.Canvas = Canvas;
});
//# sourceMappingURL=Canvas.js.map