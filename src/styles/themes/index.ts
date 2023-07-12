import { lightTheme } from './light'
import { darkTheme } from './dark'

import { ThemeConfig } from 'antd'

export const generateTheme = (mode: Theme): ThemeConfig => {
  const themeConfig = mode === 'light' ? lightTheme : darkTheme

  return themeConfig
}
