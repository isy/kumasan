import React from 'react'
import styled from '@emotion/styled'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import Kuma from '../images/isy.svg'

type Props = {
  className?: string
}

const Profile: React.FC<Props> = ({ className }) => (
  <Wrapper className={className}>
    <Prof>
      <Top>
        <ProfImg src={Kuma} alt="プロフィール画像" />
      </Top>
      <Desc>
        <Name>くま</Name>
        <Bio>ソフトウェアエンジニア👨‍💻</Bio>
      </Desc>
    </Prof>
    <Share>{/* <FontAwesomeIcon icon={['fab','twitter']} /> */}</Share>
  </Wrapper>
)

const Wrapper = styled.div`
  background: rgba(49, 55, 70, 0.8);
  border-radius: 10px;
`

const Prof = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  position: relative;
`

const Top = styled.div`
  position: absolute;
  top: -25px;
  left: 25px;
`

const ProfImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(49, 55, 70, 0.8);
  background: #fff;
`

const Desc = styled.div`
  padding: 14px 0 5px 5px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(80, 80, 80, 0.28);
`

const Name = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`
const Bio = styled.p`
  padding: 9px 0 0 0;
  font-size: 0.7rem;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const Share = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px 6px 15px 6px;
`

export default Profile
