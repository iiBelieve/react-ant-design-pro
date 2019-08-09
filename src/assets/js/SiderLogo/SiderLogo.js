import React from 'react';
import styles from './SiderLogo.less';
import logo from '../../images/logo.svg';


export default () => (
  <div className={styles.logoBox} id="logo">
    <img src={logo} alt="logo" className={styles.logoImg} />
    <h1>仲裁内部管理系统</h1>
  </div>
);
