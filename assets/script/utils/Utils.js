import moment from 'moment';

const uts = {};
// 截取名字
// uts.cutName = function(playerName) {
//     playerName = playerName && playerName.toString();
//     if (playerName.length >= 6) {
//         playerName = playerName.substring(0, 6) + '...';
//     }
//     return playerName;
// };
uts.cutStrLen = (str, n) => {
  if (!n) n = 20;
  const r = /[^\x00-\xff]/g;
  if (str.replace(r, 'mm').length <= n) { return str; }
  const m = Math.floor(n / 2);
  for (let i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, 'mm').length >= n) {
      return str.substr(0, i) + '...';
    }
  }
  return str;
};

uts.cutName = (str, n) => {
  if (!n) n = 10;
  const r = /[^\x00-\xff]/g;
  if (str.replace(r, 'mm').length <= n) { return str; }
  const m = Math.floor(n / 2);
  for (let i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, 'mm').length >= n) {
      return str.substr(0, i) + '...';
    }
  }
  return str;
};
// 消息公告截取字符串
uts.cutMsgName = (str, n) => {
  if (!n) n = 10;
  const r = /[^\x00-\xff]/g;
  if (str.replace(r, 'mm').length <= n) { return str; }
  const m = Math.floor(n);
  for (let i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, 'mm').length >= n) {
      return str.substr(0, i - 2) + '...';
    }
  }
  return str;
};
// 计算字符串字节个数
uts.getMsgLen = str => str.replace(/[^\x00-\xff]/g, 'rr').length;
// 消息公告截取字符串
uts.cutMsg = (str, n = 50) => {
  const getLen = /[^\x00-\xff]/g;    // 字符串字节个数
  const trim = /\s/g;    // 去空格
  str = str.replace(trim, '');
  const strLen = str.replace(getLen, 'mm').length;
  if (strLen > n) {
    const m = Math.floor(n / 2);
    for (let i = m; i < str.length; i++) {
      if (str.substr(0, i).replace(getLen, 'mm').length >= n) {
        return str.substr(0, i) + '...';
      }
    }
  }
  return str;
};
// 截取当前时间2017-10-19 12:25:25
uts.getTime = () => {
  const str = moment().format('YYYY-MM-DD HH:mm:ss');
  cc.log(str);
  return str;
};
/**
 * function abc(str, n){
  var trim = /\s/g;    // 去空格
  str = str.replace(trim, ''); 
  var CharAtLen = 0;
  var CharAtArr = [];
  var CharAtStr = '';
  for (let i = 0; i < str.length + 1; i++) {
    if (/^[0-9]*$/.test(str[i])) {
      CharAtLen++;       console.log(CharAtLen);
      CharAtStr += str[i];
    } else {
      if (CharAtLen >= n){
        CharAtArr.push(CharAtStr);
      }
      CharAtLen = 0;
      CharAtStr = '';
    }
  }for (let i = 0; i < CharAtArr.length; i++) {
    const strAtLi = CharAtArr[i].replace(/./g, '*');
    str = str.replace(CharAtArr[i], strAtLi);
  }
  console.log(CharAtArr);
  console.log(str);
  return str;
};abc('111111111111111122sdfsddasfsdfs1561561515511',3);
 */
// 替换连续数字
uts.cutCharAtNum = (str, n = 7) => {
  const trim = /\s/g;    // 去空格
  str = str.replace(trim, '');
  let CharAtLen = 0;
  const CharAtArr = [];
  let CharAtStr = '';
  for (let i = 0; i < str.length + 1; i++) {
    if (/^[0-9]*$/.test(str[i])) {
      CharAtLen++;
      CharAtStr += str[i];
    } else {
      if (CharAtLen >= n) {
        CharAtArr.push(CharAtStr);
      }
      CharAtLen = 0;
      CharAtStr = '';
    }
  }
  for (let i = 0; i < CharAtArr.length; i++) {
    const strAtLi = CharAtArr[i].replace(/./g, '*');
    str = str.replace(CharAtArr[i], strAtLi);
  }
  cc.log(str);
  cc.log(CharAtArr);
  return str;
};
// 判断字符串是否合格
uts.isStrNull = (str) => {
  if (!str) return true;
  if (str === '') return true;
  const regu = '^[ ]+$';
  const re = new RegExp(regu);
  return re.test(str);
};

// 判断字符串是否合格
uts.cutUid = (str) => {
  if (!str) return '';
  let strL = '';
  let strR = '';
  if (str.length >= 4) {
    strL = str.substring(0, 3);
    strR = str.substring(str.length - 3);
    str = strL + 'xxxxx' + strR;
  }
  return str;
};

uts.countdown = (data, cc_lebel) => {
  cc_lebel.unschedule(cc_lebel.callback);
  if (!data) return;
  data = parseInt(data) * 1000;
  let HH = parseInt(data / 1000 / (60 * 60));
  let MM = parseInt(data / 1000 / 60 % 60);
  let SS = parseInt(data / 1000 % 60);
  cc_lebel.callback = function () {
    SS -= 1;
    if (SS < 0) {
      SS = 59;
      MM--;
    }
    if (MM < 0) {
      MM = 59;
      HH--;
    }
    if (HH === 0) {
      this.string = MM + '分' + SS + '秒';
      if (MM === 0) {
        this.string = SS + '秒';
      }
    } else {
      this.string = HH + '时' + MM + '分' + SS + '秒';
    }

    if (HH < 0) {
      cc_lebel.unschedule(cc_lebel.callback);
      this.string = '停止下注';
    }
  };
  cc_lebel.schedule(cc_lebel.callback, 1);
};

// 给数字插入逗号
uts.numInsertComma = (num) => {
  const str = parseInt(num, 10).toString();
  const len = str.length;
  if (len <= 4) {
    return str;
  }
  const r = len % 3;
  return r > 0 ? str.slice(0, r) + ',' + str.slice(r, len).match(/\d{3}/g).join(',') : str.slice(r, len).match(/\d{3}/g).join(',');
};

// 字符串(false/true)转布尔值
uts.strToBoolean = str => (/^true$/i).test(str);

uts.toDecimal2 = (x) => {
  const f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  const ff = Math.round(x * 100) / 100;
  let s = ff.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};

uts.setCookie = (cName, value, expiredays = 0) => {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + (expiredays * 24 * 60 * 60 * 1000));
  document.cookie = cName + '=' + escape(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};
uts.getCookie = (cName) => {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=');
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) cEnd = document.cookie.length;
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
};

uts.getBrowser = () => {
  const OsObject = navigator.userAgent;
  let browser = '';
  if (OsObject.indexOf('Opera') !== -1) {
    browser = 'Opera';
    cc.log('您的浏览器是Opera吧？');  // 包含「Opera」文字列
  } else if (OsObject.indexOf('MSIE') !== -1) {
    browser = 'MSIE';
    cc.log('您的浏览器是Internet Explorer吧？');  // 包含「MSIE」文字列
  } else if (OsObject.indexOf('Chrome') !== -1) {
    browser = 'Chrome';
    cc.log('您的浏览器是chrome或360浏览器吧？'); // 包含「chrome」文字列 ，不过360浏览器也照抄chrome的UA
  } else if (OsObject.indexOf('UCBrowser') !== -1) {
    browser = 'UCBrowser';
    cc.log('您的浏览器是UCBrowser吧？'); // 包含「UCBrowser」文字列
  } else if (OsObject.indexOf('BIDUBrowser') !== -1) {
    browser = 'BIDUBrowser';
    cc.log('您的浏览器是百度浏览器吧？'); // 包含「BIDUBrowser」文字列
  } else if (OsObject.indexOf('Firefox') !== -1) {
    browser = 'Firefox';
    cc.log('您的浏览器是Firefox吧？'); // 包含「Firefox」文字列
  } else if (OsObject.indexOf('Netscape') !== -1) {
    browser = 'Netscape';
    cc.log('您的浏览器是Netscape吧？'); // 包含「Netscape」文字列
  } else if (OsObject.indexOf('Safari') !== -1) {
    browser = 'Safari';
    cc.log('您的浏览器是Safari 吧？'); // 包含「Safari」文字列
  } else {
    cc.log('无法识别的浏览器。');
  }
  return browser;
};

/**
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
uts.debounce = (action, idle = 400) => {
  let last;
  return () => {
    const ctx = this;
    const args = arguments;
    clearTimeout(last);
    last = setTimeout(() => {
      action.apply(ctx, args);
    }, idle);
  };
};

/**
* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
* @param delay  {number}    延迟时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
uts.throttle = (action, delay = 400) => {
  let last = 0;
  return () => {
    const curr = new Date();
    if (curr - last > delay) {
      action.apply(this, arguments);
      last = curr;
    }
  };
};

uts.isValidNode = (node, callback) => {
  if (cc.isValid(node)) {
    callback();
  } else {
    if (node) {
      console.log('当前节点不可用节点是：name=' + node.name);
    } else {
      console.log('当前节点不可用且节点不存在');
    }
  }
};


window.uts = uts;
export default uts;
