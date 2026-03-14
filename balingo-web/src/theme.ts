import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#292929',
        }
    },
    typography: {
        fontFamily: ['m6x11', 'JetBrains Mono', 'monospace'].join(','),
    },
});

declare module "@mui/material" {
    interface ButtonPropsColorOverrides {
        white: true;
    }
}
