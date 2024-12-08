<template>
<view class="container">
  <!-- 顶部导航 -->
<!--  <view class="header">
    <button class="back-btn" @click="goBack">
      <text class="icon">←</text>
    </button>
    <view class="search-bar">
      <text class="search-icon">🔍</text>
      <input 
        type="text" 
        placeholder="搜索我的订单" 
        v-model="searchQuery"
        @confirm="searchOrders"
      />
    </view>
    <button class="more-btn">
      <text class="icon">⋯</text>
    </button>
  </view> -->

  <!-- 订单状态标签页 -->
  <scroll-view 
    scroll-x 
    class="status-tabs"
    :scroll-into-view="'tab-' + currentStatus"
  >
    <view 
      v-for="status in orderStatuses" 
      :key="status.id"
      :id="'tab-' + status.id"
      :class="['tab-item', { active: currentStatus === status.id }]"
      @click="switchStatus(status.id)"
    >
      {{ status.name }}
    </view>
  </scroll-view>

  <!-- 促销banner -->
  <view class="promo-banner" @click="navigateToPromo">
    <text class="promo-text">冬日秀场 时髦Look满减叠券更优惠</text>
    <text class="promo-action">去逛逛 ></text>
  </view>

  <!-- 订单列表 -->
  <scroll-view 
    scroll-y 
    class="orders-list"
    @scrolltolower="loadMore"
  >
    <block v-if="orders.length > 0">
      <view 
        v-for="order in orders" 
        :key="order.id" 
        class="order-card"
        @click="navigateToOrderDetail(order.id)"
      >
        <!-- 订单头部 -->
        <view class="order-header">
          <view class="store-info">
            <image :src="order.storeLogo" class="store-logo" mode="aspectFill" />
            <text class="store-name">{{ order.storeName }}</text>
            <text class="store-tag">{{ order.storeTag }}</text>
          </view>
          <text class="order-status">{{ order.statusText }}</text>
        </view>

        <!-- 订单商品 -->
        <view 
          v-for="item in order.items" 
          :key="item.id" 
          class="order-item"
        >
          <image :src="item.image" class="item-image" mode="aspectFill" />
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-spec">{{ item.spec }}</text>
            <view class="price-row">
              <text class="item-price">¥{{ item.price }}</text>
              <text class="item-quantity">x{{ item.quantity }}</text>
            </view>
          </view>
        </view>

        <!-- 订单金额 -->
        <view class="order-total">
          <text>共{{ order.totalItems }}件商品</text>
          <text>实付款 ¥{{ order.totalAmount }}</text>
        </view>

        <!-- 订单操作 -->
        <view class="order-actions">
          <button 
            v-for="action in order.actions"
            :key="action.type"
            :class="['action-btn', { primary: action.primary }]"
            @click.stop="handleOrderAction(order.id, action.type)"
          >
            {{ action.text }}
          </button>
        </view>
      </view>
    </block>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <image src="/static/empty-orders.png" class="empty-icon" />
      <text class="empty-text">没有订单呦，去看看推荐商品</text>
    </view>

    <!-- 加载更多 -->
    <view v-if="isLoading" class="loading">
      加载中...
    </view>
  </scroll-view>

  <!-- 推荐商品 -->
  <view class="recommendations">
    <view class="section-title">推荐商品</view>
    <view class="products-grid">
      <view 
        v-for="product in recommendations" 
        :key="product.id"
        class="product-card"
        @click="navigateToProduct(product.id)"
      >
        <image :src="product.image" mode="aspectFill" class="product-image" />
        <view class="product-info">
          <text class="product-title">{{ product.title }}</text>
          <view class="product-price-row">
            <view class="price-info">
              <text class="current-price">¥{{ product.price }}</text>
              <text v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</text>
            </view>
            <text class="product-sales">{{ product.sales }}+人已买</text>
          </view>
          <view class="product-tags">
            <text v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const searchQuery = ref('')
    const currentStatus = ref('all')
    const isLoading = ref(false)

    const orderStatuses = [
      { id: 'all', name: '全部' },
      { id: 'pending_payment', name: '待付款' },
      { id: 'pending_shipment', name: '待发货' },
      { id: 'pending_receipt', name: '待收货/使用' },
      { id: 'pending_review', name: '评价' },
      { id: 'after_sales', name: '售后' }
    ]

    const orders = ref([])
    const recommendations = ref([
      {
        id: 1,
        title: '骚说客·男生秋冬季',
        image: 'https://picsum.photos/200/200?random=1',
        price: 383,
        originalPrice: 458,
        sales: 100,
        tags: ['满599减40', '退货包运费']
      },
      {
        id: 2,
        title: '骆驼·三合一冲锋衣',
        image: 'https://picsum.photos/200/200?random=2',
        price: 74,
        originalPrice: 89,
        sales: 100,
        tags: ['满99减20', '退货包运费']
      }
    ])

    const searchOrders = () => {
      // 实现搜索订单逻辑
      console.log('Searching orders:', searchQuery.value)
    }

    const switchStatus = (status) => {
      currentStatus.value = status
      // 重新加载对应状态的订单
      loadOrders()
    }

    const loadOrders = () => {
      isLoading.value = true
      // 模拟加载订单数据
      setTimeout(() => {
        orders.value = []
        isLoading.value = false
      }, 1000)
    }

    const loadMore = () => {
      if (!isLoading.value) {
        loadOrders()
      }
    }

    const navigateToOrderDetail = (orderId) => {
      uni.navigateTo({
        url: `/pages/shop/order-detail?id=${orderId}`
      })
    }

    const handleOrderAction = (orderId, actionType) => {
      switch (actionType) {
        case 'pay':
          uni.navigateTo({
            url: `/pages/shop/payment?orderId=${orderId}`
          })
          break
        case 'cancel':
          uni.showModal({
            title: '提示',
            content: '确定要取消订单吗？',
            success: (res) => {
              if (res.confirm) {
                // 实现取消订单逻辑
              }
            }
          })
          break
        // 处理其他操作类型
      }
    }

    const navigateToProduct = (productId) => {
      uni.navigateTo({
        url: `/pages/shop/detail?id=${productId}`
      })
    }

    const navigateToPromo = () => {
      uni.navigateTo({
        url: '/pages/shop/promotion'
      })
    }

    const goBack = () => {
      uni.navigateBack()
    }

    // 初始加载
    loadOrders()

    return {
      searchQuery,
      currentStatus,
      orderStatuses,
      orders,
      recommendations,
      isLoading,
      searchOrders,
      switchStatus,
      loadMore,
      navigateToOrderDetail,
      handleOrderAction,
      navigateToProduct,
      navigateToPromo,
      goBack
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
}

.header {
  display: flex;
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
  padding: 15rpx;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 32rpx;
  padding: 0 20rpx;
  margin: 0 20rpx;
}

.search-icon {
  margin-right: 10rpx;
  color: #999;
}

.search-bar input {
  flex: 1;
  height: 64rpx;
  font-size: 28rpx;
}

.status-tabs {
  white-space: nowrap;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  display: inline-block;
  padding: 20rpx 40rpx;
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
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: #ff2d55;
  border-radius: 2rpx;
}

.promo-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #fff5e6;
}

.promo-text {
  font-size: 26rpx;
  color: #ff6b00;
}

.promo-action {
  font-size: 24rpx;
  color: #999;
}

.orders-list {
  padding: 20rpx;
}

.order-card {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.store-info {
  display: flex;
  align-items: center;
}

.store-logo {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.store-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 10rpx;
}

.store-tag {
  font-size: 24rpx;
  color: #999;
}

.order-status {
  font-size: 28rpx;
  color: #ff2d55;
}

.order-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.item-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.item-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 28rpx;
  color: #333;
}

.item-quantity {
  font-size: 24rpx;
  color: #999;
}

.order-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1rpx solid #f5f5f5;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  padding: 20rpx;
}

.action-btn {
  font-size: 24rpx;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  background: #fff;
  border: 1rpx solid #ddd;
}

.action-btn.primary {
  background: #ff2d55;
  color: #fff;
  border: none;
}

.empty-state {
  padding: 100rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-icon {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 40rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.loading {
  text-align: center;
  padding: 20rpx;
  color: #999;
}

.recommendations {
  padding: 20rpx;
  background: #fff;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.product-card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 300rpx;
}

.product-info {
  padding: 20rpx;
}

.product-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.product-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 10rpx;
}

.current-price {
  font-size: 32rpx;
  color: #ff2d55;
  font-weight: bold;
}

.original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}

.product-sales {
  font-size: 24rpx;
  color: #999;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.tag {
  font-size: 22rpx;
  color: #666;
  background: #f5f5f5;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}
</style>

