# react-native-bottom-sheet-hook #

<br>

![Screen Recording 2024-05-16 at 4 21 16 PM](https://github.com/Harisene/react-native-bottom-sheet-hook/assets/33250282/c07bbd27-cd82-4f17-8faa-57e2ac7067a9)

<br>
<br>

## Features of this package :star_struck: :star_struck:

:sparkle: You can use ```useBottomSheet``` hook to control the bottom sheet from any component.

:sparkle: ```BottomSheetProvider``` higher order component helps to maintain clean code.

:sparkle: This package uses ```react-native-reanimated``` and ```react-native-gesture-handler``` for best performance.

:sparkle: All the animations are running on the main thread.

:sparkle: Customize the ```BottomSheet``` component the way you want. Pass ```props``` "globally" or override global ```props``` "locally".

<br>

## Hey! Would you like to contribute to this package?! :raised_hands: :handshake:
Go ahead, fork the repo, and create many pull requests. :smile: :smile:

<br>

## Installation Guide ##

install the package by running the below command
```
  npm install react-native-bottom-sheet-hook
```
or
```
  yarn add react-native-bottom-sheet-hook
```
<br>

> **Note:** Since this package uses ```react-native-reanimated``` and ```react-native-gesture-handler```, please follow the below steps

<br>

Wrap your root component with ```GestureHandlerRootView``` as below,

```
import { GestureHandlerRootView } from "react-native-gesture-handler";

return (
  <GestureHandlerRootView style={{ flex: 1 }}>  
    <NavigationContainer>
      <Stacks/>
    </NavigationContainer>
  </GestureHandlerRootView>
)
```

<br>


Add ```react-native-reanimated/plugin``` plugin to your ```babel.config.js```

```
module.exports = {
    presets: [
      ... // don't add it here :)
    ],
    plugins: [
      ...
      // has to be listed last.
      'react-native-reanimated/plugin',
    ],
  };
```

<br>

## How to use the package ##

### Step 01 ###

Wrap your screen component or the root component with ```BottomSheetProvider```

```
import { BottomSheetProvider } from 'react-native-bottom-sheet-hook';

  <GestureHandlerRootView style={{ flex: 1 }}>
    <BottomSheetProvider>
      <NavigationContainer>
        <Stacks/>
      </NavigationContainer>
    </BottomSheetProvider>
  </GestureHandlerRootView>

```

### Step 02 ###

import the ```useBottomSheet``` and use ```show``` and ```hide``` functions.
You need to pass the component to show in the bottom sheet as the argument to ```show``` function.

```
import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useBottomSheet } from "react-native-bottom-sheet-hook";

export default function HomeScreen() {
  const { show, hide } = useBottomSheet();

  const renderBottomSheetComponent = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome to</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
          React Native Bottom Sheet Hook
        </Text>
        <Text style={{marginTop: 40, fontSize: 16}}>Use the "useBottomSheet" hook to control me</Text>
        <Button title="Close" color='red' onPress={hide} />
      </View>
    );
  };

  const handlePress = () => {
    show(renderBottomSheetComponent(), { height: 300 });
  };

  return (
    <View style={styles.container}>
      <Button title="Show bottom sheet" onPress={handlePress} />
    </View>
  );
}


```

## Props ##

### BottomSheetProvider Props ###

Prop name | type | required | description | default value
--- | --- | --- | --- | ---
hideHandle | boolean | N | Hide the handle of the bottom sheet | false
hideBackground | boolean | N | Hide the background of the bottom sheet | false
backgroundColor | string | N | Change the background color of the bottom sheet | '#303133'
containerStyle | StyleProp<ViewStyle> | N | Change the container style of the bottom sheet | undefined
height | number | N | Height of the bottom sheet | DEVICE_HEIGHT * 0.4

### show method arguments ###

Argument name | type | required | description | default value
--- | --- | --- | --- | ---
component | ReactElement | Y | Component to render inside the ```BottomSheet```
config | Configurations | N | Set configurations for the BottomSheet component. Additionally, if you have set global configurations through ```BottomSheetProvider``` props, you can override them here  | false

### Configurations ###

Prop name | type | required | description | default value
--- | --- | --- | --- | ---
hideHandle | boolean | N | Hide the handle of the bottom sheet | false
hideBackground | boolean | N | Hide the background of the bottom sheet | false
backgroundColor | string | N | Change the background color of the bottom sheet | '#303133'
containerStyle | StyleProp<ViewStyle> | N | Change the container style of the bottom sheet | undefined
height | number | N | Height of the bottom sheet | DEVICE_HEIGHT * 0.4



