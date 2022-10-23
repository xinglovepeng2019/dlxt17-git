import { ref } from 'vue'
import { getDefaultAddress } from '@/api/order'
export const userDefAddress = () => {
  const userInfo = ref({})

  const showDefaultAddress = async () => {
    userInfo.value = await getDefaultAddress()
  }

  showDefaultAddress()

  return { userInfo }
}
