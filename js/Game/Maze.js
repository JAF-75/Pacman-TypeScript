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
define(["require", "exports", "./PowerPill", "./Direction", "./DirectionChoices", "./MainWindow", "./Tile", "./TileContent", "../Core/_exports"], function (require, exports, PowerPill_1, Direction_1, DirectionChoices_1, MainWindow_1, Tile_1, TileContent_1, _exports_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MazeBounds = exports.Maze = void 0;
    var Maze = /** @class */ (function (_super) {
        __extends(Maze, _super);
        function Maze() {
            var _this = _super.call(this) || this;
            _this._directionChoices = new DirectionChoices_1.DirectionChoices();
            _this._tickTock = true;
            _this._powerPill = new PowerPill_1.PowerPill();
            _this._timer = new _exports_1.LoopingTimer(250, function () { return _this._tickTock = !_this._tickTock; });
            _this._originalImage = document.createElement("img");
            _this._originalImage.src = "img/spritesheet.png";
            _this._whiteMazeCanvas = _exports_1.Canvas.canvasFromImage(_this._originalImage, new _exports_1.Point(228, 0), new _exports_1.Vector2D(234, 248));
            _this._offScreenCanvases = [];
            return _this;
        }
        Maze.prototype.reset = function () {
            this._offScreenCanvases = [];
            for (var i = 0; i < MainWindow_1.MainWindow.gameStats.amountOfPlayers; i++) {
                this._offScreenCanvases.push(_exports_1.Canvas.canvasFromImage(this._originalImage));
            }
        };
        Object.defineProperty(Maze.prototype, "spriteSheetPos", {
            get: function () {
                return _exports_1.Point.zero;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Maze.prototype, "size", {
            get: function () {
                return Maze.spritesheetSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Maze.prototype, "spriteSheet", {
            get: function () {
                return this._originalImage;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Maze.prototype, "origin", {
            get: function () {
                return _exports_1.Point.zero;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Maze.prototype, "position", {
            get: function () {
                return _exports_1.Point.zero;
            },
            enumerable: false,
            configurable: true
        });
        // special intersections have an extra restriction 
        // ghosts can not choose to turn upwards from these tiles.
        Maze.prototype.isSpecialIntersection = function (cell) {
            return cell.equals(Maze.specialIntersections[0]) ||
                cell.equals(Maze.specialIntersections[1]) ||
                cell.equals(Maze.specialIntersections[2]) ||
                cell.equals(Maze.specialIntersections[3]);
        };
        ;
        Maze.prototype.update = function (gameContext) {
            this._timer.run(gameContext.elapsed);
            this._powerPill.update(gameContext);
        };
        Maze.prototype.draw = function (canvas) {
            if (this._flashing) {
                if (this._tickTock) {
                    canvas.drawOtherCanvas2(this._whiteMazeCanvas, _exports_1.Point.zero);
                }
                else {
                    canvas.drawOtherCanvas2(this._offScreenCanvases[MainWindow_1.MainWindow.gameStats.currentPlayerStats.playerIndex], _exports_1.Point.zero);
                }
                return;
            }
            this.drawPowerPills();
            canvas.drawOtherCanvas2(this._offScreenCanvases[MainWindow_1.MainWindow.gameStats.currentPlayerStats.playerIndex], _exports_1.Point.zero);
            //    this.drawGrid(8, 8, canvas);
        };
        Maze.prototype.drawPowerPills = function () {
            var _this = this;
            Maze.powerPillPositions.forEach(function (p) {
                var playerStats = MainWindow_1.MainWindow.gameStats.currentPlayerStats;
                if (playerStats.levelStats.getCellContent(p.minus(_exports_1.Point.one)) === "*") {
                    _this._powerPill.position = p.multiply(8).minus(_exports_1.Point.four);
                    _this._offScreenCanvases[playerStats.playerIndex].drawSprite(_this._powerPill);
                }
            });
        };
        Maze.prototype.clearCell = function (cell) {
            var tl = Tile_1.Tile.fromIndex(cell).topLeft;
            this._offScreenCanvases[MainWindow_1.MainWindow.gameStats.currentPlayerStats.playerIndex]
                .fillRect("black", tl, _exports_1.Vector2D.eight);
        };
        Maze.prototype.isInTunnel = function (point) {
            if (point.y !== 14) {
                return false;
            }
            if (point.x <= 5) {
                return true;
            }
            if (point.x >= 22) {
                return true;
            }
            return false;
        };
        Maze.prototype.drawGrid = function (w, h, canvas) {
            var underlyingCanvas = canvas.underlyingCanvas;
            underlyingCanvas.beginPath();
            for (var x = 0; x <= underlyingCanvas.canvas.width; x += w) {
                underlyingCanvas.moveTo(x, 0);
                underlyingCanvas.lineTo(x, underlyingCanvas.canvas.height);
            }
            for (var y = 0; y <= underlyingCanvas.canvas.height; y += h) {
                underlyingCanvas.moveTo(0, y);
                underlyingCanvas.lineTo(underlyingCanvas.canvas.width, y);
            }
            underlyingCanvas.strokeStyle = "#ff0000";
            underlyingCanvas.stroke();
        };
        ;
        Maze.prototype.canContinueInDirection = function (direction, tile) {
            var nextTile = tile.nextTile(direction);
            return this.isCellNotAWall(nextTile.index);
        };
        Maze.prototype.getChoicesAtCellPosition = function (cellPos) {
            this._directionChoices.clear();
            if (this.isCellNotAWall(cellPos.add(new _exports_1.Point(-1, 0)))) {
                this._directionChoices.set(Direction_1.Direction.Left);
            }
            if (this.isCellNotAWall(cellPos.add(new _exports_1.Point(1, 0)))) {
                this._directionChoices.set(Direction_1.Direction.Right);
            }
            if (this.isCellNotAWall(cellPos.add(new _exports_1.Point(0, -1)))) {
                this._directionChoices.set(Direction_1.Direction.Up);
            }
            if (this.isCellNotAWall(cellPos.add(new _exports_1.Point(0, 1)))) {
                this._directionChoices.set(Direction_1.Direction.Down);
            }
            return this._directionChoices;
        };
        Maze.prototype.isCellNotAWall = function (cell) {
            return this.getTileContent(cell) !== TileContent_1.TileContent.Wall;
        };
        Maze.prototype.startFlashing = function () {
            this._flashing = true;
        };
        Maze.prototype.stopFlashing = function () {
            this._flashing = false;
        };
        Maze.prototype.getTileContent = function (cell) {
            var a = MainWindow_1.MainWindow.gameStats.currentPlayerStats.levelStats.getCellContent(cell);
            if (a === " ") {
                return TileContent_1.TileContent.Wall;
            }
            if (a === "o") {
                return TileContent_1.TileContent.Pill;
            }
            if (a === "*") {
                return TileContent_1.TileContent.PowerPill;
            }
            if (a === "+") {
                return TileContent_1.TileContent.Nothing;
            }
            return TileContent_1.TileContent.Nothing;
            //throw new RangeError("Cell at ${cell.x}, ${cell.y} contained '${a}' - don't know what this is!");
        };
        ;
        Maze.prototype.getTopLeftCanvasPosition = function (cellPosition) {
            return cellPosition.multiply(8);
        };
        ;
        Maze.prototype.highlightCell = function (canvas, cell, color) {
            var topLeft = this.getTopLeftCanvasPosition(cell);
            canvas.fillRect(color, topLeft.minus(_exports_1.Point.one), new _exports_1.Vector2D(9, 9));
        };
        //todo: use clamp
        Maze.prototype.constrainCell = function (cell) {
            var x = cell.x;
            var y = cell.y;
            x = x < 0 ? 0 : x;
            x = x > MazeBounds.dimensions.x ? MazeBounds.dimensions.x : x;
            y = y < 0 ? 0 : y;
            y = y > MazeBounds.dimensions.y ? MazeBounds.dimensions.y : y;
            return new _exports_1.Point(x, y);
        };
        Maze.prototype.isInPillCell = function (index) {
            return this.getTileContent(index) === TileContent_1.TileContent.Pill;
        };
        // the point where the ghost goes to just before going into chase/scatter mode
        Maze.tileHouseEntrance = Tile_1.Tile.fromIndex(new _exports_1.Point(13.5, 11));
        Maze.pixelHouseEntrancePoint = Tile_1.Tile.toCenterCanvas(new _exports_1.Vector2D(13.5, 11).toPoint());
        Maze.spritesheetSize = new _exports_1.Vector2D(224, 248);
        // the point where the ghost goes to before going up and out of the house
        Maze.pixelCenterOfHouse = Tile_1.Tile.toCenterCanvas(new _exports_1.Vector2D(13.5, 14).toPoint());
        Maze.specialIntersections = [
            new _exports_1.Point(12, 11),
            new _exports_1.Point(15, 11),
            new _exports_1.Point(12, 26),
            new _exports_1.Point(15, 26)
        ];
        Maze.powerPillPositions = [
            new _exports_1.Point(2, 4),
            new _exports_1.Point(27, 4),
            new _exports_1.Point(2, 24),
            new _exports_1.Point(27, 24)
        ];
        return Maze;
    }(_exports_1.Sprite));
    exports.Maze = Maze;
    var MazeBounds = /** @class */ (function () {
        function MazeBounds() {
        }
        MazeBounds.topLeft = _exports_1.Point.zero;
        MazeBounds.dimensions = new _exports_1.Vector2D(28, 30);
        return MazeBounds;
    }());
    exports.MazeBounds = MazeBounds;
});
//# sourceMappingURL=Maze.js.map