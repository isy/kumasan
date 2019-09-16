import { Link } from 'gatsby'
import React from 'react'
import styled from '@emotion/styled'

import Logo from '../images/logo.svg'

const Header: React.FC = () => (
  <Wrapper>
    <Link to="/">
      <Kuma src={Logo} alt="ロゴ" />
    </Link>
  </Wrapper>
)

const Wrapper = styled.header`
  height: 70px;
  width: 100%;
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  top: 0;
  position: fixed;
  z-index: 9999;
`

const Kuma = styled.img`
  height: 60px;
`

export default Header
