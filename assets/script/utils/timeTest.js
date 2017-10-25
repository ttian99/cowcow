// console.debug('****use timerTest.js file****');
const timer = {
  detail: false,
  db: {}, // 时间存储对象数据
};

// 初始化
timer.init = () => {
  timer.setTime('ALL', 'begin', new Date());
};

// 设置时间
timer.setTime = (key, innerKey, innerValue) => {
  if (!timer.db[key]) timer.db[key] = {};
  timer.db[key][innerKey] = innerValue;
};

// 获取时间
timer.getTime = (key, innerKey) => {
  return timer.db[key][innerKey];
};

// 设置开始时间
timer.setBegin = (key) => {
  timer.setTime(key, 'begin', new Date());
  timer.detail && console.debug('==> timerr [begin] key = ' + key + ', timer = ' + timer.getTime(key, 'begin'));
};

// 设置结束时间
timer.setEnd = (key) => {
  if (!timer.db[key]) {
    timer.setTime(key, 'begin', timer.db.ALL.begin);
    console.debug('==>timerr [Error] key = ' + key + ', Use key<ALL> as the key<' + key + '> begintimer!');
  }

  timer.setTime(key, 'end', new Date());
  timer.detail && console.debug('==> timerr [end] key = ' + key + ', timer = ' + timer.getTime(key, 'end'));
  console.debug('==> timerr [delta] = ' + key, 'timer = ' + timer.getDelTime(key, 'end'));
};

// 获取间隔时间
timer.getDelTime = (key) => {
  return timer.db[key].end - timer.db[key].begin;
};

if (!window.timer) {
  timer.init();
  window.timer = timer;
}
