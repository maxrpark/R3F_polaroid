import { useEffect } from "react";
import { useThreeContext } from "../context/threeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  cameraLookAt_1,
  cameraLookAt_1_mobile,
  initialCameraPosition,
  initialCameraPosition_mobile,
} from "../utils/data";
import { convertTextColor } from "../utils/helpers";
import Wrapper from "../wrappers/HeroWrapper";
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const { modelRef, isModelLoaded, cameraRef, cameraTarget, selectedColor } =
    useThreeContext();

  let mm = gsap.matchMedia(),
    breakPoint = 800;
  const timeLine = gsap.timeline();
  const animateHero = () => {
    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        let { isMobile } = context.conditions as { isMobile: boolean };
        cameraTarget.current = isMobile
          ? cameraLookAt_1_mobile
          : cameraLookAt_1;

        const cameraPosition = isMobile
          ? initialCameraPosition_mobile
          : initialCameraPosition;

        const cameraLookAt = isMobile ? cameraLookAt_1_mobile : cameraLookAt_1;

        timeLine
          .to(cameraRef.current.position, {
            immediateRender: false,
            ease: "power1.out",
            ...cameraPosition,

            duration: 3,
            onUpdate: () => {
              cameraRef.current.lookAt(cameraTarget.current);
            },
            onComplete: () => {
              document.body.style.overflow = "scroll";
            },
          })
          .to(
            cameraTarget.current,
            {
              immediateRender: false,
              ease: "power1.out",
              ...cameraLookAt,
              duration: 3,
            },
            0
          )
          .from(
            ".hero-text",
            {
              opacity: 0,
              y: 100,
              stagger: 0.2,
              duration: 1,
            },
            "<=50%"
          )
          .from(".scroll-icon", {
            opacity: 0,
          })
          .to(".icon", {
            ease: "none",
            duration: 1,
            yPercent: 20,
            yoyo: true,
            repeat: -1,
          });

        gsap.to(".scroll-icon", {
          opacity: 0,
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "top +=100px",
            scrub: 0.2,
            toggleActions: "play pause resume reset",
          },
        });

        return () => {
          timeLine.progress(0);
        };
      }
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    if (!modelRef.current) return;
    animateHero();

    return () => {
      gsap.killTweensOf(cameraRef.current.position);
    };
  }, [isModelLoaded]);

  return (
    <Wrapper id='hero'>
      <div
        style={{ color: convertTextColor(selectedColor) }}
        className='section-content'
      >
        <h1 className='hero-text'>OneStep2</h1>
        <h2 className='hero-text'>Simple & Beautiful</h2>
      </div>
      <div className='scroll-icon'>
        <p>Scroll down</p>
        <svg
          className='icon'
          xmlns='http://www.w3.org/2000/svg'
          width={25}
          height={25}
          viewBox='0 0 24 24'
        >
          <path d='M12.0001 19.1643L18.2072 12.9572L16.793 11.543L12.0001 16.3359L7.20718 11.543L5.79297 12.9572L12.0001 19.1643ZM12.0001 13.5144L18.2072 7.30728L16.793 5.89307L12.0001 10.686L7.20718 5.89307L5.79297 7.30728L12.0001 13.5144Z'></path>
        </svg>
      </div>
    </Wrapper>
  );
};

export default Hero;
