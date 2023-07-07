"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusBarHeight = exports.isExpo = exports.isIPhoneWithDynamicIsland = exports.isIPhoneWithMonobrow = exports.isIPhone12Max = exports.isIPhone12 = exports.isIPhoneXMax = exports.isIPhoneX = void 0;
const react_native_1 = require("react-native");
const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;
const STATUSBAR_IP14PRO_HEIGHT = 49;
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;
const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;
const IP14PRO_WIDTH = 393;
const IP14PRO_HEIGHT = 852;
const IP14PROMAX_WIDTH = 430;
const IP14PROMAX_HEIGHT = 932;
const { height: W_HEIGHT, width: W_WIDTH } = react_native_1.Dimensions.get("window");
let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhone12_v = false;
let isIPhone12Max_v = false;
let isIPhoneWithMonobrow_v = false;
let isIPhoneWithDynamicIsland_v = false;
if (react_native_1.Platform.OS === "ios" && !react_native_1.Platform.isPad && !react_native_1.Platform.isTV) {
    if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneX_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    }
    else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneXMax_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    }
    else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhone12_v = true;
        statusBarHeight = STATUSBAR_IP12_HEIGHT;
    }
    else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhone12Max_v = true;
        statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
    }
    else if (W_WIDTH === IP14PROMAX_WIDTH && W_HEIGHT === IP14PROMAX_HEIGHT) {
        isIPhoneWithDynamicIsland_v = true;
        statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
    }
    else if (W_WIDTH === IP14PRO_WIDTH && W_HEIGHT === IP14PRO_HEIGHT) {
        isIPhoneWithDynamicIsland_v = true;
        statusBarHeight = STATUSBAR_IP14PRO_HEIGHT;
    }
}
const isIPhoneX = () => isIPhoneX_v;
exports.isIPhoneX = isIPhoneX;
const isIPhoneXMax = () => isIPhoneXMax_v;
exports.isIPhoneXMax = isIPhoneXMax;
const isIPhone12 = () => isIPhone12_v;
exports.isIPhone12 = isIPhone12;
const isIPhone12Max = () => isIPhone12Max_v;
exports.isIPhone12Max = isIPhone12Max;
const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;
exports.isIPhoneWithMonobrow = isIPhoneWithMonobrow;
const isIPhoneWithDynamicIsland = () => isIPhoneWithDynamicIsland_v;
exports.isIPhoneWithDynamicIsland = isIPhoneWithDynamicIsland;
const getExpoRoot = () => (global.Expo || global.__expo || global.__exponent);
const isExpo = () => getExpoRoot() !== undefined;
exports.isExpo = isExpo;
function getStatusBarHeight(skipAndroid) {
    return react_native_1.Platform.select({
        ios: statusBarHeight,
        android: skipAndroid ? 0 : react_native_1.StatusBar.currentHeight || 0,
        default: 0,
    });
}
exports.getStatusBarHeight = getStatusBarHeight;
