import React, { PropsWithChildren } from 'react';
import { InAppNotification, Notification } from './Notification';
import { GestureResponderEvent, ImageStyle, SafeAreaView, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Animation } from './Animation';

export type InAppNotificationContextType = {
    showNotification: (title: string, message: string, imgUrl?: string, options?: InAppNotificationOptions) => void,
    dismissAll: () => void
}

export type InAppNotificationOptions = {
    onPress?: (event: GestureResponderEvent) => void
};

export const InAppNotificationContext = React.createContext<InAppNotificationContextType>({
    showNotification: (title: string, message: string, imgUrl?: string, options?: InAppNotificationOptions) => {},
    dismissAll: () => {}
});

type InAppNotificationProviderProps = {
    titleTextStyle?: StyleProp<TextStyle>,
    messageTextStyle?: StyleProp<TextStyle>,
    thumbnailStyle?: StyleProp<ImageStyle>
} & PropsWithChildren;

export const InAppNotificationProvider: React.FC<InAppNotificationProviderProps> = ({ children, titleTextStyle, messageTextStyle, thumbnailStyle }) => {

    const [notifyQ, setNotifyQ] = React.useState<InAppNotification[]>([]);
    const [currNotif, setCurrNotif] = React.useState<InAppNotification | null>(null);
    const [allDismissed, setAllDismissed] = React.useState(false);
    const dismissTimeoutRef = React.useRef(0 as unknown as NodeJS.Timeout);
    const lastAdded = React.useRef(new Date().getTime());

    const showNotification = (title: string, message: string, imgUrl?: string, options?: InAppNotificationOptions) => {
        setNotifyQ(q => [...q, {title, message, imgUrl, onPress: options?.onPress}]);
    }

    const _dismissNotification = () => {
        setCurrNotif(null);
    };

    const dismissAll = () => {
        setNotifyQ([]);
        setAllDismissed(true);
    }

    React.useEffect(() => {
        if (allDismissed) {
            setAllDismissed(false);
            setTimeout(_dismissNotification, 200); // give close anim time to run
        }
    }, [allDismissed]);

    React.useEffect(() => {

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
            } else if (currNotif && notifyQ.length == 1) {
                const timeout = dismissTimeoutRef.current;
                
                clearTimeout(timeout);
                const now = new Date().getTime();
                const elapsed = (now - lastAdded.current);

                if (elapsed > 3000) {
                    setTimeout(_dismissNotification, 200); // give close anim time to run
                } else {
                    dismissTimeoutRef.current = setTimeout(() => {
                        _dismissNotification();
                    }, 3000 - elapsed);
                }
                
                
            }
        }

        processQ();

    }, [notifyQ, currNotif]);

    const sanitizedCurrNotif: InAppNotification = currNotif || {} as InAppNotification;
    delete sanitizedCurrNotif.titleTextStyle;
    delete sanitizedCurrNotif.messageTextStyle;
    delete sanitizedCurrNotif.thumbnailStyle;

    return (
        <InAppNotificationContext.Provider value={{showNotification, dismissAll}}>
            {children}
            {
                currNotif ? (
                    <View pointerEvents='box-none' style={styles.notif_container}>
                        <SafeAreaView />
                        <Animation onClose={() => {
                            _dismissNotification();
                        }} earlyClose={notifyQ.length > 0} immediateClose={allDismissed}>
                            <Notification titleTextStyle={[titleTextStyle, currNotif?.titleTextStyle]} messageTextStyle={[messageTextStyle, currNotif?.messageTextStyle]} thumbnailStyle={[thumbnailStyle, currNotif?.thumbnailStyle]} {...sanitizedCurrNotif}/>
                        </Animation>
                    </View>
                ) : null
            }
        </InAppNotificationContext.Provider>
    )
}

const styles = StyleSheet.create({
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