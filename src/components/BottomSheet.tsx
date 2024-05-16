import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, Pressable} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { BottomSheetProps } from '../types/types';

const {height: DEVICE_HEIGHT} = Dimensions.get('window');
const DEFAULT_BOTTOM_SHEET_HEIGHT = DEVICE_HEIGHT * 0.4;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BottomSheet = ({isVisible, children, height, onHide}: BottomSheetProps) => {
  const BOTTOM_SHEET_HEIGHT = height ?? DEFAULT_BOTTOM_SHEET_HEIGHT;
  const translationY = useSharedValue(0);
  const totalDragDistance = useSharedValue(0);

  const styles = generateStyles();

  useEffect(() => {
    if (isVisible) {
      showBottomSheet();
    } else {
      hideBottomSheet();
    }
  }, [isVisible, BOTTOM_SHEET_HEIGHT]);

  const showBottomSheet = () => {
    translationY.value = withSpring(-BOTTOM_SHEET_HEIGHT, {damping: 50});
  };

  const hideBottomSheet = () => {
    translationY.value = withSpring(0, {damping: 50}, () => runOnJS(onHide)());
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      totalDragDistance.value = translationY.value;
    })
    .onUpdate(event => {
      const totalY = event.translationY + totalDragDistance.value;
      if (totalY > -BOTTOM_SHEET_HEIGHT) {
        translationY.value = totalY;
      }
    })
    .onEnd(() => {
      if (translationY.value < -BOTTOM_SHEET_HEIGHT / 2) {
        runOnJS(showBottomSheet)();
      } else {
        runOnJS(hideBottomSheet)();
      }
    });

  const rBottomSheet = useAnimatedStyle(
    () => ({
      transform: [{translateY: translationY.value}],
    }),
    [],
  );

  const rBackground = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        translationY.value,
        [-BOTTOM_SHEET_HEIGHT, 0],
        [0.5, 0],
        Extrapolation.CLAMP,
      ),
    }),
    [BOTTOM_SHEET_HEIGHT],
  );

  return (
    <>
      <AnimatedPressable
        pointerEvents={isVisible ? 'auto' : 'none'}
        style={[styles.background, rBackground]}
        onPress={hideBottomSheet}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheet]}>
          <View style={styles.handler} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );

  function generateStyles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        height: BOTTOM_SHEET_HEIGHT,
        top: DEVICE_HEIGHT,
        backgroundColor: '#fff',
        borderRadius: 20,
      },
      background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#303133',
      },
      handler: {
        width: 60,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#999999',
        alignSelf: 'center',
        marginVertical: 20,
      },
    });
  }
};

export default BottomSheet;
