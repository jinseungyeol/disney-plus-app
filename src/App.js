import styled from 'styled-components';
import './App.css';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Category from './components/Category';

function App() {
  return (
    <Container >
      <Nav />
      <Banner />
      <Category />
    </Container>
  );
}

export default App;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    content: "";
    background: url('../images/home-background.png') no-repeat center / cover fixed;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`
