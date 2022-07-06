import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js';
import { getPhoneLogin } from '@/request/api/home.js';
import { getLoginUser } from '@/request/api/home';
export default createStore({
  state: { // 存放状态
    playList: [{ // 播放列表的默认值
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      name: "雨爱（抖音版）",
      ar: [{ name: "灏灏灏仔" }]
    }],
    playListIndex: 0, // 默认下标
    isbtnShow: true, // 暂停按钮显示
    detailShow: false, // 歌曲详情页显示
    lyricList: {}, // 保存歌词(对象)
    currentTime: 0, // 当前歌曲播放时间
    duration: 0, // 歌曲总时长
    isLogin: false, // 判断是否登录
    isFooterMusic: true, // 判断底部组件是否需要显示
    token: '', // 登录令牌
    userData: {}, // 用户信息
  },
  getters: { // state的计算属性
  },
  mutations: { // 更改state中状态的逻辑, 同步操作
    updateIsbtnShow(state, value) {
      state.isbtnShow = value;
    },
    pushPlayList(state, value) {
      state.playList.push(value);
    },
    updatePlayList(state, value) {
      state.playList = value;
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state, value) {
      state.lyricList = value;
    },
    updateCurrentTime(state, value) {
      state.currentTime = value;
    },
    updateDuration(state, value) {
      state.duration = value;
    },
    updateIsLogin(state, value) {
      state.isLogin = true;
    },
    updateToken(state, value) {
      state.token = value;
      sessionStorage.setItem('token', state.token); // 把token数据保存到本地
    },
    updateUserData(state, value) {
      state.userData = value;
      sessionStorage.setItem('userData', JSON.stringify(state.userData)); // 把用户数据保存到本地
    }
  },
  actions: { // 提交mutation, 异步操作
    async getLyric(context, value) {
      let result = await getMusicLyric(value);
      console.log(result);
      context.commit('updateLyricList', result.data.lrc);
    },
    async getLogin(context, value) {
      let result = await getPhoneLogin(value);
      // console.log(result);
      return result;
    },
    async getUserData(context, value) {
      let result = await getLoginUser(value);
      console.log("getUserData", result);
      return result;
    }
  },
  // 如果将store分成一个个的模块的话,则需要用到modules,
  // 然后在每一个module中写state, getters, mutations, actions等
  modules: {
  }
})
