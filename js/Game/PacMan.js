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
define(["require", "exports", "../Core/_exports", "./Direction", "./DirectionToIndexLookup", "./Tile", "./TileContent", "./MainWindow", "./Constants", "./DemoKeyPresses", "./LifeStatus", "./KeyPressedEvent", "./FramePointers"], function (require, exports, _exports_1, Direction_1, DirectionToIndexLookup_1, Tile_1, TileContent_1, MainWindow_1, Constants_1, DemoKeyPresses_1, LifeStatus_1, KeyPressedEvent_1, FramePointers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PacMan = void 0;
    var PacMan = /** @class */ (function (_super) {
        __extends(PacMan, _super);
        function PacMan() {
            var _this = _super.call(this) || this;
            _this._spriteSize = new _exports_1.Vector2D(15, 15);
            _this._lastDemoKeyPressAt = _exports_1.Point.zero;
            _this._pillEatenAt = _exports_1.Point.zero;
            _this._speed = Constants_1.Constants.pacManBaseSpeed;
            _this._demoKeyPresses = new DemoKeyPresses_1.DemoKeyPresses();
            _this._lifeStatus = LifeStatus_1.LifeStatus.Alive;
            _this._tile = new Tile_1.Tile();
            _this._keyPress = new KeyPressedEvent_1.KeyPressedEvent();
            _this._spriteSheet = document.getElementById("spritesheet");
            _this._framePointers = new Array();
            var left = 456;
            var left2 = 472;
            _this._framePointers[Direction_1.Direction.Up] = new FramePointers_1.FramePointers(new _exports_1.Point(left, 32), new _exports_1.Point(left2, 32));
            _this._framePointers[Direction_1.Direction.Down] = new FramePointers_1.FramePointers(new _exports_1.Point(left, 48), new _exports_1.Point(left2, 48));
            _this._framePointers[Direction_1.Direction.Left] = new FramePointers_1.FramePointers(new _exports_1.Point(left, 16), new _exports_1.Point(left2, 16));
            _this._framePointers[Direction_1.Direction.Right] = new FramePointers_1.FramePointers(new _exports_1.Point(left, 0), new _exports_1.Point(left2, 0));
            _this._dyingFrames = [];
            _this._dyingFramePointer = 0;
            for (var i = 0; i < 12; i++) {
                _this._dyingFrames.push(new _exports_1.Point(489 + (i * 16), 0));
            }
            _this.reset();
            return _this;
        }
        PacMan.prototype.reset = function (isDemoMode) {
            if (isDemoMode === void 0) { isDemoMode = false; }
            this.visible = true;
            this._demoKeyPresses.reset();
            this._isDemoMode = isDemoMode;
            this._direction = Direction_1.Direction.Left;
            this._speed = Constants_1.Constants.pacManBaseSpeed;
            this._dyingFramePointer = 0;
            this.position = Tile_1.Tile.toCenterCanvas(new _exports_1.Vector2D(13.5, 23).toPoint());
            this._lifeStatus = LifeStatus_1.LifeStatus.Alive;
            this._animDirection = new _exports_1.TwoFrameAnimation(65);
            this._frame1InSpriteMap = this._framePointers[this._direction].frame1InSpriteMap;
            this._frame2InSpriteMap = this._framePointers[this._direction].frame2InSpriteMap;
            this._spriteSheetPos = this._frame1InSpriteMap;
        };
        Object.defineProperty(PacMan.prototype, "lifeStatus", {
            get: function () {
                return this._lifeStatus;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PacMan.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PacMan.prototype, "spriteSheet", {
            get: function () {
                return this._spriteSheet;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PacMan.prototype, "spriteSheetPos", {
            get: function () {
                return this._spriteSheetPos;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PacMan.prototype, "size", {
            get: function () {
                return this._spriteSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PacMan.prototype, "origin", {
            get: function () {
                return _exports_1.Point.eight;
            },
            enumerable: false,
            configurable: true
        });
        PacMan.prototype.getTile = function () {
            return this._tile;
        };
        PacMan.prototype.getDirection = function () {
            return this._direction;
        };
        PacMan.prototype.updateAnimation = function (context) {
            if (this._speed === 0) {
                return;
            }
            this._animDirection.run(context);
            this._frame1InSpriteMap = this._framePointers[this._direction].frame1InSpriteMap;
            this._frame2InSpriteMap = this._framePointers[this._direction].frame2InSpriteMap;
            if (this._animDirection.flag) {
                this._spriteSheetPos = this._frame1InSpriteMap;
            }
            else {
                this._spriteSheetPos = this._frame2InSpriteMap;
            }
        };
        PacMan.prototype.handleDying = function () {
            this._dyingFramePointer += .15;
            if (this._dyingFramePointer > this._dyingFrames.length) {
                this._lifeStatus = LifeStatus_1.LifeStatus.Dead;
            }
            else {
                this._spriteSheetPos = this._dyingFrames[Math.floor(this._dyingFramePointer)];
            }
        };
        Object.defineProperty(PacMan.prototype, "isDead", {
            get: function () {
                return this._lifeStatus === LifeStatus_1.LifeStatus.Dead;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PacMan.prototype, "isAlive", {
            get: function () {
                return this._lifeStatus === LifeStatus_1.LifeStatus.Alive;
            },
            enumerable: false,
            configurable: true
        });
        PacMan.prototype.startDying = function () {
            this._lifeStatus = LifeStatus_1.LifeStatus.Dying;
        };
        PacMan.prototype.startDigesting = function () {
            this._lifeStatus = LifeStatus_1.LifeStatus.BeingDigested;
        };
        PacMan.prototype.update = function (context) {
            if (this._lifeStatus === LifeStatus_1.LifeStatus.BeingDigested) {
                return;
            }
            if (this._lifeStatus === LifeStatus_1.LifeStatus.Dying || this._lifeStatus === LifeStatus_1.LifeStatus.Dead) {
                this.handleDying();
                return;
            }
            this.updateAnimation(context);
            if (this._tile.isNearCenter(4)) {
                this.recordInput(context);
                this.recentreInLane();
                this.handleDirection();
            }
            if (this._tile.isNearCenter(1.5)) {
                //this.position = this.tile.center;
                this.handleWhatIsUnderCell(context);
                this.handleWrapping();
                var can = MainWindow_1.MainWindow.actors.maze.canContinueInDirection(this._direction, this._tile);
                if (!can) {
                    this._speed = 0;
                }
                else {
                    //cheat
                    //this.speed = 1;
                    this._speed = Constants_1.Constants.pacManBaseSpeed;
                }
            }
            var speed = this._speed;
            var levelProps = MainWindow_1.MainWindow.gameStats.currentPlayerStats.levelStats.levelProps;
            var inPillCell = this._tile.index.equals(this._pillEatenAt);
            var pcToUse = inPillCell ? levelProps.pacManDotsSpeedPc : levelProps.pacManSpeedPc;
            if (MainWindow_1.MainWindow.gameStats.currentPlayerStats.isInFrightSession) {
                pcToUse = inPillCell ? levelProps.frightPacManDotSpeedPc : levelProps.frightPacManSpeedPc;
            }
            if (!inPillCell) {
                this._pillEatenAt = _exports_1.Point.zero;
            }
            speed = speed * (pcToUse / 100);
            var offset = DirectionToIndexLookup_1.DirectionToIndexLookup.indexVectorFor(this._direction).multiply(speed);
            this.position = this.position.add(offset.toPoint());
        };
        Object.defineProperty(PacMan.prototype, "position", {
            get: function () {
                return this._canvasPosition;
            },
            set: function (pos) {
                this._canvasPosition = pos;
                this._tile.set(pos);
            },
            enumerable: false,
            configurable: true
        });
        PacMan.prototype.pillEaten = function () {
            //this._justEatenPill = true;
            this._pillEatenAt = this._tile.index;
        };
        PacMan.prototype.handleWrapping = function () {
            var nextTile = this._tile.nextTile(this._direction);
            if (nextTile.index.x < -1) {
                var newPos = Tile_1.Tile.fromIndex(nextTile.index.add(new _exports_1.Point(30, 0)));
                this._canvasPosition = newPos.center;
                this._tile.set(this._canvasPosition);
            }
            else if (nextTile.index.x > 29) {
                var newPos = Tile_1.Tile.fromIndex(nextTile.index.minus(new _exports_1.Point(30, 0)));
                this._canvasPosition = newPos.center;
                this._tile.set(this._canvasPosition);
            }
        };
        PacMan.prototype.handleDirection = function () {
            if (MainWindow_1.MainWindow.actors.maze.canContinueInDirection(this._keyPress.direction, this._tile)) {
                //console.info(this.keyPress.direction);
                this._direction = this._keyPress.direction;
            }
        };
        PacMan.prototype.handleWhatIsUnderCell = function (gameContext) {
            var contents = MainWindow_1.MainWindow.actors.maze.getTileContent(this._tile.index);
            if (contents === TileContent_1.TileContent.Pill) {
                MainWindow_1.MainWindow.actors.maze.clearCell(this._tile.index);
                MainWindow_1.MainWindow.pillEaten(this._tile.index);
            }
            if (contents === TileContent_1.TileContent.PowerPill) {
                MainWindow_1.MainWindow.actors.maze.clearCell(this._tile.index);
                MainWindow_1.MainWindow.powerPillEaten(this._tile.index);
            }
        };
        PacMan.prototype.recordInput = function (context) {
            var requestedDirection = this._direction;
            if (this._isDemoMode) {
                if (this._tile.isNearCenter(4) && !this._tile.index.equals(this._lastDemoKeyPressAt)) {
                    var choices = MainWindow_1.MainWindow.actors.maze.getChoicesAtCellPosition(this._tile.index);
                    choices.unset(this._direction);
                    if (this._direction === Direction_1.Direction.Left) {
                        choices.unset(Direction_1.Direction.Right);
                    }
                    if (this._direction === Direction_1.Direction.Right) {
                        choices.unset(Direction_1.Direction.Left);
                    }
                    if (this._direction === Direction_1.Direction.Up) {
                        choices.unset(Direction_1.Direction.Down);
                    }
                    if (this._direction === Direction_1.Direction.Down) {
                        choices.unset(Direction_1.Direction.Up);
                    }
                    if (choices.possibilities >= 1) {
                        requestedDirection = this._demoKeyPresses.next();
                        this._keyPress.when = context.totalGameTime;
                        this._keyPress.direction = requestedDirection;
                        this._lastDemoKeyPressAt = this._tile.index;
                    }
                }
            }
            else {
                if (_exports_1.GameContext.keyboard.isKeyDown(_exports_1.Keyboard.right)) {
                    requestedDirection = Direction_1.Direction.Right;
                }
                else if (_exports_1.GameContext.keyboard.isKeyDown(_exports_1.Keyboard.left)) {
                    requestedDirection = Direction_1.Direction.Left;
                }
                else if (_exports_1.GameContext.keyboard.isKeyDown(_exports_1.Keyboard.down)) {
                    requestedDirection = Direction_1.Direction.Down;
                }
                else if (_exports_1.GameContext.keyboard.isKeyDown(_exports_1.Keyboard.up)) {
                    requestedDirection = Direction_1.Direction.Up;
                }
            }
            this._keyPress.direction = requestedDirection;
            this._keyPress.when = context.totalGameTime;
        };
        PacMan.prototype.draw = function (canvas) {
            if (this.visible) {
                canvas.drawSprite(this);
            }
        };
        //debt: SD: refactor into something common as this is also used for the ghosts
        PacMan.prototype.recentreInLane = function () {
            var tileCenter = this._tile.center;
            var speed = this._speed;
            if (this._direction === Direction_1.Direction.Down || this._direction === Direction_1.Direction.Up) {
                var wayToMove = new _exports_1.Point(speed, 0);
                if (this.position.x > tileCenter.x) {
                    this.position = this.position.minus(wayToMove);
                    this.position = new _exports_1.Point(Math.max(this.position.x, tileCenter.x), this.position.y);
                }
                else if (this.position.x < tileCenter.x) {
                    this.position = this.position.add(wayToMove);
                    this.position = new _exports_1.Point(Math.min(this.position.x, tileCenter.x), this.position.y);
                }
            }
            if (this._direction === Direction_1.Direction.Left || this._direction === Direction_1.Direction.Right) {
                var wayToMove = new _exports_1.Point(0, speed);
                if (this.position.y > tileCenter.y) {
                    this.position = this.position.minus(wayToMove);
                    this.position = new _exports_1.Point(this.position.x, Math.max(this.position.y, tileCenter.y));
                }
                else if (this.position.y < tileCenter.y) {
                    this.position = this.position.add(wayToMove);
                    this.position = new _exports_1.Point(this.position.x, Math.min(this.position.y, tileCenter.y));
                }
            }
        };
        PacMan.facingLeftSpritesheetPos = new _exports_1.Point(455, 16);
        return PacMan;
    }(_exports_1.Sprite));
    exports.PacMan = PacMan;
});
//# sourceMappingURL=PacMan.js.map