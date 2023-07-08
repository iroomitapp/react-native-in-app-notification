"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withInAppNotification = void 0;
const react_1 = __importDefault(require("react"));
const useInAppNotification_1 = require("./useInAppNotification");
function withInAppNotification(Child) {
    return (props) => {
        const inAppNotification = (0, useInAppNotification_1.useInAppNotification)();
        return react_1.default.createElement(Child, { ...props, inAppNotification: inAppNotification });
    };
}
exports.withInAppNotification = withInAppNotification;
