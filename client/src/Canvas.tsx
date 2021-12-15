import React from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { useContextBridge } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";

import Wrap3d from "./Wrap3d";

const Canvas: React.FC = ({ children }) => {
  const ReduxProvider = useContextBridge(ReactReduxContext);

  return (
    <ThreeCanvas
      camera={{
        position: [0, 0, 10],
        zoom: 2,
      }}
      gl={{
        powerPreference: "low-power",
      }}
      orthographic
      dpr={Math.max(window.devicePixelRatio, 1)}
      flat
    >
      <ReduxProvider>
        <Wrap3d>{children}</Wrap3d>
      </ReduxProvider>
    </ThreeCanvas>
  );
};
export default Canvas;
