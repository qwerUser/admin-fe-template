<template>
  <div>
    <div class="login-input-container">
      <div
        type="primary"
        style="font-size: 30px;font-weight: bold;text-align: center;margin-bottom: 40px;"
      >管理台</div>
      <div class="login-input">
        <el-input placeholder="请输入用户名" v-model="loginData.name"></el-input>
      </div>
      <div class="login-input">
        <el-input :type="passwordType" placeholder="请输入密码" v-model="loginData.password">
          <i
            @click="showPassword"
            style="font-size:20px;"
            slot="suffix"
            v-bind:class="[passwordType==='text'?'eye-color':'','el-input__icon el-icon-view']"
          ></i>
        </el-input>
      </div>
      <div class="login-error">{{errorText}}</div>
      <div class="login-select">
        <el-checkbox v-model="loginData.checked">7天内免登录</el-checkbox>
      </div>
      <el-button class="login-button" @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        name: "",
        password: "",
        checked: false
      },
      errorText: "",
      passwordType: "password"
    };
  },
  mounted() {
    this.isLoginIn();
  },
  methods: {
    isLoginIn() {},
    login() {},
    showPassword() {
      this.passwordType = this.passwordType === "text" ? "password" : "text";
    }
  }
};
</script>

<style scoped>
.login-input-container {
  text-align: center;
  padding-top: 150px;
}
.login-input {
  text-align: center;
  padding: 10px 0;
  width: 350px;
  margin: 0 auto;
}
.login-button,
.login-error,
.login-select {
  width: 350px;
}
.login-error {
  color: #f56c6c;
  text-align: left;
  margin: 0 auto;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  position: relative;
}
.login-select {
  text-align: right;
  margin: 5px auto;
}
.eye-color {
  color: #409eff;
}
</style>

