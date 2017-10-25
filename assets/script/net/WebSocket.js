import protobuf from './protobuf';
import protobufErr from './protobuf-err';
import CMD from '../config/CMD';
import Buffer from './Buffer';

class NetWork {
  // 常用参数
  isConnected = false; // 是否已连接
  isConnecting = false; // 是否在连接中
  isHeart = false; // 是否活跃

  // 构造函数
  constructor(type) {
    this.type = type; // websocket连接类型: hall, game
    this.ws = null; // websocket对象
    this.cacheBuf = new Buffer();
    this.callBackfun = {};
    this.errBackfun = {};
  }

  // 初始化连接
  connect(url, callBack) {
    // console.log('== netWork start connect ==');
    const netWork = this;
    this.ws = new WebSocket(url, 'default-protocol');
    this.ws.binaryType = 'arraybuffer';

    this.isConnected = false;
    this.isConnecting = true;
    this.isHeart = false;

    netWork.ws.onopen = () => {
      // console.debug('-- netWork onopen ---');
      netWork.isConnecting = false;
      netWork.isConnected = true;
      netWork.isHeart = true;
      netWork.onHeart();
      if (callBack) callBack();

      netWork.intervalID = setInterval(() => {
        netWork.sendHeart();
        netWork.readHeart();
      }, 20000);
    };

    netWork.ws.onerror = () => {
      console.error('-- netWork onerror --> ' + netWork.type);
      netWork.isConnecting = false;
      netWork.isConnected = false;
      netWork.offHeart();
      netWork.ws = null;
    };

    netWork.ws.onclose = () => {
      console.error('-- netWork onclose -->' + netWork.type);
      console.error('== time : ' + new Date());
      netWork.isConnecting = false;
      netWork.isConnected = false;
      netWork.offHeart();
      netWork.ws = null;
    };

    netWork.ws.onmessage = (evt) => {
      // console.debug('-- netWork onmsg ---');
      netWork.cacheBuf.copy(evt.data);
      const netPkg = netWork.getFullNetPkg(netWork.cacheBuf);
      netWork.getPro(netWork, netPkg);
    };
  }

  // 关闭websocket
  end() {
    clearInterval(this.intervalID);
    this.offHeart();
    this.isConnecting = false;
    this.isConnected = false;
    if (this.ws) {
      this.ws.close();
    }
    this.ws = null;
  }

  // 发送消息
  sendPro(protocol, buffer) {
    if (protocol !== 999) console.debug('send: ' + protocol);
    const len = buffer.c_len + 10;
    buffer.addShort(protocol);
    buffer.addInt(len);
    buffer.addShort(1000);
    buffer.writeShort(2000);

    this.isConnected && this.ws.send(buffer.arrayBuffer());
  }

  // 收到消息
  getPro(netWork, netPkg) {
    if (!netPkg) return;
    const protocol = netPkg.readShort();
    if (protocol !== 999) console.debug('get: ' + protocol);
    const rstCode = protobuf[CMD.RST_CODE](netPkg);
    console.log('rstCode = ' + rstCode);
    if (rstCode === 0) {
      console.error('==success==');
      const data = protobuf[protocol](netPkg);
      netWork.callBackfun[protocol] && netWork.callBackfun[protocol](data);
    } else {
      console.error('==error==');
      const errData = protobufErr[protocol](netPkg);
      netWork.errBackfun[protocol] && netWork.errBackfun[protocol](errData);
    }
  }

  // 监听心跳
  onHeart = () => {
    this.registerCallfun(CMD.HEART, () => {
      // console.log('==> heart ==');
      this.isHeart = true;
    });
  }

  // 销毁监听心跳
  offHeart = () => {
    this.deleteCallfun(CMD.HEART);
  }

  // 发送心跳
  sendHeart() {
    const buffer = new Buffer();
    this.sendPro(CMD.HEART, buffer);
  }

  // 读取心跳
  readHeart = () => {
    if (!this.isHeart) {
      this.end();
    }
  }

  // 注册监听
  registerCallfun(cmd, cbfun, errfun) {
    this.callBackfun[cmd] = cbfun;
    if (errfun != null) this.errBackfun[cmd] = errfun;
  }

  // 删除监听
  deleteCallfun(cmd) {
    delete this.errBackfun[cmd];
    delete this.callBackfun[cmd];
  }

  // 获取完整包体
  getFullNetPkg(cacheBuf) {
    if (cacheBuf.c_len < 10) return null;
    if (cacheBuf.readShort() !== 1000) {
      cacheBuf.reset();
      return null;
    }
    const len = cacheBuf.readInt();
    if (len > cacheBuf.c_len) {
      cacheBuf.clear();
      return null;
    }
    if (cacheBuf.getShort(len) !== 2000) {
      cacheBuf.reset();
      return null;
    }
    return cacheBuf.getSub(len);
  }
}

export default NetWork;
