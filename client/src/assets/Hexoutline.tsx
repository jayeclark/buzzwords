/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import hexoutline from "../../assets/hexoutline.glb?url";
import { theme } from "../app/theme";

export const HexOutline = ({ ...props }) => {
  const group = useRef();
  // @ts-ignore
  const { nodes } = useGLTF(hexoutline);
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, Math.PI/2, 0]} position={[0, 0, 0]} scale={[3,3,3]}>
        <mesh geometry={nodes.Circle001.geometry}>
          <meshStandardMaterial color={theme.colors.primary} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(hexoutline);
