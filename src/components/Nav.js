import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Nav = () => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => { 
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])
  

  return (
    <NavWrapper $show={show}>
      <Logo href={`${process.env.PUBLIC_URL}`}>
        <img
          alt="Disney Plus Logo"
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          onClick={() => window.location.href = "/"}
        />
      </Logo>
    </NavWrapper>
  )
}

export default Nav

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${props => props.$show ? '#090b13' : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  transition: .35s;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;