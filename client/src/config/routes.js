// Layout
import { LayoutAdmin } from './../layouts/LayoutAdmin';
import { LayoutBasic } from './../layouts/LayoutBasic';

// Admin Pages
import { Admin } from './../pages/Admin/Admin';
import Blog  from '../pages/Admin/Blog/Blog';
import { Courses as AdminCourses } from '../pages/Admin/Courses';
import { MenuWeb } from '../pages/Admin/MenuWeb/MenuWeb';
import { SignIn } from './../pages/Admin/SignIn/SignIn';
import { Users } from '../pages/Admin/Users/Users';

// Basic Pages
import { Blog as BlogPage } from './../pages/Blog';
import { Contact } from './../pages/Contact';
import { Courses } from '../pages/Courses';
import { Home } from './../pages/Home';

// Other Page
import { Error404 } from '../pages/Error404';

export const routes = [
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: Admin,
                exact: true,
            },
            {
                path: '/admin/login',
                component: SignIn,
                exact: true,
            },
            {
                path: '/admin/users',
                component: Users,
                exact: true,
            },
            {
                path: '/admin/menu',
                component: MenuWeb,
                exact: true,
            },
            {
                path: '/admin/courses',
                component: AdminCourses,
                exact: true,
            },
            {
                path: '/admin/blog',
                component: Blog,
                exact: true,
            },
            {
                component: Error404,
            }
        ],
    },
    {
        path: '/',
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true,
            },
            {
                path: '/contact',
                component: Contact,
                exact: true,
            },
            {
                path: '/courses',
                component: Courses,
                exact: true,
            },
            {
                path: '/blog',
                component: BlogPage,
                exact: true,
            },
            {
                path: '/blog/:url',
                component: BlogPage,
                exact: true,
            },
            {
                component: Error404,
            }
        ],
    },
];