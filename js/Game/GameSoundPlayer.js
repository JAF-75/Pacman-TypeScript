define(["require", "exports", "../Core/_exports", "../Game/_exports", "../Ghosts/_exports"], function (require, exports, _exports_1, _exports_2, _exports_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameSoundPlayer = void 0;
    var GameSoundPlayer = /** @class */ (function () {
        function GameSoundPlayer(_loader) {
            this._loader = _loader;
            this._volumeChanged = function (e) {
                var vol = e.detail;
                Howler.volume(vol);
            };
            if (_loader == undefined) {
                throw new Error("Loader is undefined");
            }
            window.addEventListener("volumeChanged", this._volumeChanged);
            this._frightened = _loader.getSound(_exports_1.SoundName.Frightened);
            this._ghostEyes = _loader.getSound(_exports_1.SoundName.GhostEyes);
            this._sirens = [
                _loader.getSound(_exports_1.SoundName.Siren1),
                _loader.getSound(_exports_1.SoundName.Siren2),
                _loader.getSound(_exports_1.SoundName.Siren3),
                _loader.getSound(_exports_1.SoundName.Siren4),
                _loader.getSound(_exports_1.SoundName.Siren5)
            ];
            this._frightened.loop = true;
            this._ghostEyes.loop = true;
            this._ghostEyes.mute();
            this._ghostEyes.play();
            this._sirens.forEach(function (s) {
                s.loop = true;
                s.volume = .5;
            });
        }
        GameSoundPlayer.prototype.reset = function () {
            this._sirens.forEach(function (s) { return s.stop(); });
            this._ghostEyes.stop();
            this._frightened.stop();
        };
        GameSoundPlayer.prototype.update = function () {
            var _this = this;
            var currentPlayerStats = _exports_2.MainWindow.gameStats.currentPlayerStats;
            var thereAreEyes = _exports_2.MainWindow.actors.ghosts.some(function (g) { return g.state === _exports_3.GhostState.Eyes; });
            var frightSession = currentPlayerStats.frightSession;
            var handleFright = function () {
                if (thereAreEyes) {
                    return;
                }
                if (frightSession != undefined) {
                    var volume_1 = frightSession.isFinished ? .5 : 0;
                    _this._sirens.forEach(function (s) { return s.volume = volume_1; });
                    if (frightSession.isFinished) {
                        _this._frightened.stop();
                    }
                }
            };
            var handleSiren = function (pillsEaten) {
                if (thereAreEyes) {
                    return;
                }
                var level;
                if (pillsEaten < 117) {
                    level = 0;
                }
                else if (pillsEaten < 180) {
                    level = 1;
                }
                else if (pillsEaten < 212) {
                    level = 2;
                }
                else if (pillsEaten < 230) {
                    level = 3;
                }
                else {
                    level = 4;
                }
                _this.playSiren(level);
            };
            var handleEyes = function () {
                if (thereAreEyes === false) {
                    _this._ghostEyes.stop();
                }
                else {
                    _this._ghostEyes.play();
                }
            };
            if (currentPlayerStats != null) {
                handleFright();
                handleSiren(currentPlayerStats.levelStats.pillsEaten);
                handleEyes();
            }
        };
        GameSoundPlayer.prototype.muteAll = function () {
            Howler.mute(true);
        };
        GameSoundPlayer.prototype.unmuteAll = function () {
            Howler.mute(false);
        };
        GameSoundPlayer.prototype.powerPillEaten = function () {
            this.play(_exports_1.SoundName.Frightened);
        };
        GameSoundPlayer.prototype.fruitEaten = function () {
            this.play(_exports_1.SoundName.FruitEaten);
        };
        GameSoundPlayer.prototype.ghostEaten = function () {
            this.play(_exports_1.SoundName.GhostEaten);
            this.play(_exports_1.SoundName.GhostEyes);
        };
        GameSoundPlayer.prototype.gotExtraLife = function () {
            this.play(_exports_1.SoundName.ExtraLife);
        };
        GameSoundPlayer.prototype.cutScene = function () {
            this.play(_exports_1.SoundName.CutScene);
        };
        GameSoundPlayer.prototype.pacManDying = function () {
            this.play(_exports_1.SoundName.PacManDying);
        };
        GameSoundPlayer.prototype.playerStart = function () {
            this.play(_exports_1.SoundName.PlayerStart);
        };
        GameSoundPlayer.prototype.coinInsterted = function () {
            this.tryPlay(_exports_1.SoundName.CoinInserted);
        };
        GameSoundPlayer.prototype.munch1 = function () {
            this.play(_exports_1.SoundName.Munch1);
        };
        GameSoundPlayer.prototype.munch2 = function () {
            this.play(_exports_1.SoundName.Munch2);
        };
        GameSoundPlayer.prototype.play = function (soundName) {
            var audio = this._loader.getSound(soundName);
            if (audio.isLoaded) {
                audio.play();
            }
        };
        GameSoundPlayer.prototype.tryPlay = function (soundName) {
            var audio = this._loader.getSound(soundName);
            if (audio.isLoaded) {
                audio.tryPlay();
            }
        };
        GameSoundPlayer.prototype.playSiren = function (level) {
            for (var i = 0; i < this._sirens.length; i++) {
                var siren = this._sirens[i];
                if (i == level) {
                    if (!siren.isPlaying) {
                        siren.play();
                    }
                }
                else {
                    siren.stop();
                }
            }
        };
        return GameSoundPlayer;
    }());
    exports.GameSoundPlayer = GameSoundPlayer;
});
//# sourceMappingURL=GameSoundPlayer.js.map