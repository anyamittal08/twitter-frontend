import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';

import { UserProvider } from '../contexts/auth';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import FollowersPage from './FollowersPage';
import FollowingPage from './FollowingPage';
import LikesPage from './LikesPage';
import SearchResultsPage from './SearchResultsPage';
import TweetSearch from './TweetSearch';
import TweetRepliesPage from './TweetRepliesPage';

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
                <Route
                    path="/:username"
                    element={
                        <GuardedRoute>
                            <ProfilePage />
                        </GuardedRoute>
                    }
                />
                <Route path="/:username/likes" element={<LikesPage />} />
                <Route
                    path="/:username/followers"
                    element={<FollowersPage />}
                />
                <Route
                    path="/:username/following"
                    element={<FollowingPage />}
                />
                <Route
                    path="/:username/status/:tweetId"
                    element={<TweetRepliesPage />}
                />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/search/tweets" element={<TweetSearch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
