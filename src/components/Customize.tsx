import { useThreeContext } from "../context/threeContext";
import { colors } from "../utils/data";
import { convertBgColor } from "../utils/helpers";
import Wrapper from "../wrappers/CustomizeWrapper";

const Customize: React.FC = () => {
  const { isCustomizeVisible, selectedColor, changeCameraCaseColor } =
    useThreeContext();

  return (
    <Wrapper>
      <div
        style={{
          background: convertBgColor(selectedColor, 0.1),
        }}
        className={`${isCustomizeVisible ? "show" : ""} overlay`}
      ></div>
      {isCustomizeVisible && (
        <p className='label'>Drag around to for 360 view</p>
      )}
      <div
        className={`${isCustomizeVisible ? "show-colors" : ""} colors-wrapper`}
      >
        {colors.map((color, idx) => {
          return (
            <div
              onClick={() => changeCameraCaseColor(color)}
              style={{ background: convertBgColor(color) }}
              key={idx}
              className={`single-color ${
                selectedColor === color ? "is-active" : ""
              }`}
            ></div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Customize;
