import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useAnimateCustomizeCamera = ({
  cameraRef,
  cameraTarget,
  cameraPositionDesktop,
  cameraPositionMobile,
  cameraLookAtMobile,
  cameraLookAtDesktop,
}: any) => {
  const timeLine = useRef(gsap.timeline({ reversed: true }));

  const animateFunction = () => {
    let mm = gsap.matchMedia(),
      breakPoint = 800;
    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isMobile } = context.conditions as { isMobile: boolean };

        const cameraPosition = isMobile
          ? cameraPositionMobile
          : cameraPositionDesktop;

        const cameraLookAt = isMobile
          ? cameraLookAtMobile
          : cameraLookAtDesktop;

        timeLine.current
          .to(cameraRef.current.position, {
            ease: "none",
            immediateRender: false,
            ...cameraPosition,
            onUpdate: () => cameraRef.current.lookAt(cameraTarget.current),
          })
          .to(
            cameraTarget.current,
            {
              ease: "none",
              immediateRender: false,
              ...cameraLookAt,
            },
            "<"
          );

        return () => {
          timeLine.current.progress(0);
        };
      }
    );
  };

  useEffect(() => {
    if (!cameraRef.current) return;
    animateFunction();
  }, [cameraRef.current]);

  return timeLine.current;
};
