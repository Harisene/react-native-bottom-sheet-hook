import BottomSheet from "../components/BottomSheet";
import React, { ReactNode, createContext, useContext, useState } from "react";
import {
  BottomSheetContextProps,
  BottomSheetProviderProps,
  Configurations,
} from "../types/types";

const initialState = {
  show: () => {},
  hide: () => {},
};

const BottomSheetContext = createContext<BottomSheetContextProps>(initialState);

const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
  backgroundColor,
  containerStyle,
  height,
  hideBackground,
  hideHandle,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState<ReactNode>(null);
  const [configurations, setConfigurations] = useState<Configurations | null>(
    null
  );

  const show = (comp: ReactNode, config?: Configurations) => {
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
    <BottomSheetContext.Provider value={{ show, hide }}>
      {children}
      {component && (
        <BottomSheet
          onHide={reset}
          height={configurations?.height}
          isVisible={isVisible}
          hideHandle={
            configurations?.hideHandle !== undefined
              ? configurations.hideHandle
              : hideHandle
          }
          hideBackground={
            configurations?.hideBackground !== undefined
              ? configurations.hideBackground
              : hideBackground
          }
          backgroundColor={configurations?.backgroundColor ?? backgroundColor}
          containerStyle={configurations?.containerStyle ?? containerStyle}
        >
          {component}
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;
export const useBottomSheet = () => useContext(BottomSheetContext);
