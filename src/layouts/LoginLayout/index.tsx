import React, { FC, ReactNode, useEffect } from 'react'
import { Link, matchRoutes, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.less'

const LoginLayout: FC<LoginLayoutProps> = ({redirect}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate(redirect)
    },[])
    return (
        <div className={styles.container}>
            <Outlet />
        </div>
    )
}
export default LoginLayout