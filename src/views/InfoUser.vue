<template>
  <div class="infoUserTop">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <img :src="infoUserData.profile.avatarUrl" alt="" class="profileimg">
    <div>{{ infoUserData.profile.nickname }}</div>
    <div>测试</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  mounted() {
    if (this.infoUserData.profile.avatarUrl == undefined) {
      this.$router.push('/');
    }
    // console.log('sessionStorage.getItem:', result);
    // console.log('this.userData:', this.userData);
  },
  computed: {
    infoUserData() {
      // 只有经过JSON.parse()转成对象，得到的null值才不会当成字符串
      let result = JSON.parse(sessionStorage.getItem('userData'));
      if (result == null || result == undefined || result == '') {
        result = this.userData;
      ``}
      return result;
    },
    ...mapState(['userData']),
  },
};
</script>

<style lang="less" scoped>
.infoUserTop {
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .icon {
    width: .6rem;
    height: .6rem;
  }
  .profileimg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .name {
    font-weight: 700;
    font-size: .4rem;
  }
}
</style>