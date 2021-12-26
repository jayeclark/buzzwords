/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

import hexoutlinesolid from "../../assets/hexoutlinesolid.glb?url";
import { theme } from "../app/theme";

export const HexOutlineSolid: React.FC<GroupProps> = ({
  children,
  ...props
}) => {
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF(hexoutlinesolid);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        scale={[3, 3, 3]}
        geometry={nodes.Torus001.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        {children || <meshStandardMaterial color={theme.colors.primary} />}
      </mesh>
    </group>
  );
};

useGLTF.preload(hexoutlinesolid);