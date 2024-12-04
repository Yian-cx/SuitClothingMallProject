<template>
  <view class="outfit-card" @click="$emit('click')">
    <image :src="outfit.image" mode="aspectFill" />
    <view class="outfit-info">
      <text class="outfit-title">{{ outfit.title }}</text>
      <view class="outfit-stats">
        <text>{{ outfit.likes }} 赞</text>
        <text>{{ outfit.comments }} 评论</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  outfit: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.outfit-card {
  margin-bottom: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
}
.outfit-card image {
  width: 100%;
  height: 400rpx;
}
.outfit-info {
  padding: 20rpx;
}
.outfit-title {
  font-size: 28rpx;
  font-weight: bold;
}
.outfit-stats {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}
</style>

