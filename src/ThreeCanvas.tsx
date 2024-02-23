import React from "react";
import { Canvas } from "@react-three/fiber";

import { Leva } from "leva";
import Experience from "./Experience";
import { Perf } from "r3f-perf";

const locationHash = window.location.hash;
const ThreeCanvas: React.FC = () => {
  return (
    <div className='webgl'>
      <Leva collapsed hidden={locationHash !== "#debug"} />
      <Canvas
        className='canvas'
        shadows
        gl={{
          antialias: true,
        }}
      >
        {locationHash === "#debug" && <Perf position='top-left' />}
        <Experience />
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
