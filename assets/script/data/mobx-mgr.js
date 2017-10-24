import { autorun } from 'mobx';
import EventEmitter from 'events';

/**
 * 管理类
 */
class Mgr extends EventEmitter {
  autorunList = {}; // autorun列表
  evtList = {}; // evt列表
  onAutorun = (key, func, target) => {
    this.autorunList[key] = autorun(func, target);
  }

  offAutorun = (key) => {
    this.autorunList[key]();
    delete this.autorunList[key];
  }

  onEvt = (evtName, cb, target) => {
    this.evtList[evtName] = cb;
    this.on(evtName, cb.bind(target));
  }

  offEvt = (evtName) => {
    // const cb = this.evtList[evtName];
    this.removeAllListeners(evtName);
    delete this.evtList[evtName];
  }

  emitEvt = (evtName, ...data) => {
    this.emit(evtName, ...data);
  }

  clearEvt = () => {
    this.removeAllListeners();
  }
}

export default Mgr;
