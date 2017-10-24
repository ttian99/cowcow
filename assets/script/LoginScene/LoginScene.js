import cfg from '../config/cfg';

const { ccclass, property } = cc._decorator;
@ccclass
class LoginScene extends cc.Component {
  @property(cc.Node) wxLoginBtn = null;

  //
  onLoad() {
    cfg.init();
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
