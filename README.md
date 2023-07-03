# React Native In-App Notification (@iroomit/react-native-in-app-notification)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

This library provides a simple interface for showing push notification-like notifications throughout your React Native app while it is in the foreground. Fully written in JS (TypeScript), no external libraries needed.

✅ No additional libraries/imports (Pure JS)

✅ Implemented in TypeScript/Full TypeScript Support

## Installation

Install the package by running:

```
npm install @iroomit/react-native-in-app-notification
```

or

```
yarn add @iroomit/react-native-in-app-notification
```

## Usage

### Getting Started

You must wrap the root of your app in your ```App.js``` or ```App.tsx``` file with ```<InAppNotificationProvider />```:

```
...

import { InAppNotificationProvider } from '@iroomit/react-native-in-app-notification';

const App = () => {

    return (
        <InAppNotificationProvider>
            <View>
                ...
            </View>
        </InAppNotificationProvider>
    )
}

...
```

### Use in Functional Components

To display a notification from any functional component within your application, you can use the ```useInAppNotification()``` hook to get access to the ```showNotification(...)``` method:

```
...

import { InAppNotificationProvider } from '@iroomit/react-native-in-app-notification';

const MyButton = () => {
    const { showNotification } = useInAppNotification();

    return (
        <TouchableOpacity onPress={() => {

            showNotification("My Title", "My notification text can go here");
            
        }}>
            ...
        </TouchableOpacity>
    )
}

...
```