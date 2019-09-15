import React from "react"
import { Link, graphql } from "gatsby"
import styled from '@emotion/styled'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Card from '../components/card'

type Props = {
  data: any
}

const IndexPage: React.FC<Props> = ({ data }) => (
  <Layout>
    <SEO title="Home" lang="ja" description="" meta={[]} />
    <Container>

    </Container>
    <Card to="/" imgAlt="" imgsrc="" />
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
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const query = graphql`
  query {
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
  justify-content: space-around;
  max-width: 1200px;
  margin: 35px auto;
`

export default IndexPage
