import cfg from '../../config/cfg';

const { ccclass } = cc._decorator;
@ccclass
class VersionLabel extends cc.Component {
  times = 0;
  onLoad() {
    this.node.getComponent(cc.Label).string = `version: ${cfg.client_version}`;
  }
  onEnable() {
    this.node.on('click', this.clickBtn, this);
  }
  onDisable() {
    this.node.off('click', this.clickBtn, this);
  }
  clickBtn() {
    console.log('-- clickBtn --');
    if (this.times === 5) {
      this.times = 0;
    } else {
      this.times++;
    }
  }
}

export default VersionLabel;
