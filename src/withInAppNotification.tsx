import React, { PropsWithChildren } from 'react';
import { InAppNotificationContextType } from './InAppNotificationContext';
import { useInAppNotification } from './useInAppNotification';


export function withInAppNotification<ChildProps extends { inAppNotification: InAppNotificationContextType }>(Child: React.ComponentType<ChildProps>) {
    return (props: PropsWithChildren<ChildProps>) => {

        const inAppNotification = useInAppNotification();

        return <Child {...props} inAppNotification={inAppNotification} />;
        
    }
}
