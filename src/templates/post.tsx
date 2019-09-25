import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import '../styles/post.css'
import '../styles/syntax.css'
import colors from '../utils/colors'

import { PostQuery } from '../graphqlTypes'

import FacebookIcon from '../components/icons/facebook'
import TwiiterIcon from '../components/icons/twitter'
import HatenaIcon from '../components/icons/hatena'
import FeedlyIcon from '../components/icons/feedly'
import SEO from '../components/seo'
import Layout from '../components/layout'

type Props = {
  data: PostQuery
}

type Share = {
  twitter: string
  facebook: string
  hatena: string
  feedly: string
}

const PostTemplate: React.FC<Props> = ({ data }) => {
  const {
    site: { siteMetadata },
    markdownRemark: { html, excerpt, fields, frontmatter },
  } = data
  const { title, category, date, thumb } = frontmatter

  const share: Share = {
    twitter: `https://twitter.com/intent/tweet?url=${siteMetadata.url}${fields.slug}&text=${title}｜@isytter`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${siteMetadata.url}${fields.slug}`,
    hatena: `http://b.hatena.ne.jp/add?url=${siteMetadata.url}${fields.slug}`,
    feedly: `https://feedly.com/i/subscription/feed/${siteMetadata.url}/feed.xml`,
  }

  return (
    <Layout>
      <Wrapper>
        <SEO title="" />
        <Contents>
          <ArtileCover>
            <Heading>
              <Time>
                <FontAwesomeIcon icon={faClock} />
                <span>{date}</span>
              </Time>

              <Title>{title}</Title>
              <Link to="/">{category}</Link>
            </Heading>
            <HeroImg src={thumb.childImageSharp.resize.src} />
          </ArtileCover>

          <Body>
            <Share>
              <ShareItem href={share.twitter} target="_blank" rel="noopener">
                <TwiiterIcon width="24px" />
              </ShareItem>
              <ShareItem href={share.facebook} target="_blank" rel="noopener">
                <FacebookIcon width="24px" />
              </ShareItem>
              <ShareItem href={share.hatena} target="_blank" rel="noopener">
                <HatenaIcon width="24px" />
              </ShareItem>
              <ShareItem href={share.feedly} target="_blank" rel="noopener">
                <FeedlyIcon width="24px" />
              </ShareItem>
            </Share>
            <ArtileBody className="md">
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </ArtileBody>
          </Body>
        </Contents>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 120)
      fields {
        slug
      }
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

const Contents = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0 0 20px 0;
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

const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`

const Share = styled.div`
  background: ${colors.white};
  padding: 10px;
  width: 50px;
  height: 200px;
  display: grid;
  grid-template-rows: 50px 50px 50px 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: sticky;
  top: 80px;
  @media screen and (max-width: 599px) {
    display: none;
  }
`

const ShareItem = styled.a`
  padding: 10px;
  border-radius: 10px;
  position: relative;
  z-index: auto;
  &:before {
    z-index: -1;
    transition: 0.2s ease;
    content: '';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    border-radius: 10px;
  }
  &:hover:before {
    top: 0rem;
    right: 0rem;
    bottom: 0rem;
    left: 0rem;
    background: #f0f4f6;
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
    overflow-x: scroll;
  }
`

export default PostTemplate
