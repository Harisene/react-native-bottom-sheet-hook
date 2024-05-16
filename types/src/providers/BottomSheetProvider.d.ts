import React, { ReactElement } from 'react';
type Config = {
    /**
     * Height of the bottom sheet.
     */
    height?: number;
};
type BottomSheetContextType = {
    /**
     * Call this function to show the bottom sheet.
     * Don't forget to pass your ```component``` as argument to show in the bottom sheet.
     *
     * If you are passing a ```FlatList``` or ```ScrollView``` to the bottom sheet, make sure to import them from ```react-native-gesture-handler```.
     */
    show: (component: React.ReactNode, config?: Config) => void;
    /**
     * Call this function to hide the bottom sheet.
     */
    hide: () => void;
};
interface Props {
    children: ReactElement;
}
declare const BottomSheetProvider: React.FC<Props>;
export default BottomSheetProvider;
export declare const useBottomSheet: () => BottomSheetContextType;
