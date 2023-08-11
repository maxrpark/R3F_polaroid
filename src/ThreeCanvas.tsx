import React from "react";
import { Canvas } from "@react-three/fiber";

import { Leva } from "leva";
import Experience from "./Experience";
import { Perf } from "r3f-perf";

const pathName = window.location.pathname;
const ThreeCanvas: React.FC = () => {
  return (
    <div className='webgl'>
      <Leva collapsed hidden={pathName !== "/debug"} />
      <Canvas
        className='canvas'
        shadows
        camera={{
          fov: 25,
          near: 0.2,
          far: 1000,
          position: [10, 0, 0],
        }}
        gl={{
          antialias: true,
        }}
      >
        {pathName === "/debug" && <Perf position='top-left' />}
        <Experience />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
