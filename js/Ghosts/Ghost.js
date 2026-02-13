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
define(["require", "exports", "../Core/_exports", "../Game/_exports", "./GhostEyesBackToHouseMover", "./GhostInsideHouseMover", "./GhostScatterMover", "./GhostChaseMover", "./SimpleGhost", "./GhostState", "./GhostFrightenedMover", "./DirectionInfo", "./GhostMovementMode"], function (require, exports, _exports_1, _exports_2, GhostEyesBackToHouseMover_1, GhostInsideHouseMover_1, GhostScatterMover_1, GhostChaseMover_1, SimpleGhost_1, GhostState_1, GhostFrightenedMover_1, DirectionInfo_1, GhostMovementMode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ghost = void 0;
    var Ghost = /** @class */ (function (_super) {
        __extends(Ghost, _super);
        function Ghost(name, nickName, maze, _startingPoint, _startingDirection) {
            var _this = _super.call(this, nickName, _startingDirection) || this;
            _this.name = name;
            _this.nickName = nickName;
            _this.maze = maze;
            _this._startingPoint = _startingPoint;
            _this._startingDirection = _startingDirection;
            _this.directionLookup = new _exports_2.DirectionToIndexLookup();
            _this.getSpeed = function () {
                if (_this._movementMode === GhostMovementMode_1.GhostMovementMode.InHouse) {
                    return .25;
                }
                if (_this._state === GhostState_1.GhostState.Eyes) {
                    return 2;
                }
                var levelProps = _exports_2.MainWindow.gameStats.currentPlayerStats.levelStats.levelProps;
                var baseSpeed = _exports_2.Constants.ghostBaseSpeed;
                if (_this._state === GhostState_1.GhostState.Frightened) {
                    return baseSpeed * (levelProps.frightGhostSpeedPc / 100);
                }
                if (_this.maze.isInTunnel(_this._tile.index)) {
                    return baseSpeed * (levelProps.ghostTunnelSpeedPc / 100);
                }
                return baseSpeed * (_this.getNormalGhostSpeedPercent() / 100);
            };
            _this.moveForwards = function () {
                var v = _exports_2.DirectionToIndexLookup.indexVectorFor(_this.direction.currentDirection).multiply(_this.getSpeed());
                _this.position = _this.canvasPos.add(v.toPoint());
            };
            _this.handleWrapping = function () {
                var nextTile = _this._tile.nextTile(_this.direction.currentDirection);
                if (nextTile.index.x < -1) {
                    var newPos = _exports_2.Tile.fromIndex(nextTile.index.add(new _exports_1.Point(29, 0)));
                    _this.canvasPos = newPos.center;
                    _this._tile.set(_this.canvasPos);
                }
                else if (nextTile.index.x > 29) {
                    var newPos = _exports_2.Tile.fromIndex(nextTile.index.minus(new _exports_1.Point(29, 0)));
                    _this.canvasPos = newPos.center;
                    _this._tile.set(_this.canvasPos);
                }
            };
            _this._tile = new _exports_2.Tile();
            return _this;
        }
        Ghost.prototype.powerPillEaten = function (session) {
            var _this = this;
            _super.prototype.powerPillEaten.call(this, session);
            if (this._state === GhostState_1.GhostState.Eyes) {
                return;
            }
            this._state = GhostState_1.GhostState.Frightened;
            if (this._movementMode === GhostMovementMode_1.GhostMovementMode.Chase || this._movementMode === GhostMovementMode_1.GhostMovementMode.Scatter) {
                this._whenInCenterOfNextTile = function () {
                    var currentDirection = _this.direction.currentDirection;
                    if (currentDirection === _exports_2.Direction.Up) {
                        _this.direction.update(_exports_2.Direction.Down);
                    }
                    else if (_this.direction.currentDirection === _exports_2.Direction.Down) {
                        _this.direction.update(_exports_2.Direction.Up);
                    }
                    else if (_this.direction.currentDirection === _exports_2.Direction.Left) {
                        _this.direction.update(_exports_2.Direction.Right);
                    }
                    else if (_this.direction.currentDirection === _exports_2.Direction.Right) {
                        _this.direction.update(_exports_2.Direction.Left);
                    }
                    _this.mover = new GhostFrightenedMover_1.GhostFrightenedMover(_this, _this.maze);
                };
            }
        };
        Ghost.prototype.setMovementMode = function (mode) {
            this._movementMode = mode;
        };
        Ghost.prototype.reset = function () {
            this.visible = true;
            this._isMoving = true;
            this._isAnimating = true;
            this._state = GhostState_1.GhostState.Normal;
            this._movementMode = GhostMovementMode_1.GhostMovementMode.InHouse;
            this._whenInCenterOfNextTile = function () { };
            this._tile.set(_exports_2.Tile.toCenterCanvas(this._startingPoint));
            this.canvasPos = this._tile.center;
            this.direction = new DirectionInfo_1.DirectionInfo(this._startingDirection, this._startingDirection);
            this._spritesheetPos = this.spritesheetInfoNormal.getSourcePosition(this.direction.nextDirection, true);
        };
        Object.defineProperty(Ghost.prototype, "offsetInHouse", {
            get: function () {
                return this.houseOffset;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ghost.prototype, "position", {
            get: function () {
                return this.canvasPos;
            },
            set: function (pos) {
                var diffAsPoint = pos.minus(this.canvasPos);
                var diff = diffAsPoint.toVector2D();
                if (diff.equals(_exports_1.Vector2D.zero)) {
                    return;
                }
                this.canvasPos = pos;
                this._tile.set(pos);
                this.handleWrapping();
            },
            enumerable: false,
            configurable: true
        });
        Ghost.prototype.recentreInLane = function () {
            if (!(this._movementMode === GhostMovementMode_1.GhostMovementMode.Chase || this._movementMode === GhostMovementMode_1.GhostMovementMode.Scatter)) {
                return;
            }
            var tileCenter = this._tile.center;
            var speed = this.getSpeed();
            var currentDirection = this.direction.currentDirection;
            if (currentDirection === _exports_2.Direction.Down || currentDirection === _exports_2.Direction.Up) {
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
            if (currentDirection === _exports_2.Direction.Left || currentDirection === _exports_2.Direction.Right) {
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
        // virtual (Blinky has different speeds depending on how many dots are left)
        Ghost.prototype.getNormalGhostSpeedPercent = function () {
            return _exports_2.MainWindow.gameStats.currentPlayerStats.levelStats.levelProps.ghostSpeedPc;
        };
        Ghost.prototype.getTile = function () {
            return this._tile;
        };
        Object.defineProperty(Ghost.prototype, "direction", {
            get: function () {
                return this._direction;
            },
            set: function (directionInfo) {
                // FROM https://msdn.microsoft.com/en-gb/magazine/dn890374.aspx
                // There's no way to prevent some members from not being inherited.
                // A derived class inherits all members of the base class, including 
                // public and private members (all public members of the base class 
                // are overrideable while private members are not). To override a 
                // public member, simply define a member in the derived class with 
                // the same signature.While you can use the super keyword to access 
                // a public method from a derived class, you can't access a property 
                // in the base class using super (though you can override the property).
                this._direction = directionInfo;
                this._velocity = _exports_2.DirectionToIndexLookup.indexVectorFor(directionInfo.currentDirection).multiply(this.getSpeed());
            },
            enumerable: false,
            configurable: true
        });
        Ghost.prototype.stopMoving = function () {
            this._isMoving = false;
        };
        Ghost.prototype.stopAnimating = function () {
            this._isAnimating = false;
        };
        Ghost.prototype.update = function (context) {
            _super.prototype.update.call(this, context);
            if (!this._isMoving) {
                return;
            }
            this.recentreInLane();
            this.collisionDetection();
            if (this._tile.isInCenter) {
                this._whenInCenterOfNextTile();
                this._whenInCenterOfNextTile = function () { };
            }
            this.setMoverAndMode();
            this.mover.update(context);
            if (this._state === GhostState_1.GhostState.Frightened) {
                if (_exports_2.MainWindow.gameStats.currentPlayerStats.frightSession.isFinished) {
                    this._state = GhostState_1.GhostState.Normal;
                }
            }
        };
        Ghost.prototype.setNextScatterOrChaseMoverAndMode = function () {
            var nextMode = _exports_2.MainWindow.gameStats.currentPlayerStats.ghostMoveConductor.currentMode;
            if (this._movementMode === nextMode) {
                return;
            }
            this._movementMode = nextMode;
            if (this._movementMode === GhostMovementMode_1.GhostMovementMode.Scatter) {
                this.mover = new GhostScatterMover_1.GhostScatterMover(this, this.maze);
                return;
            }
            if (this._movementMode === GhostMovementMode_1.GhostMovementMode.Chase) {
                this.mover = new GhostChaseMover_1.GhostChaseMover(this, this.maze);
                return;
            }
            throw new Error("Don't know what mover to create!");
        };
        Ghost.prototype.setMoverAndMode = function () {
            var isScatterOrChase = this._movementMode === GhostMovementMode_1.GhostMovementMode.Undecided
                || this._movementMode === GhostMovementMode_1.GhostMovementMode.Chase
                || this._movementMode === GhostMovementMode_1.GhostMovementMode.Scatter;
            if (isScatterOrChase) {
                this.setNextScatterOrChaseMoverAndMode();
                return;
            }
            if (this._movementMode === this.mover.movementMode) {
                return;
            }
            //sets ghost movement mode to unknown at end
            if (this._movementMode === GhostMovementMode_1.GhostMovementMode.InHouse) {
                this._state = GhostState_1.GhostState.Normal;
                this.mover = new GhostInsideHouseMover_1.GhostInsideHouseMover(this, this.maze);
                return;
            }
            if (this._movementMode === GhostMovementMode_1.GhostMovementMode.GoingToHouse) {
                this.mover = new GhostEyesBackToHouseMover_1.GhostEyesBackToHouseMover(this, this.maze);
                return;
            }
            //sets ghost movement mode to unknown at end
            if (this._movementMode === GhostMovementMode_1.GhostMovementMode.Frightened) {
                this.mover = new GhostFrightenedMover_1.GhostFrightenedMover(this, this.maze);
                return;
            }
            throw new Error("Don't know what mover to create and set!");
        };
        Ghost.prototype.collisionDetection = function () {
            if (this._tile.index.equals(_exports_2.MainWindow.actors.pacMan.getTile().index)) {
                if (this._state === GhostState_1.GhostState.Normal) {
                    //cheat:
                    if (_exports_1.GameContext.keyboard.isKeyDown(_exports_1.Keyboard.five)) {
                        _exports_2.MainWindow.pacManEaten();
                    }
                    //cheat
                    _exports_2.MainWindow.pacManEaten();
                }
                if (this._state === GhostState_1.GhostState.Frightened) {
                    _exports_2.MainWindow.ghostEaten(this);
                    this._state = GhostState_1.GhostState.Eyes;
                    this._movementMode = GhostMovementMode_1.GhostMovementMode.GoingToHouse;
                }
            }
        };
        return Ghost;
    }(SimpleGhost_1.SimpleGhost));
    exports.Ghost = Ghost;
});
//# sourceMappingURL=Ghost.js.map