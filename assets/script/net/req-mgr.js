// import CMD from '../config/CMD';
// import Buffer from './Buffer';
// import netMgr from './net-mgr';
import Http from './Http';
import cfg from '../config/cfg';

const reqMgr = {};

// 分发请求
reqMgr.request = (cmd, data) => {
  if (!reqMgr[cmd]) console.error(`reqMgr[${cmd}] is null!`);
  if (cmd > 8000) {
    reqMgr[cmd](data);
  } else {
    reqMgr.sendPost(cmd, data);
  }
};
// 发送ws请求
reqMgr.sendSocket = (cmd, data) => {
  if (!reqMgr[cmd]) console.error(`reqMgr[${cmd}] is null!`);
  reqMgr[cmd](data);
  // netMgr.gameWs.sendPro(cmd, buffer);
};
// 发送Http请求
reqMgr.sendHttp = (cmd, data, cb) => {
  const url = cfg.httpSvr + cmd;
  Http.post(url, data, cb);
};

export default reqMgr;
