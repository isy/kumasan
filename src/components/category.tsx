import React from 'react';
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import colors from '../utils/colors'

const Category: React.FC = () => (
  <CategoryList>
    <Innter>
      <Item to="/" activeStyle={Active}>ALL</Item>
      <Item to="/">DEV</Item>
      <Item to="/">SELF</Item>
      <Item to="/">OTHER</Item>
    </Innter>
  </CategoryList>
)

const CategoryList = styled.section`
  width: 100%;
  // display: flex;
  // justify-content: center;
  background: ${colors.white};
  padding: 0 0 10px 0;
`

const Innter = styled.div`
  width: 60%;
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    width: 90%;
  }
`

const Item = styled(Link)`
  display: inline-block;
  margin: 0 15px 0 0;
  color: ${colors.gray};
`

const Active = {
  color: colors.standard
}

export default Category
