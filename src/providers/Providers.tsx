import { ReactLenis } from "@studio-freight/react-lenis";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    // options={{ syncTouch: true }}
    <>
      <ReactLenis
        options={{
          lerp: 0.05,

          wheelMultiplier: 0.5,

          //
          syncTouch: true,
          syncTouchLerp: 0.05,
          touchInertiaMultiplier: 30,
        }}
        root
      >
        {children}
      </ReactLenis>
    </>
  );
};

export default Providers;
