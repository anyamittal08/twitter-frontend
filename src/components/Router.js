import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';

import { UserProvider } from '../contexts/auth';

import HomePage from './HomePage';
import LoginPage from './LoginPage';

const GuardedRoute = ({ children }) => {
    const auth = localStorage.getItem('auth');

    return !auth ? (
        <Navigate to="/" />
    ) : (
        <UserProvider auth={JSON.parse(auth)}>{children}</UserProvider>
    );
};

const IndexRoute = () => {
    const auth = localStorage.getItem('auth');

    return auth ? (
        <Navigate to="/home" />
    ) : (
        <LoginPage
            setAuthenticatedUser={(auth) =>
                localStorage.setItem('auth', JSON.stringify(auth))
            }
        />
    );
};

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexRoute />} />
                <Route
                    path="/home"
                    element={
                        <GuardedRoute>
                            <HomePage />
                        </GuardedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
