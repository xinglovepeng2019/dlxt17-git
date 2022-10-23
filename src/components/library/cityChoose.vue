<template>
  <div class="city-choose">
    <!-- 
    value输入框的值
    readonly 只读
     -->
    <van-field
      v-model="selCity"
      readonly
      :label="label"
      @click="handlerShowArea"
      placeholder="点击选择省市区"
    >
    </van-field>
    <van-popup v-model:show="showArea" position="bottom">
      <van-area
        @confirm="confirm"
        @cancel="showArea = false"
        :area-list="areaList"
        :columns-num="columnsNum"
      ></van-area>
    </van-popup>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'cityChoose',
  props: {
    columnsNum: {
      type: Number,
      default: 3,
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    // 选择好的城市
    let selCity = ref('')
    // 控制弹出层的显示隐藏
    let showArea = ref(false)
    // 定义省市区的数据f
    const areaList = reactive({
      province_list: {
        110000: '北京市',
        120000: '天津市',
      },
      city_list: {
        110100: '北京市',
        120100: '天津市',
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
      },
    })

    // 城市弹框显示
    const handlerShowArea = () => {
      console.log(123)
      showArea.value = true
    }

    // confirm事件  点击省市区的的确定按钮
    const confirm = (values) => {
      // console.log(value)
      // 向父组件传递value
      emit('conEvent', values)
      // 给输入框的value赋值
      selCity.value = values.map((item) => item.name).join('/')
      // 隐藏弹出框/
      showArea.value = false
    }

    return { selCity, showArea, areaList, handlerShowArea, confirm }
  },
}
</script>

<style lang="less" scoped>
.city-choose {
  .van-cell {
    margin-top: 12px;
    margin-bottom: 12px;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
}
</style>
