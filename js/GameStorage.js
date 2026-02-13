define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameStorage = void 0;
    var GameStorage = /** @class */ (function () {
        function GameStorage() {
        }
        Object.defineProperty(GameStorage, "highScore", {
            get: function () {
                var value = GameStorage.getCookie("highscore");
                return value === "" ? 0 : value;
            },
            set: function (hs) {
                GameStorage.setCookie("highscore", hs.toString(), 1000);
            },
            enumerable: false,
            configurable: true
        });
        GameStorage.setCookie = function (cname, cvalue, exdays) {
            var date = new Date();
            date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=".concat(date.toUTCString());
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        };
        GameStorage.getCookie = function (cname) {
            var name = cname + "=";
            var items = document.cookie.split(";");
            for (var i = 0; i < items.length; i++) {
                var c = items[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
        return GameStorage;
    }());
    exports.GameStorage = GameStorage;
});
//# sourceMappingURL=GameStorage.js.map