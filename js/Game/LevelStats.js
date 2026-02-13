define(["require", "exports", "../Ghosts/GhostsLevelPatternProperties", "./IntroCutScene", "./FruitItem", "./LevelProps", "./FruitSession"], function (require, exports, GhostsLevelPatternProperties_1, IntroCutScene_1, FruitItem_1, LevelProps_1, FruitSession_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelStats = void 0;
    // perfect game at https://www.bing.com/videos/search?q=Perfect+Pac+Man&&view=detail&mid=AE586ACE933BE975ADD9AE586ACE933BE975ADD9&FORM=VRDGAR
    // cut scene 1 at 2:47
    // cut scene 2 at 6:50
    // cut scene 3 at 12:16 (snail thing)
    //
    // max level 21
    var LevelStats = /** @class */ (function () {
        function LevelStats(levelNumber) {
            var _this = this;
            this.levelNumber = levelNumber;
            this._pillsRemaining = LevelStats.startingAmountOfPills;
            //this._pillsRemaining = 20;
            this._currentMap = [];
            LevelStats.map.forEach(function (r) { return _this._currentMap.push(r); });
            var props = LevelStats.levelProps[levelNumber];
            this._fruitSession = new FruitSession_1.FruitSession(props.fruit, props.fruitPoints);
        }
        Object.defineProperty(LevelStats.prototype, "fruitSession", {
            get: function () {
                return this._fruitSession;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LevelStats.prototype, "pillsRemaining", {
            get: function () {
                return this._pillsRemaining;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LevelStats.prototype, "pillsEaten", {
            get: function () {
                return LevelStats.startingAmountOfPills - this._pillsRemaining;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LevelStats.prototype, "levelProps", {
            get: function () {
                var index = Math.min(this.levelNumber, 20);
                return LevelStats.levelProps[index];
            },
            enumerable: false,
            configurable: true
        });
        LevelStats.prototype.getLevelProps = function (level) {
            return LevelStats.levelProps[level];
        };
        LevelStats.prototype.getGhostPatternProperties = function () {
            var p = new GhostsLevelPatternProperties_1.GhostsLevelPatternProperties();
            //debug:
            // if (this.levelNumber === 0) {
            //     p.Scatter1 = 111117;
            //     p.Chase1 = 20;
            //     p.Scatter2 = 7;
            //     p.Chase2 = 20;
            //     p.Scatter3 = 5;
            //     p.Chase3 = 20;
            //     p.Scatter4 = 5;
            //     p.Chase4 = Number.MAX_VALUE;
            //     return p;
            // }
            if (this.levelNumber === 0) {
                p.scatter1 = 7;
                p.chase1 = 20;
                p.scatter2 = 7;
                p.chase2 = 20;
                p.scatter3 = 5;
                p.chase3 = 20;
                p.scatter4 = 5;
                p.chase4 = Number.MAX_VALUE;
                return p;
            }
            if (this.levelNumber >= 1 && this.levelNumber <= 3) {
                p.scatter1 = 7;
                p.chase1 = 20;
                p.scatter2 = 7;
                p.chase2 = 20;
                p.scatter3 = 5;
                p.chase3 = 1033;
                p.scatter4 = 0;
                p.chase4 = Number.MAX_VALUE;
                return p;
            }
            p.scatter1 = 5;
            p.chase1 = 20;
            p.scatter2 = 7;
            p.chase2 = 20;
            p.scatter3 = 5;
            p.chase3 = 1037;
            p.scatter4 = 0;
            p.chase4 = Number.MAX_VALUE;
            return p;
        };
        LevelStats.prototype.pillEaten = function (cellPosition) {
            this._fruitSession.pillEaten();
            --this._pillsRemaining;
            var oldString = this._currentMap[cellPosition.y];
            var newString = this.replaceCharacter(oldString, "+", cellPosition.x);
            this._currentMap[cellPosition.y] = newString;
        };
        LevelStats.prototype.getCellContent = function (point) {
            return this._currentMap[point.y].charAt(point.x);
        };
        LevelStats.prototype.replaceCharacter = function (source, replacement, positon) {
            return source.substr(0, positon) + replacement + source.substr(positon + replacement.length);
        };
        LevelStats.levelProps = [
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Cherry, 300, 80, 71, 80, 40, 30, 90, 15, 95, 90, 79, 50, 6, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Strawberry, 300, 90, 79, 85, 45, 30, 90, 15, 95, 95, 83, 55, 5, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.BigPac, FruitItem_1.FruitItem.Peach, 500, 90, 79, 85, 45, 40, 90, 20, 95, 95, 83, 55, 4, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Peach, 500, 90, 79, 85, 45, 40, 90, 20, 95, 95, 83, 55, 3, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Apple, 700, 100, 87, 95, 50, 40, 100, 20, 105, 100, 87, 60, 2, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.GhostSnagged, FruitItem_1.FruitItem.Apple, 700, 100, 87, 95, 50, 50, 100, 25, 105, 100, 87, 60, 2, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Grape, 1000, 100, 87, 95, 50, 50, 100, 25, 105, 100, 87, 60, 2, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Grape, 1000, 100, 87, 95, 50, 50, 100, 25, 105, 100, 87, 60, 1, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Galaxian, 2000, 100, 87, 95, 50, 60, 100, 30, 105, 100, 87, 60, 5, 3),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.TornGhostAndWorm, FruitItem_1.FruitItem.Galaxian, 2000, 100, 87, 95, 50, 60, 100, 30, 105, 100, 87, 60, 2, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Bell, 3000, 100, 87, 95, 50, 60, 100, 30, 105, 100, 87, 60, 1, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Bell, 3000, 100, 87, 95, 50, 80, 100, 40, 105, 100, 87, 60, 1, 3),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 80, 100, 40, 105, 100, 87, 60, 1, 3),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.TornGhostAndWorm, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 80, 100, 40, 105, 100, 87, 60, 3, 5),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 100, 100, 50, 105, 100, 87, 60, 1, 3),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 100, 100, 50, 105, 100, 87, 60, 1, 3),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 100, 100, 50, 105, 0, 0, 0, 0, 0),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.TornGhostAndWorm, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 100, 100, 50, 105, 100, 87, 60, 1, 3),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 120, 100, 60, 105, 0, 0, 0, 0, 0),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 100, 87, 95, 50, 120, 100, 60, 105, 0, 0, 0, 0, 0),
            new LevelProps_1.LevelProps(IntroCutScene_1.IntroCutScene.None, FruitItem_1.FruitItem.Key, 5000, 90, 79, 95, 50, 120, 100, 60, 105, 0, 0, 0, 0, 0)
        ];
        //todo: move to another class (and related properties)
        LevelStats.map = [
            // 0,0                     29,0
            "                             ",
            " oooooooooooo  oooooooooooo  ",
            " o    o     o  o     o    o  ",
            " *    o     o  o     o    *  ",
            " o    o     o  o     o    o  ",
            " oooooooooooooooooooooooooo  ",
            " o    o  o        o  o    o  ",
            " o    o  o        o  o    o  ",
            " oooooo  oooo  oooo  oooooo  ",
            "      o     +  +     o       ",
            "      o     +  +     o       ",
            "      o  ++++++++++  o       ",
            "      o  +        +  o       ",
            "      o  +        +  o       ",
            "++++++o+++        +++o+++++++",
            "      o  +        +  o       ",
            "      o  +        +  o       ",
            "      o  ++++++++++  o       ",
            "      o  +        +  o       ",
            "      o  +        +  o       ",
            " oooooooooooo  oooooooooooo  ",
            " o    o     o  o     o    o  ",
            " o    o     o  o     o    o  ",
            " *oo  ooooooo++ooooooo  oo*  ",
            "   o  o  o        o  o  o    ",
            "   o  o  o        o  o  o    ",
            " oooooo  oooo  oooo  oooooo  ",
            " o          o  o          o  ",
            " o          o  o          o  ",
            " oooooooooooooooooooooooooo  ",
            "                             "
            // 0,30                   //27,29
        ];
        LevelStats.startingAmountOfPills = 244;
        return LevelStats;
    }());
    exports.LevelStats = LevelStats;
});
//# sourceMappingURL=LevelStats.js.map