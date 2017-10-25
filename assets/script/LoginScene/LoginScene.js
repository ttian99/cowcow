import cfg from '../config/cfg';
import netMgr from '../net/net-mgr';

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
    // netMgr.reqHttpSvr('loginHall', { nick: 'jtx', uid: '121312' }, (err, data) => {
    //   console.log('==== back wxlogin ===');
    //   console.log('err = ' + err);
    //   console.log(data);
    //   // console.log('data = ' + JSON.stringify(data));
    // });
    cc.director.loadScene('Hall');
  }

}

export default LoginScene;
