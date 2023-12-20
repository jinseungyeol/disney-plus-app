import React from 'react'
import styled from 'styled-components'

const Category = () => {
  return (
    <Container>
      <Wrap>
        <img src={`${process.env.PUBLIC_URL}/images/viewers-disney.png`} alt="disney" />
        <video loop muted autoPlay>
          <source src={`${process.env.PUBLIC_URL}/videos/disney.mp4`} type="video/mp4"></source>
        </video>
      </Wrap>
      <Wrap>
        <img src={`${process.env.PUBLIC_URL}/images/viewers-marvel.png`} alt="marvel" />
        <video loop muted autoPlay>
          <source src={`${process.env.PUBLIC_URL}/videos/marvel.mp4`} type="video/mp4"></source>
        </video>
      </Wrap>
      <Wrap>
        <img src={`${process.env.PUBLIC_URL}/images/viewers-pixar.png`} alt="pixar" />
        <video loop muted autoPlay>
          <source src={`${process.env.PUBLIC_URL}/videos/pixar.mp4`} type="video/mp4"></source>
        </video>
      </Wrap>
      <Wrap>
        <img src={`${process.env.PUBLIC_URL}/images/viewers-starwars.png`} alt="starwars" />
        <video loop muted autoPlay>
          <source src={`${process.env.PUBLIC_URL}/videos/star-wars.mp4`} type="video/mp4"></source>
        </video>
      </Wrap>
      <Wrap>
        <img src={`${process.env.PUBLIC_URL}/images/viewers-national.png`} alt="national-geographic" />
        <video loop muted autoPlay>
          <source src={`${process.env.PUBLIC_URL}/videos/national-geographic.mp4`} type="video/mp4"></source>
        </video>
      </Wrap>
    </Container>
  )
}

export default Category

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgba(0 0 0 / 69%) 0 26px 30px -10px,
              rgba(0 0 0 / 73%) 0 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  img {
    inset: 0;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgba(0,0,0,0.8) 0px 40px 58px -16px
                rgba(0,0,0,0.72) 0 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }
`