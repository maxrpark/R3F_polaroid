import styled from "styled-components";

const HeroWrapper = styled.section`
  background: var(--primary-yellow);
  height: 100vh;

  .section-content {
    width: 100%;
    text-align: center;
    z-index: 2;
    position: absolute;
    transform: translateY(50%);
    top: 50%;
  }
  h1 {
    font-size: 3rem;
    font-family: var(--secondary-font);
    font-style: normal;
    font-weight: bold;
    line-height: normal;
  }
  h2 {
    font-size: 1%.5;
  }

  .scroll-icon {
    position: absolute;
    bottom: 20px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
  }
  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    .section-content {
      width: 100%;
      text-align: center;
      z-index: 2;
      position: relative;
      top: unset;
      transform: translateY(0);
    }
    h1 {
      font-size: 6rem;
    }
    h2 {
      font-size: 3rem;
    }
  }
`;

export default HeroWrapper;
