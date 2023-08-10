import { Camera } from "@react-three/fiber";
import {
  useContext,
  createContext,
  ReactNode,
  useRef,
  useState,
  useEffect,
} from "react";
import * as THREE from "three";

import { useAnimateCustomizeCamera } from "../hooks/useAnimateCustomizeCamera";
import {
  cameraLookAt_1,
  cameraLookAt_6,
  cameraLookAt_6_mobile,
  cameraLookAt_7,
  cameraLookAt_7_mobile,
  colors,
} from "../utils/data";

interface Props {
  children: ReactNode;
}
type CameraInstance = Camera & {
  manual?: boolean | undefined;
};

interface ThreeContextInt {
  modelRef: any;
  modelBackCase: React.MutableRefObject<THREE.Mesh>;
  isModelLoaded: boolean;
  isCustomizeVisible: boolean;
  cameraRef: React.MutableRefObject<CameraInstance>;
  cameraTarget: React.MutableRefObject<THREE.Vector3>;
  selectedColor: THREE.Color;

  modelIsLoaded: () => void;
  toggleShowCustomizer: () => void;
  changeCameraCaseColor: (color: THREE.Color) => void;
}

const ThreeContext = createContext({} as ThreeContextInt);

export const ThreeProvider: React.FC<Props> = ({ children }) => {
  const modelRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<CameraInstance>(null!);
  const cameraTarget = useRef<THREE.Vector3>(cameraLookAt_1);
  const modelBackCase = useRef<THREE.Mesh>(null!);

  const enterCustomizerTimeLine = useAnimateCustomizeCamera({
    cameraRef,
    cameraTarget,
    cameraPositionDesktop: { x: -7.65, y: 2, z: 8.57 },
    cameraPositionMobile: {
      x: -6.58,
      y: 7.8,
      z: 10.8,
    },
    cameraLookAtMobile: cameraLookAt_7_mobile,
    cameraLookAtDesktop: cameraLookAt_7,
  });
  const existCustomizerTimeLine = useAnimateCustomizeCamera({
    cameraRef,
    cameraTarget,
    cameraPositionDesktop: { x: 5.88, y: 4.26, z: 10.04 },
    cameraPositionMobile: {
      x: 7.33,
      y: 6.23,
      z: 11.83,
    },
    cameraLookAtMobile: cameraLookAt_6_mobile,
    cameraLookAtDesktop: cameraLookAt_6,
  });

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const modelIsLoaded = () => {
    setIsModelLoaded(true);
  };

  const toggleShowCustomizer = () => {
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
      if (window.innerWidth < 800) {
        window.alert("Drag or zoom to see full details");
      }
    }
    setIsCustomizeVisible((oldValue) => {
      const newValue = !oldValue;

      if (newValue === true) {
        enterCustomizerTimeLine.progress(0);
        enterCustomizerTimeLine.play();
      } else {
        existCustomizerTimeLine.progress(0);
        existCustomizerTimeLine.play();
      }

      return newValue;
    });
  };

  const changeCameraCaseColor = (color: THREE.Color) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    if (!cameraRef.current) return;
  }, [cameraRef.current]);

  return (
    <ThreeContext.Provider
      value={{
        cameraTarget,
        selectedColor,
        modelRef,
        isModelLoaded,
        cameraRef,
        modelBackCase,
        isCustomizeVisible,
        toggleShowCustomizer,
        changeCameraCaseColor,
        modelIsLoaded,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};

export const useThreeContext = () => useContext(ThreeContext);
