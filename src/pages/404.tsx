import React from 'react'
import styled from '@emotion/styled'

import Layout from '../components/layout'
import SEO from '../components/Seo'

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <NotFound>404</NotFound>
    </Wrapper>
  </Layout>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`

const NotFound = styled.h1`
  font-size: 50px;
  font-weight: 600;
  letter-spacing: 30px;
  padding-left: 30px;
  &:after {
    width: 40%;
    height: 7px;
    left: 30%;
    bottom: -20px;
  }
`

export default NotFoundPage
