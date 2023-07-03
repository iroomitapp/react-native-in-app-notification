/// <reference types="react" />
import { GestureResponderEvent, StyleProp, TextStyle } from "react-native";
export type InAppNotification = {
    title: string;
    message: string;
    onPress?: (event: GestureResponderEvent) => void;
    titleTextStyle?: StyleProp<TextStyle>;
    messageTextStyle?: StyleProp<TextStyle>;
    imgUrl?: string;
};
export declare const Notification: React.FC<InAppNotification>;
