"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const globals_1 = require("@jest/globals");
const react_native_2 = require("@testing-library/react-native");
const InAppNotificationContext_1 = require("./InAppNotificationContext");
(0, globals_1.describe)('InAppNotificationProvider', () => {
    (0, globals_1.it)('renders children and shows notification', () => {
        const { getByText } = (0, react_native_2.render)(<InAppNotificationContext_1.InAppNotificationProvider>
        <react_native_1.Text>Test Children</react_native_1.Text>
      </InAppNotificationContext_1.InAppNotificationProvider>);
        // Check if the children are rendered
        const childrenText = getByText('Test Children');
        (0, globals_1.expect)(childrenText).toBeDefined();
        // Show a notification
        const title = 'Notification Title';
        const message = 'Notification Message';
        const imgUrl = 'notification-image.png';
        const options = { onPress: globals_1.jest.fn() };
        const showNotification = globals_1.jest.fn();
        const dismissAll = globals_1.jest.fn();
        const contextValue = {
            showNotification,
            dismissAll
        };
        contextValue.showNotification(title, message, imgUrl, options);
        (0, globals_1.expect)(showNotification).toHaveBeenCalledWith(title, message, imgUrl, options);
    });
    (0, globals_1.it)('dismisses the notification', () => {
        const { getByTestId, queryByText, getByText } = (0, react_native_2.render)(<InAppNotificationContext_1.InAppNotificationProvider>
        <react_native_1.Text>Test Children</react_native_1.Text>
      </InAppNotificationContext_1.InAppNotificationProvider>);
        // Show a notification
        const title = 'Notification Title';
        const message = 'Notification Message';
        const imgUrl = 'notification-image.png';
        const options = { onPress: globals_1.jest.fn() };
        const showNotification = globals_1.jest.fn();
        const dismissAll = globals_1.jest.fn();
        const contextValue = {
            showNotification,
            dismissAll
        };
        contextValue.showNotification(title, message, imgUrl, options);
        // Check if the notification is rendered
        const notificationTitle = getByText(title);
        (0, globals_1.expect)(notificationTitle).toBeDefined();
        // Dismiss the notification
        react_native_2.fireEvent.press(getByTestId('dismissButton'));
        // Check if the notification is dismissed
        const dismissedNotificationTitle = queryByText(title);
        (0, globals_1.expect)(dismissedNotificationTitle).toBeNull();
    });
});
