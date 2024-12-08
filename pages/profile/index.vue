<template>
<view class="container">
  <!-- 背景图片 -->
  <image class="bg-image" src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" mode="aspectFill" />

  <!-- 用户信息区域 -->
  <view class="profile-info">
    <view class="avatar-container">
      <image class="avatar" src="https://i.pravatar.cc/300" mode="aspectFill" />
      <view class="add-icon">+</view>
    </view>
    
    <view class="user-details">
      <text class="username">亦桉</text>
      <view class="user-id">
        <text>账号：cxYtime 弱</text>
        <text class="location">IP属地：浙江</text>
      </view>
    </view>

    <view class="tags">
      <view class="tag">
        <text class="tag-icon">♂</text>
        <text>22岁</text>
      </view>
      <view class="tag">浙江杭州</view>
    </view>

    <!-- 统计和操作按钮区域 -->
    <view class="stats-and-actions">
      <!-- 统计数据 -->
      <view class="stats">
        <view class="stat-item" @click="navigateToFollows('following')">
          <text class="number">11</text>
          <text class="label">关注</text>
        </view>
        <view class="stat-item" @click="navigateToFollows('followers')">
          <text class="number">11</text>
          <text class="label">粉丝</text>
        </view>
        <view class="stat-item">
          <text class="number">21</text>
          <text class="label">获赞与收藏</text>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-buttons">
        <button class="edit-btn" @click="navigateToEdit">编辑资料</button>
        <button class="settings-btn" @click="navigateToSettings">
          <text class="icon">⚙</text>
        </button>
      </view>
    </view>

    <!-- 功能卡片区域 -->
    <view class="feature-cards">
      <view class="card" @click="navigateToRevenue">
        <text class="card-title">收益</text>
        <text class="card-desc">查看我的收益</text>
      </view>
      <view class="card" @click="navigateToOrders">
        <text class="card-title">订单</text>
        <text class="card-desc">查看我的订单</text>
      </view>
      <view class="card" @click="navigateToCart">
        <text class="card-title">购物车</text>
        <text class="card-desc">{{ cartItemCount }}个商品</text>
      </view>
	  <view class="card" @click="navigateToCreator">
	    <text class="card-title">创作中心</text>
	    <text class="card-desc">创新</text>
	  </view>
    </view>
  </view>

  <!-- 内容标签页 -->
  <view class="content-tabs">
    <view 
      v-for="(tab, index) in tabs" 
      :key="index"
      :class="['tab-item', { active: currentTab === index }]"
      @click="switchTab(index)"
    >
      <text>{{ tab.name }}</text>
    </view>
  </view>

  <!-- 笔记内容 -->
  <view class="content-area">
    <view class="draft-post">
      <view class="post-header">
        <image class="post-avatar" src="https://i.pravatar.cc/100" mode="aspectFill" />
        <view class="post-info">
          <text class="post-title">斯琨标签🏷️ 开心做自己</text>
          <text class="post-subtitle">愿你永远自由如风，永远为自己着迷</text>
        </view>
        <button class="publish-btn">去发布</button>
      </view>
    </view>
  </view>
</view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const cartItemCount = ref(1)

    const tabs = ref([
      { name: '笔记' },
      { name: '收藏' },
      { name: '赞过' }
    ])

    const currentTab = ref(0)

    const switchTab = (index) => {
      currentTab.value = index
    }

    const navigateToEdit = () => {
      uni.navigateTo({
        url: '/pages/profile/edit'
      })
    }

    const navigateToSettings = () => {
      uni.navigateTo({
        url: '/pages/profile/settings'
      })
    }

    const navigateToRevenue = () => {
      uni.navigateTo({
        url: '/pages/profile/revenue'
      })
    }

    const navigateToOrders = () => {
      uni.navigateTo({
        url: '/pages/profile/orders'
      })
    }

    const navigateToCart = () => {
      uni.navigateTo({
        url: '/pages/profile/cart'
      })
    }
    const navigateToCreator = () => {
      uni.navigateTo({
        url: '/pages/profile/creator'
      })
    }
    const navigateToFollows = (tab) => {
      uni.navigateTo({
        url: `/pages/profile/follows?tab=${tab}`
      })
    }

    return {
      cartItemCount,
      tabs,
      currentTab,
      switchTab,
      navigateToEdit,
      navigateToSettings,
      navigateToRevenue,
      navigateToOrders,
      navigateToCart,
      navigateToFollows,
	  navigateToCreator
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #000;
  position: relative;
  color: #fff;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  z-index: 0;
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 40rpx 20rpx;
  z-index: 1;
}

.left-icon, .right-icons {
  display: flex;
  gap: 30rpx;
}

.icon {
  color: #fff;
  font-size: 40rpx;
}

.profile-info {
  position: relative;
  padding: 0 30rpx;
  z-index: 1;
}

.avatar-container {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 20rpx;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.2);
}

.add-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40rpx;
  height: 40rpx;
  background: #FFD700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000;
}

.user-details {
  margin-bottom: 20rpx;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.user-id {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.location {
  margin-left: 20rpx;
}

.bio {
  font-size: 28rpx;
  margin-bottom: 20rpx;
  white-space: pre-line;
}

.tags {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
}

.tag-icon {
  margin-right: 6rpx;
}

.stats-and-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  padding: 20rpx;
}

.stats {
  display: flex;
  gap: 40rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer; /* Added cursor style for better UX */
}

.number {
  font-size: 32rpx;
  font-weight: bold;
}

.label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 24rpx;
  margin-top: 6rpx;
}

.action-buttons {
  display: flex;
  gap: 10rpx;
}

.edit-btn {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #fff;
  font-size: 24rpx;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  height: 50rpx;
  line-height: 30rpx;
}

.settings-btn {
  width: 50rpx;
  height: 50rpx;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 25rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.settings-btn .icon {
  font-size: 24rpx;
}

.feature-cards {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.card {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  padding: 20rpx;
  border-radius: 20rpx;
  position: relative;
  overflow: hidden;
}

.card:nth-child(2)::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120rpx;
  height: 60rpx;
  background-image: url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
  background-size: cover;
  background-position: bottom;
  opacity: 0.2;
}

.card-title {
  font-size: 28rpx;
  margin-bottom: 20rpx;
  color: rgba(255, 255, 255, 0.9);
  display: block;
}

.card-desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  display: block;
}

.content-tabs {
  display: flex;
  background: #fff;
  padding: 20rpx 0;
  border-radius: 30rpx 30rpx 0 0;
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

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: #ff2d55;
  border-radius: 2rpx;
}

.content-area {
  background: #fff;
  min-height: 200rpx;
  padding: 20rpx;
}

.draft-post {
  background: #f8f8f8;
  border-radius: 20rpx;
  padding: 20rpx;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.post-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 10rpx;
}

.post-info {
  flex: 1;
}

.post-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 6rpx;
}

.post-subtitle {
  font-size: 24rpx;
  color: #999;
}

.publish-btn {
  background: #ff2d55;
  color: #fff;
  font-size: 24rpx;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  border: none;
}
</style>

