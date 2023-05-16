import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, post } from "@/request/request"
import Apis from "@/request/apis";
import styles from "./index.module.less";

/**
 * 获取store中的数据
 */
const mapState = (state: MenuItem[]): MenuItem[] => {
  return state;
};
/**
 * 组件
 */
const App: React.FC<AppProps> = (props) => {
  return (
    <div></div>
  );
};

export default connect(mapState)(App);
