import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

import { useThreeContext } from "../context/threeContext";
import { detailsData } from "../utils/data";
import { animateCamera } from "../animations/animateCamera";
import { convertTextColor } from "../utils/helpers";
import Wrapper from "../wrappers/CameraDetailsWrapper";

gsap.registerPlugin(ScrollTrigger);

const CameraDetails: React.FC = () => {
  const { cameraRef, cameraTarget, selectedColor } = useThreeContext();
  const detailsRefs = useRef<HTMLDivElement[]>([]);

  const animateSections = () => {
    detailsRefs.current.forEach((el) => {
      const elementData = detailsData.find((item) => item.id === el.id)!;

      const title = el.getElementsByTagName("h3");
      const text = el.getElementsByTagName("p");

      animateCamera({
        trigger: el,
        cameraRef,
        start: "top bottom",
        end: "top top",
        cameraTarget,

        cameraPositionDesktop: elementData.cameraPositionDesktop,
        cameraPositionMobile: elementData.cameraPositionMobile,
        cameraLookAtMobile: elementData.cameraLookAtMobile,
        cameraLookAtDesktop: elementData.cameraLookAtDesktop,
      });

      const contentTimeLine = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 30%",
          end: "+=45%",
          scrub: true,
        },
      });
      contentTimeLine
        .from(title, {
          opacity: 0,
        })
        .from(
          text,
          {
            opacity: 0,
            y: 50,
          },
          "-=.3"
        );
    });
  };

  useEffect(() => {
    if (cameraRef.current) {
      animateSections();
    }
  }, [cameraRef.current]);

  return (
    <Wrapper id='details' className='section-content'>
      {detailsData.map((detail, idx) => {
        return (
          <div
            style={{ color: convertTextColor(selectedColor) }}
            key={detail.id}
            ref={(element) => (detailsRefs.current[idx] = element!)}
            className='single-details'
            id={detail.id}
          >
            <h3 className='title'>{detail.title}</h3>
            <p>{detail.text}</p>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default CameraDetails;
