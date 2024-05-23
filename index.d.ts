import { ReactElement } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface Configurations {
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

interface BottomSheetContextProps {
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

declare const SnackBarProvider: React.FC<BottomSheetProviderProps>;
declare const useSnackBar: () => {
  /**
   * To show the SnackBar component
   * @param message Message to be displayed in the SnackBar
   * @param type Type of the SnackBar. Can be "error", "success" or "info"
   */
  showSnackBar: (message: string, type: "error" | "success" | "info") => void;
  /**
   * To hide the SnackBar component
   */
  hideSnackBar: () => void;
};