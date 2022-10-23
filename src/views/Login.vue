<template>
  <div class="login-wrapper">
    <div class="login-content">
      <p>登录账号</p>
      <p>虾米 - 严选商城欢迎您</p>
      <van-form @submit="login">
        <van-field
          v-model="loginForm.mobile"
          name="mobile"
          placeholder="手机号码"
          :rules="loginFormRules.mobile"
          autocomplete="off"
        >
          <!-- 自定义图标 -->
          <el-icon slot="right-icon" class="el-icon-mobile-phone" />
        </van-field>
        <van-field
          v-model="loginForm.pwd"
          :type="isShowPwd ? 'text' : 'password'"
          name="pwd"
          placeholder="密码"
          :rules="loginFormRules.pwd"
          autocomplete="off"
          :right-icon="isShowPwd ? 'eye-o' : 'closed-eye'"
          @click-right-icon="isShowPwd = !isShowPwd"
        />
        <!-- 登录按钮 -->
        <div class="login-btn-wrapper">
          <van-button native-type="submit">登录</van-button>
        </div>
      </van-form>

      <p @click="$router.push('/register')">还没注册？立即注册</p>
    </div>
  </div>
</template>

<script>
import { objToStr } from '../utils/auth'
import axios from 'axios'
export default {
  name: 'c-login',
  data() {
    return {
      loginForm: {
        mobile: '13500000000', // 登录手机号
        pwd: '123456', // 密码
      },
      // 是否显示密码
      isShowPwd: false,
      // 登录表单的校验规则
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号码不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' },
        ],
        pwd: [
          { required: true, message: '密码不能为空' },
          { pattern: /^\w{6,16}$/, message: '密码必须在6~16位之间' },
        ],
      },
    }
  },
  methods: {
    // 登录
    async login() {
      console.log(123)
      // 1. 调用登录的接口进行登录
      const result = await axios.get(
        'https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey&' +
          objToStr(this.loginForm)
      )
      let { data: res } = result
      console.log(res)
      if (res.code === 0) {
        // 登录成功
        // 1.保存token到本地存储
        sessionStorage.token = res.data.token
        // 2. 判断是否从详情页跳转过来
        if (sessionStorage.goodsId) {
          // 如果从详情页跳转过来则跳转到详情页
          this.$router.push('/goods/' + sessionStorage.goodsId)
          sessionStorage.isBack3 = true
        } else {
          // 否则就跳转到首页面
          this.$router.push('/home')
        }
      } else {
        this.$notify(res.msg)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-wrapper {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  .login-content {
    padding: 22px;
    width: 100%;
    height: 100%;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    box-sizing: border-box;
    p {
      &:first-child {
        margin-bottom: 20px;
        font-size: 20px;
        color: #666;
      }
      &:nth-of-type(2) {
        color: #909090;
      }
      &:nth-of-type(3) {
        margin-top: 15px;
        font-size: 12px;
        color: #989898;
        text-align: center;
      }
      &:nth-of-type(4) {
        margin-top: 15px;
        font-size: 14px;
        color: #549ff9;
        text-align: center;
      }
    }
    .van-form {
      margin-top: 50px;
      .van-cell {
        margin-top: 12px;
        background: #f5f5f5;
        border-radius: 5px;
        &::after {
          border-bottom: 0;
        }
      }
      .login-btn-wrapper {
        margin: 20px auto 0;
        width: 90%;
        .van-button {
          width: 100%;
          border-radius: 5px;
          background: linear-gradient(135deg, #e570e7, #79f1fc);
          font-size: 14px;
          line-height: 44px;
          color: #fff;
        }
      }
    }
  }
}
</style>
