<template>
  <div class="verifity-code">
    <van-field
      v-model="code"
      :rules="codeRules"
      name="code"
      @change="change"
      placeholder="短信验证码"
    />
    <div class="send-code" @click="getCode" v-if="time >= 10">获取验证码</div>
    <div class="send-code" v-else>{{ time }}s后在试</div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
/*
接收一个参数 类型是object
该对象必须包含
mobile
key
PicCode
该组件对外提供一个change事件，对外传递短信验证码
该组件提供一个validateCode方法  用来校验短信验证码是否正确，返回值为true 校验成功


*/
import { getVerifityCode, validateSms } from '@/api/register'
import { Notify } from 'vant'
export default {
  name: 'VerifityCode',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    // 1 倒计时的初始值
    let time = ref(10)
    // 定义的倒计时
    const timer = ref(null)
    let code = ref('')
    const codeRules = reactive([
      { required: true, message: '短信验证码不能为空' },
    ])

    // 2 监听time的变化
    watch(time, (newTime) => {
      //  如果time的值小于1
      if (newTime < 1) {
        // 清除倒计时
        clearInterval(timer.value)
        // 将time恢复初始值
        time.value = 10
      }
    })

    // 点击获取验证码按钮
    const getCode = async () => {
      //获取短信验证码
      await getVerifityCode({
        mobile: props.data.mobile,
        key: props.data.key,
        picCode: props.data.picCode,
      })
      // 提示成功
      Notify({ type: 'success', message: '短信验证码发送成功' })
      // 开启倒计时
      timer.value = setInterval(() => {
        time.value--
      }, 1000)
    }

    // change事件对外传递短信验证码
    const change = () => {
      emit('changeCode', code.value)
    }

    // 提供一个方法  校验短信验证码
    const validateCode = async () => {
      // console.log(props.data.mobile, code.value, 0)
      // 1拼接query参数
      const query = `mobile=${props.data.mobile}&code=${code.value}`
      // console.log(query, 9)
      // 2调用校验短信验证码的而接口对短信验证码进行校验
      await validateSms(query)
    }
    return { code, codeRules, time, getCode, change, validateCode }
  },
}
</script>

<style lang="less" scoped>
.verifity-code {
  margin-top: 12px;
  display: flex;
  align-items: center;
  .van-cell {
    margin-top: 0;
    width: 60%;
    border-radius: 5px 0 0 5px;
    background-color: #f5f5f5;
  }
  .send-code {
    width: 40%;
    border-left: 1px solid #ccc;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 44px;
  }
}
</style>
