import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

import colors from '../utils/colors'

import Header from './Header'
import Footer from './Footer'
import './layout.css'

type Props = {}

const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <>
      <Header />
      <Contents>{children}</Contents>
      <Footer />
    </>
  )
}

const Contents = styled.main`
  width: 100%;
  min-height: calc(100vh - 70px);
  background: ${colors.snow};
  padding: 70px 0 0 0;
  @media screen and (max-width: 499px) {
    padding: 60px 0 0 0;
    min-height: calc(100vh - 60px);
  }
`

export default Layout
