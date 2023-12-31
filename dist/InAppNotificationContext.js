"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppNotificationProvider = exports.InAppNotificationContext = void 0;
const react_1 = __importDefault(require("react"));
const Notification_1 = require("./Notification");
const react_native_1 = require("react-native");
const Animation_1 = require("./Animation");
exports.InAppNotificationContext = react_1.default.createContext({
    showNotification: (title, message, imgUrl, options) => { },
    dismissAll: () => { }
});
const InAppNotificationProvider = ({ children, titleTextStyle, messageTextStyle, thumbnailStyle }) => {
    const [notifyQ, setNotifyQ] = react_1.default.useState([]);
    const [currNotif, setCurrNotif] = react_1.default.useState(null);
    const [allDismissed, setAllDismissed] = react_1.default.useState(false);
    const dismissTimeoutRef = react_1.default.useRef(0);
    const lastAdded = react_1.default.useRef(new Date().getTime());
    const showNotification = (title, message, imgUrl, options) => {
        setNotifyQ(q => [...q, { title, message, imgUrl, onPress: options?.onPress }]);
    };
    const _dismissNotification = () => {
        setCurrNotif(null);
    };
    const dismissAll = () => {
        setNotifyQ([]);
        setAllDismissed(true);
    };
    react_1.default.useEffect(() => {
        if (allDismissed) {
            setAllDismissed(false);
            setTimeout(_dismissNotification, 200); // give close anim time to run
        }
    }, [allDismissed]);
    react_1.default.useEffect(() => {
        const processQ = () => {
            if (notifyQ.length && !currNotif) {
                const [nextNotif, ...remainingQ] = notifyQ;
                setCurrNotif(nextNotif);
                setNotifyQ(remainingQ);
                const timeoutDuration = remainingQ.length > 0 ? 3000 : 9000;
                lastAdded.current = new Date().getTime();
                dismissTimeoutRef.current = setTimeout(() => {
                    _dismissNotification();
                }, timeoutDuration);
            }
            else if (currNotif && notifyQ.length == 1) {
                const timeout = dismissTimeoutRef.current;
                clearTimeout(timeout);
                const now = new Date().getTime();
                const elapsed = (now - lastAdded.current);
                if (elapsed > 3000) {
                    setTimeout(_dismissNotification, 200); // give close anim time to run
                }
                else {
                    dismissTimeoutRef.current = setTimeout(() => {
                        _dismissNotification();
                    }, 3000 - elapsed);
                }
            }
        };
        processQ();
    }, [notifyQ, currNotif]);
    const sanitizedCurrNotif = currNotif || {};
    delete sanitizedCurrNotif.titleTextStyle;
    delete sanitizedCurrNotif.messageTextStyle;
    delete sanitizedCurrNotif.thumbnailStyle;
    return (react_1.default.createElement(exports.InAppNotificationContext.Provider, { value: { showNotification, dismissAll } },
        children,
        currNotif ? (react_1.default.createElement(react_native_1.View, { pointerEvents: 'box-none', style: styles.notif_container },
            react_1.default.createElement(react_native_1.SafeAreaView, null),
            react_1.default.createElement(Animation_1.Animation, { onClose: () => {
                    _dismissNotification();
                }, earlyClose: notifyQ.length > 0, immediateClose: allDismissed },
                react_1.default.createElement(Notification_1.Notification, { titleTextStyle: [titleTextStyle, currNotif?.titleTextStyle], messageTextStyle: [messageTextStyle, currNotif?.messageTextStyle], thumbnailStyle: [thumbnailStyle, currNotif?.thumbnailStyle], ...sanitizedCurrNotif })))) : null));
};
exports.InAppNotificationProvider = InAppNotificationProvider;
const styles = react_native_1.StyleSheet.create({
    notif_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    }
});
