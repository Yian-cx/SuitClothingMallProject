<template>
  <view class="container">
    <view class="image-upload" @click="chooseImage">
      <image v-if="outfitImage" :src="outfitImage" mode="aspectFill" />
      <text v-else>点击上传图片或视频</text>
    </view>
    
    <form @submit="createOutfitCard">
      <input v-model="outfitTitle" type="text" placeholder="输入标题" />
      <textarea v-model="outfitDescription" placeholder="描述你的穿搭..." />
      
      <view v-for="(item, index) in outfitItems" :key="index" class="outfit-item">
        <input v-model="item.name" type="text" placeholder="商品名称" />
        <input v-model="item.price" type="number" placeholder="价格" />
      </view>
      
      <button @click="addOutfitItem">添加商品项</button>
      <button form-type="submit">创建商品卡</button>
    </form>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const outfitImage = ref('')
    const outfitTitle = ref('')
    const outfitDescription = ref('')
    const outfitItems = ref([{ name: '', price: '' }])

    const chooseImage = () => {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          outfitImage.value = res.tempFilePaths[0]
        }
      })
    }

    const addOutfitItem = () => {
      outfitItems.value.push({ name: '', price: '' })
    }

    const createOutfitCard = () => {
      // Implement create outfit card logic
      console.log('Creating outfit card:', {
        image: outfitImage.value,
        title: outfitTitle.value,
        description: outfitDescription.value,
        items: outfitItems.value
      })
      // After successful creation, navigate to home or detail page
      uni.switchTab({ url: '/pages/home/index' })
    }

    return {
      outfitImage,
      outfitTitle,
      outfitDescription,
      outfitItems,
      chooseImage,
      addOutfitItem,
      createOutfitCard
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}
.image-upload {
  width: 100%;
  height: 400rpx;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
}
.image-upload image {
  width: 100%;
  height: 100%;
}
form {
  display: flex;
  flex-direction: column;
}
input, textarea {
  margin-bottom: 20rpx;
  border: 1rpx solid #ccc;
  padding: 10rpx;
}
.outfit-item {
  display: flex;
  margin-bottom: 10rpx;
}
.outfit-item input {
  flex: 1;
  margin-right: 10rpx;
}
button {
  margin-top: 20rpx;
}
</style>

