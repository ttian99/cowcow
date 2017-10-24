import netMgr from './netMgr';
import hallReq from './hall-req';
import gameReq from './game-req';
import hallRes from './hall-res';
import gameRes from './game-res';
import testReq from '../test/test-req';

const dataMgr = {
  isDebug: false,
};

// 发起ws请求
dataMgr.reqSvr = (cmd, data, isDebug, errCode) => {
  if (dataMgr.isDebug || isDebug) {
    testReq(cmd, data, errCode);
  } else {
    const req = (cmd >= 8000) ? gameReq : hallReq;
    req[cmd](cmd, data);
  }
};

// 注册监听
dataMgr.registerCallfun = (cmd, succFunc, errFunc) => {
  const ws = (cmd >= 8000) ? netMgr.gameWs : netMgr.hallWs;
  const res = (cmd >= 8000) ? gameRes : hallRes;
  ws.registerCallfun(cmd, (data) => {
    console.debug(cmd + ' succ');
    // console.debug(data);
    res[cmd] && res[cmd](data);
    succFunc && succFunc(data);
  }, (err) => {
    console.debug(cmd + ' err');
    console.error(err);
    res[111](err);
    errFunc && errFunc(err);
  });
};

// 取消监听
dataMgr.deleteCallfun = (cmd) => {
  const ws = (cmd >= 8000) ? netMgr.gameWs : netMgr.hallWs;
  ws.deleteCallfun(cmd);
};

window.dataMgr = dataMgr;
export default dataMgr;
