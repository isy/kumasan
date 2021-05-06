import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import OGPImage from '../images/ogp.jpg'

type Props = {
  isRoot?: boolean
  description?: string
  lang?: string
  meta?: HTMLMetaElement[]
  title?: string
  image?: string
}

const SEO: React.FC<Props> = ({ isRoot = false, description, title, image, lang = 'ja', meta = [] }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            url
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const ogImage =  image ?? site.siteMetadata.url + OGPImage

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defaultTitle={site.siteMetadata.title}
      title={title}
      titleTemplate={isRoot ? '' :  `%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:url',
          content: site.siteMetadata.url
        },
        {
          property: 'og:type',
          content: 'blog',
        },
        {
          property: 'og:image',
          content: ogImage
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: ogImage,
        }
      ].concat(meta)}
    />
  )
}

export default SEO
