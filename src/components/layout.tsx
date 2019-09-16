/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { PropsWithChildren } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import colors from '../utils/colors'

import Header from './header'
import Footer from './footer'
import './layout.css'

type Props = {}

const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
  background: ${colors.snow};
  padding: 70px 0 0 0;
`

export default Layout
