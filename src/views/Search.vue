<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <MusicListContent class="musicListContent" :itemList="searchList" />
</template>

<script>
import { getSearchMusic } from '@/request/api/home.js'
import MusicListContent from '../components/item/MusicListContent';
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      searchList: [],
    };
  },
  mounted() {
    this.keyWordList = JSON.parse(sessionStorage.getItem('keyWordList')) || [];
  },
  methods: {
    async enterKey() {
      this.searchKey = this.searchKey.trim()  // 去掉前后空格
      if (this.searchKey != '') {
        this.keyWordList.unshift(this.searchKey);
        // 数组去重
        this.keyWordList = [...new Set(this.keyWordList)];
        // 限制长度
        if (this.keyWordList.length > 8) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }
        sessionStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        let result = await getSearchMusic(this.searchKey);
        console.log(result);
        this.searchList = result.data.result.songs;
  
        this.searchKey = "";
      } else {
        alert("搜索内容不能为空!");
      }

    },
    delHistory() {
      sessionStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    async searchHistory(value) {
      let result = await getSearchMusic(value);
      // console.log(result);
      this.searchList = result.data.result.songs;
    },
  },
  components: {
    MusicListContent,
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: .1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: .2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: .1rem .2rem;
    background-color: rgb(185, 172, 172);
    border-radius: .4rem;
    margin: .1rem .2rem;
    display: inline-block;
  }
  .icon {
    width: .4rem;
    height: .4rem;
    position: absolute;
    right: .3rem;
    bottom: .36rem;
  }
}
.musicListContent {
  padding: .2rem;
}
</style>