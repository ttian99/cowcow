// import store from '../data/store';
// import CMD from '../config/CMD';
// import Loc from '../utils/Loc';
// import ERR from '../config/ERR';

const resMgr = {};

// 数据的赋值
resMgr.parse = (cmd, data) => {
  if (!resMgr[cmd]) {
    console.error(`resMgr[${cmd}] is undefined!`);
    return;
  }
  resMgr[cmd](data);
};

export default resMgr;
