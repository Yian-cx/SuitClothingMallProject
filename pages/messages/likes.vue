<template>
  <view class="container">
    <view class="nav-header">
      <button class="back-btn" @click="goBack">
        <text class="icon">←</text>
      </button>
      <text class="title">收到的赞和收藏</text>
    </view>

    <scroll-view scroll-y class="likes-list">
      <view v-for="item in likesList" :key="item.id" class="like-item" @click="navigateToProfile(item)">
        <image :src="item.avatar" class="avatar" mode="aspectFill" @click="navigateToProfile(item)" />
        <view class="content">
          <view class="user-info">
            <text class="username" @click="navigateToProfile(item)">{{ item.username }}</text>
            <text class="action">{{ item.action }}</text>
          </view>
          <text class="date">{{ item.date }}</text>
          <text v-if="item.comment" class="comment">{{ item.comment }}</text>
          <view v-if="item.response" class="response">
            <text class="response-text">{{ item.response }}</text>
          </view>
        </view>
        <image v-if="item.contentImage" :src="item.contentImage" class="content-image" mode="aspectFill" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const likesList = ref([
      {
        id: 1,
        username: '回馆可带',
        avatar: 'https://picsum.photos/100/100?random=1',
        action: '赞了你的评论',
        date: '10-28',
        comment: '666',
        contentImage: 'https://picsum.photos/300/300?random=1'
      },
      {
        id: 2,
        username: '花花',
        avatar: 'https://picsum.photos/100/100?random=2',
        action: '赞了你的评论',
        date: '10-24',
        comment: '666',
        response: '私信感谢',
        contentImage: 'https://picsum.photos/300/300?random=2'
      }
    ])

    const goBack = () => {
      uni.navigateBack()
    }

    const navigateToProfile = (user) => {
      uni.navigateTo({
        url: `/pages/user/profile?id=${user.id}`
      })
    }

    return {
      likesList,
      goBack,
      navigateToProfile
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  z-index: 100;
}

.back-btn {
  background: none;
  border: none;
  padding: 20rpx;
  margin: 0;
  line-height: 1;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
}

.likes-list {
  padding: 108rpx 20rpx 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.like-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  cursor: pointer; /* Added cursor style for better UX */
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.content {
  flex: 1;
}

.user-info {
  margin-bottom: 8rpx;
}

.username {
  font-size: 28rpx;
  font-weight: 500;
  margin-right: 10rpx;
  cursor: pointer; /* Added cursor style for better UX */
}

.action {
  font-size: 26rpx;
  color: #666;
}

.date {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.comment {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.response {
  display: inline-block;
  background: #f5f5f5;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.response-text {
  font-size: 24rpx;
  color: #666;
}

.content-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-left: 20rpx;
}
</style>

