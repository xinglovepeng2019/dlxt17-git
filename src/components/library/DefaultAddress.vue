<template>
  <div>
    <div class="default-address" v-if="userInfo != null">
      <van-icon name="location-o" :size="size" :style="{ color: color }" />
      <div class="contact">
        <div class="contact-tel">
          {{ userInfo.linkMan }}{{ userInfo.mobile }}
        </div>
        <div class="address">
          {{ userInfo.cityStr }}{{ userInfo.provinceStr
          }}{{ userInfo.address }}号
        </div>
      </div>
      <van-icon name="arrow" v-if="isArrow" @click="$emit('click-right')" />
    </div>
    <!-- 添加收货地址 -->
    <van-contact-card v-else type="add" add-text="添加收货地址" />
  </div>
</template>

<script>
export default {
  name: 'default-address',
  props: {
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: '#333',
    },
    // 控制是否有右侧的添加图标
    isArrow: {
      type: Boolean,
      default: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.default-address {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .contact {
    margin-left: 20px;
    flex: 1;
    .contact-tel {
      font-size: 13px;
    }
    .address {
      margin-top: 15px;
      font-size: 12px;
      color: #808080;
    }
  }
}
</style>
