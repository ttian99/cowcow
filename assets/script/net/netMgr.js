import NetWork from './WebSocket';
import cfg from '../config/cfg';

class NetMgr {
  isConnecting = false; // 是否正在连接

  constructor() {
    this.hallWs = new NetWork('hall');
    this.gameWs = new NetWork('game');
  }

  // 连接hall服务器
  connectHallSvr(cb) {
    console.log('== start connect hall Svr ==');
    this.isConnecting = true;
    this.hallWs.connect(cfg.hallServerUrl, () => {
      this.isConnecting = false;
      console.debug('== connect hall success : ' + cfg.hallServerUrl);
      cb && cb();
    });
  }
  // 连接Game服务器
  connectGameSvr(cb) {
    console.log('== start connect game Svr ==');
    this.isConnecting = true;
    this.gameWs.connect(cfg.gameServerUrl, () => {
      this.isConnecting = false;
      console.debug('== connect game success : ' + cfg.gameServerUrl);
      cb && cb();
    });
  }

  // 是否连接上大厅的Socket
  get isHallConnected() {
    return this.hallWs.isConnected;
  }
  // 是否连接上游戏的Socket
  get isGameConnected() {
    return this.gameWs.isConnected;
  }
  // 是否2个socket都连接上了
  get isAllConnected() {
    return (this.isHallConnected && this.isGameConnected);
  }
  // 是否正在连接hall
  get isHallConnecting() {
    return this.hallWs.isConnecting;
  }
  // 是否正在连接game
  get isGameConnecting() {
    return this.gameWs.isConnecting;
  }
  // 是否有连接在连接中
  get isAnyConnecting() {
    return (this.isHallConnecting || this.isGameConnecting);
  }
  // 关闭大厅连接
  closeHallSocket() {
    this.hallWs.end();
  }
  // 关闭游戏连接
  closeGameSocket() {
    this.gameWs.end();
  }
}

const netMgr = new NetMgr();
window.netMgr = netMgr;
export default netMgr;
