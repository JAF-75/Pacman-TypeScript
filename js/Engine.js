define(["require", "exports", "./Game/_exports", "./Game/_exports", "./Core/_exports"], function (require, exports, _exports_1, _exports_2, _exports_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Engine = void 0;
    var Engine = /** @class */ (function () {
        function Engine() {
            var _this = this;
            this.loadLoop = function () {
                if (loadState.__finishedLoading === false) {
                    window.requestAnimationFrame(function () { return _this.loadLoop(); });
                    return;
                }
                _this._dateLoopLastRun = window.performance.now();
                _this._mainWindow = new _exports_1.MainWindow();
                window.requestAnimationFrame(function () { return _this.mainGameLoop(); });
                Engine.showControlPanel();
            };
            this.mainGameLoop = function () {
                window.requestAnimationFrame(function () { return _this.mainGameLoop(); });
                _this.update();
                _this.draw();
            };
            var canvasElement = document.getElementById("gameContainer");
            var canvasContext = canvasElement.getContext("2d");
            canvasContext.scale(3, 3);
            this._dateLoopLastRun = window.performance.now();
            window.requestAnimationFrame(function () { return _this.loadLoop(); });
        }
        Object.defineProperty(Engine, "pnrg", {
            get: function () {
                return Engine._pnrg;
            },
            enumerable: false,
            configurable: true
        });
        Engine.resetPnrg = function () {
            Engine._pnrg = 0;
        };
        Object.defineProperty(Engine, "gameSounds", {
            get: function () {
                if (Engine.gameSoundPlayer === undefined) {
                    Engine.gameSoundPlayer = new _exports_2.GameSoundPlayer(Engine.soundLoader);
                }
                return Engine.gameSoundPlayer;
            },
            enumerable: false,
            configurable: true
        });
        Engine.showControlPanel = function () {
            controlPanel.show();
            controlPanel.updateWithCredits(this._credits);
        };
        Engine.useCredits = function (amount) {
            if (this._credits - amount < 0) {
                throw new Error("Not enough credits!");
            }
            controlPanel.hide();
            this._credits -= amount;
        };
        Object.defineProperty(Engine, "credits", {
            get: function () {
                return this._credits;
            },
            enumerable: false,
            configurable: true
        });
        Engine.coinInserted = function () {
            ++this._credits;
            Engine.gameSounds.coinInsterted();
            controlPanel.updateWithCredits(this._credits);
        };
        Engine.prototype.update = function () {
            if (_exports_3.GameContext.keyboard.isKeyDown(_exports_3.Keyboard.p)) {
                return;
            }
            ++Engine._pnrg;
            var now = window.performance.now();
            var elapsed = now - this._dateLoopLastRun;
            this._dateLoopLastRun = now;
            this._mainWindow.update(elapsed);
        };
        Engine.prototype.draw = function () {
            this._mainWindow.draw();
        };
        Engine._pnrg = 0;
        Engine._credits = 0;
        Engine.soundLoader = new _exports_3.SoundLoader(function (assetName, percentage) { loadState.assetLoaded(assetName, percentage); });
        return Engine;
    }());
    exports.Engine = Engine;
});
//# sourceMappingURL=Engine.js.map