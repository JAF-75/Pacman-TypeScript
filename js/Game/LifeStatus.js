define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LifeStatus = void 0;
    var LifeStatus;
    (function (LifeStatus) {
        LifeStatus[LifeStatus["Alive"] = 0] = "Alive";
        LifeStatus[LifeStatus["BeingDigested"] = 1] = "BeingDigested";
        LifeStatus[LifeStatus["Dying"] = 2] = "Dying";
        LifeStatus[LifeStatus["Dead"] = 3] = "Dead";
    })(LifeStatus || (exports.LifeStatus = LifeStatus = {}));
});
//# sourceMappingURL=LifeStatus.js.map