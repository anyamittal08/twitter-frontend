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
import Layout from './Layout';

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
                <Route
                    path="/home"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <HomePage />
                            </Layout>
                        </GuardedRoute>
                    }
                />

                <Route
                    path="/:username"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <ProfilePage />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/:username/likes"
                    element={
                        <Layout>
                            <LikesPage />
                        </Layout>
                    }
                />
                <Route
                    path="/:username/followers"
                    element={
                        <Layout>
                            <FollowersPage />
                        </Layout>
                    }
                />
                <Route
                    path="/:username/following"
                    element={
                        <Layout>
                            <FollowingPage />
                        </Layout>
                    }
                />
                <Route
                    path="/:username/status/:tweetId"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <TweetRepliesPage />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <SearchResultsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/search/tweets"
                    element={
                        <Layout>
                            <TweetSearch />
                        </Layout>
                    }
                />
                <Route
                    path="/:tweetId/likedBy"
                    element={
                        <Layout>
                            <LikedByPage />
                        </Layout>
                    }
                />
                <Route
                    path="/:tweetId/retweetedBy"
                    element={
                        <Layout>
                            <RetweetedByPage />
                        </Layout>
                    }
                />
                <Route path="/" element={<IndexRoute />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
