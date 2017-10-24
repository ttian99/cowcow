import UserInfo from './UserInfo';
import HallData from './HallData';
import GameData from './GameData';

const store = {};
store.userInfo = new UserInfo();
store.gameData = new GameData();
store.hallData = new HallData();

// // 添加autorun
// store.onAutorun = (...args) => store.mgr.onAutorun(...args);
// // 移除autorun
// store.offAutorun = key => store.mgr.offAutorun(key);
// // 事件监听
// store.onEvt = (...args) => store.mgr.onEvt(...args);
// // 事件移除
// store.offEvt = evtName => store.mgr.offEvt(evtName);
// // 事件发送
// store.emitEvt = (...args) => store.mgr.emitEvt(...args);

window.store = store;
export default store;
