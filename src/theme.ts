import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  // color: '#3F4756',
  // overrides: {
  //     MuiInputBase: {
  //       input: {
  //         padding: '8px !important',
  //       },
  //     },
  //   },
  palette: {
    type: 'light',
    text: {
      primary: '#3F4756',
    },
    primary: {
      main: '#2196F3',
      light: '#2196F3',
      dark: '#2196F3',
    },
    //     secondary: {
    //       main: '#b5ecfb',
    //       light: '#61dafb',
    //       dark: '#21a1c4',
    //     },
    //     error: {
    //       main: red.A400,
    //     },
  },

});
export default theme;
