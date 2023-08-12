import * as THREE from "three";
import { useThreeContext } from "../context/threeContext";
import { useEffect } from "react";

import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

interface Props {
  envMapIntensity: number;
}

const CameraModel: React.FC<Props> = ({ envMapIntensity }) => {
  const { modelRef, modelBackCase, selectedColor } = useThreeContext();

  const { scene } = useGLTF("/scene_final.glb");

  const { metalness: glassAreametalness, roughness: glassArearoughness } =
    useControls("Camera", {
      metalness: {
        value: 0.5,
        step: 0.001,
        min: 0,
        max: 1,
      },

      roughness: {
        value: 0,
        step: 0.001,
        min: 0,
        max: 1,
      },
    });

  scene.traverse((child: any) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.envMapIntensity = envMapIntensity;
    }
    if (child.name == "camera_case") modelBackCase.current = child;
    if (child.name == "Object_40_1") {
    }
    if (child.name.startsWith("glass_")) {
      child.material.metalness = glassAreametalness;
      child.material.roughness = glassArearoughness;
    }
  });

  useEffect(() => {
    (modelBackCase.current.material as THREE.MeshStandardMaterial).color =
      selectedColor;
  }, [selectedColor]);

  return <primitive ref={modelRef} object={scene}></primitive>;
};

useGLTF.preload("/scene_draco.glb");
export default CameraModel;
