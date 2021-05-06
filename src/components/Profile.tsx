import React from 'react'
import styled from '@emotion/styled'

import colors from '../utils/colors'
import Kuma from '../images/isy.svg'
import GitHub from '../images/github.svg'

import Twiiter from './icons/Twitter'


type Props = {
  className?: string
}

const Profile: React.FC<Props> = ({ className }) => (
  <Wrapper className={className}>
    <Left>
      <ProfImg src={Kuma} alt="プロフィール画像" />
    </Left>
    <Rignt>
      <Desc>
        <Name>くま</Name>
        <Bio>
          <p>Web Dev.👨‍💻</p>
          <p>イケてるエンジニア目指してるよ</p>
          <p><br />最近は昆布と旅行雑誌🏄‍♀️にハマり中</p>
        </Bio>
        <SocialList>
          <a href="https://github.com/isy" target="_blank" rel="noopener noreferrer" >
            <SocialIcon src={GitHub} alt="github" />
          </a>
          <a href="https://twitter.com/isytter" target="_blank" rel="noopener noreferrer">
            <Twiiter width="20px" />
          </a>
        </SocialList>
      </Desc>
    </Rignt>
  </Wrapper>
)

const Wrapper = styled.div`
  background: ${colors.aliceBlue};
  color: ${colors.thinBlue};
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  margin: 50px 0 0 0;
`

const Left = styled.div`
  padding: 10px;
  margin: 0 20px;
  @media screen and (max-width: 480px) {
    padding: 10px 0 10px 0;
    margin: 0 10px;
  }
`

const Rignt = styled.div`
  padding: 10px;
`

const ProfImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  background: #fff;
  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`

const Desc = styled.div`
  padding: 14px 0 5px 5px;
`

const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`
const Bio = styled.div`
  padding: 9px 0 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const SocialList = styled.div`
  display: grid;
  grid-template-columns: 35px 35px;
  margin: 10px 0;
  padding: 5px 0;
  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const SocialIcon = styled.img`
  width: 20px;
`

export default Profile
