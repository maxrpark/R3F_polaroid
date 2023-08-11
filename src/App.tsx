import { Suspense } from "react";
import ThreeCanvas from "./ThreeCanvas";
import { useProgress } from "@react-three/drei";
import * as THREE from "three";
import {
  CameraDetails,
  FrontView,
  Customize,
  Hero,
  Navbar,
  Loader,
} from "./components";
import {
  cameraLookAt_5,
  cameraLookAt_5_mobile,
  cameraLookAt_6,
  cameraLookAt_6_mobile,
} from "./utils/data";

const App: React.FC = () => {
  const { progress } = useProgress();

  return (
    <main id='app'>
      <Suspense fallback={<Loader progress={progress} />}>
        <ThreeCanvas />
        <Navbar />
        <Hero />
        <CameraDetails />

        <FrontView
          cameraPositionDesktop={new THREE.Vector3(2.97, 0.05, 3.64)}
          cameraPositionMobile={new THREE.Vector3(-5.91, 10.28, 9.17)}
          cameraLookAtMobile={cameraLookAt_5_mobile}
          cameraLookAtDesktop={cameraLookAt_5}
          title={"Shoot with iconic Polaroid film"}
          showButton={false}
        />
        <FrontView
          // cameraPositionDesktop={{ x: 5.88, y: 4.26, z: 10.04 }}

          // cameraPositionMobile={{
          //   x: 7.55,
          //   y: 7.36,
          //   z: 10.68,
          // }}

          cameraPositionDesktop={new THREE.Vector3(5.88, 4.26, 10.04)}
          cameraPositionMobile={new THREE.Vector3(7.55, 7.36, 10.68)}
          cameraLookAtMobile={cameraLookAt_6_mobile}
          cameraLookAtDesktop={cameraLookAt_6}
          title={"Now in your favorite color"}
          showButton={true}
        />
        <Customize />
      </Suspense>
    </main>
  );
};

export default App;
