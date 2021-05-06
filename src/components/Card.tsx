import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import colors from '../utils/colors'
import ClockIcon from '../images/clock.svg'
import Right from '../images/right.svg'

type Props = {
  to: string
  title: string
  date: string
  category: string
  className?: string
}

enum CategoryType {
  DEV = 'dev',
  SELF = 'self',
  OTHER = 'other',
}

const Card: React.FC<Props> = ({
  to,
  title,
  date,
  category,
  className,
}) => (
  <Link to={to} className={className}>
    <Wrapper>
      <Inner>
        <Kind category={category as CategoryType} />
        <Meta>
          <Title>{title}</Title>
          <DateTime>
            <Clock src={ClockIcon} alt="clock" />
            <Time>{date}</Time>
          </DateTime>
        </Meta>
      </Inner>
      <RightArrow src={Right} />
    </Wrapper>
  </Link>
)

const Wrapper = styled.article`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: #fff;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 2px 15px rgba(202, 202, 202, 0.44);
  }
`

const Inner = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Kind = styled.div`
  width: 8px;
  height: 24px;
  border-radius: 8px;
  margin: 16px 15px;
  flex-shrink: 0;
  background: ${({ category }: { category: CategoryType }) => {
    switch(category) {
      case CategoryType.DEV:
        return 'linear-gradient(135deg, #f75858 0%,#ea89a9 62%,#ff69d4 100%)'
      case CategoryType.SELF:
        return 'linear-gradient(135deg, #51d6b4 0%,#91f5db 62%,#51d652 100%)'
      case CategoryType.OTHER:
        return 'linear-gradient(135deg, #d060f1 0%,#e098f5 62%,#cc40f5 100%);'
      default:
        return colors.ebony
    }
  }};
`

const Meta = styled.div`
  border-radius: 0 0 10px 10px;
  margin: 10px 15px;
  position: relative;
  height: 100px;
  @media screen and (max-width: 480px) {
    height: 90px;
  }
`

const Title = styled.p`
  line-height: 1.5;
  font-size: 1em;
  letter-spacing: 0.15rem;
  font-weight: 600;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
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

const RightArrow = styled.img`
  width: 16px;
  margin: 0 8px 0 0;
`

const Time = styled.span`
  margin: 0 3px;
`

export default Card
