import { Text } from 'react-native';
import {jest, describe, it, expect} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import { InAppNotificationProvider } from './InAppNotificationContext';

describe('InAppNotificationProvider', () => {
  it('renders children and shows notification', () => {
    const { getByText } = render(
      <InAppNotificationProvider>
        <Text>Test Children</Text>
      </InAppNotificationProvider>
    );

    // Check if the children are rendered
    const childrenText = getByText('Test Children');
    expect(childrenText).toBeDefined();

    // Show a notification
    const title = 'Notification Title';
    const message = 'Notification Message';
    const imgUrl = 'notification-image.png';
    const options = { onPress: jest.fn() };
    const showNotification = jest.fn();
    const dismissAll = jest.fn();

    const contextValue = {
      showNotification,
      dismissAll
    };

    contextValue.showNotification(title, message, imgUrl, options);

    expect(showNotification).toHaveBeenCalledWith(title, message, imgUrl, options);
  });

  it('dismisses the notification', () => {
    const { getByTestId, queryByText, getByText } = render(
      <InAppNotificationProvider>
        <Text>Test Children</Text>
      </InAppNotificationProvider>
    );

    // Show a notification
    const title = 'Notification Title';
    const message = 'Notification Message';
    const imgUrl = 'notification-image.png';
    const options = { onPress: jest.fn() };
    const showNotification = jest.fn();
    const dismissAll = jest.fn();

    const contextValue = {
      showNotification,
      dismissAll
    };

    contextValue.showNotification(title, message, imgUrl, options);

    // Check if the notification is rendered
    const notificationTitle = getByText(title);
    expect(notificationTitle).toBeDefined();

    // Dismiss the notification
    fireEvent.press(getByTestId('dismissButton'));

    // Check if the notification is dismissed
    const dismissedNotificationTitle = queryByText(title);
    expect(dismissedNotificationTitle).toBeNull();
  });
});
