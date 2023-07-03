"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInAppNotification = void 0;
const react_1 = __importDefault(require("react"));
const InAppNotificationContext_1 = require("./InAppNotificationContext");
function useInAppNotification() {
    return react_1.default.useContext(InAppNotificationContext_1.InAppNotificationContext);
}
exports.useInAppNotification = useInAppNotification;
