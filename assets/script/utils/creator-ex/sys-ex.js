const sysEx = {};

// 可用于在下一帧刷新时调用
sysEx.nextTick = (cb) => {
  setTimeout(cb, 0);
};

// 开启或关闭fps
sysEx.showFPS = (enabled = true) => {
  cc.director.setDisplayStats(enabled);
  const { config, CONFIG_KEY } = cc.game;
  config[CONFIG_KEY.showFPS] = enabled;
};

// 取消Canvas模式下脏矩形优化，防止黑框出现
sysEx.disableDirtyRegion = () => {
  if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
    cc.renderer.enableDirtyRegion(false);
  }
};

// 关闭自动全屏功能(PC端的QQ浏览器点击输入框会触发自动全屏)
sysEx.disableAutoFullScreen = () => {
  cc.view.enableAutoFullScreen(false);
};

// 测试浏览器是否支持命令
// 例如：document.queryCommandSupported('copy');
sysEx.caniuse = (str) => {
  document.queryCommandSupported(str);
};
export default sysEx;
