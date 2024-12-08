<template>
  <view class="container">

    <!-- 消息类别 -->
    <view class="message-categories">
      <view class="category-item" @click="navigateToLikes">
        <view class="category-icon likes">
          <text class="icon">❤️</text>
        </view>
        <text class="category-name">赞和收藏</text>
      </view>
      <view class="category-item" @click="navigateToFollows">
        <view class="category-icon follows">
          <text class="icon">👤</text>
        </view>
        <text class="category-name">新增关注</text>
      </view>
      <view class="category-item" @click="navigateToComments">
        <view class="category-icon comments">
          <text class="icon">💬</text>
        </view>
        <text class="category-name">评论和@</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <scroll-view scroll-y class="message-list">
      <!-- 系统消息 -->
      <view class="message-item system" @click="handleSystemMessage">
        <image class="avatar system-icon" src="/static/icons/system.png" mode="aspectFill" />
        <view class="message-content">
          <view class="message-header">
            <text class="name">系统消息</text>
            <text class="time">11-07</text>
          </view>
          <text class="preview">小红书诚邀您参与问卷小调研</text>
        </view>
      </view>

      <!-- 活动消息 -->
      <view class="message-item activity" @click="handleActivityMessage">
        <image class="avatar activity-icon" src="/static/icons/activity.png" mode="aspectFill" />
        <view class="message-content">
          <view class="message-header">
            <text class="name">活动消息</text>
            <text class="time">11-05</text>
          </view>
          <text class="preview">生日专属流量券到！发笔记收获更多祝福</text>
        </view>
      </view>

      <!-- 聊天消息 -->
      <view 
        v-for="chat in chatList" 
        :key="chat.id" 
        class="message-item chat"
        @click="navigateToChat(chat)"
      >
        <image class="avatar" :src="chat.avatar" mode="aspectFill" />
        <view class="message-content">
          <view class="message-header">
            <text class="name">{{ chat.name }}</text>
            <text class="time">{{ chat.time }}</text>
          </view>
          <text class="preview">{{ chat.lastMessage }}</text>
        </view>
        <view v-if="chat.online" class="online-indicator"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const chatList = ref([
      {
        id: 1,
        name: '小河青青',
        avatar: 'https://picsum.photos/100/100?random=1',
        time: '10-26',
        lastMessage: '今天在线',
        online: true
      },
      {
        id: 2,
        name: '跨境可带（无偿领资料）',
        avatar: 'https://picsum.photos/100/100?random=2',
        time: '10-26',
        lastMessage: '我们已相互关注，开始聊天吧🐷',
        online: true
      },
      {
        id: 3,
        name: '薯',
        avatar: 'https://picsum.photos/100/100?random=3',
        time: '10-26',
        lastMessage: '没有',
        online: false
      }
    ])

    const navigateToDiscover = () => {
      uni.navigateTo({
        url: '/pages/messages/discover'
      })
    }

    const navigateToLikes = () => {
      uni.navigateTo({
        url: '/pages/messages/likes'
      })
    }

    const navigateToFollows = () => {
      uni.navigateTo({
        url: '/pages/messages/follows'
      })
    }

    const navigateToComments = () => {
      uni.navigateTo({
        url: '/pages/messages/comments'
      })
    }

    const handleSystemMessage = () => {
      uni.navigateTo({
        url: '/pages/messages/system'
      })
    }

    const handleActivityMessage = () => {
      uni.navigateTo({
        url: '/pages/messages/activity'
      })
    }

    const navigateToChat = (chat) => {
      uni.navigateTo({
        url: `/pages/messages/chat?id=${chat.id}&name=${encodeURIComponent(chat.name)}`
      })
    }

    return {
      chatList,
      navigateToDiscover,
      navigateToLikes,
      navigateToFollows,
      navigateToComments,
      handleSystemMessage,
      handleActivityMessage,
      navigateToChat
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

.header {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.discover-btn {
  font-size: 28rpx;
  color: #333;
}

.message-categories {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 20rpx;
  background: #fff;
  margin-bottom: 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 100rpx;
  height: 100rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.likes {
  background: #ffeaea;
}

.follows {
  background: #e8f0ff;
}

.comments {
  background: #e8fff0;
}

.category-name {
  font-size: 24rpx;
  color: #333;
}

.message-list {
  padding: 0 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.message-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  position: relative;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.name {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.preview {
  font-size: 26rpx;
  color: #666;
}

.online-indicator {
  position: absolute;
  right: 20rpx;
  top: 50%;
  width: 12rpx;
  height: 12rpx;
  background: #4CAF50;
  border-radius: 50%;
}

.system-icon, .activity-icon {
  background: #4080ff;
}
</style>

