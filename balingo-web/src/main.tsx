import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme";

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: () => <>Not found...</>
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </StrictMode>,
)
