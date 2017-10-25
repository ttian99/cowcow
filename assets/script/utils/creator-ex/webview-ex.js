/**
 * webview的拓展类
 *
 */


/**
 * @method getDomIframe 获取iframe
 * @return iframe|div
 * 调试模式下iframe上会增加一层div标签
 */
function getDomIframe() {
  let divArr = cc.game.canvas.parentElement.getElementsByTagName('div');
  if (divArr.length < 1) {
    divArr = cc.game.canvas.parentElement.getElementsByTagName('iframe');
  }
  return divArr[0];
}

// 显示webView
function showWebView(el, cb) {
  if (el instanceof Function) {
    cb = el;
    el = null;
  }
  const div = el || getDomIframe();
  div.style.zIndex = 10;
  cb && cb();
}

// 隐藏webView
function hideWebView(el, cb) {
  if (el instanceof Function) {
    cb = el;
    el = null;
  }
  const div = el || getDomIframe();
  div.style.zIndex = -1;
  cb && cb();
}

// 去掉overFlow
function hideOverFlow(el) {
  const div = el || getDomIframe();
  if (div.id !== 'Cocos2dGameContainer') {
    div.style.overflow = 'hidden';
  }
}

// const webViewEx = ;
export default { getDomIframe, showWebView, hideWebView, hideOverFlow };
