import React, { useMemo } from 'react'
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
  const { title, category, date } = frontmatter

  const openGraphImage = useMemo(() => {
    const encodeTitle = encodeURIComponent(title)
    return `https://res.cloudinary.com/kuma9ma/image/upload/c_fit,l_text:notosans.otf_60:${encodeTitle},co_rgb:212D50,w_1000,x_0/v1620316938/kuma-ogp.png`
  }, [title])

  return (
    <Layout>
      <SEO title={title} description={excerpt} image={openGraphImage} />
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
            <ArtileCoverInner>
              <Spacer />
              <Heading>
                <Time>
                  <Clock src={ClockIcon} alt="clock" />
                  <span>{date}</span>
                </Time>

                <Title>{title}</Title>
                <CategoryLink to={`/categories/${category}`} type={category as CategoryType}>{category.toUpperCase()}</CategoryLink>
              </Heading>
            </ArtileCoverInner>
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
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 40px;
  @media screen and (max-width: 1099px) {
    height: auto;
  }
  @media screen and (max-width: 499px) {
    margin-bottom: 20px;
  }
`

const ArtileCoverInner = styled.div`
  display: flex;
`

const Spacer = styled.div`
  flex-basis: 70px;
  @media screen and (max-width: 599px) {
    display: none;
  }
`

const Heading = styled.div`
  padding: 50px 0 0 0;
  width: 85%;
  max-width: 900px;
  margin: 0 auto;

  @media screen and (max-width: 1099px) {
    padding: 50px 0 0 0;
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
  margin: 40px 0 0 0;
  @media screen and (max-width: 599px) {
    display: block;
  }
`

const MobileShare = styled(PostShare)`
display: none;
position: unset;
margin: 10px 0 0 0;
& > a {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 599px) {
  display: grid;
  grid-template-columns: 70px 70px 70px 70px;
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
