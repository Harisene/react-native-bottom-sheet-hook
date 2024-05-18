import { PropsWithChildren, ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface BottomSheetProps extends PropsWithChildren {
  isVisible: boolean;
  height?: number;
  onHide: () => void;
  hideHandle?: boolean;
  hideBackground?: boolean;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface Configurations {
  /**
   * Height of the bottom sheet.
   */
  height?: number;
  /**
   * to hide the handle of the bottom sheet.
   */
  hideHandle?: boolean;
  /**
   * to hide the background of the bottom sheet.
   */
  hideBackground?: boolean;
  /**
   * to change the background color of the bottom sheet.
   */
  backgroundColor?: string;
  /**
   * to change the container style of the bottom sheet.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export interface BottomSheetContextProps {
  /**
   * Call this function to show the bottom sheet.
   * Don't forget to pass your ```component``` as argument to show in the bottom sheet.
   *
   * If you are passing a ```FlatList``` or ```ScrollView``` to the bottom sheet, make sure to import them from ```react-native-gesture-handler```.
   */
  show: (component: React.ReactNode, config?: Configurations) => void;

  /**
   * Call this function to hide the bottom sheet.
   */
  hide: () => void;
}

export interface BottomSheetProviderProps {
  children: ReactElement;
  /**
   * to hide the handle of the bottom sheet.
   */
  hideHandle?: boolean;
  /**
   * to hide the background of the bottom sheet.
   */
  hideBackground?: boolean;
  /**
   * to change the background color of the bottom sheet.
   */
  backgroundColor?: string;
  /**
   * to change the container style of the bottom sheet.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Height of the bottom sheet.
   */
  height?: number;
}
