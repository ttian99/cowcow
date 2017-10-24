import store from '../data/store';
import CMD from '../config/CMD';
import ERR from '../config/ERR';

const gameRes = {};
gameRes[CMD.ERROR] = (err) => {
  console.error('==> hallres err : ' + err);
  if (err === ERR.USER_IS_FROZEN) {
    store.userInfo.isFreeze = true;
  }
};
// 玩家加入游戏
gameRes[CMD.PLAYER_GAME_ENTER] = (data) => {
  // cc.log('data=' + data);
};
// 加入游戏
gameRes[CMD.GAME_ENTER] = (data) => {
  // cc.log('加入游戏-res');
  store.gameData.odds = data.odds;
  store.gameData.max = data.max;
  store.gameData.curRound = data.curRound;
  if (data.list.length > 50) {
    // cc.log('路单数据过大');
  }
  // store.gameData.list = data.list.reverse();
  store.gameData.list = data.list;
  store.gameData.ledPlayer.uid = data.uid;
  // store.gameData.list = mockData.routeList;
  store.gameData.closeField = 3;
  // cc.log('_joinGameSucc');
};
// 退出游戏
gameRes[CMD.GAME_OUT] = (data) => {
  // cc.log('data=' + data);
};
// 游戏结果
gameRes[CMD.GAME_RESULT] = (data) => {
  const li = {};
  li.type = data.win;
  switch (data.type) {
    case 0:
      li.led = 0;
      li.idle = 0;
      break;
    case 1:
      li.led = 1;
      li.idle = 0;
      break;
    case 2:
      li.led = 0;
      li.idle = 1;
      break;
    case 3:
      li.led = 1;
      li.idle = 1;
      break;
    default:
      break;
  }
  li.round = data.round;
  store.gameData.list.push(li);
  store.userInfo.chip = data.chip;
  store.gameData.closeField = 3;
  // cc.log('_gameResultSucc');
};
// 自己下注
gameRes[CMD.GAME_BET] = (data) => {
  store.userInfo.chip = data.money;
  store.gameData.max = data.max;
  // cc.log('_gameBetSucc');
};
// 其他玩家下注
gameRes[CMD.OTHER_BET] = (data) => {
  // cc.log('data=' + data);
  // cc.log('_gameOtherBetSucc');
};
// 停止下注
gameRes[CMD.STOP_BET] = (data) => {
  // cc.log('_gameStopBetSucc');
  store.gameData.max = data;
  store.gameData.closeField = 2;
};
// 开始下注倒计时
gameRes[CMD.START_BET] = (data) => {
  store.gameData.curRound = data.curRound;
  store.gameData.closeField = 1;
  // cc.log('_gameStartBetSucc');
};
// 申请上庄
gameRes[CMD.REQ_BANK] = (data) => {
  // cc.log('data=' + data);
  // cc.log('_gameReqBankSucc');
};
// 取消上庄
gameRes[CMD.CANCEL_BANK] = (data) => {
  // cc.log('data=' + data);
  // cc.log('_gameCancelBankSucc');
  if (store.gameData.ledPlayer.uid === store.userInfo.id) {
    store.gameData.ledPlayer.uid = null;
  }
};
// 上庄成功
gameRes[CMD.BANK_SUCCESS] = (data) => {
  store.gameData.ledPlayer.uid = data.uid;
  // cc.log('_gameBankSuccessSucc');
};
// 其他玩家取消上庄
gameRes[CMD.CANCEL_BANK_OTHER] = (data) => {
  // cc.log('data=' + data);
  // cc.log('_gameCancelBankOtherSucc');
};
// 玩家自己被踢下庄的位子
gameRes[CMD.KICK_BANKER] = (data) => {
  // cc.log('data=' + data);
  store.gameData.ledPlayer.uid = null;
  // cc.log('_gameKickBankerSucc');
};
// 下注倒计时
gameRes[CMD.BET_LAST_DOWN] = (data) => {
  // cc.log('data=' + data);
  // cc.log('_gameBetLastDownSucc');
  store.gameData.closeField = 1;
};
// 牌局数据出错
gameRes[CMD.CARDS_ERROR] = (data) => {
  store.userInfo.chip = data.chip;
  // cc.log('_gameCardsErrorSucc');
};
// 补单数据
gameRes[CMD.REPAIR_ROAD_BILL] = (data) => {
  let liRound = 0;
  let gameLiRound = 0;
  for (let liIndex = 0; liIndex < data.list.length; liIndex++) {
    console.log('第' + liIndex + '个补单');
    liRound = data.list[liIndex].round;
    for (let gameLiIndex = 0; gameLiIndex < store.gameData.list.length; gameLiIndex++) {
      gameLiRound = store.gameData.list[gameLiIndex].round;
      if (gameLiRound >= liRound) {
        store.gameData.list.splice(gameLiIndex, 0, data.list[liIndex]);
        gameLiIndex = store.gameData.list.length - 1;
      }
    }
  }
  // cc.log('_gameRepairRoadBillSucc');
};
// 玩家下注金额大于可下注金额
gameRes[CMD.BET_CHIP_OVER] = (data) => {
  store.gameData.max = data.max;
};
// 洗牌协议
gameRes[CMD.SHUFFLE] = (data) => {
  // cc.log('data=' + data);
  store.gameData.list = [];
  store.gameData.closeField = 3;
};
// 封盘协议
gameRes[CMD.CLOSE_FIELD] = (data) => {
  store.gameData.closeField = data.type;
  if (data.isShuffle) {
    store.gameData.closeField = 0;
  }
};
// 收到聊天消息
gameRes[CMD.GET_CHAT_MSG] = (data) => {
};
// 重连协议
gameRes[CMD.GAME_RECONNECT] = (data) => {
  store.gameData.odds = data.odds;
  store.gameData.max = data.max;
  store.gameData.curRound = data.curRound;
  if (data.list.length > 50) {
    cc.log('路单数据过大');
  }
  store.gameData.list = data.list.reverse();
  store.gameData.ledPlayer.uid = data.uid;
  // cc.log('_gameReconnectSucc');
};
export default gameRes;
