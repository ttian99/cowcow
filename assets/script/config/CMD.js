/**
 * 1.大厅的协议使用的String表示,代表请求的路径。
 * 2.游戏内使用Number表示，代表协议id
 */

const CMD = {
  LOGIN_HALL: 'loginHall', // 登录协议
  GET_INVITE_CODE: 'getInviteCode', // 拉取邀请码
  SET_INVITE_CODE: 'setInviteCode', // 绑定邀请码
  GET_TOTAL_RECORD: 'getTotalRecord', // 拉取最近战绩
  GET_DETAIL_RECORD: 'getDetailRecord', // 拉取战绩详情
  GET_MSG: 'getMsg', // 拉取消息（公告）
  GET_BROADCAST: 'getBroadcast', // 拉取跑马灯消息
  GET_ROOM_LIST: 'getRoomList', // 获取房间列表
  CREATE_ROOM: 'createRoom', // 创建房间
  JOIN_ROOM: 'joinRoom', // 加入房间
  REFRESH_USER_INFO: 'refreshUserInfo', // 刷新用户信息

  HEART: 999, // 心跳
};

export default CMD;
