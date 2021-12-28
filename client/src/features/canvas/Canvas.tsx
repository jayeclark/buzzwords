import React from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { useContextBridge, useProgress } from "@react-three/drei";
import { ReactReduxContext } from "react-redux";

import Wrap3d from "./Wrap3d";
import { A11yAnnouncer } from "@react-three/a11y";

const Canvas: React.FC = ({ children }) => {
  const ReduxProvider = useContextBridge(ReactReduxContext);

  return (
    <>
      <ThreeCanvas
        className="shrinkable"
        camera={{
          position: [0, 0, 20],
          zoom: 3,
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
      <A11yAnnouncer />
    </>
  );
};
export default Canvas;
