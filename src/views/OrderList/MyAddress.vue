<template>
  <div class="my-address">
    <!-- 导航栏部分 -->
    <nav-bar
      title="我的地址"
      right-text="新建地址"
      @click-left="$router.push('/orderlist')"
      @click-right="$router.push('/address')"
    />
    <!-- 地址列表部分 -->
    <div class="address-list-box">
      <ul class="address-list">
        <van-swipe-cell v-for="item in addressList" :key="item.id">
          <li>
            <div class="left-box">
              <van-checkbox
                checked-color="#c00"
                @change="update(item.id)"
                v-model="item.isDefault"
              />
            </div>
            <div class="right-box">
              <div class="address-info">
                <div class="user-info">
                  <span>{{ item.linkMan }}{{ item.mobile }}</span>
                </div>
                <div class="address">
                  {{ item.cityStr }} {{ item.provinceStr }} {{ item.address }}
                </div>
              </div>
              <van-icon name="share" :size="20" />
            </div>
          </li>
          <template #right>
            <van-button
              square
              text="删除"
              @click="del(item.id)"
              type="danger"
              class="del-button"
            />
          </template>
        </van-swipe-cell>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getDefaultAddressList, delOneAddress, putAddress } from '@/api/order'
import { Notify, Dialog } from 'vant'
export default {
  name: 'my-address',
  setup() {
    // 获取我的地址的数据
    const addressList = ref([])
    // 定义方法
    const showAddressList = async () => {
      const res = await getDefaultAddressList()
      // console.log(res)
      addressList.value = res
    }

    showAddressList()

    // 左滑删除
    const del = async (id) => {
      // 询问是否要删除
      const res = await Dialog.confirm({
        title: '提示',
        message: '您确定要删除选中的商品吗？',
      }).catch((err) => err)
      // 点击了确定按钮
      // console.log(res)
      if (res === 'confirm') {
        await delOneAddress(id)
        // 重新渲染页面
        showAddressList()
      } else {
        Notify({ type: 'warning', message: '您取消了删除' })
      }
    }
    // 修改地址
    const update = async (id) => {
      // await putAddress()
    }
    return { addressList, del, update }
  },
}
</script>

<style lang="less" scoped>
.my-address {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.van-nav-bar__text) {
    color: #333;
  }
  .address-list-box {
    flex: 1;
    overflow-y: auto;
    .address-list {
      li {
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #e8e8e8;
        box-sizing: border-box;
        .left-box {
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .right-box {
          margin-left: 10px;
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .user-info {
            font-size: 14px;
            .default-address-text {
              margin-left: 5px;
              padding: 3px 6px;
              background: #fef6ea;
              border-radius: 3px;
              font-size: 12px;
              color: #c9a57c;
            }
          }
          .address {
            margin-top: 20px;
            font-size: 12px;
            color: #b2b2b2;
          }
          .van-icon-share {
            color: rgb(153, 153, 153);
          }
        }
      }
      .del-button {
        height: 100%;
        background: #c00;
      }
    }
  }
}
</style>
