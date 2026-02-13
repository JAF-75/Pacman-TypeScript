var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../Ghosts/GhostNickname"], function (require, exports, GhostNickname_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobalDotCounter = exports.DotCounter = void 0;
    var DotCounter = /** @class */ (function () {
        function DotCounter(limit) {
            this.limit = limit;
            this._isActive = false;
            this._counter = 0;
            this._timedOut = false;
        }
        DotCounter.prototype.reset = function () {
        };
        Object.defineProperty(DotCounter.prototype, "isActive", {
            get: function () {
                return this._isActive;
            },
            set: function (value) {
                this._isActive = value;
            },
            enumerable: false,
            configurable: true
        });
        DotCounter.prototype.increment = function () {
            if (!this._isActive) {
                throw new Error("Cannot increment a non active counter");
            }
            if (this._counter >= this.limit && this.limit > 0) {
                throw new Error("Cannot increment counter, already at limit.");
            }
            ++this._counter;
        };
        Object.defineProperty(DotCounter.prototype, "limitReached", {
            get: function () {
                return this._counter === this.limit || this._timedOut;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DotCounter.prototype, "counter", {
            get: function () {
                return this._counter;
            },
            enumerable: false,
            configurable: true
        });
        DotCounter.prototype.setTimedOut = function () {
            this._timedOut = true;
        };
        Object.defineProperty(DotCounter.prototype, "isFinished", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        return DotCounter;
    }());
    exports.DotCounter = DotCounter;
    var GlobalDotCounter = /** @class */ (function (_super) {
        __extends(GlobalDotCounter, _super);
        function GlobalDotCounter(limit) {
            if (limit === void 0) { limit = 0; }
            var _this = _super.call(this, limit) || this;
            _this.ghostsThatCanLeave = [];
            return _this;
        }
        GlobalDotCounter.prototype.reset = function () {
            this._finished = false;
            this.ghostsThatCanLeave = [];
            this._counter = 0;
        };
        Object.defineProperty(GlobalDotCounter.prototype, "isFinished", {
            // the thing that calls this switches dot counters if all the ghosts are out.
            // this never finishes if Clyde is out the house when the counter reaches 
            // 32 - this mimics the bug in the arcade game
            get: function () {
                return this._finished;
            },
            enumerable: false,
            configurable: true
        });
        GlobalDotCounter.prototype.setTimedOut = function () {
            if (this._lastOneForcedOut == undefined || this._lastOneForcedOut == GhostNickname_1.GhostNickname.Clyde) {
                this._nextOneToForceOut = GhostNickname_1.GhostNickname.Pinky;
            }
            else if (this._lastOneForcedOut == GhostNickname_1.GhostNickname.Pinky) {
                this._nextOneToForceOut = GhostNickname_1.GhostNickname.Inky;
            }
            else if (this._lastOneForcedOut == GhostNickname_1.GhostNickname.Inky) {
                this._nextOneToForceOut = GhostNickname_1.GhostNickname.Clyde;
            }
        };
        GlobalDotCounter.prototype.canGhostLeave = function (nickName) {
            if (this._nextOneToForceOut == nickName) {
                this._nextOneToForceOut = undefined;
                this._lastOneForcedOut = nickName;
                return true;
            }
            if (this.ghostsThatCanLeave[nickName] === true) {
                //            return true;
            }
            var canLeave = false;
            if (nickName === GhostNickname_1.GhostNickname.Pinky && this.counter === 7) {
                canLeave = true;
            }
            if (nickName === GhostNickname_1.GhostNickname.Inky && this.counter === 17) {
                canLeave = true;
            }
            if (nickName === GhostNickname_1.GhostNickname.Clyde && this.counter === 32) {
                canLeave = true;
                this._finished = this.counter === 32;
            }
            this.ghostsThatCanLeave[nickName] = canLeave;
            return canLeave;
        };
        return GlobalDotCounter;
    }(DotCounter));
    exports.GlobalDotCounter = GlobalDotCounter;
});
//# sourceMappingURL=DotCounter.js.map