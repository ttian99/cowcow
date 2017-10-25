import audioMgr from '../utils/audio-mgr';

const { ccclass } = cc._decorator;
@ccclass
class HallScene extends cc.Component {
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

  // 播放背景乐
  playBGM() {
    const bgm = cc.url.raw('resources/audio/bgm.wav');
    audioMgr.playMusic(bgm);
  }
}

export default HallScene;
