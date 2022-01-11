import React, { PureComponent } from 'react'
import { ThemeContext } from './ThemeContext'
import { ThemeService } from './ThemeService'

// export interface ThemeProviderProps {
//   theme: ThemeType;
//   children?: React.ReactNode;
// }

export class ThemeProvider extends PureComponent {
  render() {
    const { theme, children } = this.props
    return (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    )
  }
}
