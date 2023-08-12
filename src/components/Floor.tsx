import React from "react";
import { useThreeContext } from "../context/threeContext";

interface Props {
  envMapIntensity: number;
}

const Floor: React.FC<Props> = ({ envMapIntensity }) => {
  const { isCustomizeVisible, selectedColor } = useThreeContext();
  return (
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
        envMapIntensity={envMapIntensity}
      />
    </mesh>
  );
};

export default Floor;
