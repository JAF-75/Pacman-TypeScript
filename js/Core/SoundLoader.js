define(["require", "exports", "./SoundName", "./SoundPlayer"], function (require, exports, SoundName_1, SoundPlayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SoundLoader = void 0;
    var SoundLoader = /** @class */ (function () {
        function SoundLoader(whenEachSoundLoaded) {
            this.whenEachSoundLoaded = whenEachSoundLoaded;
            this._loadedCount = 0;
            this._itemsToLoad = 16;
            this._sounds = {};
            this._sounds[SoundName_1.SoundName.CoinInserted] = this.loadAudio("snd/coin.mp3");
            this._sounds[SoundName_1.SoundName.CutScene] = this.loadAudio("snd/cutscene.mp3");
            this._sounds[SoundName_1.SoundName.PacManDying] = this.loadAudio("snd/dying.mp3");
            this._sounds[SoundName_1.SoundName.ExtraLife] = this.loadAudio("snd/extra_life.mp3");
            this._sounds[SoundName_1.SoundName.Frightened] = this.loadAudio("snd/frightened.mp3");
            this._sounds[SoundName_1.SoundName.FruitEaten] = this.loadAudio("snd/fruit_eaten.mp3");
            this._sounds[SoundName_1.SoundName.GhostEaten] = this.loadAudio("snd/ghost_eaten.mp3");
            this._sounds[SoundName_1.SoundName.GhostEyes] = this.loadAudio("snd/ghost_eyes.mp3");
            this._sounds[SoundName_1.SoundName.Munch1] = this.loadAudio("snd/munch1.mp3");
            this._sounds[SoundName_1.SoundName.Munch2] = this.loadAudio("snd/munch2.mp3");
            this._sounds[SoundName_1.SoundName.PlayerStart] = this.loadAudio("snd/player_start.mp3");
            this._sounds[SoundName_1.SoundName.Siren1] = this.loadAudio("snd/siren1.mp3");
            this._sounds[SoundName_1.SoundName.Siren2] = this.loadAudio("snd/siren2.mp3");
            this._sounds[SoundName_1.SoundName.Siren3] = this.loadAudio("snd/siren3.mp3");
            this._sounds[SoundName_1.SoundName.Siren4] = this.loadAudio("snd/siren4.mp3");
            this._sounds[SoundName_1.SoundName.Siren5] = this.loadAudio("snd/siren5.mp3");
        }
        SoundLoader.prototype.getSound = function (name) {
            return this._sounds[name];
        };
        SoundLoader.prototype.loadAudio = function (path) {
            var _this = this;
            var audio = new SoundPlayer_1.SoundPlayer(path, function () {
                var pc = (++_this._loadedCount / _this._itemsToLoad) * 100;
                _this.whenEachSoundLoaded(path, pc);
            });
            return audio;
        };
        return SoundLoader;
    }());
    exports.SoundLoader = SoundLoader;
});
//# sourceMappingURL=SoundLoader.js.map