<template>
  <!-- 获取原生事件对象 -->
  <!-- 如果绑定的是事件函数 fn(e){  //e就是事件对象}  -->
  <!-- 绑定的是js表达式，提供了一个默认的变量$event -->
  <h1 @click="$event.target.style.color = 'red'">父组件{{ count }}</h1>

  <!-- 获取自定义事件 -->
  <!--  如果绑定的是事件函数 fn(data){//触发自定义事件的传参} -->
  <!-- 绑定的是js表达式  $event 代表触发自定义事件的传参 -->
  <Son :modelValue="count" @update:modelValue="upFn"></Son>
  <Son :modelValue="count" @update:modelValue="count = $event"></Son>

  <Son v-model="count" />
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(10)
    const upFn = (data) => {
      count.value = data
    }
    return { count, upFn }
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
ul,
li {
  list-style: none;
}
</style>
