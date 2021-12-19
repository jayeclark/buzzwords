/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import flower01 from '../../assets/Flower01.gltf?url'
console.log('flower01 :', flower01);

export const Flower01 = ({ ...props }) => {
  const group = useRef()
  // @ts-ignore
  const { nodes, materials } = useGLTF(flower01)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, Math.PI / 4, 0]} position={[0, 0, 2]} scale={[0.53, 0.53, 0.53]}>
        <mesh geometry={nodes.Flower01_1.geometry} material={materials.White} />
        <mesh geometry={nodes.Flower01_2.geometry} material={materials.Brown} />
      </group>
    </group>
  )
}

useGLTF.preload(flower01)
