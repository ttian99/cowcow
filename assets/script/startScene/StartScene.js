import { find } from 'lodash';
import moment from 'moment';
// import mobx from 'mobx';

const { ccclass, property } = cc._decorator;
@ccclass
class StartScene extends cc.Component {
  @property(cc.Node) testLogo = null;
  isHallConnected = false;
  isGameConnected = false;
  isGoingToHall = false;

  //
  onLoad() {
    console.log('--start Scene ==');
  }

  //
  start() {

  }

  //
  update() {

  }
  //
  onEnable() {

  }
  //
  onDisable() {

  }
  // 组件销毁时（组件销毁不会立即执行，会在这一帧的最后执行）
  onDestory() {

  }
}

export default StartScene;
