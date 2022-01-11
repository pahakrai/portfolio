import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

// export type ThemeValue = string | number | undefined;
// export type SubThemeType = { [key: string]: ThemeValue };
// export type ThemeType = { [key: string]: SubThemeType };

export const useTheme = () => {
  return useContext(ThemeContext)
}
export class ThemeService {
  static create = theme => {
    return Object.keys(theme).reduce((acc, key) => {
      return { ...acc, [key]: ThemeService.getValue(key, theme, key) }
    }, {})
  }
  static getValue = (name, theme, fallback) => {
    if (ThemeService.isReference(name)) {
      const themeKey = ThemeService.createKeyFromReference(name)
      return ThemeService.findValue(themeKey, theme) || fallback
    }

    return ThemeService.findValue(name, theme) || fallback
  }
  static findValue = (name, theme) => {
    const value = theme[name]

    if (ThemeService.isReference(value)) {
      const themeKey = ThemeService.createKeyFromReference(value)
      return ThemeService.findValue(themeKey, theme)
    }

    return value
  }

  static isReference = value => {
    return `${value}`.startsWith('$')
  }

  static createKeyFromReference = value => {
    return `${value}`.substring(1)
  }
}
