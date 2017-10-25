import CMD from '../config/CMD';

// 服务端返回后所有的数据读取均在此处进行
const protobuf = {};


protobuf[CMD.HEART] = buffer => buffer.readByte();


export default protobuf;
