/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  description?: string
  lang?: string
  meta?: HTMLMetaElement[]
  title: string
  image?: string
}

const SEO: React.FC<Props> = ({ description, title, image, lang = 'ja', meta = [] }) => {
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
  const ogImage = `${site.siteMetadata.url}` + (image || `/images/ogp.jpg`)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
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
