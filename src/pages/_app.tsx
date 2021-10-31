import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Header from 'src/components/Header/Header';
import '../../styles/globals.css';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}
NProgress.configure({
    showSpinner: false,
    // trickleSpeed: 300,
    // trickle: true,
    // trickleRate: 0.1,
});

Router.events.on('routeChangeStart', () => {
    console.log('on start');
    NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
    console.log('on complete');
    NProgress.done();
});

Router.events.on('routeChangeError', () => {
    console.log('on error');
    NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
    const theme = createTheme({
        status: {
            danger: orange[500],
        },
        palette: {
            primary: {
                // light: will be calculated from palette.primary.main,
                main: '#ff9900',
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            secondary: {
                light: '#0066ff',
                main: '#0044ff',
                // dark: will be calculated from palette.secondary.main,
                contrastText: '#ffcc00',
            },
            // Used by `getContrastText()` to maximize the contrast between
            // the background and the text.
            contrastThreshold: 3,
            // Used by the functions below to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Box marginTop={2}>
                <Component {...pageProps} />
            </Box>
        </ThemeProvider>
    );
}
export default MyApp;
