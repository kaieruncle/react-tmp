import React, { FC, lazy, Suspense } from "react";
import { HashRouter, HashRouterProps, useRoutes, RouteObject } from 'react-router-dom';


const LoginLayout = lazy(() => import(/* webpackChunkName: 'LoginLayout' */ '@/layouts/LoginLayout'));
const BaseLayout = lazy(() => import(/* webpackChunkName: 'BaseLayout' */ '@/layouts/BaseLayout'));
const Login = lazy(() => import(/* webpackChunkName: 'Login' */ '@/pages/Login'));
const Home = lazy(() => import(/* webpackChunkName: 'Home' */ '@/pages/Home'));
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFound' */ '@/layouts/NotFound'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <LoginLayout redirect="/login"/>,
        children: [{
            path: '/login',
            element: <Login />,
        }]
    }, {
        path: '/base',
        element: <BaseLayout />,
        children: [{
            path: 'home',
            element: <Home />,
        }]
    }, {
        path: '*',
        element: <NotFound />
    }
]

/**
 * 生成Route组件
 */
const RouteList = () => {
    return useRoutes(routes)
}

/**
 * 懒加载 
 */
const Routes: FC<HashRouterProps> = () => {
    return <HashRouter>
        <Suspense>
            <RouteList />
        </Suspense>
    </HashRouter>
}

export default Routes