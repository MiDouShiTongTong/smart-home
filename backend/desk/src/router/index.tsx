import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Loadable from 'react-loadable';
import Loading from '../component/loading';
import ErrorNotFound from '../component/error/not-found';
import LayoutMaster from '../page/_layout/master';

// 非懒加载模块
// 账户
import LayoutMasterAccount from '../page/_layout/master/account';

// 账户登陆
import LayoutMasterAccountSignIn from '../page/_layout/master/account/sign-in';

// 系统
import LayoutMasterSystem from '../page/_layout/master/system';

// 工作台
import LayoutMasterSystemHomeWelcome from '../page/_layout/master/system/home/welcome';

// 个人用户
import LayoutMasterSystemUserPerson from '../page/_layout/master/system/user/person';
import LayoutMasterSystemUserPersonList from '../page/_layout/master/system/user/person/list';

// 懒加载模块
// 仪表盘
const LayoutMasterSystemHome = Loadable({
  loader: () => import('../page/_layout/master/system/home'),
  loading: () => <Loading/>
});

// 用户
const LayoutMasterSystemUser = Loadable({
  loader: () => import('../page/_layout/master/system/user'),
  loading: () => <Loading/>
});

// 当前组件的类型声明
export interface MyRouteConfig extends RouteConfig {
  // 面包屑提示文字
  breadcrumb?: string;
  // 约束子路由
  routes?: MyRouteConfig[];
}

interface Props {
}

interface State {
  routeList: MyRouteConfig[];
}

// 当前组件类
export default class Router extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      routeList: [
        {
          // 根模块
          path: '/',
          component: LayoutMaster,
          routes: [
            // 账户登陆模块
            {
              path: '/account',
              component: LayoutMasterAccount,
              routes: [
                {
                  path: '/account/signIn',
                  component: LayoutMasterAccountSignIn
                }
              ]
            },
            {
              // 系统模块
              path: '/system',
              component: LayoutMasterSystem,
              routes: [
                // 仪表盘模块
                {
                  path: '/system/home',
                  component: LayoutMasterSystemHome,
                  breadcrumb: '仪表盘',
                  routes: [
                    {
                      path: '/system/home/welcome',
                      component: LayoutMasterSystemHomeWelcome,
                      breadcrumb: '工作台'
                    },
                    {
                      path: '',
                      component: ErrorNotFound
                    }
                  ]
                },
                // 用户模块
                {
                  path: '/system/user',
                  component: LayoutMasterSystemUser,
                  breadcrumb: '用户',
                  routes: [
                    {
                      path: '/system/user/person',
                      component: LayoutMasterSystemUserPerson,
                      breadcrumb: '个人用户',
                      routes: [
                        {
                          path: '/system/user/person/list',
                          component: LayoutMasterSystemUserPersonList,
                          breadcrumb: '列表'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: '',
              component: () => <Redirect to='/system/home/welcome'/>
            }
          ]
        }
      ]
    };
  }


  public render = (): JSX.Element => {
    const { state } = this;
    return process.env.NODE_ENV === 'development'
      ? (
        <BrowserRouter>
          {/* 分发所有路由组件的入口 */}
          {renderRoutes(state.routeList)}
        </BrowserRouter>
      )
      : (
        <BrowserRouter
          basename="/smart-home/backend/desk"
        >
          {/* 分发所有路由组件的入口 */}
          {renderRoutes(state.routeList)}
        </BrowserRouter>
      );
  };
}
