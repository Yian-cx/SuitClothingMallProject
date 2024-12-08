<template>
  <view class="container">
   <view class="nav-header">
      <button class="back-btn" @click="goBack">
        <!-- <text class="icon">←</text> -->
      </button>
      <!-- <text class="title">收到的评论和@</text> -->
    </view>

    <scroll-view scroll-y class="comments-list">
      <view v-for="comment in commentsList" :key="comment.id" class="comment-item">
        <image :src="comment.avatar" class="avatar" mode="aspectFill" />
        <view class="content">
          <view class="user-info">
            <text class="username">{{ comment.username }}</text>
            <text class="date">{{ comment.date }}</text>
          </view>
          <text class="action">{{ comment.action }}</text>
          <view class="comment-text">{{ comment.text }}</view>
          <view v-if="comment.originalText" class="original-text">
            {{ comment.originalText }}
          </view>
          <view v-if="comment.images" class="comment-images">
            <image 
              v-for="(image, index) in comment.images" 
              :key="index"
              :src="image"
              class="comment-image"
              mode="aspectFill"
              @click="previewImage(comment.images, index)"
            />
          </view>
          <view class="interaction-buttons">
            <button class="interaction-btn" @click="likeComment(comment)">
              <text>赞</text>
            </button>
            <button class="interaction-btn" @click="replyComment(comment)">
              <text>回复</text>
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const commentsList = ref([
      {
        id: 1,
        username: '伊梅卓玛',
        avatar: 'https://picsum.photos/100/100?random=1',
        date: '11-07',
        action: '回复了你的评论',
        text: '真羡慕，我们这是选了点，开车到未科都要半小时，你的10分钟已经让我羡慕的不要不要的🐷',
        originalText: '我老家就是 确实很爽 开车10多分钟',
        images: []
      },
      {
        id: 2,
        username: '小红薯673D6D0C',
        avatar: 'https://picsum.photos/100/100?random=2',
        date: '10-29',
        action: '回复了你的评论',
        text: 'dd',
        originalText: '杭州的有没有O2的朋友',
        images: ['https://picsum.photos/300/300?random=1']
      }
    ])

    const previewImage = (images, current) => {
      uni.previewImage({
        urls: images,
        current: images[current]
      })
    }

    const likeComment = (comment) => {
      uni.showToast({
        title: '已赞',
        icon: 'success'
      })
    }

    const replyComment = (comment) => {
      // Handle reply logic
      console.log('Reply to:', comment)
    }

    const goBack = () => {
      uni.navigateBack()
    }

    return {
      commentsList,
      previewImage,
      likeComment,
      replyComment,
      goBack
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

.comments-list {
  padding: 108rpx 20rpx 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.comment-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.username {
  font-size: 28rpx;
  font-weight: 500;
}

.date {
  font-size: 24rpx;
  color: #999;
}

.action {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.comment-text {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.original-text {
  font-size: 26rpx;
  color: #666;
  background: #f5f5f5;
  padding: 10rpx;
  border-radius: 8rpx;
  margin-bottom: 8rpx;
}

.comment-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 8rpx;
}

.comment-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
}

.interaction-buttons {
  display: flex;
  gap: 20rpx;
}

.interaction-btn {
  background: none;
  border: none;
  font-size: 26rpx;
  color: #666;
  padding: 0;
  margin: 0;
  line-height: 1;
}
</style>

