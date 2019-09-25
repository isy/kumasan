import React from 'react'

type Props = {
  fill?: string
  width?: string
}

const Facebook: React.FC<Props> = ({ fill = '#4267b2', width }) => (
  <svg x="0px" y="0px" viewBox="0 0 24 24" fill={fill} width={width}>
    <path d="M13.7,23V13h3.4l0.5-3.9h-3.9V6.6c0-1.1,0.3-1.9,1.9-1.9h2.1V1.2c-1-0.1-2-0.2-3-0.2c-3,0-5,1.8-5,5.2v2.9H6.3V13h3.4v10 H13.7z"></path>
  </svg>
)

export default React.memo(Facebook)
