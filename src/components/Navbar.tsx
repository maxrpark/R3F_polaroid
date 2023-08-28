import React from "react";
import styled from "styled-components";

const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <div className='navbar'>
        <p className='logo'>polaroid</p>
        <a
          href='https://twitter.com/MaxCodeJourney'
          target='_blank'
          rel='noopener noreferrer'
          className='max'
        >
          MaxCodeJourney
        </a>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    font-family: var(--secondary-font);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .max {
    font-size: 1rem;
    text-decoration: none;
    color: var(--primary-black);
    cursor: pointer;
    z-index: 1;
    transition: all 0.1s linear;

    &:hover {
      color: crimson;
    }
  }
`;
export default Navbar;
