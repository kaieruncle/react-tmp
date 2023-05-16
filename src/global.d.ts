declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "*.less";
declare module "*.css";
declare module "postcss-px-to-viewport";

interface MenuItem {
  key: number;
  value: string;
  path: string;
  defaultIcon: string;
  selectedIcon: string;
}

type LoginLayoutProps = {
  redirect: string
}
interface LoginProps {

}
interface BaseLayoutProps {
  menuList?: MenuItem[];
}

interface AppProps {
}
