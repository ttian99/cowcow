/**
 * localStorage 操作类
 */
import utils from '../utils/Utils';

const Loc = {};

Loc.save = (key, value) => {
  if ((key === 'sessionid') && (cc.sys.browserType === cc.sys.BROWSER_TYPE_UC)) {
    utils.setCookie('sessionid', value, 1);
  } else {
    cc.sys.localStorage.setItem(key, value);
  }
};

Loc.get = (key) => {
  let value = null;
  if ((key === 'sessionid') && (cc.sys.browserType === cc.sys.BROWSER_TYPE_UC)) {
    value = utils.getCookie('sessionid');
  } else {
    value = cc.sys.localStorage.getItem(key);
  }
  return value;
};

Loc.saveJson = (key, json) => {
  cc.sys.localStorage.setItem(key, JSON.stringify(json));
};

Loc.getJson = key => Loc.safeParse(cc.sys.localStorage.getItem(key));

Loc.saveBoolean = (key, boolean) => {
  const num = boolean ? 1 : 0;
  cc.sys.localStorage.setItem(key, num);
};

Loc.getBoolean = (key) => {
  const num = parseInt(cc.sys.localStorage.getItem(key), 10);
  const boolean = (num === 1) ? true : false;
  return boolean;
};

Loc.safeParse = (str) => {
  let data = null;
  try {
    data = JSON.parse(str);
  } catch (e) {
    cc.log('parse [ ' + str + ' ] failed!');
  }
  return data;
};

module.exports = Loc;
