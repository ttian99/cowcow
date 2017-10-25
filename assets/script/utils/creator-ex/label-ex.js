const { ccclass, property } = cc._decorator;

@ccclass
class LabelEx extends cc.Component {
  @property() fontFamily = 'Arial';

  onLoad() {
    this.label = this.node.getComponent(cc.Label);
  }
  start() {
  }
}

export default LabelEx;
