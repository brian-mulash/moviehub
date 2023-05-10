import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

const themeModes = {
   dark: "dark",
   light: "light"
}

const themeConfigs = {
   custom: ({mode}) => {
      const customPalette = mode === themeModes.dark ? {
         primary: {
            main: "#fccb05",
            contrastText: "#ffffff"
         },

         secondary: {
            main: "#fccb05",
            contrastText: "#ffffff"
         },

         background: {
            default: "#000000",
            paper: "#131313"
         }
      }: {
         primary: {
            main: "#fccb05",
         },

         secondary: {
            main: "#fccb05"
         },

         background: {
            default: colors.grey["100"]
         }
      }

      return createTheme({
         palette: { mode, ...customPalette },
         components: { MuiButton: { defaultProps: { disableElevation: true } } }
      });
   }
};

export default themeConfigs;