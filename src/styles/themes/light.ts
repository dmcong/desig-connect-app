import { theme, ThemeConfig } from 'antd'
import { VARIABLES } from './vars'

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: VARIABLES.PRIMARY,
    colorPrimaryHover: VARIABLES.DARK_PURPLE,
    fontFamily: "'Satoshi', sans-serif",
  },
  components: {
    Layout: {
      colorBgBody: VARIABLES.BG_LIGHT,
    },
    Card: {
      colorBorder: VARIABLES.TRANSPARENT,
      boxShadow: VARIABLES.NONE,
      lineWidth: 1.5,
    },
    Button: {
      controlHeightLG: 48,
      borderRadius: 8,
      fontSizeLG: 14,
      colorBgContainer: VARIABLES.NEUTRAL05,
    },
    Typography: {
      fontSizeHeading1: 30,
      fontSizeHeading2: 24,
      fontSizeHeading3: 18,
      colorLink: VARIABLES.PRIMARY,
    },
    Segmented: {
      controlHeight: 56,
      lineWidthBold: 0,
    },
    Input: {
      controlHeightLG: 56,
    },
    InputNumber: {},
    Collapse: {
      colorBorder: VARIABLES.TRANSPARENT,
    },
    Modal: {},
    Drawer: {
      colorBgElevated: VARIABLES.BG_LIGHT,
    },
  },
}
