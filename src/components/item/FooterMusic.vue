<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span v-for="(item, index) in playList[playListIndex].ar" :key="index">
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting5"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <!-- ref传值 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <MusicDetail 
      :musicList="playList[playListIndex]" 
      :play="play" 
      :isbtnShow="isbtnShow" 
      :addDuration="addDuration"  
    />
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getCurrentInstance } from "vue";
import MusicDetail from "./MusicDetail";
export default {
  // setup(props) {
  //   let instance = getCurrentInstance();
  //   function play() {
  //     if (instance.ctx.$refs.audio.paused) {
  //       instance.ctx.$refs.audio.play();
  //       updateIsbtnShow(true);
  //     } else {
  //       instance.ctx.$refs.audio.pause();
  //       updateIsbtnShow(false);
  //     }
  //   }
  //   console.log(props);
  //   return { play };
  // },
  // props: {
  //   ...mapState(['playList', 'playListIndex', 'isbtnShow']),
  //   ...mapMutations(['updateIsbtnShow']),
  // },
  data() {
    return {
      interVal: 0,
    };
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"]),
  },
  mounted() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
    // this.updateTime(); // 从FooterMusic进来时就要展示歌词,所以在mounted中也要调用
  },
  updated() {
    // 渲染歌词
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
    // 在底部组件播放时,歌曲详情页的进度条也要滚动
    this.addDuration();
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        this.updateTime(); // 播放时触发函数
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); // 暂停时清除定时器
      }
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000); // 每隔1s
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    ...mapMutations([
      "updateIsbtnShow", 
      "updateDetailShow", 
      "updateCurrentTime", 
      "updateDuration",
    ]),
  },
  watch: {
    playList() {
      if (this.isbtnShow) {
        // 如果是暂停状态
        this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      }
    },
    playListIndex() {
      // 监听下标, 如果发生改变, 则自动播放
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        // 如果本来是暂停状态,则改变图标
        this.updateIsbtnShow(false);
      }
    },
  },
  components: {
    MusicDetail,
  }
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    div {
      p {
        width: 4.54rem;
        height: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
      }
      span {
        font-weight: 400;
        font-size: 0.24rem;
        color: #999;
      }
      margin-left: 0.3rem;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>