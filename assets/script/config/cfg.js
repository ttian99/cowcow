const cfg = {
  debug: true,
  qs: {}, // 浏览器参数
  client_version: '0.0.0.1',
  svr_version: '未知',
  host: '', // 服务器host
  pf: 'web', // 平台
};

cfg.HOST_CUSTOM = 'www.x8-qp.com'; // 客户服务器地址 (IP: 35.187.209.101)
cfg.HOST_DEBUG = '192.168.0.150'; // 测试地址

// 更新内容
cfg.updateInfo = `
1.更新版本至${cfg.client_version}
`;

// cfg设定初始值
cfg.init = () => {
  // 初始默认值
  cfg.host = cfg.HOST_CUSTOM;
  cfg.configHost = cfg.HOST_CUSTOM;
  // 获取querystring
  cfg.getQS();
  // 调试模式
  if (cfg.qs.debug) cfg.debug = cfg.qs.debug;
  cfg.refreshHost(cfg.host);
};

// 更新游戏Host配置
cfg.refreshHost = (host) => {
  cfg.host = cfg.debug ? cfg.HOST_DEBUG : host;
  cfg.host = cfg.qs.host ? cfg.qs.host : cfg.host;
  cfg.hallServerUrl = `ws://${cfg.host}:2082/websocket`;
  cfg.gameServerUrl = `ws://${cfg.host}:2086/websocket`;
  // 用于本地测试
  if (new RegExp('192.168.0.').test(cfg.host)) cfg.proxyUrl = `http://${cfg.HOST_DEBUG}:8080/`;
};

// 获取字符串
cfg.getQS = () => {
  const theRequest = {};
  const url = window.location.search; // 获取url中'?'符后的字串
  const idx = url.indexOf('?');
  if (idx !== -1) {
    const str = url.substr(idx + 1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  cfg.qs = theRequest;
};

window.cfg = cfg;
export default cfg;
