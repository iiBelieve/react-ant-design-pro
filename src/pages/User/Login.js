import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import {Link} from 'dva/router';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    console.log("values");
    console.log(values);
    if (!err) {
      // const {dispatch} = this.props;
      // dispatch({
      //   type: 'login/login',
      //   payload: {
      //     ...values,
      //     type,
      //   },
      // });
      // if (values.username === 'admin') {
      //   console.log('进来了');
      //   routerRedux.replace('/list/table-list');
      // }
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >

          {/* 后台管理账号登录 */}
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-root' })}>
            {login.status === 'error' &&
            login.type === 'account' &&
            !submitting &&
            this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>

          {/* 忘记密码 */}
          {/* <div>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div> */}

          <Submit loading={submitting}>
            <a href="/list/table-list">
              <FormattedMessage id="app.login.login" />
            </a>
          </Submit>

        </Login>
      </div>
    );
  }
}

export default LoginPage;
