<template>
  <div class="register-wrapper">
    <div class="register-content">
      <div class="register-content-box">
        <h3>新用户注册</h3>
        <p>很高兴您将成为我们的会员(注册只需一步)</p>
        <!-- 表单内容 -->
        <van-form @submit="onSubmit">
          <van-field
            v-model="regForm.mobile"
            name="mobile"
            placeholder="手机号码"
            :rules="regFormRules.mobile"
          />
          <van-field
            v-model="regForm.pwd"
            type="password"
            name="pwd"
            placeholder="密码"
            :rules="regFormRules.pwd"
            right-icon="closed-eye"
          />

          <van-field
            v-model="surePwd"
            type="password"
            name="surePwd"
            placeholder="确认密码"
            :rules="regFormRules.surePwd"
            right-icon="closed-eye"
          />
          <van-field v-model="regForm.nick" name="nick" placeholder="用户名" />
          <!-- 图形验证码 -->
          <pic-code @changeEvent="changePicCode"></pic-code>
          <!-- 地区选择 -->
          <city-choose></city-choose>
          <!-- 短信验证码 -->
          <verifity-code
            ref="vcode"
            :data="{ ...regForm }"
            @changeCode="changeCodeFn"
          ></verifity-code>
          <!-- 立即注册按钮 -->
          <div class="reg-btn-wrapper">
            <!-- native-type	原生 button 标签的 type 属性 -->
            <van-button native-type="submit">立即注册</van-button>
          </div>
          <p class="login" @click="$router.push('/login')">已有账号?立即登录</p>
        </van-form>
        <!-- 表单内容 -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'

import { registerApi } from '@/api/register'
import { objToStr } from '@/utils/auth'
import { Notify } from 'vant'
import router from '@/router'
export default {
  setup(props, context) {
    // 定义表单绑定的数据
    const regForm = reactive({
      mobile: '', //手机号
      pwd: '', //密码
      nick: '', //昵称
      code: '', //短信验证码
      province: '',
      city: '',
      key: Date.now(),
      picCode: '',
    })
    // 确认密码
    const surePwd = ref('')

    // 表单校验的数据
    const regFormRules = reactive({
      mobile: [
        { required: true, message: '手机号码不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' },
      ],
      pwd: [
        { required: true, message: '密码不能为空' },
        { pattern: /^\w{6,16}$/, message: '密码必须在6~16位之间' },
      ],
      surePwd: [
        {
          validator: (val) => val === regForm.pwd,
          message: '两次密码不一致，请确认后重新输入',
        },
      ],
    })

    // 接收短信验证码
    const changeCodeFn = (code) => {
      // console.log(code, 'code')
      regForm.code = code
    }

    // 图形验证码的change事件
    const changePicCode = (v) => {
      regForm.key = v.key
      regForm.picCode = v.picCode
    }

    // 给短信验证码组件定义ref属性
    const vcode = ref(null)
    //  用户注册
    const onSubmit = async () => {
      // 调用校验短信验证码的方法
      await vcode.value.validateCode()
      // 调用注册的接口
      // console.log(objToStr(regForm))
      await registerApi(objToStr(regForm))
      Notify({ type: 'success', message: '注册成功' })
      // 跳转到登陆页面
      router.push('/login')
    }

    return {
      regForm,
      regFormRules,
      surePwd,
      changePicCode,
      changeCodeFn,
      onSubmit,
      vcode,
    }
  },
}
</script>

<style lang="less" scoped>
@import url('~@/styles/register.less');
</style>
