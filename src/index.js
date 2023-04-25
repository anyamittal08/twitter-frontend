import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

import theme from './theme';
import Router from './components/Router';
import SideNavbar from './components/SideNavbar';
import SidebarRight from './components/SidebarRight';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={new QueryClient()}>
                <Router />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
