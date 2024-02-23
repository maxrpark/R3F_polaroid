import { Suspense, useEffect } from "react";
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
import { useLenis } from "@studio-freight/react-lenis";

const App: React.FC = () => {
  const { progress } = useProgress();

  const lenis = useLenis(() => {});

  useEffect(() => {
    if (lenis) lenis.stop();
    if (progress === 100) {
      lenis?.start();
    }
  }, [progress]);

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
          description={
            "It’s hard to top a classic. The Polaroid Now is compatible with Polaroid i-Type & 600 film in the classic Polaroid instant film format."
          }
          showButton={false}
        />
        <FrontView
          cameraPositionDesktop={new THREE.Vector3(5.88, 4.26, 10.04)}
          cameraPositionMobile={new THREE.Vector3(7.55, 7.36, 10.68)}
          cameraLookAtMobile={cameraLookAt_6_mobile}
          cameraLookAtDesktop={cameraLookAt_6}
          title={"Now in your favorite color"}
          description={
            "Elevate your instant photography experience with a personalized touch. Choose from a range of stunning colors that match your style and capture moments uniquely yours. Make every shot a statement with the Polaroid Now in your chosen hue"
          }
          showButton={true}
        />
        <Customize />
      </Suspense>
    </main>
  );
};

export default App;
