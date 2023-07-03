import React from 'react';
import { InAppNotificationContext } from './InAppNotificationContext';

export function useInAppNotification() {
    return React.useContext(InAppNotificationContext);
}