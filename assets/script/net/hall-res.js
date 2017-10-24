// import _ from 'lodash';
import store from '../data/store';
import CMD from '../config/CMD';
import Loc from '../utils/Loc';
import ERR from '../config/ERR';

const hallRes = {};

hallRes[CMD.ERROR] = (err) => {
  console.error('==> hallres err : ' + err);
  if (err === ERR.USER_IS_FROZEN) {
    store.userInfo.isFreeze = true;
  }
};

hallRes[CMD.LOGIN_HALL] = (data) => {
  Loc.save('sessionid', data.sessionid);
  store.userInfo.isLogin = true; // 是否已经登录
  store.userInfo.id = data.uid;
  store.userInfo.chip = data.chip;
  store.userInfo.mudChip = data.nima;
  store.userInfo.extMoney = data.extMoney;
  store.userInfo.win = data.win;
  store.userInfo.lose = data.lose;
  store.userInfo.promoCode = data.promoCode;
  store.userInfo.referLinks = data.referLinks;
  store.userInfo.QRCodeUrl = data.QRCodeUrl;
  store.userInfo.isShowMsgLogo = data.isShowMsgLogo;
  store.userInfo.checkIn = data.checkIn;
  store.userInfo.notice = data.notice;
  store.userInfo.isSetPwd = data.isSetPwd;
  store.userInfo.CardList = data.cardList;
  store.userInfo.isFreeze = false; //  是否被冻结
};

hallRes[CMD.NOTIFY_PUSH] = (data) => {
  store.hallData.broadCastArr = data;
};

hallRes[CMD.GET_BANNER_PHOTO] = (data) => {
  store.hallData.bannerArr = data.arr;
};

hallRes[CMD.GET_PLATFORM_INFO] = (data) => {
  store.hallData.platformList = data;
};

hallRes[CMD.GET_FEILD_INFO] = (data) => {
  store.hallData.feildList.replace(data);
};

export default hallRes;
