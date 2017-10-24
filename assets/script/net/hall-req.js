import CMD from '../config/CMD';
import Buffer from './Buffer';
import netMgr from './netMgr';

const hallReq = {};

// 发送请求
hallReq.sendReq = (cmd, buffer) => {
  netMgr.hallWs.sendPro(cmd, buffer);
};

// 登录大厅
hallReq[CMD.LOGIN_HALL] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.sessionid); // 服务端首先获取sessionid
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.securityCode);
  buffer.writeUTF(data.invitationCode);
  buffer.writeUTF(data.ip);
  hallReq.sendReq(cmd, buffer);
};

// 获取轮播图
hallReq[CMD.GET_BANNER_PHOTO] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};

// 获取公告
hallReq[CMD.GET_NOTICE] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 获取信息
hallReq[CMD.GET_MSG] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 已经读了那条消息
hallReq[CMD.READ_MSG] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeInt(data.newsID);
  hallReq.sendReq(cmd, buffer);
};

// 获取跑马灯消息
hallReq[CMD.NOTIFY_PUSH] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};

// 签到
hallReq[CMD.ACTIVITY_SIGN] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};

hallReq[CMD.LOGIN_OUT] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};

// 团队管理
hallReq[CMD.TEAM_MANAGER] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeByte(data.teamdatetype);
  hallReq.sendReq(cmd, buffer);
};

// 获取充提记录
hallReq[CMD.CHARGE_RECORD] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);   // 用户id
  buffer.writeByte(data.sectorDate); // 充提时间时间
  buffer.writeByte(data.chargecarryType); // 充提类型
  hallReq.sendReq(cmd, buffer);
};
// 获取场次信息
hallReq[CMD.GET_FEILD_INFO] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 获取反水比例
hallReq[CMD.GET_RULE_INFO] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeByte(data.feildType);
  hallReq.sendReq(cmd, buffer);
};
// 拉取平台信息
hallReq[CMD.GET_PLATFORM_INFO] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeByte(data.feildType);
  hallReq.sendReq(cmd, buffer);
};
// 拉取房间信息
hallReq[CMD.GET_ROOM_INFO] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeByte(data.feildType);
  buffer.writeUTF(data.platformId);
  hallReq.sendReq(cmd, buffer);
};
// 获得验证码
hallReq[CMD.GET_VERTIFICATION_CODE] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 获取活动信息
hallReq[CMD.ACTIVITY_CONTENT] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 获得游戏记录
hallReq[CMD.GAME_RECORD] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeByte(data.gamedate); // 时间
  buffer.writeByte(data.gametpe);  // 游戏类型
  buffer.writeByte(data.gamesession); // 场次
  hallReq.sendReq(cmd, buffer);
};
// 获得绑定银行卡信息
hallReq[CMD.BIND_BANKCARD] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 获得开奖地址
hallReq[CMD.LOTTERY_ADDRESS] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.tableId);
  hallReq.sendReq(cmd, buffer);
};

// 获得绑定银行卡验证码
hallReq[CMD.BANK_VERTIFICATION_CODE] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.mobile);
  buffer.writeByte(data.sign);
  hallReq.sendReq(cmd, buffer);
};

// 确认绑定银行卡
hallReq[CMD.COMFIRM_BINDBANK] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.bankName);
  buffer.writeUTF(data.bankUserName);
  buffer.writeUTF(data.bankCode);
  buffer.writeUTF(data.bankProvince);
  buffer.writeUTF(data.bankValidation);
  hallReq.sendReq(cmd, buffer);
};


// 密码管理
hallReq[CMD.PASSWORD_MGR] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};

// 设置密码
hallReq[CMD.SET_PASSWORD] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.exchangePassWord); // 设置的密码
  hallReq.sendReq(cmd, buffer);
};

// 修改密码
hallReq[CMD.MODIFICAION_PASSWORD] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.currentpassword); // 当前的密码
  buffer.writeUTF(data.newPassWord); // 新的密码
  hallReq.sendReq(cmd, buffer);
};

// 找回密码
hallReq[CMD.FIND_PASSWORD] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.securityCodeEdStr); // 验证码
  buffer.writeUTF(data.confirmNewPassWordStr); // 新密码
  hallReq.sendReq(cmd, buffer);
};

// 刷新用户信息
hallReq[CMD.REFRESH_USER_INFO] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 获得支付方式
hallReq[CMD.GET_PAY_LINK] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.coin);
  buffer.writeUTF(data.payType);
  hallReq.sendReq(cmd, buffer);
};
/** -------------兑换--------------**/
// 获取兑换信息
hallReq[CMD.EXCHANGE_RESULT] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.coin);
  buffer.writeUTF(data.code);
  buffer.writeUTF(data.card);
  hallReq.sendReq(cmd, buffer);
};

// 撤销定单
hallReq[CMD.CANCEL_ORDER] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.orderId);
  hallReq.sendReq(cmd, buffer);
};
// 兑换结果
hallReq[CMD.GET_EXCHANGE] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};

// 获取服务器版本号
hallReq[CMD.PROTOCOL_SERVER_VERSION] = (cmd, data) => {
  const buffer = new Buffer();
  hallReq.sendReq(cmd, buffer);
};
// 玩家是否可以签到
hallReq[CMD.GET_CAN_SIGN_IN] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  hallReq.sendReq(cmd, buffer);
};
// 大厅重连协议
hallReq[CMD.HALL_RECONNECT] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.sessionId);
  hallReq.sendReq(cmd, buffer);
};
// 删除银行卡
hallReq[CMD.DELETE_BANK_ITEM] = (cmd, data) => {
  const buffer = new Buffer();
  buffer.writeUTF(data.uid);
  buffer.writeUTF(data.bankCode);
  hallReq.sendReq(cmd, buffer);
};
export default hallReq;
