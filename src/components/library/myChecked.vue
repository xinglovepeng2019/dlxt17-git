<template>
  <div class="my-checkbox" @click="changeChecked">
    <i class="checked" v-if="checked"></i>
    <i class="unchecked" v-else></i>
    <span><slot /></span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
// v-model =====> :modelValue   +  @update:modelValue
export default {
  name: 'myChecked',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /* 
     @vueuse/core 是一个基于 Composition API 的实用函数集合
     实现双向数据绑定 v-model指令
     1：使用props接收modelValue
     2：使用useVModel 来包装props中的modelValue属性数据
     3: 使用checked.value就是使用父组件的数据
     4: 使用checked.value = "数据"赋值，触发emit('update:modelValue','数据')
   
   */

    const checked = useVModel(props, 'modelValue', emit)

    const changeChecked = () => {
      const newVal = checked.value
      // 通知父组件
      checked.value = !newVal
      // 让组件支持change事件
      emit('change', newVal)
    }

    return { checked, changeChecked }
  },
}
</script>

<style lang="less" scoped>
.my-checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 2px;
    &.checked {
      border: 1px solid #ddd;
      border-radius: 50%;
    }
    &.unchecked {
      background: url('@/assets/img/check.png') no-repeat;
      border: 1px solid #fff;
    }
  }
  span {
    font-size: 12px;
  }
}
</style>
