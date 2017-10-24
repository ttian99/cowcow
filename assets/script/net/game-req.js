import CMD from '../config/CMD';
import Buffer from './Buffer';
import netMgr from './netMgr';

const gameReq = {};

// 发送请求
gameReq.sendReq = (cmd, buffer) => {
  netMgr.gameWs.sendPro(cmd, buffer);
};

// 进入游戏
gameReq[CMD.GAME_ENTER] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.roomNum);
  netMgr.gameWs.sendPro(cmd, buffer);
};
// 离开游戏
gameReq[CMD.GAME_OUT] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  netMgr.gameWs.sendPro(cmd, buffer);
};
// 自己下注
gameReq[CMD.GAME_BET] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeInt(data.bet.led);
  buffer.writeInt(data.bet.idle);
  buffer.writeInt(data.bet.flat);
  buffer.writeInt(data.bet.twoLed);
  buffer.writeInt(data.bet.twoIdle);
  netMgr.gameWs.sendPro(cmd, buffer);
};
// 申请上庄
gameReq[CMD.REQ_BANK] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  netMgr.gameWs.sendPro(cmd, buffer);
};
// 申请下庄
gameReq[CMD.CANCEL_BANK] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  netMgr.gameWs.sendPro(cmd, buffer);
};
// 发送聊天消息
gameReq[CMD.SEND_CHAT_MSG] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.msg);
  netMgr.gameWs.sendPro(cmd, buffer);
};

// 申请重连
gameReq[CMD.GAME_RECONNECT] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.roomNum);
  buffer.writeUTF(data.sessionId);
  netMgr.gameWs.sendPro(cmd, buffer);
};

export default gameReq;
