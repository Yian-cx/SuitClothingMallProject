<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="left-actions">
        <button class="icon-btn" @click="goBack">
          <text class="icon">←</text>
        </button>
      </view>
      <view class="title">地址列表</view>
      <view class="right-actions"></view>
    </view>

    <!-- 地址列表 -->
    <scroll-view scroll-y class="address-list">
      <view 
        v-for="address in addresses" 
        :key="address.id" 
        class="address-item"
        @click="selectAddress(address)"
      >
        <view class="check-icon" v-if="address.isDefault">
          <text class="icon">✓</text>
        </view>
        <view class="address-content">
          <view class="user-info">
            <text class="name">{{ address.name }}</text>
            <text class="phone">{{ address.phone }}</text>
          </view>
          <view class="address-text">{{ address.address }}</view>
        </view>
        <view class="edit-icon" @click.stop="editAddress(address)">
          <text class="icon">✎</text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="footer">
      <button class="add-btn" @click="navigateToCreate">添加新地址</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const addresses = ref([
      {
        id: 1,
        name: '郁亦桉',
        phone: '187****0210',
        address: '浙江省 杭州市 上城区 四季青街道 浙江省杭州市上城区景芳地铁站',
        isDefault: true
      }
    ])

    const goBack = () => {
      uni.navigateBack()
    }

    const selectAddress = (address) => {
      // 将选中的地址返回给上一页
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2]
      if (prevPage) {
        prevPage.$vm.updateAddress(address)
      }
      uni.navigateBack()
    }

    const editAddress = (address) => {
      uni.navigateTo({
        url: `/pages/shop/address-edit?id=${address.id}`
      })
    }

    const navigateToCreate = () => {
      uni.navigateTo({
        url: '/pages/shop/address-create'
      })
    }

    return {
      addresses,
      goBack,
      selectAddress,
      editAddress,
      navigateToCreate
    }
  }
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

.address-list {
  padding: 88rpx 20rpx 0;
}

.address-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: flex-start;
}

.check-icon {
  margin-right: 20rpx;
  color: #ff2d55;
}

.address-content {
  flex: 1;
}

.user-info {
  margin-bottom: 10rpx;
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

.address-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.4;
}

.edit-icon {
  padding: 10rpx;
  color: #999;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
}

.add-btn {
  width: 100%;
  height: 80rpx;
  border: none;
  border-radius: 40rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
