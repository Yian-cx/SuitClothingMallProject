<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="left-actions">
        <button class="icon-btn" @click="goBack">
          <text class="icon">←</text>
        </button>
      </view>
      <view class="title">
        商品评价·{{ reviewCount }}
      </view>
      <view class="right-actions">
        <text class="rating">{{ rating }} 超赞</text>
      </view>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-tabs">
      <view 
        v-for="tab in filterTabs" 
        :key="tab.id"
        :class="['tab-item', { active: activeFilter === tab.id }]"
        @click="setFilter(tab.id)"
      >
        {{ tab.name }}
      </view>
      <view class="tab-item" @click="showSpecSelector">
        选商品规格 <text class="arrow">></text>
      </view>
    </view>

    <!-- 评价列表 -->
    <scroll-view 
      scroll-y 
      class="review-list"
      @scrolltolower="loadMoreReviews"
    >
      <view v-for="review in reviews" :key="review.id" class="review-item">
        <view class="reviewer-info">
          <image :src="review.avatar" class="avatar" />
          <view class="user-info">
            <text class="name">{{ review.username }}</text>
            <view class="rating-row">
              <text v-for="n in 5" :key="n" class="star">★</text>
              <text class="spec">{{ review.spec }}</text>
            </view>
          </view>
          <text class="date">{{ review.date }}</text>
        </view>
        <text class="content">{{ review.content }}</text>
        <view class="review-images" v-if="review.images && review.images.length">
          <image 
            v-for="(image, index) in review.images" 
            :key="index"
            :src="image"
            mode="aspectFill"
            @click="previewImage(review.images, index)"
          />
        </view>
        <view class="review-footer">
          <view class="like-btn" @click="toggleLike(review)">
            <text class="icon">{{ review.isLiked ? '❤️' : '🤍' }}</text>
            <text>{{ review.likes }}</text>
          </view>
        </view>
      </view>
      <view v-if="isLoading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const reviewCount = ref(58)
    const rating = ref(5.0)
    const activeFilter = ref('recommended')
    const isLoading = ref(false)
    const page = ref(1)

    const filterTabs = [
      { id: 'recommended', name: '推荐' },
      { id: 'latest', name: '最新' },
      { id: 'withImages', name: '带图' },
    ]

    const reviews = ref([
      {
        id: 1,
        username: '小红薯66E53AAE',
        avatar: 'https://picsum.photos/100/100?random=1',
        rating: 5,
        spec: '套装1 (外套+内搭+裤子，没有鞋子.配饰等)',
        content: '收到了，尺码标准颜色也比较正，穿着也特别的合身',
        date: '1天前',
        location: '福建',
        likes: 0,
        isLiked: false,
      },
      {
        id: 2,
        username: '小红薯66EA60ED',
        avatar: 'https://picsum.photos/100/100?random=2',
        rating: 5,
        spec: '套装2 (外套+内搭+裤子，没有鞋子.配饰等)',
        content: '宝贝质量很好，收到货第一时间打开看了，很不错👍，很满意😃，客服也有问必答，感谢🙏',
        date: '12-01',
        location: '福建',
        likes: 2,
        isLiked: false,
        images: [
          'https://picsum.photos/300/300?random=1',
          'https://picsum.photos/300/300?random=2'
        ]
      }
    ])

    const setFilter = (filterId) => {
      activeFilter.value = filterId
      // 重置列表并重新加载
      page.value = 1
      reviews.value = []
      loadMoreReviews()
    }

    const loadMoreReviews = () => {
      if (isLoading.value) return
      isLoading.value = true
      // 模拟加载更多评论
      setTimeout(() => {
        const newReviews = [
          {
            id: reviews.value.length + 1,
            username: '小红薯' + Math.random().toString(36).substr(2, 8),
            avatar: `https://picsum.photos/100/100?random=${reviews.value.length + 1}`,
            rating: 5,
            spec: '套装1',
            content: '很满意的一次购物',
            date: '12-01',
            location: '福建',
            likes: Math.floor(Math.random() * 10),
            isLiked: false
          }
        ]
        reviews.value.push(...newReviews)
        isLoading.value = false
        page.value++
      }, 1000)
    }

    const toggleLike = (review) => {
      review.isLiked = !review.isLiked
      review.likes += review.isLiked ? 1 : -1
    }

    const previewImage = (images, current) => {
      uni.previewImage({
        urls: images,
        current: images[current]
      })
    }

    const showSpecSelector = () => {
      // 实现规格选择器
      uni.showToast({
        title: '规格选择功能开发中',
        icon: 'none'
      })
    }

    const goBack = () => {
      uni.navigateBack()
    }

    onMounted(() => {
      loadMoreReviews()
    })

    return {
      reviewCount,
      rating,
      filterTabs,
      activeFilter,
      reviews,
      isLoading,
      setFilter,
      loadMoreReviews,
      toggleLike,
      previewImage,
      showSpecSelector,
      goBack
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background: #fff;
}

.icon-btn {
  background: none;
  border: none;
  padding: 0;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn .icon {
  font-size: 40rpx;
  color: #333;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.rating {
  font-size: 28rpx;
  color: #ff2d55;
}

.filter-tabs {
  position: fixed;
  top: 88rpx;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  background: #fff;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #333;
  font-weight: bold;
}

.tab-item .arrow {
  font-size: 24rpx;
  color: #999;
  margin-left: 4rpx;
}

.review-list {
  padding: 176rpx 20rpx 20rpx;
}

.review-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.reviewer-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.user-info {
  flex: 1;
}

.name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
}

.rating-row {
  display: flex;
  align-items: center;
  font-size: 24rpx;
}

.star {
  color: #ff2d55;
  margin-right: 2rpx;
}

.spec {
  color: #999;
  margin-left: 12rpx;
}

.date {
  font-size: 24rpx;
  color: #999;
}

.content {
  font-size: 28rpx;
  line-height: 1.6;
  color: #333;
  margin-bottom: 16rpx;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 16rpx;
}

.review-images image {
  width: 220rpx;
  height: 220rpx;
  border-radius: 8rpx;
}

.review-footer {
  display: flex;
  justify-content: flex-end;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #666;
  padding: 8rpx 16rpx;
}

.loading {
  text-align: center;
  padding: 20rpx;
  color: #999;
}
</style>
