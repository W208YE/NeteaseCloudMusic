<template>
  <!-- 路由占位符 -->
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic" />
</template>

<script>
import FooterMusic from "@/components/item/FooterMusic"
export default {
  name: 'App',
  components: {
    FooterMusic,
  }
};
</script>

<style lang="less"> // 没有scoped
* { // 设置通配符
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon { // 设置图标大小
  width: .5rem;
  height: .5rem;
  // width 和 height 属性包括内容，内边距和边框，但不包括外边距, content-box与之相反
  box-sizing: border-box; 
}
a {
  color: black;
}
</style>