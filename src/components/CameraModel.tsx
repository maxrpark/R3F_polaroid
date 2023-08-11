import * as THREE from "three";
import { useThreeContext } from "../context/threeContext";
import { useEffect } from "react";

import { useGLTF } from "@react-three/drei";
const CameraModel: React.FC = () => {
  const { modelRef, modelBackCase, selectedColor } = useThreeContext();

  const { scene } = useGLTF("/scene_draco.glb");

  scene.traverse((child: any) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
    if (child.name == "camera_case") modelBackCase.current = child;
  });

  useEffect(() => {
    (modelBackCase.current.material as THREE.MeshStandardMaterial).color =
      selectedColor;
  }, [selectedColor]);

  return (
    <>
      <primitive ref={modelRef} object={scene}></primitive>
    </>
  );
};

useGLTF.preload("/scene_draco.glb");
export default CameraModel;
