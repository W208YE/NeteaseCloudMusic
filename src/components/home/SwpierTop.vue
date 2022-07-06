<template>
  <div id="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";
// 引入生命周期钩子
import { onMounted, reactive } from "vue";
// 引入获取轮播图数据的封装的axios函数getBanner()
import { getBanner } from "@/request/api/home";
export default {
  setup() {
    let state = reactive({
      // 响应式
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    onMounted(async () => {
      // axios.get("http://localhost:3000/banner?type=2").then(
      //   (resolve) => {
      //     console.log(resolve);
      //     state.images = resolve.data.banners;
      //   },
      //   (reject) => {
      //     console.log("获取数据出错了！");
      //   }
      // );
      let resolve = await getBanner();
      state.images = resolve.data.banners;      
    });

    return { state };
  },
};
</script>

<style lang="less">
// 没有scoped, 为了将样式作用在button自带的样式身上
#swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>