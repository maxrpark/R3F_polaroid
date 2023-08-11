import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import CameraModel from "./components/CameraModel";
import { useThreeContext } from "./context/threeContext";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { useControls } from "leva";

const Experience: React.FC = () => {
  const { cameraRef, isCustomizeVisible, selectedColor } = useThreeContext();
  const { camera } = useThree();

  const {
    x,
    y,
    z,
    color,
    intensity,
    normalBias,
    top,
    bottom,
    left,
    right,
    far,
  } = useControls("Directional Light", {
    x: { value: -1.3, step: 0.01, min: -20, max: 20 },
    y: { value: 1.2, step: 0.01, min: -20, max: 20 },
    z: { value: 2.82, step: 0.01, min: -20, max: 20 },
    color: "#fff99f",
    intensity: { value: 3.3, step: 0.01, min: 0, max: 5 },
    normalBias: { value: 0.02, step: 0.001, min: 0.01, max: 0.1 },
    far: { value: 15, step: 0.01, min: -2, max: 200 },
    top: { value: 2, step: 0.01, min: -2, max: 200 },
    right: { value: 2, step: 0.01, min: -2, max: 200 },
    bottom: { value: -2, step: 0.01, min: -2, max: 200 },
    left: { value: -2, step: 0.01, min: -2, max: 200 },
  });
  const {
    x: pointLightX,
    y: pointLightY,
    z: pointLightZ,
    color: pointLightColor,
    intensity: pointLightIntensity,
  } = useControls("Point Light", {
    x: { value: 0.85, step: 0.01, min: 0, max: 10 },
    y: { value: 0.16, step: 0.01, min: 0, max: 10 },
    z: { value: 0, step: 0.01, min: 0, max: 10 },
    intensity: { value: 0.21, step: 0.01, min: 0, max: 5 },
    color: "#ffd07e",
  });
  const { isPlaneVisible } = useControls("Plane", {
    isPlaneVisible: true,
  });

  useEffect(() => {
    camera.lookAt(-1.6, -0.47, 1.25);
    cameraRef.current = camera;
  }, []);

  return (
    <>
      <BakeShadows />;
      <OrbitControls enabled={isCustomizeVisible} />
      <ambientLight />
      <directionalLight
        color={color}
        castShadow
        position={[x, y, z]}
        intensity={intensity}
        shadow-mapSize={[2048, 2048]}
        shadow-normalBias={normalBias}
        shadow-camera-near={1}
        shadow-camera-far={far}
        shadow-camera-top={top}
        shadow-camera-right={right}
        shadow-camera-bottom={bottom}
        shadow-camera-left={left}
      />
      <pointLight
        color={pointLightColor}
        intensity={pointLightIntensity}
        position={[pointLightX, pointLightY, pointLightZ]}
      />
      <CameraModel />
      <mesh
        receiveShadow
        castShadow
        position={[0, -1, 0]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[11, 11]} />
        <meshStandardMaterial
          transparent
          opacity={isCustomizeVisible ? 0 : 0.1}
          color={selectedColor}
          visible={isPlaneVisible}
        />
      </mesh>
    </>
  );
};

export default Experience;
