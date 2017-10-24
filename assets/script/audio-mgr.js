
class AudioMgr {
  constructor(audioKey = 'defAudioKey') {
    console.log('init audioMgr');
    this.em = true; // enableMuisc
    this.ee = true; // enableEffect
    this.musicVolume = 0.5; // 初始音乐音量
    this.effectVolume = 0.5; // 初始音效音量
    this.audioKey = audioKey; // audioKey, 存储到localStorage中的Key值
    this.save();
  }

  save() {
    if (!this.audioKey) return;
    const rst = {
      disableMusic: !this.em,
      disableEffect: !this.ee,
      musicVolume: this.musicVolume,
      effectVolume: this.effectVolume,
    };
    cc.sys.localStorage.setItem(this.audioKey, JSON.stringify(rst));
  }

  load() {
    if (this.audioKey) {
      const rst = cc.sys.localStorage.getItem(this.audioKey);
      if (!rst) return;

      try {
        const json = JSON.parse(rst);
        this.em = !json.disableMusic;
        this.ee = !json.disableEffect;
        this.musicVolume = json.musicVolume;
        this.effectVolume = json.effectVolume;
      } catch (err) {
        console.log('load audio info failed');
      }
    }
  }

  isEnableEffect() {
    return this.em;
  }

  isEnableMusic() {
    return this.ee;
  }

  playMusic(url, loop = true, volume) {
    this.em && cc.audioEngine.playMusic(url, loop, volume);
  }

  pauseMusic() {
    this.em && cc.audioEngine.pauseMusic();
  }

  resumeMusic() {
    this.em && cc.audioEngine.resumeMusic();
  }

  stopMusic() { // (releaseData = true) {
    cc.audioEngine.stopMusic();
  }

  setMusicVolume(percent) {
    this.musicVolume = percent;
    cc.audioEngine.setMusicVolume(percent);
    this.save();
  }

  playEffect(url, loop = false) {
    this.ee && cc.audioEngine.playEffect(url, loop);
  }

  stopAllEffects() {
    cc.audioEngine.stopAllEffects();
  }

  setEffectVolume(percent) {
    this.effectVolume = percent;
    cc.audioEngine.setEffectVolume(percent);
    this.save();
  }


  enableMusic(url) {
    this.em = true;
    this.playMusic(url);
    this.save();
  }

  disableMusic() {
    this.stopMusic();
    this.em = false;
    this.save();
  }

  enableEffect() {
    this.ee = true;
    this.save();
  }

  disableEffect() {
    this.stopAllEffects();
    this.ee = false;
    this.save();
  }
}


const audioMgr = new AudioMgr();

window.audioMgr = audioMgr;
export default audioMgr;
