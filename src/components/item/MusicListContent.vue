<template>
  <div class="itemListContent">
    <div class="item" v-for="(item, i) in itemList" :key="i">
      <div class="itemLeft" @click="playMusic(item, i)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in (item.ar || item.artists)" :key="index">
            {{ item1.name }}
          </span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mv || item.mvid">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["itemList"],
  methods: {
    playMusic(item, i) { // ItemMusicList 中更新列表函数
      if (item.al) {
        this.updatePlayList(this.itemList);
        this.updatePlayListIndex(i);
      } else { // Search 中更新下标函数
        item.al = item.album;
        item.al.picUrl = item.album.artist.img1v1Url;
        item.ar = item.artists;
        this.$store.commit("pushPlayList", item);
        this.$store.commit("updatePlayListIndex", this.$store.state.playList.length - 1);
      }
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang="less" scoped>
.itemListContent {
  width: 100%;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
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
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>