import audioMgr from '../audio-mgr';

const { ccclass, property } = cc._decorator;

@ccclass
class HallScene extends cc.Component {
  //
  onLoad() {
    console.log('--start Scene ==');
    const bgm = cc.url.raw('resources/audio/bgm.wav');
    audioMgr.playMusic(bgm);
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

export default HallScene;
