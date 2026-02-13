define(["require", "exports", "../Core/_exports", "./EyesSpritesheetInfo", "./FrightenedSpritesheet", "./GhostSpritesheetInfo", "./GhostNickname"], function (require, exports, _exports_1, EyesSpritesheetInfo_1, FrightenedSpritesheet_1, GhostSpritesheetInfo_1, GhostNickname_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostSpritesheet = void 0;
    var GhostSpritesheet = /** @class */ (function () {
        function GhostSpritesheet() {
            var left = 457;
            var x = left + (8 * 16);
            this.frightened = new FrightenedSpritesheet_1.FrightenedSpritesheet(new _exports_1.FramePair(new _exports_1.Point(x, 64), new _exports_1.Point(x += 16, 64)), new _exports_1.FramePair(new _exports_1.Point(x += 16, 64), new _exports_1.Point(x + 16, 64)));
            x = left + (8 * 16);
            this.eyes = new EyesSpritesheetInfo_1.EyesSpritesheetInfo(new _exports_1.Point(x, 64 + 16));
            this.entries = new Array();
            this.entries[GhostNickname_1.GhostNickname.Blinky] = new GhostSpritesheetInfo_1.GhostSpritesheetInfo("Blinky", new _exports_1.Point(left, 64));
            this.entries[GhostNickname_1.GhostNickname.Pinky] = new GhostSpritesheetInfo_1.GhostSpritesheetInfo("Pinky", new _exports_1.Point(left, 64 + 16));
            this.entries[GhostNickname_1.GhostNickname.Inky] = new GhostSpritesheetInfo_1.GhostSpritesheetInfo("Inky", new _exports_1.Point(left, 64 + 32));
            this.entries[GhostNickname_1.GhostNickname.Clyde] = new GhostSpritesheetInfo_1.GhostSpritesheetInfo("Clyde", new _exports_1.Point(left, 64 + 48));
        }
        GhostSpritesheet.prototype.getEntry = function (nickname) {
            var entry = this.entries[nickname];
            return entry;
        };
        GhostSpritesheet.prototype.getFrightened = function () {
            return this.frightened;
        };
        return GhostSpritesheet;
    }());
    exports.GhostSpritesheet = GhostSpritesheet;
});
//# sourceMappingURL=GhostSpritesheet.js.map