import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  colors: { gray: { "900": "#181B23", "800": "#1F2029", "700": "#353646", "600": "#4B4D63", "500": "#616480", "400": "#797D9A", "300": "#9699B0", "200": "#B3B5C6", "100": "#D1D2DC", "50": "#EEEEF2", } },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
        "select::-webkit-menu": {
          backgroundColor: "gray.800",
        },
        "select::-moz-menu": {
          backgroundColor: "gray.800",
        },
        "select::-ms-expand": {
          backgroundColor: "gray.800",
        },
      },

    },
    components: {
      Select: {
        variants: {
          filled: {
            "& .chakra-select__menu": {
              bg: "gray.800",
            },
          },
        }
      }
    }
  }
})