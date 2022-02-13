import NextLink from 'next/link'
import Image from 'next/image'
import { Global } from '@emotion/react'

export const GridItem = ({ children, href, title, thumbnail }) => {
  return (
    <div w="100%" align="center">
      <div cursor="pointer">
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
        />
        <div href={href} target="_blank">
          <p mt={2}>{title}</p>
        </div>
        <p fontSize={14}>{children}</p>
      </div>
    </div>
  )
}

// export const WorkGridItem = ({ children, id, title, thumbnail }) => {
//   return (
//     <Box w="100%" align="center">
//       <NextLink href={`/works/${id}`}>
//         <LinkBox cursor="pointer">
//           <Image
//             src={thumbnail}
//             alt={title}
//             className="grid-item-thumbnail"
//             placeholder="blur"
//           />
//           {/* <LinkOverlay href={`/works/${id}`} /> */}
//           <Text mt={2} fontSize={20}>
//             {title}
//           </Text>
//           <Text fontSize={14}>{children}</Text>
//         </LinkBox>
//       </NextLink>
//     </Box>
//   )
// }

export const GridItemStyle = () => {
  return (
    <Global
      styles={`
            .grid-item-thumbnail {
                border-radius: 12px;
            }
            `}
    />
  )
}
