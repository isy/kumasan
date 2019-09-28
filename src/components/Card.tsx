import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import ClockIcon from '../images/clock.svg'

type Props = {
  to: string
  title: string
  date: string
  imgsrc: string
  imgAlt: string
  className?: string
}

const Card: React.FC<Props> = ({
  to,
  title,
  date,
  imgsrc,
  imgAlt,
  className,
}) => (
  <Link to={to} className={className}>
    <Wrapper>
      <Hero>
        <HeroImg src={imgsrc} alt={imgAlt} />
      </Hero>
      <Meta>
        <Title>{title}</Title>
        <DateTime>
          <Clock src={ClockIcon} alt="clock" />
          <Time>{date}</Time>
        </DateTime>
      </Meta>
    </Wrapper>
  </Link>
)

const Wrapper = styled.article`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    // opacity: 0.9;
    box-shadow: 0 2px 15px rgba(202, 202, 202, 0.44);
  }
`

const Hero = styled.div`
  background: linear-gradient(
    rgb(255, 255, 255) 0%,
    rgb(248, 248, 248) 25%,
    rgb(212, 212, 212) 50%,
    rgb(177, 177, 177) 75%,
    rgb(73, 73, 73) 100%
  );
  height: 200px;
  display: flex;
  border-radius: 10px 10px 0 0;
  width: 100%;
  @media screen and (max-width: 480px) {
    height: 150px;
  }
`

const HeroImg = styled.img`
  border-radius: 10px 10px 0 0;
  object-fit: cover;
  width: 100%;
  object-position: 50% 50%;
  opacity: 0.8;
`

const Meta = styled.div`
  border-radius: 0 0 10px 10px;
  margin: 10px 15px;
  position: relative;
  height: 150px;
  @media screen and (max-width: 480px) {
    height: 100px;
  }
`

const Title = styled.p`
  line-height: 1.5;
  font-size: 1em;
  letter-spacing: 0.15rem;
  font-weight: 600;
  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const DateTime = styled.div`
  position: absolute;
  font-size: 0.8rem;
  bottom: 0;
  left: 0;
  color: #989898;
  display: flex;
  align-items: center;
  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`

const Clock = styled.img`
  width: 12px;
  margin: 0 1px 0 0;
`

const Time = styled.span`
  margin: 0 3px;
`

export default Card
