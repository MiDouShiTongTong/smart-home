import ajax from '../../util/ajax';
import config from '../../config';

/**
 * 账户相关接口
 *
 */
interface Api {
  // 登陆
  signIn: (data: any) => object;
  // 退出
  signOut: () => object;
  // 获取当前登陆的用户信息
  selectUserInfo: () => object;
}

/**
 * 账户相关接口实现
 *
 */
const api:Api = {
  signIn(data: any): object {
    return ajax(
      'POST',
      `${config.API_ROOT}/back-desk/manage-user/sign-in`,
      data
    );
  },
  signOut(): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/back-desk/manage-user/sign-out`,
      {}
    );
  },
  selectUserInfo(): object {
    return ajax(
      'GET',
      `${config.API_ROOT}/back-desk/manage-user/manage-user-info`,
      {}
    );
  }
};

export default api;
