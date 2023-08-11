import React from "react";
import { useThreeContext } from "../context/threeContext";

const Floor: React.FC = () => {
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
      />
    </mesh>
  );
};

export default Floor;
