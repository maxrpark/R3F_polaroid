import Experience from "./Experience";
import CameraDetails from "./components/CameraDetails";
import Customize from "./components/Customize";
import FrontView from "./components/FrontView";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import {
  cameraLookAt_5,
  cameraLookAt_5_mobile,
  cameraLookAt_6,
  cameraLookAt_6_mobile,
} from "./utils/data";

const App: React.FC = () => {
  return (
    <main id='app'>
      <Experience />
      <Navbar />
      <Hero />
      <CameraDetails />

      <FrontView
        cameraPositionDesktop={{ x: 2.97, y: 0.05, z: 3.64 }}
        cameraPositionMobile={{
          x: -5.91,
          y: 10.28,
          z: 9.17,
        }}
        cameraLookAtMobile={cameraLookAt_5_mobile}
        cameraLookAtDesktop={cameraLookAt_5}
        title={"Shoot with iconic Polaroid film"}
        showButton={false}
      />
      <FrontView
        cameraPositionDesktop={{ x: 5.88, y: 4.26, z: 10.04 }}
        cameraPositionMobile={{
          x: 7.55,
          y: 7.36,
          z: 10.68,
          // x: 7.33,
          // y: 7.36,
          // z: 11.83,
        }}
        cameraLookAtMobile={cameraLookAt_6_mobile}
        cameraLookAtDesktop={cameraLookAt_6}
        title={"Now in your favorite color"}
        showButton={true}
      />
      <Customize />
    </main>
  );
};

export default App;
