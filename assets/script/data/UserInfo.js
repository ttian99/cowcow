import { observable } from 'mobx';

class UserInfo {
  @observable openid = ''; // 微信openid
  @observable id = ''; // 用户id
  @observable sex = ''; // 用户性别
  @observable nick = '外星人xx'; // 用户昵称
  @observable ip = '0.0.0.0'; // 用户ip
  @observable faceUrl = ''; // 头像地址
  @observable diamond = 0; // 钻石余额
  @observable games = 0; // 参与的局数
  @observable creationDate = ''; // 注册日期
  @observable position = '未知'; // ip显示的地理位置
  @observable inviteCode = ''; // 邀请码
  @observable gameRecord = null; // 个人战绩数组
  @observable roomList = null; // 房间列表数组
}

export default UserInfo;
