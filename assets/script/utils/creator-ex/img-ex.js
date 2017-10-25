/**
 * 用于处理加载远程图片的单例
 */
const imgEx = {
  enableProxy: false, // 是否开启中转
  proxyUrl: '', // 中转服务器的地址
};

// 初始化imgEx
imgEx.init = (enableProxy = true, proxyUrl = '') => {
  imgEx.enableProxy = enableProxy;
  imgEx.proxyUrl = proxyUrl;
};

// 设置中转url
imgEx.setProxyUrl = (url) => {
  imgEx.enableProxy = true;
  imgEx.proxyUrl = url;
};

// 设置是否进行中转请求
imgEx.setEnableProxy = (enableProxy) => {
  imgEx.enableProxy = enableProxy;
};

/**
 * 加载远程图片
 * @method loadRemoteImg
 * @param {String|Object} data 图片链接'http://xxxxxx'或者图片对象{url: 'http://xxxxx', type: 'png'}
 * @param {Function} cb 回调函数
 */
imgEx.loadRemoteImg = (data, cb) => {
  const headUrl = imgEx.enableProxy ? `${imgEx.proxyUrl}?imgUrl=` : '';
  if (data instanceof Object) {
    data.url = headUrl + data.url;
  } else {
    data = headUrl + data;
  }

  cc.loader.load(data, (err, texture) => {
    if (err) {
      cb && cb('load error: ' + err);
    } else {
      const spriteFrame = new cc.SpriteFrame(texture);
      cb && cb(null, spriteFrame);
    }
  });
};

window.imgEx = imgEx;
export default imgEx;
