<template>
  <my-checked v-model="checkOne">全选</my-checked>
  <router-view />
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const checkOne = ref(false)
    return { checkOne }
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
