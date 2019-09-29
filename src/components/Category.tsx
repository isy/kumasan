import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import colors from '../utils/colors'

const Category: React.FC = () => (
  <CategoryList>
    <Innter>
      <Item to="/" activeStyle={Active}>
        All
      </Item>
      <Item to="/categories/dev" activeStyle={Active}>Dev</Item>
      <Item to="/categories/self" activeStyle={Active}>Self</Item>
      <Item to="/categories/other" activeStyle={Active}>Other</Item>
    </Innter>
  </CategoryList>
)

const CategoryList = styled.section`
  width: 100%;
  background: ${colors.white};
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
  margin: 0 40px 0 0;
  padding: 0 5px 10px;
  color: ${colors.gray};
`

const Active = {
  color: colors.standard,
  fontWeight: 600,
  borderBottom: '2px solid #000',
}

export default Category
