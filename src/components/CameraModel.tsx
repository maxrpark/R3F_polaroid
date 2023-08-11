import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useThreeContext } from "../context/threeContext";
import { useEffect } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
const CameraModel: React.FC = () => {
  const { modelRef, modelBackCase, modelIsLoaded, selectedColor } =
    useThreeContext();

  // const { scene } = useLoader(GLTFLoader, "/camera_scene.glb", () => {
  //   modelIsLoaded();
  // });

  const { scene } = useLoader(GLTFLoader, "/camera_scene.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/");
    loader.setDRACOLoader(dracoLoader);
    modelIsLoaded();
  });

  scene.traverse((child: THREE.Mesh) => {
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

export default CameraModel;
