// import { find } from 'lodash';
// import moment from 'moment';
// import mobx from 'mobx';

const { ccclass, property } = cc._decorator;
@ccclass
class LoginScene extends cc.Component {
  @property(cc.Node) wxLoginBtn = null;

  //
  onLoad() {
    console.log('--Login Scene ==');
  }

  //
  start() {

  }

  //
  update() {

  }
  //
  onEnable() {
    this.wxLoginBtn.on('click', this.wxLogin, this);
  }
  //
  onDisable() {
    this.wxLoginBtn.off('click', this.wxLogin, this);
  }
  // 组件销毁时（组件销毁不会立即执行，会在这一帧的最后执行）
  onDestory() {

  }

  // 微信登录
  wxLogin() {
    console.log('wxlogin');
    cc.director.loadScene('Hall');
  }

}

export default LoginScene;
