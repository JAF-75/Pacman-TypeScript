define(["require", "exports", "../Ghosts/_exports", "./Fruit", "./Maze", "./PacMan"], function (require, exports, _exports_1, Fruit_1, Maze_1, PacMan_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Actors = void 0;
    var Actors = /** @class */ (function () {
        function Actors() {
            this._maze = new Maze_1.Maze();
            this._maze.loadContent();
            this._pacMan = new PacMan_1.PacMan();
            this._fruit = new Fruit_1.Fruit();
            this._blinky = new _exports_1.Blinky(this._maze);
            this._pinky = new _exports_1.Pinky(this._maze);
            this._inky = new _exports_1.Inky(this._maze, this._blinky);
            this._clyde = new _exports_1.Clyde(this._maze);
            //debug:
            //        this._ghosts = [this.blinky];
            this._ghosts = [
                this._blinky, this._pinky, this._inky, this._clyde
            ];
        }
        Actors.prototype.getGhost = function (nickName) {
            var index = this._ghosts.findIndex(function (g) { return g.nickName === nickName; });
            return this._ghosts[index];
        };
        Object.defineProperty(Actors.prototype, "ghosts", {
            get: function () {
                return this._ghosts;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Actors.prototype, "pacMan", {
            get: function () {
                return this._pacMan;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Actors.prototype, "fruit", {
            get: function () {
                return this._fruit;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Actors.prototype, "maze", {
            get: function () {
                return this._maze;
            },
            enumerable: false,
            configurable: true
        });
        return Actors;
    }());
    exports.Actors = Actors;
});
//# sourceMappingURL=Actors.js.map