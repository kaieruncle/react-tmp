import { Toast } from 'antd-mobile';
interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

interface ParsedBody {
  data: any
  code: number
  errorCode: string
  msg: string
}

/**
 * 请求基本方法
 */
export const http = async (request: RequestInfo): Promise<any> => {
  const response: HttpResponse<ParsedBody> = await fetch(request);
  // 转义
  try {
    response.parsedBody = await response.json();
  } catch (err) {
  }
  // 状态码拦截
  if (!response.ok) throw new Error(response.statusText);
  // 返回值处理
  const { parsedBody } = response || {}
  const { data, errorCode, code, msg } = parsedBody || {}
  if (code !== 200) {
    Toast.show(msg);
    throw new Error(msg)
  }
  return data
}

/**
 * get请求
 */
export const get = async (
  path: string,
  params: any,
  args: RequestInit = { method: "get", headers: { "rbacToken": localStorage.getItem('token') } }
): Promise<any> => {
  let lastPath = process.env.BASEURL + path
  // 拼接参数
  if (Object.keys(params).length > 0) {
    let paramsPath = '?'
    for (let key in params) {
      paramsPath += `${key}=${params[key]}&`
    }
    paramsPath = paramsPath.substring(0, paramsPath.length - 1);
    lastPath += paramsPath
  }
  return await http(new Request(lastPath, args));
}

/**
 * post请求
 */
export const post = async (
  path: string,
  body: any,
  args: RequestInit = { method: "post", body: JSON.stringify(body), headers: { "rbacToken": localStorage.getItem('token'), "Content-Type": "application/json" } }
): Promise<any> => {
  return await http(new Request(process.env.BASEURL + path, args));
}

/**
 * upload请求
 */
export const upload = async (
  path: string,
  body: any,
  args: RequestInit = { method: "post", body, headers: { "rbacToken": localStorage.getItem('token') } }
): Promise<any> => {
  return await http(new Request(process.env.BASEURL + path, args));
}