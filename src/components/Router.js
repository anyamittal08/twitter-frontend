import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';

import { UserProvider } from '../contexts/auth';

import HomePage from '../views/HomePage';
import LoginPage from '../views/LoginPage';
import ProfilePage from '../views/ProfilePage';
import FollowersPage from '../views/FollowersPage';
import FollowingPage from '../views/FollowingPage';
import LikesPage from '../views/LikesPage';
import SearchResultsPage from '../views/SearchResultsPage';
import TweetSearch from './TweetSearch';
import TweetRepliesPage from '../views/TweetRepliesPage';
import LikedByPage from '../views/LikingUsersPage';
import RetweetedByPage from '../views/RetweetedByPage';

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
                <Route path="/:tweetId/likedBy" element={<LikedByPage />} />
                <Route
                    path="/:tweetId/retweetedBy"
                    element={<RetweetedByPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
