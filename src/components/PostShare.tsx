import React from 'react'
import styled from '@emotion/styled'

import colors from '../utils/colors'
import { SiteSiteMetadata, MarkdownRemarkFields, MarkdownRemarkFrontmatter } from '../graphqlTypes'

import TwitterIcon from './icons/Twitter'
import FacebookIcon from './icons/Facebook'
import HatenaIcon from './icons/Hatena'
import FeedlyIcon from './icons/Feedly'

type Share = {
  twitter: string
  facebook: string
  hatena: string
  feedly: string
}

type Props = {
  className?: string
  siteUrl?: SiteSiteMetadata['url']
} & Pick<MarkdownRemarkFields, 'slug'> & Pick<MarkdownRemarkFrontmatter, 'title'>

const PostShare: React.FC<Props> = ({ className, siteUrl, slug, title }) => {

  const share: Share = {
    twitter: `https://twitter.com/intent/tweet?url=${siteUrl}${slug}&text=${title}｜@isytter`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${slug}`,
    hatena: `http://b.hatena.ne.jp/add?url=${siteUrl}${slug}`,
    feedly: `https://feedly.com/i/subscription/feed/${siteUrl}/feed.xml`,
  }
  return (
    <Share className={className}>
      <ShareItem href={share.twitter} target="_blank" rel="noopener">
        <TwitterIcon width="24px" />
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
  )
}

export default React.memo(PostShare)

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
