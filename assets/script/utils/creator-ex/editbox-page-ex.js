const { ccclass } = cc._decorator;

/**
 * 该组件用于控制editor所在页面不旋转
 */
@ccclass
class EditboxPageEx extends cc.Component {
  onLoad() {

  }

  start() {
    cc.view.resizeWithBrowserSize(false);
  }

  onDestroy() {
    cc.view.resizeWithBrowserSize(true);
  }
}

export default EditboxPageEx;
