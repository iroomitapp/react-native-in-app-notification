import React, { PropsWithChildren } from 'react';
type AnimationProps = {
    earlyClose?: boolean;
    immediateClose?: boolean;
    onClose?: Function;
} & PropsWithChildren;
export declare const Animation: React.FC<AnimationProps>;
export {};
