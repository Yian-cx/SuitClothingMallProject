<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="left-actions">
        <button class="icon-btn" @click="goBack">
          <text class="icon">←</text>
        </button>
      </view>
      <view class="title">确认订单</view>
      <view class="right-actions"></view>
    </view>

    <!-- 收货地址 -->
    <view class="address-section" @click="navigateToAddressList">
      <view v-if="selectedAddress" class="address-info">
        <view class="user-info">
          <text class="name">{{ selectedAddress.name }}</text>
          <text class="phone">{{ selectedAddress.phone }}</text>
        </view>
        <view class="address">{{ selectedAddress.address }}</view>
      </view>
      <view v-else class="add-address">
        <text>添加收货地址</text>
      </view>
      <text class="arrow">></text>
    </view>

    <!-- 店铺商品信息 -->
    <view class="store-section">
      <view class="store-header">
        <text class="store-name">{{ store.name }}</text>
        <text class="store-tag">{{ store.tag }}</text>
      </view>
      <view class="product-card">
        <image :src="product.image" mode="aspectFill" class="product-image" />
        <view class="product-info">
          <text class="product-name">{{ product.name }}</text>
          <text class="product-spec">{{ product.spec }}</text>
          <view class="price-row">
            <text class="price">¥{{ product.price }}</text>
            <text class="quantity">x{{ product.quantity }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 优惠信息 -->
    <view class="discount-section">
      <view class="discount-item">
        <text>跨店每满减</text>
        <view class="discount-value">
          <text class="amount">-¥{{ discounts.storeCoupon }}</text>
          <text class="arrow">></text>
        </view>
      </view>
      <view class="discount-item">
        <text>优惠券</text>
        <view class="discount-value">
          <text class="amount">-¥{{ discounts.coupon }}</text>
          <text class="arrow">></text>
        </view>
      </view>
    </view>

    <!-- 配送信息 -->
    <view class="delivery-section">
      <view class="delivery-item">
        <text>运费</text>
        <text class="free">包邮</text>
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view class="footer">
      <view class="price-info">
        <text>总计</text>
        <text class="total-price">¥{{ totalPrice }}</text>
      </view>
      <button class="submit-btn" @click="submitOrder">立即支付</button>
    </view>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import { defineExpose } from 'vue'

export default {
  setup() {
    const selectedAddress = ref({     name: '郁亦桉',
      phone: '187****0210',
      address: '浙江省 杭州市 上城区 四季青街道 浙江省杭州市上城区景芳地铁站'
    })

    const store = ref({
      name: '任水随风旗舰店',
      tag: '旗舰店'
    })

    const product = ref({
      name: '任水随风·冬季男装穿搭棉服外套男生',
      spec: '冬季男装穿搭外套+内搭+男生裤子·XL码/17',
      price: 458,
      quantity: 1,
      image: 'https://picsum.photos/200/200?random=1'
    })

    const discounts = ref({
      storeCoupon: 30,
      coupon: 45
    })

    const totalPrice = computed(() => {
      return product.value.price - discounts.value.storeCoupon - discounts.value.coupon
    })

    const goBack = () => {
      uni.navigateBack()
    }

    const navigateToAddressList = () => {
      uni.navigateTo({
        url: '/pages/shop/address-list'
      })
    }

    const updateAddress = (address) => {
      selectedAddress.value = address
    }

    const submitOrder = () => {
      uni.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index'
            })
          }, 2000)
        }
      })
    }

    return {
      selectedAddress,
      store,
      product,
      discounts,
      totalPrice,
      goBack,
      navigateToAddressList,
      updateAddress,
      submitOrder
    }
  },
  // defineExpose({
  //   updateAddress
  // })
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 120rpx;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background: #fff;
}

.icon-btn {
  background: none;
  border: none;
  padding: 0;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn .icon {
  font-size: 40rpx;
  color: #333;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.address-section {
  margin-top: 88rpx;
  background: #fff;
  padding: 20rpx;
  display: flex;
  align-items: center;
}

.address-info {
  flex: 1;
}

.user-info {
  margin-bottom: 8rpx;
}

.name {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 20rpx;
}

.phone {
  font-size: 28rpx;
  color: #666;
}

.address {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
}

.add-address {
  font-size: 28rpx;
  color: #666;
}

.arrow {
  font-size: 24rpx;
  color: #999;
  margin-left: 8rpx;
}

.store-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 20rpx;
}

.store-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.store-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 12rpx;
}

.store-tag {
  font-size: 24rpx;
  color: #666;
}

.product-card {
  display: flex;
  padding: 20rpx 0;
}

.product-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 8rpx;
}

.product-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 32rpx;
  color: #ff2d55;
  font-weight: bold;
}

.quantity {
  font-size: 24rpx;
  color: #999;
}

.discount-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 0 20rpx;
}

.discount-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.discount-item:last-child {
  border-bottom: none;
}

.discount-value {
  display: flex;
  align-items: center;
}

.amount {
  font-size: 28rpx;
  color: #ff2d55;
  margin-right: 8rpx;
}

.delivery-section {
  margin-top: 20rpx;
  background: #fff;
  padding: 20rpx;
}

.delivery-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.free {
  font-size: 28rpx;
  color: #666;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
}

.price-info {
  font-size: 28rpx;
  color: #666;
}

.total-price {
  font-size: 36rpx;
  color: #ff2d55;
  font-weight: bold;
  margin-left: 12rpx;
}

.submit-btn {
  background: #ff2d55;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  border: none;
}
</style>

