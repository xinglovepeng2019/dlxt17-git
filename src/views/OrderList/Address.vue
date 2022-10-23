<template>
  <div class="address-wrapper">
    <nav-bar
      title="新增地址"
      @click-left="$router.push('/myaddress')"
    ></nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        name="linkMan"
        label="联系人"
        placeholder="联系人"
        v-model="addressData.linkMan"
        :rules="addFormRules.linkMan"
      />
      <van-field
        name="mobile"
        label="手机号码"
        placeholder="11位手机号码"
        v-model="addressData.mobile"
        :rules="addFormRules.mobile"
      />
      <city-choose
        :columnsNum="3"
        label="选择地区"
        @conEvent="confirm"
      ></city-choose>
      <van-field
        name="address"
        label="详细地址"
        placeholder="街道门牌信息"
        v-model="addressData.address"
        :rules="addFormRules.address"
      />
      <van-field
        name="code"
        label="邮政编码"
        placeholder="邮政编码"
        v-model="addressData.code"
        :rules="addFormRules.code"
      />
      <div class="btn-wrapper">
        <van-button class="save-btn" type="primary" native-type="submit"
          >保存</van-button
        >
        <van-button class="cancel-btn" @click="$router.push('/myaddress')"
          >取消</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import cityChoose from '@/components/library/cityChoose.vue'
import { addAddress } from '@/api/order'
import { useRouter } from 'vue-router'
export default {
  components: { cityChoose },
  setup() {
    const router = useRouter()
    const addressData = reactive({
      linkMan: '', //联系人
      mobile: '', //手机号码
      cityId: '',
      provinceId: '',
      address: '',
      code: '',
      token: sessionStorage.getItem('token'),
    })

    // 验证
    const addFormRules = reactive({
      linkMan: [{ required: true, message: '联系人不能为空' }],
      mobile: [
        { required: true, message: '手机号码不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' },
      ],
      address: [{ required: true, message: '请填写详细信息' }],
      code: [
        { required: true, message: '邮编不能为空' },
        { pattern: /^\d{6}$/, message: '邮编格式不正确' },
      ],
    })

    const confirm = (values) => {
      // console.log(values, 'values')
      addressData.cityId = values[0].code
      addressData.provinceId = values[1].code
    }

    // 新增收货地址
    const onSubmit = async () => {
      await addAddress(addressData)
      // 跳转到我的地址页面
      router.push('/myaddress')
    }

    return { addressData, addFormRules, confirm, onSubmit }
  },
}
</script>

<style lang="less" scoped>
.btn-wrapper {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .save-btn {
    width: 80%;
    margin-bottom: 10px;
  }
  .cancel-btn {
    width: 80%;
  }
}
</style>
