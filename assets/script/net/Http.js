const Http = {
  defTimeout: 10000, // 默认超时时长, 10s
};

Http.get = (url, cb, t) => {
  const errInfo = `get ${url} error!!!`;
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      cb && cb(null, xhr.responseText);
    } else {
      cb && cb(errInfo);
    }
  };
  xhr.onerror = (err) => {
    console.log('=== get error: ');
    console.error(err);
    cb && cb(`${errInfo} | details: ${err}`);
  };

  xhr.open('GET', url, true);

  // XMLHttpRequest 超时。在此做某事。
  xhr.timeout = t || Http.defTimeout; // 毫秒
  xhr.ontimeout = (e) => {
    xhr.abort();
    cb && cb('timeout', { rstCode: -100 });
  };

  xhr.send();
};

Http.post = (url, params, cb, t) => {
  if (params instanceof Function) {
    t = cb;
    cb = params;
    params = null;
  }

  const errInfo = `post ${url} error!!!`;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  // Send the proper header information along with the request
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // XMLHttpRequest 超时。在此做某事。
  xhr.timeout = t || Http.defTimeout; // 毫秒
  xhr.ontimeout = (e) => {
    xhr.abort();
    cb && cb('timeout', { rstCode: -100 });
  };

  xhr.onreadystatechange = () => { // Call a function when the state changes.
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Request finished. Do processing here.
      const data = xhr.responseText;
      if (data.code === 0) {
        cb && cb(null, data);
      } else {
        cb && cb('data error', data);
      }
    }
  };

  xhr.send(params);
};

Http.getByProxy = (url, proxyUrl, cb) => {
  const newUrl = proxyUrl + '?imgUrl=' + url;
  Http.get(newUrl, cb);
};

export default Http;
