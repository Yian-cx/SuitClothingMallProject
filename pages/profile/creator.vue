<template>
  <view class="creator-center">
    <!-- 头部区域 -->
    <view class="header">
      <text class="header-title">创作者中心</text>
      <text class="header-subtitle">发掘无限创收可能</text>
    </view>

    <!-- 热门活动 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">热门活动</text>
        <text class="view-all">查看全部</text>
      </view>
      <scroll-view scroll-x class="activities-scroll" show-scrollbar="false">
        <view class="activities-container">
          <view class="activity-card">
            <view class="activity-content">
              <text class="activity-title">直播带货挑战</text>
              <text class="activity-subtitle">新手最高奖励5000元</text>
            </view>
          </view>
          <view class="activity-card">
            <view class="activity-content">
              <text class="activity-title">创意短视频大赛</text>
              <text class="activity-subtitle">登上首页推荐</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 收益概览 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">收益概览</text>
      </view>
      <view class="stats-grid">
        <view class="stat-item">
          <text class="stat-value highlight">¥15,280</text>
          <text class="stat-label">本月预估收入</text>
        </view>
        <view class="stat-item">
          <text class="stat-value highlight">+1,269</text>
          <text class="stat-label">粉丝增长</text>
        </view>
        <view class="stat-item">
          <text class="stat-value highlight">89.5万</text>
          <text class="stat-label">内容曝光</text>
        </view>
        <view class="stat-item">
          <text class="stat-value highlight">2.3万</text>
          <text class="stat-label">互动总数</text>
        </view>
      </view>
    </view>

    <!-- 最新规则 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">最新规则</text>
        <text class="view-all">查看全部</text>
      </view>
      <view class="rules-list">
        <view class="rule-item">
          <text class="rule-title">创作者激励计划2.0</text>
          <text class="rule-date">2023-06-01</text>
        </view>
        <view class="rule-item">
          <text class="rule-title">内容质量评分标准更新</text>
          <text class="rule-date">2023-05-28</text>
        </view>
        <view class="rule-item">
          <text class="rule-title">违规处罚细则修订</text>
          <text class="rule-date">2023-05-20</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
.creator-center {
  min-height: 100vh;
  background: #FFFFFF;
  padding: 32rpx;
}

.header {
  margin-bottom: 40rpx;
}

.header-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #000000;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 28rpx;
  color: #666666;
  margin-top: 8rpx;
}

.section {
  margin-bottom: 32rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #000000;
}

.view-all {
  font-size: 28rpx;
  color: #1664FF;
}

.activities-scroll {
  width: 100%;
}

.activities-container {
  display: flex;
  padding: 8rpx 0;
}

.activity-card {
  width: 320rpx;
  height: 160rpx;
  margin-right: 24rpx;
  background: #F8F9FB;
  border-radius: 16rpx;
  overflow: hidden;
}

.activity-content {
  padding: 24rpx;
}

.activity-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #000000;
  margin-bottom: 8rpx;
}

.activity-subtitle {
  font-size: 24rpx;
  color: #666666;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.stat-item {
  background: #F8F9FB;
  border-radius: 16rpx;
  padding: 24rpx;
}

.stat-value {
  font-size: 36rpx;
  font-weight: 600;
  margin-bottom: 8rpx;
  display: block;
}

.highlight {
  color: #1664FF;
}

.stat-label {
  font-size: 24rpx;
  color: #666666;
}

.rules-list {
  margin-top: 16rpx;
}

.rule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #F5F5F5;
}

.rule-item:last-child {
  border-bottom: none;
}

.rule-title {
  font-size: 28rpx;
  color: #333333;
}

.rule-date {
  font-size: 24rpx;
  color: #999999;
}
</style>