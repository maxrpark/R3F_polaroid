import { useContext, createContext, ReactNode, useRef, useState } from "react";
import * as THREE from "three";
import { Camera } from "@react-three/fiber";

import { useAnimateCustomizeCamera } from "../hooks/useAnimateCustomizeCamera";
import {
  cameraLookAt_1,
  cameraLookAt_6,
  cameraLookAt_6_mobile,
  cameraLookAt_7,
  cameraLookAt_7_mobile,
  colors,
} from "../utils/data";
import { useLenis } from "@studio-freight/react-lenis";

interface Props {
  children: ReactNode;
}
export type CameraInstance = Camera & {
  manual?: boolean | undefined;
};

interface ThreeContextInt {
  modelRef: React.MutableRefObject<THREE.Group | null>;
  modelBackCase: React.MutableRefObject<THREE.Mesh>;
  isCustomizeVisible: boolean;
  cameraRef: React.MutableRefObject<CameraInstance>;
  cameraTarget: React.MutableRefObject<THREE.Vector3>;
  selectedColor: THREE.Color;

  toggleShowCustomizer: () => void;
  changeCameraCaseColor: (color: THREE.Color) => void;
}

const ThreeContext = createContext({} as ThreeContextInt);

export const ThreeProvider: React.FC<Props> = ({ children }) => {
  const modelRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<CameraInstance>(null!);
  const cameraTarget = useRef<THREE.Vector3>(cameraLookAt_1);
  const modelBackCase = useRef<THREE.Mesh>(null!);

  //@ts-ignore
  const lenis = useLenis();

  const enterCustomizerTimeLine = useAnimateCustomizeCamera({
    cameraRef,
    cameraTarget,
    cameraPositionDesktop: new THREE.Vector3(-7.65, 2, 8.57),
    cameraPositionMobile: new THREE.Vector3(-6.58, 7.8, 10.8),
    cameraLookAtMobile: cameraLookAt_7_mobile,
    cameraLookAtDesktop: cameraLookAt_7,
  });
  const existCustomizerTimeLine = useAnimateCustomizeCamera({
    cameraRef,
    cameraTarget,
    cameraPositionDesktop: new THREE.Vector3(5.88, 4.26, 10.04),
    cameraPositionMobile: new THREE.Vector3(7.33, 6.23, 11.83),
    cameraLookAtMobile: cameraLookAt_6_mobile,
    cameraLookAtDesktop: cameraLookAt_6,
  });

  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const toggleShowCustomizer = () => {
    if (lenis?.__isStopped) {
      lenis.start();
    } else {
      // document.body.style.overflow = "hidden";
      lenis?.stop();
      if (window.innerWidth < 800) {
        window.alert("Drag to explore the 360-degree view");
      }
    }
    setIsCustomizeVisible((oldValue) => {
      const newValue = !oldValue;

      if (newValue === true) {
        document.body.style.cursor = "grab";
        enterCustomizerTimeLine.progress(0);
        enterCustomizerTimeLine.play();
      } else {
        document.body.style.cursor = "auto";
        existCustomizerTimeLine.progress(0);
        existCustomizerTimeLine.play();
      }

      return newValue;
    });
  };

  const changeCameraCaseColor = (color: THREE.Color) => {
    setSelectedColor(color);
  };

  return (
    <ThreeContext.Provider
      value={{
        cameraTarget,
        selectedColor,
        modelRef,
        cameraRef,
        modelBackCase,
        isCustomizeVisible,
        toggleShowCustomizer,
        changeCameraCaseColor,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};

export const useThreeContext = () => useContext(ThreeContext);
