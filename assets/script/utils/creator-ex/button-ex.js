const { ccclass, property } = cc._decorator;

@ccclass
class ButtonEx extends cc.Component {
  @property(Number) type = 0
  onLoad() {}

  start() {}

  // 启用组件
  onEnable() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._swallowTouch, this);
  }
  // 弃用组件
  onDisable() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._swallowTouch, this);
  }

  // 吞噬触摸事件
  _swallowTouch(event) {
    event.stopPropagation(); // 阻止事件向下传递
  }
}

export default ButtonEx;
