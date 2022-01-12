// const styles = {
//   global: props => ({
//     body: {
//       bg: mode('#f0e7db', '#202023')(props)
//     }
//   })
// }

// const components = {
//   Heading: {
//     variants: {
//       'section-title': {
//         textDecoration: 'underline',
//         fontSize: 20,
//         textUnderlineOffset: 6,
//         textDecorationColor: '#525252',
//         textDecorationThickness: 4,
//         marginTop: 3,
//         marginBottom: 4
//       }
//     }
//   },
//   Link: {
//     baseStyle: props => ({
//       color: mode('#3d7aed', '#ff63c3')(props),
//       textUnderlineOffset: 3
//     })
//   }
// }

// const fonts = {
//   heading: "'M PLUS Rounded 1c'"
// }

// const colors = {
//   glassTeal: '#88ccca'
// }

// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: true
// }

// const theme = extendTheme({
//   config,
//   styles,
//   components,
//   colors,
//   fonts
// })

// export default theme

const themeColor = {
  black: {
    100: '#1a1a1a',
    200: '#191919',
    300: '#121212',
    400: '#000',
    500: '#070707',
    600: '#2C2C2C'
  },
  white: {
    100: '#fff',
    200: '#f8f8f8'
  },
  yellow: {
    100: `#fde53d`
  },
  gray: {
    100: '#f7f7f7',
    200: '#f1f1f1',
    300: '#e5e5e5',
    400: '#ddd',
    500: '#d8d8d8',
    600: '#d5d5d5',
    700: '#ccc',
    800: '#c4c4c4',
    900: '#bfbfbf',
    1000: '#707070'
  },
  red: {
    100: '#f96057',
    200: '#ff0000',
    300: '#CC0101'
  },
  green: {
    100: '#459841'
  }
}

export const rem = (val = 1) => 0.0625 * val + `rem`

/**
 * Converts hex value to rgba
 *
 * @param {Function || string} hex
 * @param {Integer} opacity
 * @returns
 */
export const transparentize = (hex, opacity) => {
  let r = 0,
    g = 0,
    b = 0,
    _opacity = opacity

  // 3 digits
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]

    // 6 digits
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }

  return 'rgb(' + +r + ',' + +g + ',' + +b + ',' + _opacity + ')'
}

const light = {
  bodyColor: themeColor.white['200'],
  themeColor: themeColor.white['100'],
  themeColor1: themeColor.white['100'],
  themeColorLight: themeColor.white['100'],
  themeColorGray: themeColor.gray['800'],
  themeColorGradient:
    `linear-gradient(to right, ` +
    themeColor.black['100'] +
    ` 50%, ` +
    themeColor.black['300'] +
    ` 50%)`,
  themeColorGradient1:
    `linear-gradient(to right, ${transparentize(
      ` +
      ${themeColor.white['100']} +
      `,
      1
    )} 50%, ` +
    themeColor.white['100'] +
    ` 70%)`,
  themeColorInvert: themeColor.black['400'],
  themeInvertReverse: `invert(1)`,
  themeInvert: `invert(0)`,
  gradientTowhite:
    `linear-gradient(to top, ` +
    themeColor.white['100'] +
    ` 100% , ${transparentize(
      ` +
      ${themeColor.white['100']} +
      `,
      0.5
    )} 40%)`,
  productBg: themeColor.white['100'],
  productBgContrast: themeColor.black['600'],
  /** Contrast color use on texts */
  contrastColor: themeColor.black['400']
}

const dark = {
  bodyColor: themeColor.black['500'],
  themeColor: themeColor.black['400'],
  themeColor1: themeColor.black['300'],
  themeColorLight: themeColor.black['300'],
  themeColorGray: themeColor.black['400'],
  themeColorGradient:
    `linear-gradient(to right, ` +
    themeColor.white['100'] +
    ` 50%, ` +
    themeColor.gray['200'] +
    ` 50%)`,
  themeColorGradient1:
    `linear-gradient(to right, ${transparentize(
      themeColor.black['400'],
      1
    )} 50%, ` +
    themeColor.black['400'] +
    ` 70%)`,
  themeColorInvert: themeColor.white['100'],
  themeInvertReverse: `invert(0)`,
  themeInvert: `invert(1)`,
  gradientTowhite:
    `linear-gradient(to top, ` +
    themeColor.black['400'] +
    ` 100% , ${transparentize(themeColor.black['400'], 0.5)} 40%)`,
  productBg: themeColor.black['600'],
  productBgContrast: themeColor.white['100'],
  /** Contrast color use on texts */
  contrastColor: themeColor.white['100']
}

const fonts = {
  dinLight: 'DinLight',
  dinRegular: 'DinRegular',
  dinMedium: 'DinMedium',
  dinBold: 'DinBold'
}

const transition = {
  transition_1: '0.5s ease all',
  transition_2: 'all 0.3s ease-in-out'
}

export const THEME_TYPE = {
  DARK: 'dark',
  LIGHT: 'light'
}

const theme = theme =>
  theme === THEME_TYPE.DARK
    ? {
        ...dark,
        ...themeColor,
        fonts,
        transition,
        rem,
        transparentize
      }
    : {
        ...light,
        ...themeColor,
        fonts,
        transition,
        rem,
        transparentize
      }

export default theme
