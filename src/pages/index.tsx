import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'

import { PageQuery } from '../graphqlTypes'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Card from '../components/card'
import Profile from '../components/profile'
import Category from '../components/category'

type Props = {
  data: PageQuery
}

const IndexPage: React.FC<Props> = ({ data }) => (
  <Layout>
    <SEO title="Home" lang="ja" description="" meta={[]} />
    <Category />
    <Container>
      <ArticleList>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          // <div key={node.id}>
          <Artile key={node.id} to="/" imgAlt="" imgsrc="" />
          // <span>
          //     {node.frontmatter.title}{" "}
          //       — {node.frontmatter.date}
          //     </span>
          //   <p>{node.excerpt}</p>
          // </div>
        ))}
      </ArticleList>
      {/* <Side>
        <ProfileCard />
      </Side> */}
    </Container>
    {/* <Card to="/" imgAlt="" imgsrc="" />
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <div key={node.id}>
          <span>
              {node.frontmatter.title}{" "}
                — {node.frontmatter.date}
              </span>
            <p>{node.excerpt}</p>
          </div>
        ))}
    <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export const query = graphql`
  query Page {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
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

const Side = styled.aside`
  width: 30%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

const ProfileCard = styled(Profile)`
  width: 90%;
  max-width: 250px;
  height: 300px;
  position: sticky;
  top: 110px;
`

export default IndexPage
