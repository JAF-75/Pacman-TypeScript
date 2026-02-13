define(["require", "exports", "./GhostMovementMode", "./ModeAndDuration"], function (require, exports, GhostMovementMode_1, ModeAndDuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GhostMovementConductor = void 0;
    var GhostMovementConductor = /** @class */ (function () {
        function GhostMovementConductor(properties) {
            this.properties = properties;
            this._index = -1;
            this._items = [];
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Scatter, properties.scatter1 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Chase, properties.chase1 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Scatter, properties.scatter2 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Chase, properties.chase2 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Scatter, properties.scatter3 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Chase, properties.chase3 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Scatter, properties.scatter4 * 1000));
            this._items.push(new ModeAndDuration_1.ModeAndDuration(GhostMovementMode_1.GhostMovementMode.Chase, properties.chase4 * 1000));
            this.incrementIndex();
        }
        GhostMovementConductor.prototype.update = function (context) {
            var item = this._items[this._index];
            item.duration -= context.elapsed;
            if (item.duration < 0) {
                this.incrementIndex();
            }
        };
        GhostMovementConductor.prototype.incrementIndex = function () {
            this._index += 1;
            if (this._index >= this._items.length) {
                throw new Error("No more move patterns!?");
            }
        };
        Object.defineProperty(GhostMovementConductor.prototype, "currentMode", {
            get: function () {
                return this._items[this._index].mode;
            },
            enumerable: false,
            configurable: true
        });
        return GhostMovementConductor;
    }());
    exports.GhostMovementConductor = GhostMovementConductor;
});
//# sourceMappingURL=GhostMovementConductor.js.map