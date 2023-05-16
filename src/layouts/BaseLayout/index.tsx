import React, { FC, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import styles from "./index.module.less";
import { connect } from "react-redux";
import { post } from "@/request/request"
import Apis from "@/request/apis";
/**
 * 获取store中的数据
 */
const mapState = (state: MenuItem[]): MenuItem[] => {
  return state;
};

/**
 * 组件
 */
const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menuList } = props || {};
  const { pathname } = location || {};
  /**
   * 退出登录
   */
  const logout = async (): Promise<void> => {
    navigate('/login');
  }
  /**
   * 跳转路由
   */
  const navigatePage = (path: string): void => {
    navigate(path);
  }
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};
export default connect(mapState)(BaseLayout);
