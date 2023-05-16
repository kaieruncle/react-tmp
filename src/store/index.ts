import {
  createAction,
  createReducer,
  configureStore,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { get } from "@/request/request";

interface InitialState {
  menuList: MenuItem[];
}

/**
 * 创建action
 */
const initialState: InitialState = {
  // 菜单
  menuList: [{
    key: 0,
    value: "首页",
    path: "/base/home",
    defaultIcon: '',
    selectedIcon: '',
  }],
};
/**
 * 创建action
 */
// 同步action createAction

// 异步action
export const fetchAction = createAsyncThunk(
  "fetch/getMenuList",
  async (): Promise<any> => {
    const data = await get(
      "get/menulist",
      {}
    );
    return data;
  }
);

const reducer = createReducer(initialState, (builder): void => {
  builder.addCase(fetchAction.fulfilled, (state, { payload }) => {
    state.menuList = JSON.parse(JSON.stringify(payload));
  });
});
export default configureStore({
  reducer,
});
