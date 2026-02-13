define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Keyboard = void 0;
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
            var _this = this;
            this._keys = new Array();
            this._currentKeyDown = 0;
            this._buttonDown = function (e) {
                var keyCode = _this.mapButtonToKey(e.detail);
                _this._keys[keyCode] = true;
                _this._currentKeyDown = keyCode;
            };
            this._panned = function (e) {
                var keyCode = _this.mapButtonToKey(e.detail);
                _this._keys.splice(0);
                _this._keys[keyCode] = true;
                _this._currentKeyDown = keyCode;
            };
            this._buttonUp = function (e) {
                var keyCode = _this.mapButtonToKey(e.detail);
                delete _this._keys[keyCode];
                _this._currentKeyDown = 0;
                _this._keyPresses[keyCode.toString()] = window.performance.now();
            };
            this._keydown = function (e) {
                _this._keys[e.keyCode] = true;
                _this._currentKeyDown = e.keyCode;
            };
            this._keyup = function (e) {
                delete _this._keys[e.keyCode];
                _this._currentKeyDown = 0;
                _this._keyPresses[e.keyCode.toString()] = window.performance.now();
            };
            this._keyPresses = {};
            this._buttonToKeyCodes = {
                "btnUp": Keyboard.up,
                "btnDown": Keyboard.down,
                "btnLeft": Keyboard.left,
                "btnRight": Keyboard.right,
                "btn1Up": Keyboard.one,
                "btn2Up": Keyboard.two,
                "btnCoin": Keyboard.five
            };
            document.onkeydown = this._keydown;
            document.onkeyup = this._keyup;
            window.addEventListener('buttonup', this._buttonUp);
            window.addEventListener("buttondown", this._buttonDown);
            window.addEventListener("pan", this._panned);
        }
        Keyboard.prototype.isKeyDown = function (key) {
            return this._keys[key];
        };
        Keyboard.prototype.wasKeyPressed = function (keyCode) {
            var theEvent = this._keyPresses[keyCode.toString()];
            if (theEvent === undefined) {
                return false;
            }
            this._keyPresses[keyCode] = 0;
            var howLong = window.performance.now() - theEvent;
            return howLong < 100;
        };
        Keyboard.prototype.mapButtonToKey = function (buttonName) {
            return this._buttonToKeyCodes[buttonName];
        };
        Keyboard.up = 38;
        Keyboard.down = 40;
        Keyboard.left = 37;
        Keyboard.right = 39;
        Keyboard.p = 80;
        Keyboard.enter = 13;
        Keyboard.one = 49;
        Keyboard.two = 50;
        Keyboard.three = 51;
        Keyboard.five = 53;
        return Keyboard;
    }());
    exports.Keyboard = Keyboard;
});
//# sourceMappingURL=Keyboard.js.map