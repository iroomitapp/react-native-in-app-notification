# React Native In-App Notification (@iroomit/react-native-in-app-notification)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://github.com/iroomitapp/react-native-in-app-notification/blob/main/LICENSE)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

This library provides a simple interface for showing push notification-like messages throughout your React Native app on iOS and Android while it is in the foreground. Fully written in JS (TypeScript), no external libraries needed.

✅ No additional libraries/imports (Pure JS)

✅ Implemented in TypeScript/Full TypeScript Support

Used in production for the in-app messaging portion of [iROOMit Roommates & Rooms for Rent Finder](https://www.iroomit.com/) iOS & Android app.

![](example.gif)

## Features

✅ Animates in/out from top of screen

✅ Custom title and message preview

✅ Optional image preview

✅ Drag up to close

✅ onPress functionality for each notification

✅ Customizable styles

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

To display a notification from any functional component within your application, you can use the ```useInAppNotification()``` hook to get access to the ```showNotification(...)``` and ```dismissAll()``` methods:

```
...

import { useInAppNotification } from '@iroomit/react-native-in-app-notification';

const MyButton = () => {
    const { showNotification } = useInAppNotification();

    return (
        <TouchableOpacity onPress={() => {

            showNotification("My Title", "My notification text can go here", "https://mydomain.com/myimage.png", {
                onPress: () => console.log('Notification pressed!')
            });
            
        }}>
            ...
        </TouchableOpacity>
    )
}

...
```

### Use in Class Components

You can wrap your class component definition with the ```withInAppNotification(...)``` higher-order component function to access the ```inAppNotification``` prop that provides ```showNotification(...)``` and ```dismissAll()``` methods:

```
...
import React from 'react';
import { withInAppNotification } from '@iroomit/react-native-in-app-notification';

export default withInAppNotification(class MyButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <TouchableOpacity onPress={() => {

                this.props.inAppNotification.showNotification("My Title", "My notification text can go here", "https://mydomain.com/myimage.png", {
                    onPress: () => console.log('Notification pressed!')
                });
                
            }}>
                ...
            </TouchableOpacity>
        )
    }
});
...
```

## API Reference

### InAppNotificationProvider: Component

#### Props

* **titleTextStyle** (optional): A style prop that defines the text style for the notification title.
* **messageTextStyle** (optional): A style prop that defines the text style for the notification message.
* **thumbnailStyle** (optional): A style prop that defines the style for the notification thumbnail image.

### showNotification(title: string, message: string, imgUrl?: string, options?: InAppNotificationOptions): Function

This function adds a notification to the queue to be shown. By default, one notification is shown every 3 seconds. If there are no more notifications in the queue, the last/only notification in the queue is shown for up to 9 seconds.

* **title** and **message** are required.
* If **imgUrl** is not provided, the image preview on the left of the notification is hidden.

#### InAppNotificationOptions

An optional object to further customize each individual notification. For now, just used to assign a callback for the **onPress** action.

* **onPress** (optional): Function

If **onPress** is not defined, then the notification shown will not be pressable.

### dismissAll(): Function

This function immediately dismisses any visible notifications and clears the queue of any remaining notifications that were to be shown.

## Collaboration

While this package is production-ready, we are open to collaboration on new features and bug fixes. We also intend on supporting various kinds of notification styles in the near future.

If you would like to contribute, please [open a new issue on GitHub](https://github.com/iroomitapp/react-native-in-app-notification/issues) or [contact iROOMit](https://www.iroomit.com/contact).