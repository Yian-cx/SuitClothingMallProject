<template>
  <view class="container">
    <!-- 功能区 -->
<view class="function-bar">
  <view class="function-item">
    <image class="icon" src="https://img.icons8.com/color/48/heart.png" />
    <text>赞和收藏</text>
  </view>
  <view class="function-item">
    <image class="icon" src="https://img.icons8.com/color/48/add-user-male.png" />
    <text>新增关注</text>
  </view>
  <view class="function-item">
    <image class="icon" src="https://img.icons8.com/color/48/comments.png" />
    <text>评论和@</text>
  </view>
</view>

    <!-- 消息列表 -->
    <view class="message-list">
      <view class="message-item" v-for="(item, index) in messages" :key="index">
        <image class="avatar" :src="item.avatar" />
        <view class="message-info">
          <text class="name">{{ item.name }}</text>
          <text class="message">{{ item.message }}</text>
        </view>
        <text class="time">{{ item.time }}</text>
      </view>
    </view>
  </view>
  
</template>

<script>
export default {
  data() {
    return {
  messages: [
    {
      avatar: 'https://via.placeholder.com/100', // 测试用示例头像链接
      name: '系统消息',
      message: '小红书诚邀您参与问卷小调研',
      time: '11-07',
    },
    {
      avatar: 'https://via.placeholder.com/100',
      name: '活动消息',
      message: '生日专属流量券到账！',
      time: '11-05',
    },
    {
      avatar: 'https://via.placeholder.com/100',
      name: '小河青青',
      message: '今天在线',
      time: '10-26',
    },
  ],
    };
  },
};
</script>

<style scoped>
.container {
  padding: 10rpx;
  background-color: #f8f8f8;
}

/* 功能区 */
.function-bar {
  display: flex;
  justify-content: space-around;
  margin: 20rpx 0;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx 0;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
}

.function-item text {
  font-size: 26rpx;
}

/* 消息列表 */
.message-list {
  margin-top: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.message-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.message-info {
  flex: 1;
}

.name {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.message {
  color: #999999;
  font-size: 26rpx;
}

.time {
  font-size: 24rpx;
  color: #cccccc;
}
</style>