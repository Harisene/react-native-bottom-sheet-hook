import BottomSheet from '../components/BottomSheet';
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

const initialState = {
  show: () => {},
  hide: () => {},
};

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

const BottomSheetContext = createContext<BottomSheetContextType>(initialState);

interface Props {
  children: ReactElement;
}

const BottomSheetProvider: React.FC<Props> = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState<ReactNode>(null);
  const [configurations, setConfigurations] = useState<Config | null>(null);

  const show = (comp: ReactNode, config?: Config) => {
    if (component) {
      return;
    }
    setIsVisible(true);
    setComponent(comp);
    setConfigurations(config ?? null);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const reset = () => {
    setIsVisible(false);
    setComponent(null);
    setConfigurations(null);
  };

  return (
    <BottomSheetContext.Provider value={{show, hide}}>
      {children}
      {component && (
        <BottomSheet
          onHide={reset}
          height={configurations?.height}
          isVisible={isVisible}>
          {component}
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;
export const useBottomSheet = () => useContext(BottomSheetContext);
