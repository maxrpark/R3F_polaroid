import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
}: any) => {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: 0.2,
    },
  });

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

      const cameraLookAt = isMobile ? cameraLookAtMobile : cameraLookAtDesktop;

      timeLine
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
        timeLine.progress(0);
      };
    }
  );
};
