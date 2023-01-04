import React from 'react';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {deepOrange, teal} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: deepOrange,
    },
})

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App/>
    </ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

