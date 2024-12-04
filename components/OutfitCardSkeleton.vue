<template>
  <view class="outfit-card-skeleton">
    <view class="image-skeleton"></view>
    <view class="content-skeleton">
      <view class="title-skeleton"></view>
      <view class="stats-skeleton">
        <view class="stat-skeleton"></view>
        <view class="stat-skeleton"></view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.outfit-card-skeleton {
  background-color: #f0f0f0;
  border-radius: 8rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.image-skeleton {
  width: 100%;
  height: 400rpx;
  background-color: #e0e0e0;
  margin-bottom: 10rpx;
}
.title-skeleton {
  width: 70%;
  height: 30rpx;
  background-color: #e0e0e0;
  margin-bottom: 10rpx;
}
.stats-skeleton {
  display: flex;
  justify-content: space-between;
}
.stat-skeleton {
  width: 40%;
  height: 20rpx;
  background-color: #e0e0e0;
}
</style>

