import { useLocalStorage } from "@vueuse/core";
import axios from "axios";

const host = import.meta.env.VITE_APP_HOST;

/**
 * 获取用户信息 根据token
 * @returns
 */

export const voucherToken = async () => {
  try {
    const response = await axios.get(`/admin/Api/User/voucherToken`, {
      headers: {
        'token': useLocalStorage('token', '').value,
      }
    }) as any;
    return response.data.data
  } catch (e) { }
}

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @param captcha 验证码
 * @returns
 *  */
export const userLogin = async (username: string, password: string, captcha: string) => {
  const response = await useFetch(`/admin/Api/User/login`, {
    method: "POST",
    body: {
      username: username,
      password: password,
      captcha: captcha
    },
    /* 允许跨域 */
    credentials: 'include',
  }) as any;
  return response.data.value;
}


/**
 * 注册
 * @param username 用户名
 * @param password 密码
 * @param name 名称
 * @param sex 名称
 * @param email 邮箱
 * @param phone 手机号
 * @param addres 地址
 * @returns
 */

export const userRegister = async (form: any) => {
  const { username, password, name, sex, email, addres, phone } = form;
  const response = await useFetch(`/admin/Api/User/register`, {
    method: "POST",
    body: { username, password, name, sex, email, addres, phone },
    /* 允许跨域 */
    credentials: 'include',
  }) as any;
  return response.data.value;
}
/**
 * 修改用户信息
 * @param data 用户信息
 * @returns
*/
export const userEdit = async (data: any) => {
  const response = await useFetch(`/admin/Api/User/updateUserInfoPrivate`, {
    method: "POST",
    body: data,
    /* 允许跨域 */
    credentials: 'include',
  }) as any;
  return response.data.value;
}
