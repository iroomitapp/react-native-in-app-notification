import React, { PropsWithChildren } from 'react';
import { GestureResponderEvent, ImageStyle, StyleProp, TextStyle } from 'react-native';
export type InAppNotificationContextType = {
    showNotification: (title: string, message: string, imgUrl?: string, options?: InAppNotificationOptions) => void;
    dismissAll: () => void;
};
export type InAppNotificationOptions = {
    onPress?: (event: GestureResponderEvent) => void;
};
export declare const InAppNotificationContext: React.Context<InAppNotificationContextType>;
type InAppNotificationProviderProps = {
    titleTextStyle?: StyleProp<TextStyle>;
    messageTextStyle?: StyleProp<TextStyle>;
    thumbnailStyle?: StyleProp<ImageStyle>;
} & PropsWithChildren;
export declare const InAppNotificationProvider: React.FC<InAppNotificationProviderProps>;
export {};
