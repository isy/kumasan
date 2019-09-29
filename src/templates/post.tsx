import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { JsonLd } from 'react-schemaorg'
import { BreadcrumbList, Blog, Thing, Article } from 'schema-dts'

import '../styles/post.css'
import '../styles/syntax.css'
import colors from '../utils/colors'
import ClockIcon from '../images/clock.svg'

import { PostQuery } from '../graphqlTypes'

import SEO from '../components/Seo'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import PostShare from '../components/PostShare'

type Props = {
  data: PostQuery
}

enum CategoryType {
  DEV = 'dev',
  SELF = 'self',
  OTHER = 'other',
}

const PostTemplate: React.FC<Props> = ({ data }) => {
  const {
    site: { siteMetadata },
    markdownRemark: { html, excerpt, fields, frontmatter },
  } = data
  const { title, category, date, thumb } = frontmatter

  const { resizeS, resizeM, resizeL } = thumb.childImageSharp

  return (
    <Layout>
      <SEO title={title} description={excerpt} image={resizeS.src} />
      <JsonLd<BreadcrumbList> item={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'item': {
              '@type': 'Blog',
              'id': siteMetadata.url,
              'name': siteMetadata.title
            } as Blog
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'item': {
              '@type': 'Thing',
              'id': `${siteMetadata.url}/categories/${category}`,
              'name': category
            } as Thing
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@type': 'Article',
              'id': `${siteMetadata.url}/${title}`,
              'name': title
            } as Article
          }
        ]
      }} />
      <Wrapper>
        <Contents>
          <ArtileCover>
            <Heading>
              <Time>
                <Clock src={ClockIcon} alt="clock" />
                <span>{date}</span>
              </Time>

              <Title>{title}</Title>
              <CategoryLink to={`/categories/${category}`} type={category as CategoryType}>{category.toUpperCase()}</CategoryLink>
            </Heading>
            <HeroImg src={resizeS.src} srcM={resizeM.src} srcL={resizeL.src} />
          </ArtileCover>

          <Body>
            <Share siteUrl={siteMetadata.url} slug={fields.slug} title={frontmatter.title} />
            <ArtileBody>
              <div className="md" dangerouslySetInnerHTML={{ __html: html }} />
              <ShareText>\ SHARE /</ShareText>
              <MobileShare siteUrl={siteMetadata.url} slug={fields.slug} title={frontmatter.title} />
              <Profile />
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
        title
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
            resizeS: resize(width: 400) {
              src
              height
              width
            }
            resizeM: resize(width: 700) {
              src
              height
              width
            }
            resizeL: resize(width: 1000) {
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

type Src = {
  src?: string
  srcM?: string
  srcL?: string
}

const HeroImg = styled.div`
  width: 50%;
  background-image: url(${({ src }: Src) => src});
  background-size: cover;
  background-position: 50%;
  @media screen and (max-width: 1099px) {
    width: 100%;
    min-height: 380px;
    max-height: 500px;
    background-image: url(${({ srcL }: Src) => srcL});
  }
  @media screen and (max-width: 699px) {
    background-image: url(${({ srcM }: Src) => srcM});
  }
  @media screen and (max-width: 499px) {
    min-height: 300px;
    max-height: 450px;
    background-image: url(${({ src }: Src) => src});
  }
`

const Time = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
`

const Clock = styled.img`
  width: 14px;
  margin: 0 5px 0 0;
`

const Title = styled.h1`
  line-height: 1.5;
  font-size: 2rem;
  letter-spacing: 0.15rem;
  padding: 0 5px 10px 0;
  @media screen and (max-width: 499px) {
    font-size: 1.5rem;
    padding: 0 0 8px 0;
    letter-spacing: 0.12rem;
    line-height: 1.4;
  }
`

const CategoryLink = styled(Link)`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.white};
  background: ${({ type }: { type: CategoryType }) => {
    switch(type) {
      case CategoryType.DEV:
        return colors.red
      case CategoryType.SELF:
        return colors.green
      case CategoryType.OTHER:
        return colors.purple
      default:
        return colors.ebony
    }
  }};
`

const Body = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`

const Share = styled(PostShare)`
@media screen and (max-width: 599px) {
  display: none;
}
`

const ShareText = styled.p`
  text-align: center;
  display: none;
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0 0 0;
  @media screen and (max-width: 599px) {
    display: block;
  }
`

const MobileShare = styled(PostShare)`
display: none;
position: unset;
@media screen and (max-width: 599px) {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px;
  grid-template-rows: unset;
  width: auto;
  height: auto;
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
