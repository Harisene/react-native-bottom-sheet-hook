import { PropsWithChildren } from "react";

export interface BottomSheetProps extends PropsWithChildren {
  isVisible: boolean;
  height?: number;
  onHide: () => void;
}
