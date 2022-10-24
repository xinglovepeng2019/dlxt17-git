<template>
  <div class="container">
    <h2>子组件{{ modelValue }}</h2>
    <button @click="fn">改变数据</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const fn = () => {
      // 通知父组件改变数据
      emit('update:modelValue', 100)
    }
    return { fn }
  },
}
</script>

<style lang="less" scoped></style>
