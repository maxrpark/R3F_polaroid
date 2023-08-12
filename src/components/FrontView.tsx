import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThreeContext } from "../context/threeContext";
import { animateCamera } from "../animations/animateCamera";
import { convertTextColor } from "../utils/helpers";

interface Params {
  cameraPositionDesktop: THREE.Vector3;
  cameraPositionMobile: THREE.Vector3;
  cameraLookAtMobile: THREE.Vector3;
  cameraLookAtDesktop: THREE.Vector3;
}
interface Props extends Params {
  title: string;
  description: string;
  showButton: boolean;
}

const FrontView: React.FC<Props> = ({
  cameraPositionDesktop,
  cameraPositionMobile,
  cameraLookAtMobile,
  cameraLookAtDesktop,
  title,
  description,
  showButton,
}) => {
  const {
    cameraRef,
    isCustomizeVisible,
    cameraTarget,
    toggleShowCustomizer,
    selectedColor,
  } = useThreeContext();
  const sectionContainer = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (cameraRef.current) {
      animateCamera({
        trigger: sectionContainer.current,
        cameraRef,
        cameraTarget,
        cameraPositionDesktop,
        cameraPositionMobile,
        cameraLookAtMobile,
        cameraLookAtDesktop,
        start: "top bottom",
        end: "top top",
      });
    }
  }, [cameraRef.current]);
  return (
    <div className='section-content'>
      <section
        style={{ color: convertTextColor(selectedColor) }}
        ref={sectionContainer}
        className='front-details'
      >
        <h3
          style={{
            visibility: `${isCustomizeVisible ? "hidden" : "visible"}`,
            zIndex: 10000,
          }}
          className='title'
        >
          {title}
        </h3>
        <p
          style={{ visibility: `${isCustomizeVisible ? "hidden" : "visible"}` }}
        >
          {description}
        </p>
        {showButton && (
          <button
            style={{ background: convertTextColor(selectedColor) }}
            onClick={toggleShowCustomizer}
            className={`action-btn ${isCustomizeVisible ? "editing" : ""}`}
          >
            {isCustomizeVisible ? "Close" : "Customize"}
          </button>
        )}
      </section>
    </div>
  );
};

export default FrontView;
