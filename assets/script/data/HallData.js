import { observable } from 'mobx';

class HallData {
  @observable broadCast = ''; // 跑马灯数据
  @observable noticeMsg = ''; // 公告消息
  @observable curRoomInfo = null; // 当前房间信息
}

export default HallData;
