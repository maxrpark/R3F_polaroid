import { ReactLenis } from "@studio-freight/react-lenis";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    // options={{ syncTouch: true }}
    <>
      <ReactLenis root>{children}</ReactLenis>
    </>
  );
};

export default Providers;
