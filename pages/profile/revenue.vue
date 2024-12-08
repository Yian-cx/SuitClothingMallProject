<template>
<view class="container">

  <!-- Income Overview Cards -->
  <view class="income-overview">
    <view class="income-card" v-for="item in incomeData" :key="item.period">
      <text class="income-period">{{ item.period }}</text>
      <text class="income-amount">¥{{ item.amount.toFixed(2) }}</text>
      <text class="income-change" :class="{ 'increase': item.change > 0, 'decrease': item.change < 0 }">
        {{ item.change > 0 ? '+' : '' }}{{ item.change }}%
      </text>
    </view>
  </view>

  <!-- Income Trend Chart -->
  <view class="chart-container">
    <text class="section-title">收入趋势</text>
    <view class="chart">
      <view class="bar-container" v-for="(value, index) in chartData" :key="index">
        <view class="bar" :style="{ height: `${value / maxValue * 100}%` }"></view>
        <text class="bar-label">{{ months[index] }}</text>
      </view>
    </view>
  </view>

  <!-- Top Performing Products -->
  <view class="top-products">
    <text class="section-title">热门商品卡</text>
    <view class="product-list">
      <view class="product-item" v-for="product in topProducts" :key="product.id">
        <image :src="product.image" mode="aspectFill" class="product-image" />
        <view class="product-info">
          <text class="product-title">{{ product.title }}</text>
          <text class="product-revenue">收益: ¥{{ product.revenue.toFixed(2) }}</text>
        </view>
        <text class="product-orders">{{ product.orders }}单</text>
      </view>
    </view>
  </view>

  <!-- Optimization Suggestions -->
  <view class="optimization-suggestions">
    <text class="section-title">优化建议</text>
    <view class="suggestion-list">
      <view class="suggestion-item" v-for="(suggestion, index) in suggestions" :key="index">
        <text class="suggestion-icon">💡</text>
        <text class="suggestion-text">{{ suggestion }}</text>
      </view>
    </view>
  </view>
</view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const incomeData = ref([
      { period: '今日', amount: 256.50, change: 5.2 },
      { period: '本月', amount: 3680.75, change: -2.8 },
      { period: '今年', amount: 28560.30, change: 15.6 }
    ])

    const chartData = ref([500, 800, 1000, 1500, 2000, 2500])
    const months = ['1月', '2月', '3月', '4月', '5月', '6月']
    const maxValue = Math.max(...chartData.value)

    const topProducts = ref([
      { id: 1, title: '夏日清凉套装', image: 'https://picsum.photos/100/100?random=1', revenue: 1280.50, orders: 64 },
      { id: 2, title: '秋季职场穿搭', image: 'https://picsum.photos/100/100?random=2', revenue: 960.25, orders: 48 },
      { id: 3, title: '冬季保暖外套', image: 'https://picsum.photos/100/100?random=3', revenue: 720.80, orders: 36 }
    ])

    const suggestions = ref([
      '增加更多高清图片展示商品细节，可以提高转化率。',
      '尝试在周末期间发布新的商品卡，流量通常较高。',
      '为你的热门商品添加更多尺码和颜色选项，以满足更多客户需求。',
      '考虑为常客提供专属优惠，以提高客户忠诚度。'
    ])

    const goBack = () => {
      uni.navigateBack()
    }

    return {
      incomeData,
      chartData,
      months,
      maxValue,
      topProducts,
      suggestions,
      goBack
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 40rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn, .more-btn {
  background: none;
  border: none;
  font-size: 32rpx;
  padding: 10rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.income-overview {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  background: #fff;
  margin-bottom: 20rpx;
}

.income-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  border-right: 1rpx solid #eee;
}

.income-card:last-child {
  border-right: none;
}

.income-period {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.income-amount {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.income-change {
  font-size: 24rpx;
}

.income-change.increase {
  color: #4caf50;
}

.income-change.decrease {
  color: #f44336;
}

.chart-container {
  background: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 300rpx;
  padding-top: 20rpx;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14%;
}

.bar {
  width: 100%;
  background-color: #4caf50;
  transition: height 0.3s ease;
}

.bar-label {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #666;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.top-products, .optimization-suggestions {
  background: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.product-image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 8rpx;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.product-revenue {
  font-size: 24rpx;
  color: #666;
}

.product-orders {
  font-size: 24rpx;
  color: #999;
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.suggestion-icon {
  font-size: 32rpx;
}

.suggestion-text {
  font-size: 26rpx;
  color: #333;
  flex: 1;
}
</style>

