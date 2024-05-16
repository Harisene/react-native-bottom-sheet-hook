# react-native-bottom-sheet-hook #

<br>

https://github.com/Harisene/react-native-bottom-sheet-hook/assets/33250282/5e1288e0-6421-4e1e-8f5c-fdc2fe2628f6

<br>
<br>

Features of this package,

- you can use ```useBottomSheet``` hook to control the bottom sheet from any component.
- ```BottomSheetProvider``` higher order component helps to maintain clean code.
- This package uses ```react-native-reanimated``` and ```react-native-gesture-handler``` for best performance.
- All the animations are running on the main thread.

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
