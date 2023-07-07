"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const react_native_1 = require("react-native");
const Notification = (props) => {
    return (<react_native_1.View style={styles.main}>
            <react_native_1.TouchableOpacity activeOpacity={props.onPress ? undefined : 1} onPress={props.onPress} style={styles.main_touchable}>
                <react_native_1.View style={styles.touchable_view_container}>
                    {props.imgUrl ? <react_native_1.Image source={{ uri: props.imgUrl }} style={[styles.image, props.thumbnailStyle].flat(Infinity)}/> : null}
                    <react_native_1.View style={styles.text_container}>
                        <react_native_1.Text numberOfLines={1} style={[styles.title_text, props.titleTextStyle].flat(Infinity)}>{props.title}</react_native_1.Text>
                        <react_native_1.Text numberOfLines={2} style={[styles.message_text, props.messageTextStyle].flat(Infinity)}>{props.message}</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_1.TouchableOpacity>
        </react_native_1.View>);
};
exports.Notification = Notification;
const styles = react_native_1.StyleSheet.create({
    main: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 15,
        right: 15,
        top: 15,
        borderRadius: 8,
        overflow: 'visible',
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
