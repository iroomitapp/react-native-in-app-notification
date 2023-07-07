import React, { PropsWithChildren } from 'react';
import { InAppNotificationContextType } from './InAppNotificationContext';
export declare function withInAppNotification<ChildProps extends {
    inAppNotification: InAppNotificationContextType;
}>(Child: React.ComponentType<ChildProps>): (props: PropsWithChildren<ChildProps>) => React.JSX.Element;
