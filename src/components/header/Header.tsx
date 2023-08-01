import React from "react"
import styled from "styled-components"

const Title = styled.h1`
  font-size: 35px;
  color: #333;
  margin: 20px;
`

const Navbar = styled.nav`
  display: flex;
  background-color: #f2f2f2;
  padding: 12px 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%; /* Position the underline in the center */
    width: 100%; /* Set the width of the underline */
    height: 2px;
    background-color: #333;
    transform: translateX(-50%); /* Center the underline */
  }
`

const Header: React.FC = () => {
  return (
    <Navbar>
      <Title>SDH Frontend Homework</Title>
    </Navbar>
  )
}

export default Header
