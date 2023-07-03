import { GestureResponderEvent, Image, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native"

export type InAppNotification = {
    title: string,
    message: string,
    onPress?: (event: GestureResponderEvent) => void,
    titleTextStyle?: StyleProp<TextStyle>,
    messageTextStyle?: StyleProp<TextStyle>,
    imgUrl?: string
}

export const Notification: React.FC<InAppNotification> = (props) => {

    return (
        <View style={styles.main}>
            <TouchableOpacity activeOpacity={props.onPress ? undefined : 1} onPress={props.onPress} style={styles.main_touchable}>
                <View style={styles.touchable_view_container}>
                    {
                        props.imgUrl ? <Image source={{uri: props.imgUrl}} style={styles.image}/> : null
                    }
                    <View style={styles.text_container}>
                        <Text numberOfLines={1} style={[styles.title_text, props.titleTextStyle].flat(Infinity as 10)}>{props.title}</Text>
                        <Text numberOfLines={2} style={[styles.message_text, props.messageTextStyle].flat(Infinity as 10)}>{props.message}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 15,
        right: 15,
        top: 15,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    main_touchable: {
        flex: 1,
        height: '100%',
        width: '100%',
        padding: 8
    },
    touchable_view_container: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    image: {
        height: 56,
        width: 56,
        borderRadius: 100,
        backgroundColor: "#eaeaef"
    },
    text_container: {
        marginLeft: 8
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000000'
    },
    message_text: {
        fontSize: 12,
        color: '#000000'
    }
});