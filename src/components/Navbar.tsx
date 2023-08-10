import React from "react";
import styled from "styled-components";

const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <div className='navbar'>
        <p className='logo'>polaroid</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--primary-white);
  .navbar {
    max-width: 1600px;
    margin: 0 auto;
    padding: 1rem;
  }
  .logo {
    font-family: var(--secondary-font);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export default Navbar;
