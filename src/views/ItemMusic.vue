<template>
  <ItemMusicTop :playlist="state.playlist"/>
  <!-- 因为"收藏"的数据哎playlist中, 所以要另外进行传参 -->
  <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
// 获取路由数据
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMusicItemList, getItemList } from '@/request/api/item';
import ItemMusicTop from '@/components/item/ItemMusicTop';
import ItemMusicList from '../components/item/ItemMusicList';
export default {
  name: 'ItemMusic',
  setup() {
    const state = reactive({
      playlist:{}, // 歌单详情页数据
      itemList:[], // 歌单的歌曲
    });
    onMounted(async () => {
      // 此处value中的id是作为query的属性, 所以不用.value
      let id = useRoute().query.id; 
      // console.log(id);
      
      // 1.获取歌单详情页
      let result = await getMusicItemList(id);
      // console.log(result);
      state.playlist = result.data.playlist;
      // 2.获取歌单歌曲
      let result2 = await getItemList(id);
      // console.log(result2);
      state.itemList = result2.data.songs;

      // 防止页面刷新, 导致数据丢失, 将数据保存到sessionStorage
      sessionStorage.setItem('itemDetail', JSON.stringify(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop, ItemMusicList
  }
};
</script>