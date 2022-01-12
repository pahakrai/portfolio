import Link from 'next/link'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  &:hover img {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <LogoBox>
          {/* <Image src={footPrintImg} width={20} height={20} alt="logo"/> */}
          <h2>Next Basic Wireframe</h2>
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo
