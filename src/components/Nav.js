import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const Nav = () => {
  const [show, setShow] = useState(false);
  const { pathname, search } = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const inputRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

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
  }, []);

  // URL의 쿼리 파라미터에서 검색어를 읽어와서 input 값과 동기화
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const urlSearchTerm = queryParams.get("q");
    if (urlSearchTerm !== null && urlSearchTerm !== searchValue) {
      setSearchValue(urlSearchTerm);
      setCursorPosition(urlSearchTerm.length);
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener("scroll", () => handleScroll());
    return () => {
      window.removeEventListener("scroll", () => handleScroll());
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    const newPosition = e.target.selectionStart;
    setSearchValue(newValue);
    setCursorPosition(newPosition);
    // replace를 사용하여 브라우저 히스토리에 쌓이지 않게 하고, 컴포넌트 리렌더링 최소화
    navigate(`/search?q=${newValue}`, { replace: true });
  };

  // 컴포넌트가 리렌더링된 후 input에 포커스 복원 (커서 위치 유지)
  useEffect(() => {
    if (inputRef.current && pathname === "/search") {
      inputRef.current.focus();
      // 저장된 커서 위치로 복원
      const position = Math.min(cursorPosition, inputRef.current.value.length);
      inputRef.current.setSelectionRange(position, position);
    }
  }, [pathname, searchValue]);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          onClick={() => (window.location.href = `${process.env.PUBLIC_URL}/`)}
        />
      </Logo>

      {pathname === "/" ? (
        <Login onClick={handleAuth}>LOGIN</Login>
      ) : (
        <Input
          ref={inputRef}
          value={searchValue}
          onChange={handleChange}
          className="nav__input"
          type="text"
          placeholder="검색해주세요."
        />
      )}
    </NavWrapper>
  );
};

export default Nav;

const Login = styled.a`
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: 0.35s;
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
  background: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  border: none;

  @media (max-width: 1023px) {
    left: unset;
    transform: initial;
    right: calc(3.5vw + 5px);
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${(props) => (props.$show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  letter-spacing: 16px;
  z-index: 3;
  transition: 0.35s;
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
