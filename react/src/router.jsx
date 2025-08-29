import { createBrowserRouter } from 'react-router'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Users from './features/users/Users'
import NotFound from './pages/NotFound'
import GuestLayout from './assets/components/GuestLayout'
import DefaultLayout from './assets/components/DefaultLayout/DefaultLayout'
import Dashboard from './pages/Dashboard'
import UserForm from './features/users/UserForm'
import Posts from './features/posts/Posts'
import PostForm from './features/posts/postForm/PostForm'
import DetailPost from './features/detailPost/DetailPost'
import About from './pages/About/About'
import PersonalPost from './features/personalPost/PersonalPost'

let router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="createUser" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="updateUser" />
            },
            {
                path: '/posts',
                element: <Posts />
            },
            {
                path: '/posts/new',
                element: <PostForm key="createPost" />
            },
            {
                path: '/posts/:id',
                element: <PostForm key="updatePost" />
            },
            {
                path: '/detailPost/:id',
                element: <DetailPost />
            },
            {
                path: '/personalPost',
                element: <PersonalPost />
            },
            {
                path: '/about',
                element: <About />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router