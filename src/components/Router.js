import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';

import { UserProvider } from '../contexts/auth';

import HomePage from '../views/HomePage';
import LoginPage from '../views/LoginPage';
import ProfilePage from '../views/ProfilePage';
import FollowersAndFollowingPage from '../views/FollowersAndFollowingPage';
import SearchResultsPage from '../views/SearchResultsPage';
import TweetRepliesPage from '../views/TweetRepliesPage';
import LikedByPage from '../views/LikingUsersPage';
import RetweetedByPage from '../views/RetweetedByPage';
import Layout from './Layout';
import ComingSoon from '../views/ComingSoonPage';
import SuggestedUsers from '../views/SuggestedUsersPage';

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
                        <GuardedRoute>
                            <Layout>
                                <ProfilePage />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/:username/followers"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <FollowersAndFollowingPage startingTab="followers" />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/:username/following"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <FollowersAndFollowingPage startingTab="following" />
                            </Layout>
                        </GuardedRoute>
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
                        <GuardedRoute>
                            <Layout>
                                <SearchResultsPage startingTab="users" />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/search/tweets"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <SearchResultsPage startingTab="tweets" />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/:tweetId/likedBy"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <LikedByPage />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/:tweetId/retweetedBy"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <RetweetedByPage />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/bookmarks"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <ComingSoon feature={'Bookmarks'} />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/messages"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <ComingSoon feature={'Messages'} />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <ComingSoon feature={'Notifications'} />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route
                    path="/suggested"
                    element={
                        <GuardedRoute>
                            <Layout>
                                <SuggestedUsers />
                            </Layout>
                        </GuardedRoute>
                    }
                />
                <Route path="/" element={<IndexRoute />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
