/// <reference types="howler"/>
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SoundPlayer = void 0;
    var SoundPlayer = /** @class */ (function () {
        function SoundPlayer(path, whenLoaded) {
            var _this = this;
            this._howl = new Howl({
                src: [path]
            });
            this._howl.on("load", function () {
                whenLoaded();
                _this._loaded = true;
            });
            this._howl.on("loaderror", function () {
                whenLoaded();
                _this._loaded = true;
            });
        }
        Object.defineProperty(SoundPlayer.prototype, "volume", {
            get: function () {
                return this._howl.volume();
            },
            set: function (value) {
                this._howl.volume(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SoundPlayer.prototype, "isPlaying", {
            get: function () {
                return this._howl.playing();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SoundPlayer.prototype, "loop", {
            set: function (value) {
                this._howl.loop(value);
            },
            enumerable: false,
            configurable: true
        });
        SoundPlayer.prototype.mute = function () {
            return this._howl.mute(true);
        };
        SoundPlayer.prototype.unmute = function () {
            return this._howl.mute(false);
        };
        Object.defineProperty(SoundPlayer.prototype, "isLoaded", {
            get: function () {
                return this._loaded;
            },
            enumerable: false,
            configurable: true
        });
        SoundPlayer.prototype.stop = function () {
            this._howl.stop();
        };
        SoundPlayer.prototype.play = function () {
            if (!this.isLoaded) {
                throw new Error("Not loaded!");
            }
            if (this._howl.loop() && this._howl.playing()) {
                return;
            }
            this._howl.play();
        };
        SoundPlayer.prototype.tryPlay = function () {
            if (this._howl.loop() && !this._howl.playing()) {
                return;
            }
            this._howl.play();
        };
        return SoundPlayer;
    }());
    exports.SoundPlayer = SoundPlayer;
});
//# sourceMappingURL=SoundPlayer.js.map