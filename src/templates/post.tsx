import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import '../styles/post.css'
import colors from '../utils/colors'

import { PostQuery } from '../graphqlTypes'

import SEO from '../components/seo'
import Layout from '../components/layout'

type Props = {
  data: PostQuery
}

const PostTemplate: React.FC<Props> = ({ data }) => {
  console.log(data)
  const { markdownRemark: { html, excerpt, frontmatter } } = data
  const { title, category, date, thumb } = frontmatter

  return (
    <Layout>
      <Wrapper>
        <SEO title="" />
        <Contents>
          <ArtileCover>
            <Heading>
              <Time>
                <FontAwesomeIcon icon={faClock} />
                <span>{ date }</span>
              </Time>

              <Title>{ title }</Title>
              <Link to='/' >{ category }</Link>
            </Heading>
            <HeroImg src={thumb.childImageSharp.resize.src} />
          </ArtileCover>

          <ArtileBody>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            bodyがはいる
          </ArtileBody>
        </Contents>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 120)
      frontmatter {
        title
        category
        date(formatString: "YYYY.MM.DD")
        thumb {
          childImageSharp {
            resize(width: 400) {
              src
              height
              width
            }
            original {
              height
              src
              width
            }
          }
        }
      }
    }
  }
`

const Wrapper = styled.div`
  background: ${colors.snow};
  width: 100%;
`

const Contents = styled.main`
  width: 90%;
  margin: 0 auto;
  max-width: 1500px;
  @media screen and (max-width: 1099px) {
    width: 100%;
  }
`

const ArtileCover = styled.section`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 400px;
  margin-bottom: 40px;
  @media screen and (max-width: 1099px) {
    flex-wrap: wrap-reverse;
    height: auto;
  }
  @media screen and (max-width: 499px) {
    margin-bottom: 20px;
  }
`

const Heading = styled.div`
  width: 50%;
  padding: 50px;
  @media screen and (max-width: 1099px) {
    width: 90%;
    padding: 50px 50px 0 50px;
  }
  @media screen and (max-width: 499px) {
    padding: 20px 0 0 0;
  }
`

const HeroImg = styled.div`
  width: 50%;
  background-image: url(${({ src }: { src: string }) => src});
  background-size: cover;
  background-position: 50%;
  @media screen and (max-width: 1099px) {
    width: 100%;
    min-height: 380px;
    max-height: 500px;
  }
  @media screen and (max-width: 499px) {
    min-height: 300px;
    max-height: 450px;
  }
`

const Time = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Title = styled.h1`
  line-height: 1.5;
  font-size: 2rem;
  letter-spacing: 0.15rem;
  padding: 10px 5px 10px 0;
  @media screen and (max-width: 499px) {
    font-size: 1.5rem;
    padding: 8px 0 8px 0;
    letter-spacing: 0.12rem;
    line-height: 1.4;
  }
`

const ArtileBody = styled.section`
  width: 85%;
  max-width: 900px;
  margin: 0 auto;
  background: ${colors.white};
  padding: 30px 30px 10px 30px;
  border-radius: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 499px) {
    padding: 20px 15px 5px 15px;
    width: 95%;
  }
`

export default PostTemplate
