import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
// import { loginServer, getFakeCaptcha } from '../services/login';
// import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: {},
  },

  effects: {
    * login({payload}, {call, put}) {
      console.log("payload");
      console.log(payload);
      // const response = yield call(loginServer, payload);
      // console.log(response);
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      reloadAuthorized();
      if (payload.username === 'admin') {
        console.log("comes");

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace('/list/table-list'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.data.perms);
      // console.log(payload.data.perms);
      return {
        ...state,
        currentUser: payload || {},
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
