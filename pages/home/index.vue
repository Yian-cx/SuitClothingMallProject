<template>
  <view class="container">
    <view class="nav-bar">
      <view 
        :class="{ active: activeTab === 'recommend' }" 
        @click="setActiveTab('recommend')"
      >
        推荐
      </view>
      <view 
        :class="{ active: activeTab === 'following' }" 
        @click="setActiveTab('following')"
      >
        关注
      </view>
    </view>
    
    <scroll-view scroll-y class="content-area">
      <template v-if="isLoading">
        <view class="loading">
          <text>加载中...</text>
        </view>
      </template>
      <template v-else>
        <view class="grid">
          <view 
            v-for="(outfit, index) in currentOutfits" 
            :key="outfit.id" 
            :class="['grid-item', (index % 4 === 0 || index % 4 === 3) ? 'low' : 'high']" 
            @click="navigateToOutfitDetail(outfit.id)"
          >
            <image :src="outfit.image" mode="aspectFill" class="outfit-image" />
            <view class="outfit-info">
              <text class="outfit-title">{{ outfit.title }}</text>
              <view class="outfit-stats">
                <text>{{ outfit.likes }} 赞</text>
                <text>{{ outfit.comments }} 评论</text>
              </view>
            </view>
          </view>
        </view>
      </template>
    </scroll-view>
  </view>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const activeTab = ref('recommend')
    const isLoading = ref(true)
    const recommendedOutfits = ref([])
    const followingOutfits = ref([])

    const currentOutfits = computed(() => {
      return activeTab.value === 'recommend' ? recommendedOutfits.value : followingOutfits.value
    })

    const setActiveTab = (tab) => {
      activeTab.value = tab
      fetchOutfits()
    }

    const fetchOutfits = () => {
      isLoading.value = true
      setTimeout(() => {
        const randomImages = [
          'https://picsum.photos/400/500?random=1',
          'https://picsum.photos/400/600?random=2',
          'https://picsum.photos/400/500?random=3',
          'https://picsum.photos/400/600?random=4',
          'https://picsum.photos/400/500?random=5',
          'https://picsum.photos/400/600?random=6'
        ]
        if (activeTab.value === 'recommend') {
          recommendedOutfits.value = randomImages.map((img, index) => ({
            id: index + 1,
            title: `商品卡 ${index + 1}`,
            image: img,
            likes: Math.floor(Math.random() * 200),
            comments: Math.floor(Math.random() * 50)
          }))
        }
        isLoading.value = false
      }, 1000)
    }

    const navigateToOutfitDetail = (outfitId) => {
      uni.navigateTo({
        url: `/pages/home/outfit-detail`
      })
    }

    fetchOutfits()

    return {
      activeTab,
      isLoading,
      currentOutfits,
      setActiveTab,
      navigateToOutfitDetail
    }
  }
}
</script>

<style>
.container {
  padding: 20rpx;
  background: #f5f5f5;
}
.nav-bar {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20rpx;
}
.nav-bar view {
  padding: 10rpx 20rpx;
  font-size: 28rpx;
}
.nav-bar .active {
  border-bottom: 2rpx solid #007AFF;
}
.content-area {
  height: calc(100vh - 150rpx);
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.grid-item {
  width: 48%;
  border-radius: 12rpx;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}
.grid-item.low {
  margin-top: 30rpx;
}
.grid-item.high {
  margin-top: 10rpx;
}
.outfit-image {
  width: 100%;
  height: 300rpx;
  object-fit: cover;
}
.outfit-info {
  padding: 10rpx;
}
.outfit-title {
  font-size: 26rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}
.outfit-stats {
  display: flex;
  justify-content: space-between;
  font-size: 22rpx;
  color: #999;
}
</style>