import styled from "styled-components";

const CameraDetailsWrapper = styled.div`
  .single-details {
    height: 100vh;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
  }

  @media screen and (min-width: 800px) {
    .single-details {
      justify-content: center;
      margin: unset;
    }
    .single-details:nth-child(odd) {
      margin-left: auto;
    }
  }
`;

export default CameraDetailsWrapper;
