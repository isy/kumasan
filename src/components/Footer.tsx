import React from 'react'
import styled from '@emotion/styled'

import colors from '../utils/colors'

const Footer: React.FC = () => (
  <Wrapper>
    <Inner>
      <Thanks>Thanks for <a href="https://www.gatsbyjs.org/">GatsbyJS</a></Thanks>
      <Copy>&copy; Made with ❤️ by <a href="https://github.com/isy">KUMA</a></Copy>
    </Inner>
  </Wrapper>
)

const Wrapper = styled.footer`
  background: ${colors.ebony};
  width: 100%;
  padding: 20px 0;
`

const Inner = styled.div`
  width: 60%;
  margin: 0 auto;
  color: ${colors.darkGray};
`

const Thanks = styled.p`
  text-align: center;
  font-size: 12px;
`

const Copy = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0 2px 0;
`

export default Footer
