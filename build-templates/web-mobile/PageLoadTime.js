/**
 * 用于获取加载页面的数据
 */

(function () {
  console.log('****use PageLoadTime.js file****');
  var time = {};

  // 开始计时
  time.startTime = function (key) {
    time[key] = {};
    time[key].startTime = new Date();
    console.log('==> Timer start: key = ' + key + ', time = ' + time[key].startTime);
  };

  time.endTime = function (key) {
    if (!time[key]) {
      console.log('Error on timer the: ' + key + ', use key<ALL> as the key<' + key + '> startTime');
      time[key] = {};
      time[key].startTime = time.ALL.startTime;
    }

    time[key].endTime = new Date();
    time[key].delTime = time[key].endTime - time[key].startTime;
    console.log('==> Timer start: key = ' + key + ', time = ' + time[key].endTime);
    console.log('==> Timer del : key = ' + key + ', time = ' + time[key].delTime);
  };

  time.startTime('ALL');

  window.time = time;
})();
