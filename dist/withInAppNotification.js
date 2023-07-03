"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withInAppNotification = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useInAppNotification_1 = require("./useInAppNotification");
function withInAppNotification(Child) {
    return (props) => {
        const inAppNotification = (0, useInAppNotification_1.useInAppNotification)();
        return (0, jsx_runtime_1.jsx)(Child, { ...props, inAppNotification: inAppNotification });
    };
}
exports.withInAppNotification = withInAppNotification;
