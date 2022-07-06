<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <vue3-marquee>{{ musicList.al.name }}</vue3-marquee>
        <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
    <img src="@/assets/cd.png" alt="" class="img_cd">
    <img 
      :src="musicList.al.picUrl" 
      alt="" class="img_ar" 
      :class="{img_ar_active:!isbtnShow, img_ar_pauesd:isbtnShow}"
      @click="isLyricShow = true"
    >
  </div>
  <!-- 歌词展示 -->
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
    <p 
      v-for="item in lyric" 
      :key="item" 
      :class="{
          active: currentTime * 1000 >= item.time && currentTime * 1000 < item.next
        }"
      >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-download"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footerBottom">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuanbofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
        <use xlink:href="#icon-bofang5"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting5"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      isLyricShow: false,
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'lyricList', 'currentTime', 'duration']),
    lyric() {
      let arr;
      if (this.lyricList.lyric) { // 在拿到歌词数据之后再操作,防止报错
        // 以换行符进行分割
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map(item => {
          let minute = item.slice(1, 3);
          let second = item.slice(4, 10);
          // let millisecond = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          // 处理当前播放的时间
          let time = parseFloat(minute) * 60 * 1000 + parseFloat(second) * 1000;
          // let second, lrc, time;

          // for (let i in item) {
          //   if (item[i] === ']') {
          //     second = item.slice(4, i);
          //     lrc = item.slice(i + 1, item.length);
          //     time = parseFloat(minute) * 60 * 1000 + parseFloat(second) * 1000;  
          //     break;
          //   }
          // } 
          if (item[9] === ']') { // if (isNaN(Number(millisecond)))
            // millisecond = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time = parseFloat(minute) * 60 * 1000 + parseFloat(second) * 1000;
          }
          // console.log(minute, second, lrc, time);
          // 返回数据到arr中
          return { minute, second, lrc, time };
        }); 
        arr.forEach((item, i) => { // 拿到下一句歌词
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 100000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    },
  },
  mounted() {
    // console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration();
  },
  props:['musicList', 'play', 'isbtnShow', 'addDuration'],
  methods: {
    backHome() {
      this.updateDetailShow();
      this.isLyricShow = false;
    },
    goPlay(value) {
      let index = this.playListIndex + value;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index >= this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
  },
  watch: {
    // 实时监听播放时间, 用来调整 突出显示歌词的位置 居中
    currentTime(newValue) {
      let p = document.querySelector('p.active');
      // console.log([p]); // 可以看到p标签中的引用信息
      if (p) {
        if (p.offsetTop >= 280) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 280;
          // console.log([this.$refs.musicLyric]);
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    }
  },
  components: {
    Vue3Marquee,
  }
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    // 10s/r 匀速 一直旋转
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.4rem;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(190, 181, 181); // 图标颜色和虚化背景颜色会被掩盖
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footerBottom {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(190, 181, 181); // 图标颜色和虚化背景颜色会被掩盖
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>