<template>
  <div class="login">
    <svg class="icon" aria-hidden="true" @click="$router.push('/')">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
    <div class="deleteButton">
      <button class="btn" @click="delHistory">删除历史记录</button>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from '@/request/api/home';
export default {
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    async Login() {
      let result = await this.$store.dispatch('getLogin', {phone:this.phone, password:this.password});
      console.log('result', result);
      if (result.data.code === 200) { // 如果返回的状态码为200, 则登录成功, 跳转到个人中心页面
        this.$store.commit('updateIsLogin', true);
        this.$store.commit('updateToken', result.data.token); // 保存token到本地存储
        let result2 = await getLoginUser(result.data.account.id); // 传递用户id值
        console.log('result2.data', result2.data);

        this.$store.commit('updateUserData', result2.data); // 保存用户数据到本地存储
        console.log(this.$store.state.userData);
        this.$router.push('/infoUser'); // 跳转页面
      } else {
        alert('手机号码或密码错误!');
        this.password = '';
      }
    },
    delHistory() {
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("token");
      this.password = '';
    },
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn{
      width: 2rem;
      height: .6rem;
    }
  }
  .deleteButton {
    .btn{
      width: 3rem;
      height: 1rem;
      background-color: red;
    }
  }
}
</style>
