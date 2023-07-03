"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Animation = (props) => {
    const anim = react_1.default.useRef(new react_native_1.Animated.Value(-90)).current;
    const closeTimeout = react_1.default.useRef(0);
    const instantiated = react_1.default.useRef(new Date().getTime());
    const panResponder = react_1.default.useRef(react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            anim.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy < 0) {
                react_native_1.Animated.timing(anim, {
                    toValue: -90,
                    useNativeDriver: true,
                    duration: 180
                }).start();
            }
            else {
                react_native_1.Animated.timing(anim, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 180
                }).start();
            }
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            //return true if user is swiping, return false if it's a single click
            return !(gestureState.dx === 0 && gestureState.dy === 0);
        }
    })).current;
    const closeAnim = () => {
        react_native_1.Animated.timing(anim, {
            toValue: -90,
            useNativeDriver: true,
            duration: 180
        }).start();
    };
    react_1.default.useEffect(() => {
        react_native_1.Animated.timing(anim, {
            toValue: 0,
            useNativeDriver: true,
            duration: 180
        }).start();
    }, []);
    react_1.default.useEffect(() => {
        if (props.immediateClose) {
            closeAnim();
        }
    }, [props.immediateClose]);
    react_1.default.useEffect(() => {
        const now = new Date().getTime();
        const closeDur = props.earlyClose ? 2800 : 8800;
        const diff = now - instantiated.current;
        if ((closeDur - diff) <= 0) {
            closeAnim();
        }
        else {
            console.log(closeDur - diff);
            closeTimeout.current = setTimeout(closeAnim, closeDur - diff);
        }
        return () => clearTimeout(closeTimeout.current);
    }, [props.earlyClose]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { ...panResponder.panHandlers, style: { transform: [{ translateY: anim.interpolate({
                        inputRange: [-90, 12],
                        outputRange: [-90, 12],
                        extrapolate: 'clamp'
                    }) }] }, children: props.children }));
};
exports.default = Animation;
