import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'

import { PageQuery } from '../graphqlTypes'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Card from '../components/Card'
import Category from '../components/Category'

type Props = {
  data: PageQuery
}

const IndexPage: React.FC<Props> = ({ data }) => (
  <Layout>
    <SEO isRoot={true} lang="ja" description="" meta={[]} />
    <Category />
    <Container>
      <ArticleList>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const {
            frontmatter: {
              title,
              date,
              thumb: {
                childImageSharp: { resize },
              },
            },
          } = node
          return (
            <Artile
              key={node.id}
              title={title}
              date={date}
              to={`${node.fields.slug}`}
              imgAlt=""
              imgsrc={resize.src}
            />
          )
        })}
      </ArticleList>
    </Container>
  </Layout>
)

export const query = graphql`
  query Page {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            category
            thumb {
              childImageSharp {
                resize(width: 500) {
                  src
                  width
                }
              }
            }
            date(formatString: "YYYY.MM.DD")
          }
          excerpt
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1200px;
  width: 90%;
  margin: 35px auto 0 auto;
`

const Artile = styled(Card)`
  margin: 10px 0 20px 0;
  width: 47%;
  &:first-of-type {
    width: 100%;
    max-width: 100%;
    font-size: 22px;
    margin: 0;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

const ArticleList = styled.section`
  width: 70%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 700px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

export default IndexPage
