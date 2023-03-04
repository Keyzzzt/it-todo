import React from 'react';
import './index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {deepOrange, teal} from "@mui/material/colors";
import {CssBaseline} from "@mui/material";
import { AppUseReducer } from './AppUseReducer';
import { AppRedux } from './AppRedux';
import {store} from './store/store';
import { Provider } from 'react-redux';

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
        <Provider store={store}>
            <AppRedux />
        </Provider>
    </ThemeProvider>
);

serviceWorker.unregister();

