import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

const Nav = () => {

  const initialUserData = localStorage.getItem('userData') ?
  JSON.parse(localStorage.getItem('userData')) : {};

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initialUserData);
  
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      if (user) {
        if (pathname === "/") {
          navigate("/main");
        }
      } else {
        navigate("/");
      }
    });

  }, [auth, navigate, pathname])
  

  useEffect(() => {
    window.addEventListener('scroll', () => handleScroll())
    return () => {
      window.removeEventListener('scroll', () => handleScroll())
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleChange = (e) => { 
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(result => { 
        //userData 넣어주기
        setUserData(result.user);
        localStorage.setItem('userData', JSON.stringify(result.user));
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({}); // 로그아웃 시 정보 없애줌
        navigate('/');
      })
      .catch((error) => { 
        console.log(error) 
      })
  }
  
  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src={`./images/logo.svg`}
          onClick={() => window.location.href = "/"}
        />

      </Logo>

      {pathname === '/' ?
        (<Login onClick={handleAuth}>LOGIN</Login>) :
        <>
          <Input
            value={searchValue}
            onChange={handleChange}
            className='nav__input'
            type='text'
            placeholder='검색해주세요.'
          />
          
          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName}/>
            <DropDown onClick={handleSignOut}>
              <span>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      }
    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%); 0 0 18px 0;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
  transition: .3s;
`;

const SignOut = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`; 

const Login = styled.a`
  background: rgba(0,0,0,0.6);
  padding: 8px 16px;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: .35s;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(0,0,0,0.582);
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  border: none;
`;

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