define(["require", "exports", "../Game/_exports", "../Core/_exports", "../Ghosts/_exports", "./ActUpdateResult", "./AttractScenePacMan", "./AttractGhost", "./StartEndPos"], function (require, exports, _exports_1, _exports_2, _exports_3, ActUpdateResult_1, AttractScenePacMan_1, AttractGhost_1, StartEndPos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChaseSubAct = void 0;
    var TimerList = /** @class */ (function () {
        function TimerList() {
            this._timers = [];
        }
        TimerList.prototype.add = function (timer) {
            this._timers.push(timer);
        };
        TimerList.prototype.update = function (context) {
            this._timers.forEach(function (s) { return s.run(context.elapsed); });
            for (var i = this._timers.length - 1; i >= 0; i--) {
                if (this._timers[i].finished) {
                    this._timers.splice(i, 1);
                    break;
                }
            }
        };
        return TimerList;
    }());
    var ChaseSubAct = /** @class */ (function () {
        function ChaseSubAct() {
            var _this = this;
            this._legendVisible = false;
            this._copyrightVisible = false;
            this._ghostsChasing = false;
            this._finished = false;
            this._tempTimers = new TimerList();
            this._ready = false;
            this._ghostScore = 200;
            this._tempSprites = new _exports_1.TimedSpriteList();
            this._ghosts = [];
            this._timers = [];
            var justOffScreen = new _exports_2.Point(250, 140);
            this._ghostEatenTimer = new _exports_2.EggTimer(0, function () { });
            this._ghostTimer = new _exports_2.EggTimer(5000, function () { _this.reverseChase(); });
            this._pacTimer = new _exports_2.EggTimer(5100, function () { });
            this._powerPillToEat = new _exports_1.PowerPill();
            this._powerPillToEat.visible = false;
            this._powerPillToEat.position = new _exports_2.Point(30, justOffScreen.y + 4);
            this._pillLegend = new _exports_1.Pill();
            this._pillLegend.position = new _exports_2.Point(70, 178);
            this._powerPillLegend = new _exports_1.PowerPill();
            this._powerPillLegend.position = new _exports_2.Point(70, 188);
            this._pacMan = new AttractScenePacMan_1.AttractScenePacMan();
            this._pacMan.direction = _exports_1.Direction.Left;
            this._blinky = new AttractGhost_1.AttractGhost(_exports_3.GhostNickname.Blinky, _exports_1.Direction.Left);
            this._pinky = new AttractGhost_1.AttractGhost(_exports_3.GhostNickname.Pinky, _exports_1.Direction.Left);
            this._inky = new AttractGhost_1.AttractGhost(_exports_3.GhostNickname.Inky, _exports_1.Direction.Left);
            this._clyde = new AttractGhost_1.AttractGhost(_exports_3.GhostNickname.Clyde, _exports_1.Direction.Left);
            this._ghosts.push(this._blinky);
            this._ghosts.push(this._pinky);
            this._ghosts.push(this._inky);
            this._ghosts.push(this._clyde);
            var gap = new _exports_2.Point(16, 0);
            this._pacPositions = new StartEndPos_1.StartEndPos(justOffScreen, new _exports_2.Point(30, justOffScreen.y));
            this._pacMan.position = this._pacPositions.start;
            this._ghostPositions = {};
            var startPos = justOffScreen.add(new _exports_2.Point(50, 0));
            var endPos = new _exports_2.Point(50, justOffScreen.y);
            this._blinky.position = startPos;
            this._ghostPositions[this._blinky.nickName] = new StartEndPos_1.StartEndPos(startPos, endPos);
            startPos = startPos.add(gap);
            endPos = endPos.add(gap);
            this._pinky.position = startPos;
            this._ghostPositions[this._pinky.nickName] = new StartEndPos_1.StartEndPos(startPos, endPos);
            startPos = startPos.add(gap);
            endPos = endPos.add(gap);
            this._inky.position = startPos;
            this._ghostPositions[this._inky.nickName] = new StartEndPos_1.StartEndPos(startPos, endPos);
            startPos = startPos.add(gap);
            endPos = endPos.add(gap);
            this._clyde.position = startPos;
            this._ghostPositions[this._clyde.nickName] = new StartEndPos_1.StartEndPos(startPos, endPos);
            this._tempTimers.add(new _exports_2.EggTimer(1000, function () { return _this._legendVisible = true; }));
            this._tempTimers.add(new _exports_2.EggTimer(3000, function () {
                _this._powerPillToEat.visible = true;
                _this._copyrightVisible = true;
            }));
            this._tempTimers.add(new _exports_2.EggTimer(4500, function () {
                _this._ghostsChasing = true;
            }));
        }
        ChaseSubAct.prototype.go = function () {
            this._ready = true;
        };
        ChaseSubAct.prototype.update = function (gameContext) {
            var _this = this;
            if (this._finished) {
                return ActUpdateResult_1.ActUpdateResult.Finished;
            }
            this._tempTimers.update(gameContext);
            if (this._ghostsChasing) {
                this._powerPillLegend.update(gameContext);
                this._powerPillToEat.update(gameContext);
                this._ghostTimer.run(gameContext.elapsed);
                this._pacTimer.run(gameContext.elapsed);
                this._ghostEatenTimer.run(gameContext.elapsed);
            }
            this._pillLegend.update(gameContext);
            this._tempSprites.update(gameContext);
            this.lerpPacMan();
            this._ghosts.forEach(function (g) {
                if (!g.alive) {
                    return;
                }
                _this.lerpGhost(g);
                g.update(gameContext);
                if (_exports_2.Point.areNear(_this._pacMan.position, g.position, 2)) {
                    _this.ghostEaten(g);
                    if (g.nickName === _exports_3.GhostNickname.Clyde) {
                        _this._tempTimers.add(new _exports_2.EggTimer(1000, function () {
                            _this._finished = true;
                        }));
                    }
                }
                ;
            });
            this._pacMan.update(gameContext);
            return ActUpdateResult_1.ActUpdateResult.Running;
        };
        ChaseSubAct.prototype.draw = function (canvas) {
            this._powerPillToEat.draw(canvas);
            if (this._legendVisible) {
                this._powerPillLegend.draw(canvas);
                this._pillLegend.draw(canvas);
                canvas.drawText("10 pts", "white", new _exports_2.Point(80, 170));
                canvas.drawText("50 pts", "white", new _exports_2.Point(80, 180));
            }
            if (this._copyrightVisible) {
                canvas.drawText("© 1980 midway mfg. co.", "white", new _exports_2.Point(10, 220));
            }
            if (this._ready) {
            }
            this._tempSprites.draw(canvas);
            this._ghosts.forEach(function (g) {
                if (g.alive) {
                    g.draw(canvas);
                }
            });
            this._pacMan.draw(canvas);
        };
        ChaseSubAct.prototype.ghostEaten = function (ghost) {
            var _this = this;
            ghost.alive = false;
            this._pacMan.visible = false;
            this._ghostTimer.pause();
            this._pacTimer.pause();
            this.showScore(ghost.position, this._ghostScore);
            this._ghostScore *= 2;
            this._ghostEatenTimer = new _exports_2.EggTimer(1000, function () {
                _this._ghostTimer.resume();
                _this._pacTimer.resume();
                _this._pacMan.visible = true;
            });
        };
        ChaseSubAct.prototype.showScore = function (pos, amount) {
            this._tempSprites.add(new _exports_1.TimedSprite(900, new _exports_1.ScoreSprite(pos, amount)));
        };
        ChaseSubAct.prototype.lerpGhost = function (ghost) {
            var pc = this._ghostTimer.progress / 100;
            var positions = this._ghostPositions[ghost.nickName];
            ghost.position = _exports_2.Point.lerp(positions.start, positions.end, pc);
        };
        ChaseSubAct.prototype.lerpPacMan = function () {
            var pc = this._pacTimer.progress / 100;
            this._pacMan.position = _exports_2.Point.lerp(this._pacPositions.start, this._pacPositions.end, pc);
        };
        ChaseSubAct.prototype.reverseChase = function () {
            var _this = this;
            this._powerPillToEat.visible = false;
            this._ghostTimer = new _exports_2.EggTimer(12000, function () { });
            this._pacTimer = new _exports_2.EggTimer(6000, function () { });
            var s = new _exports_1.LevelStats(0);
            var sess = new _exports_1.GhostFrightSession(s.levelProps);
            this._ghosts.forEach(function (g) {
                g.direction.update(_exports_1.Direction.Right);
                g.frightSession = sess;
                g.setFrightened();
                _this._ghostPositions[g.nickName] = _this._ghostPositions[g.nickName].reverse();
            });
            this._pacPositions = this._pacPositions.reverse();
            this._pacMan.direction = _exports_1.Direction.Right;
        };
        return ChaseSubAct;
    }());
    exports.ChaseSubAct = ChaseSubAct;
});
//# sourceMappingURL=ChaseSubAct.js.map