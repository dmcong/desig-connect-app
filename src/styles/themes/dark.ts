import { theme, ThemeConfig } from 'antd'
import { VARIABLES } from './vars'

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: VARIABLES.PRIMARY,
    colorPrimaryHover: VARIABLES.DARK_PURPLE,
    fontFamily: "'Satoshi', sans-serif",
  },
  components: {
    Layout: {
      colorBgBody: VARIABLES.NEUTRAL100,
    },
    Card: {
      colorBorder: VARIABLES.TRANSPARENT,
      boxShadow: VARIABLES.NONE,
      colorBgContainer: VARIABLES.NEUTRAL90,
      lineWidth: 1.5,
    },
    Button: {
      controlHeightLG: 48,
      borderRadius: 8,
      fontSizeLG: 14,
      colorBgContainer: VARIABLES.NEUTRAL80,
    },
    Typography: {
      colorLink: VARIABLES.PRIMARY,
      fontSizeHeading1: 30,
      fontSizeHeading2: 24,
      fontSizeHeading3: 18,
    },
    Segmented: {
      controlHeight: 56,
      lineWidthBold: 0,
      borderRadiusSM: 24,
      colorBgLayout: VARIABLES.NEUTRAL100,
      colorBgTextActive: VARIABLES.NEUTRAL90,
    },
    Input: {
      controlHeightLG: 56,
      colorBgContainer: VARIABLES.NEUTRAL90,
    },
    InputNumber: {
      borderRadius: 16,
      colorBgContainer: VARIABLES.NEUTRAL90,
    },
    Collapse: {
      colorBorder: VARIABLES.TRANSPARENT,
      colorBgContainer: VARIABLES.NEUTRAL90,
      colorBgLayout: VARIABLES.NEUTRAL90,
    },
    Modal: {
      colorBgElevated: VARIABLES.NEUTRAL90,
    },
    Drawer: {
      colorBgElevated: VARIABLES.NEUTRAL100,
    },
  },
}
