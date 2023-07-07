import React, { PropsWithChildren } from 'react';
import { Animated, PanResponder } from 'react-native';
import { getStatusBarHeight } from './StatusBar';

type AnimationProps = {
    earlyClose?: boolean,
    immediateClose?: boolean,
    onClose?: Function
} & PropsWithChildren;

export const Animation: React.FC<AnimationProps> = (props) => {

    const anim = React.useRef(new Animated.Value(-90 - getStatusBarHeight())).current;
    const closeTimeout = React.useRef(0 as unknown as NodeJS.Timeout);
    const instantiated = React.useRef(new Date().getTime());

    const panResponder = React.useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gestureState) => {
           anim.setValue(gestureState.dy);
          },
          onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy < 0) {
                Animated.timing(anim, {
                    toValue: -90 - getStatusBarHeight(),
                    useNativeDriver: true,
                    duration: 180
                  }).start(() => {
                    props.onClose?.();
                  });
            } else {
                Animated.timing(anim, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 180
                  }).start();
            }
            
          },
          onMoveShouldSetPanResponder: (evt, gestureState) => {
            //return true if user is swiping, return false if it's a single click
            return !(gestureState.dx === 0 && gestureState.dy === 0)                  
          }
        })
      ).current;

      const closeAnim = () => {
        Animated.timing(anim, {
            toValue: -90 - getStatusBarHeight(),
            useNativeDriver: true,
            duration: 180
        }).start();
    }

    
    React.useEffect(() => {
        Animated.timing(anim, {
            toValue: 0,
            useNativeDriver: true,
            duration: 180
        }).start();

        
    }, []);

    React.useEffect(() => {
        if (props.immediateClose) {
            closeAnim();
        }
    }, [props.immediateClose]);

    React.useEffect(() => {
        

        const now = new Date().getTime();
        const closeDur = props.earlyClose ? 2800 : 8800;
        const diff = now - instantiated.current;

        if ((closeDur - diff) <= 0) {
            clearTimeout(closeTimeout.current);
            closeAnim();
        } else {
            closeTimeout.current = setTimeout(closeAnim, closeDur - diff);
        }
        

        return () => clearTimeout(closeTimeout.current);
    }, [props.earlyClose]);

    return (
        <Animated.View {...panResponder.panHandlers} style={{transform: [{translateY: anim.interpolate({
            inputRange: [-90 - getStatusBarHeight(), 12],
            outputRange: [-90 - getStatusBarHeight(), 12],
            extrapolate: 'clamp'
        })}]}}>
            {props.children}
        </Animated.View>
    )

}