import Link from 'next/link'
import styled from '@emotion/styled'
import { Image } from 'react-bootstrap'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  // height: 30px;
  // line-height: 20px;
  // padding: 8px;

  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = ({ className }) => {
  return (
    <Link href="/">
      <LogoBox>
        <Image
          src={'/images/pahak.png'}
          fluid
          roundedCircle
          width={60}
          height={60}
          alt="logo"
        />
      </LogoBox>
    </Link>
  )
}

export default Logo
