import NetWork from './WebSocket';
import cfg from '../config/cfg';
import reqMgr from './req-mgr';
import resMgr from './res-mgr';

class NetMgr {
  isConnecting = false; // 是否正在连接

  constructor() {
    // this.hallWs = new NetWork('hall');
    this.gameWs = new NetWork('game');
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
  // 是否连接上游戏的Socket
  get isGameConnected() {
    return this.gameWs.isConnected;
  }
  // 是否正在连接game
  get isGameConnecting() {
    return this.gameWs.isConnecting;
  }
  // 关闭游戏连接
  closeGameSocket() {
    this.gameWs.end();
  }

  // 请求http服务器
  reqHttpSvr = (cmd, data, cb, isDebug) => {
    reqMgr.sendHttp(cmd, data, cb);
  }
  // 请求ws服务器
  reqSocketSvr = (cmd, data, isDebug) => {
    reqMgr.sendSocket();
  }
  // 注册监听
  registerCallfun = (cmd, succFunc, errFunc) => {
    this.gameWs.registerCallfun(cmd, (data) => {
      console.debug(cmd + ' succ');
      resMgr.parse(cmd, data);
      succFunc && succFunc(data);
    }, (errData) => {
      console.debug(cmd + ' err');
      console.error(err);
      // resMgr[111](errData);
      errFunc && errFunc(err);
    });
  }
  // 取消监听
  deleteCallfun = cmd => this.gameWs.deleteCallfun(cmd)
}

const netMgr = new NetMgr();
window.netMgr = netMgr;
export default netMgr;
