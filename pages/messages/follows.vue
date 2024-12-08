<template>
  <view class="container">
    <view class="nav-header">
      <button class="back-btn" @click="goBack">
        <!-- <text class="icon">←</text> -->
      </button>
      <!-- <text class="title">新增关注</text> -->
    </view>

    <scroll-view scroll-y class="follows-list">
      <view v-for="user in followsList" :key="user.id" class="follow-item" @click="navigateToProfile(user)">
        <image :src="user.avatar" class="avatar" mode="aspectFill" @click="navigateToProfile(user)" />
        <view class="user-info" @click="navigateToProfile(user)">
          <view class="name-row">
            <text class="username">{{ user.username }}</text>
            <text class="emoji" v-if="user.emoji">{{ user.emoji }}</text>
          </view>
          <text class="follow-date">{{ user.followDate }}</text>
        </view>
        <view class="action-btn" :class="user.actionType">
          <button 
            class="btn"
            :class="user.actionType"
            @click="handleAction(user)"
          >
            {{ getActionText(user.actionType) }}
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const followsList = ref([
      {
        id: 1,
        username: '王亚茹',
        avatar: 'https://picsum.photos/100/100?random=1',
        emoji: '💐💄💍👑🥣',
        followDate: '10-29',
        actionType: 'follow-back'
      },
      {
        id: 2,
        username: '回馆可带',
        avatar: 'https://picsum.photos/100/100?random=2',
        followDate: '10-28',
        actionType: 'following'
      },
      {
        id: 3,
        username: '跨境可带（无偿领资料）',
        avatar: 'https://picsum.photos/100/100?random=3',
        followDate: '10-25',
        actionType: 'message'
      }
    ])

    const getActionText = (type) => {
      switch (type) {
        case 'follow-back':
          return '回关'
        case 'following':
          return '关注'
        case 'message':
          return '发私信'
        default:
          return '关注'
      }
    }

    const handleAction = (user) => {
      switch (user.actionType) {
        case 'follow-back':
          // Handle follow back
          uni.showToast({
            title: '已回关',
            icon: 'success'
          })
          break
        case 'following':
          // Handle follow
          uni.showToast({
            title: '已关注',
            icon: 'success'
          })
          break
        case 'message':
          // Navigate to chat
          uni.navigateTo({
            url: `/pages/messages/chat?id=${user.id}`
          })
          break
      }
    }

    const goBack = () => {
      uni.navigateBack()
    }

    const navigateToProfile = (user) => {
      uni.navigateTo({
        url: `/pages/user/profile?id=${user.id}`
      })
    }

    return {
      followsList,
      getActionText,
      handleAction,
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

.follows-list {
  padding: 108rpx 20rpx 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.follow-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
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

.user-info {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.username {
  font-size: 28rpx;
  font-weight: 500;
  margin-right: 10rpx;
}

.emoji {
  font-size: 24rpx;
}

.follow-date {
  font-size: 24rpx;
  color: #999;
}

.action-btn {
  margin-left: 20rpx;
}

.btn {
  min-width: 120rpx;
  height: 56rpx;
  border-radius: 28rpx;
  font-size: 26rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0 20rpx;
}

.btn.follow-back {
  background: #ff2d55;
  color: #fff;
}

.btn.following {
  background: #ff2d55;
  color: #fff;
}

.btn.message {
  background: #fff;
  color: #333;
  border: 1rpx solid #ddd;
}
</style>

