<template>
  <div class="pic-code">
    <van-field
      v-model="picCode"
      :rules="picCodeRules"
      placeholder="图形验证码"
      @change="change"
    />
    <img :src="imgUrl" alt="" @click="changeKey" />
  </div>
</template>
<script>
/* 
当前组件要对外提供change事件，在change事件中可以获取到生成图片验证码的key和图片验证码的picCode
*/
import { computed, reactive, ref } from 'vue'
export default {
  setup(props, { emit }) {
    // 定义图形验证码数据
    let picCode = ref('')
    // 校验规则
    const picCodeRules = reactive([
      {
        required: true,
        message: '图形验证码不能为空',
      },
    ])
    // key生成图形验证码的key 值为时间戳
    let keyObj = reactive({
      key: Date.now(),
    })
    // 图片的路径是随着key值的变化而变化
    const imgUrl = computed(() => {
      return `https://api.it120.cc/small4/verification/pic/get?key=${keyObj.key}`
    })
    // 点击图片更改key
    const changeKey = () => {
      keyObj.key = Date.now()
    }

    const change = () => {
      // 将key和picCode传递出去
      emit('changeEvent', { key: keyObj.key, picCode: picCode.value })
    }

    return { picCode, picCodeRules, imgUrl, changeKey, change }
  },
}
</script>
<style scoped lang="less">
.pic-code {
  margin-top: 12px;
  display: flex;
  .van-cell {
    margin-top: 0;
    width: 45%;
    border-radius: 5px 0 0 5px;
    background-color: #f5f5f5;
  }
  img {
    width: 55%;
  }
}
</style>
