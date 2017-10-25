import CMD from '../config/CMD';

// 服务端返回后所有的数据读取均在此处进行
const protobufErr = {};


protobufErr[CMD.RST_CODE] = buffer => buffer.readByte();


export default protobufErr;
