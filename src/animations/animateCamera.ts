import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CameraInstance } from "../context/threeContext";
gsap.registerPlugin(ScrollTrigger);

interface Params {
  trigger: HTMLDivElement;
  cameraRef: React.MutableRefObject<CameraInstance>;
  cameraTarget: React.MutableRefObject<THREE.Vector3>;
  cameraPositionDesktop: THREE.Vector3;
  cameraPositionMobile: THREE.Vector3;
  cameraLookAtMobile: THREE.Vector3;
  cameraLookAtDesktop: THREE.Vector3;
  start: string;
  end: string;
}

export const animateCamera = ({
  trigger,
  cameraRef,
  cameraTarget,
  cameraPositionDesktop,
  cameraPositionMobile,
  cameraLookAtMobile,
  cameraLookAtDesktop,
  start,
  end,
}: Params) => {
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

      const timeLine = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: true,
        },
      });

      const cameraPosition = isMobile
        ? cameraPositionMobile
        : cameraPositionDesktop;

      const cameraLookAt = isMobile ? cameraLookAtMobile : cameraLookAtDesktop;

      timeLine
        .to(cameraRef.current.position, {
          ...cameraPosition,
          onUpdate: () => cameraRef.current.lookAt(cameraTarget.current),
        })
        .to(
          cameraTarget.current,
          {
            ...cameraLookAt,
          },
          "<"
        );

      return () => {
        timeLine.kill();
        timeLine.progress(0);
      };
    }
  );
};
