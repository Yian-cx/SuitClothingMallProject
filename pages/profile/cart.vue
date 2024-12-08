<template>
<view class="container">
  <!-- 顶部导航 -->
<!--  <view class="header">
    <button class="back-btn" @click="goBack">
      <text class="icon">←</text>
    </button>
    <text class="title">购物车 ({{ totalItems }})</text>
    <button class="manage-btn" @click="toggleManageMode">
      {{ isManageMode ? '完成' : '管理' }}
    </button>
  </view> -->

  <!-- 促销banner -->
  <view class="promo-banner" @click="navigateToPromo">
    <text class="promo-text">冬日秀场 时髦Look满减叠券更优惠</text>
    <text class="promo-action">去逛逛 ></text>
  </view>

  <!-- 购物车列表 -->
  <scroll-view scroll-y class="cart-list">
    <block v-if="cartItems.length > 0">
      <!-- 店铺分组 -->
      <view 
        v-for="store in groupedItems" 
        :key="store.id" 
        class="store-group"
      >
        <!-- 店铺信息 -->
        <view class="store-header">
          <checkbox 
            :checked="isStoreSelected(store.id)"
            @change="toggleStoreSelection(store.id)"
          />
          <view class="store-info">
            <image :src="store.logo" class="store-logo" mode="aspectFill" />
            <text class="store-name">{{ store.name }}</text>
            <text class="store-tag">{{ store.tag }}</text>
          </view>
          <button class="coupon-btn">领券</button>
        </view>

        <!-- 商品列表 -->
        <view 
          v-for="item in store.items" 
          :key="item.id" 
          class="cart-item"
        >
          <checkbox 
            :checked="selectedItems.includes(item.id)"
            @change="toggleItemSelection(item.id)"
          />
          <image :src="item.image" class="item-image" mode="aspectFill" />
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-spec">{{ item.spec }}</text>
            <view class="item-tags">
              <text v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</text>
            </view>
            <view class="price-row">
              <view class="price-info">
                <text class="current-price">¥{{ item.price }}</text>
                <text class="original-price">¥{{ item.originalPrice }}</text>
              </view>
              <view class="quantity-control">
                <button 
                  class="qty-btn" 
                  @click="updateQuantity(item.id, -1)"
                  :disabled="item.quantity <= 1"
                >-</button>
                <text class="quantity">{{ item.quantity }}</text>
                <button 
                  class="qty-btn"
                  @click="updateQuantity(item.id, 1)"
                >+</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>

    <!-- 空购物车状态 -->
    <view v-else class="empty-cart">
      <image src="/static/empty-cart.png" class="empty-icon" />
      <text class="empty-text">购物车还是空的</text>
      <button class="shopping-btn" @click="navigateToShop">去逛逛</button>
    </view>
  </scroll-view>

  <!-- 猜你喜欢 -->
  <view class="recommendations">
    <view class="section-title">猜你喜欢</view>
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
            <text class="product-price">¥{{ product.price }}</text>
            <text class="product-sales">{{ product.sales }}人已买</text>
          </view>
          <view class="product-tags">
            <text v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 底部结算栏 -->
  <view class="checkout-bar">
    <view class="select-all">
      <checkbox 
        :checked="isAllSelected"
        @change="toggleSelectAll"
      />
      <text>全选</text>
    </view>
    <view v-if="!isManageMode" class="total-info">
      <view class="price-info">
        <text>总计</text>
        <text class="total-price">¥{{ totalPrice }}</text>
      </view>
      <button 
        class="checkout-btn" 
        :disabled="selectedItems.length === 0"
        @click="checkout"
      >
        结算
      </button>
    </view>
    <view v-else class="manage-actions">
      <button 
        class="delete-btn"
        :disabled="selectedItems.length === 0"
        @click="deleteSelected"
      >
        删除
      </button>
    </view>
  </view>
</view>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const isManageMode = ref(false)
    const selectedItems = ref([])
    const cartItems = ref([
      {
        id: 1,
        storeId: 1,
        title: 'Brangdy·秋季男生穿搭长袖衬衫',
        spec: '套装1 (外套+内搭+裤子，没有鞋子.配饰等)',
        image: 'https://picsum.photos/200/200?random=1',
        price: 338,
        originalPrice: 368,
        quantity: 1,
        tags: ['新客', '极速退款', '退货包运费', '假一赔四']
      }
    ])

    const recommendations = ref([
      {
        id: 1,
        title: 'OPPO·Reno4 骁龙765 全',
        image: 'https://picsum.photos/200/200?random=2',
        price: 548,
        originalPrice: 568,
        sales: 28,
        tags: ['退货包运费', '新客', '极速退款']
      },
      {
        id: 2,
        title: '浮浮·FZ122男生穿搭',
        image: 'https://picsum.photos/200/200?random=3',
        price: 238,
        sales: 400,
        tags: ['退货包运费', '假一赔四']
      }
    ])

    // 按店铺分组的购物车商品
    const groupedItems = computed(() => {
      const stores = [
        {
          id: 1,
          name: 'Brangdy众律专卖店',
          logo: 'https://picsum.photos/40/40?random=1',
          tag: '专卖店'
        }
      ]

      return stores.map(store => ({
        ...store,
        items: cartItems.value.filter(item => item.storeId === store.id)
      }))
    })

    const totalItems = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
    })

    const totalPrice = computed(() => {
      return selectedItems.value.reduce((sum, itemId) => {
        const item = cartItems.value.find(i => i.id === itemId)
        return sum + (item ? item.price * item.quantity : 0)
      }, 0)
    })

    const isAllSelected = computed(() => {
      return cartItems.value.length > 0 && 
             cartItems.value.every(item => selectedItems.value.includes(item.id))
    })

    const toggleManageMode = () => {
      isManageMode.value = !isManageMode.value
    }

    const isStoreSelected = (storeId) => {
      return cartItems.value
        .filter(item => item.storeId === storeId)
        .every(item => selectedItems.value.includes(item.id))
    }

    const toggleStoreSelection = (storeId) => {
      const storeItems = cartItems.value.filter(item => item.storeId === storeId)
      const allSelected = isStoreSelected(storeId)

      if (allSelected) {
        selectedItems.value = selectedItems.value.filter(id => 
          !storeItems.some(item => item.id === id)
        )
      } else {
        const newSelectedItems = storeItems
          .map(item => item.id)
          .filter(id => !selectedItems.value.includes(id))
        selectedItems.value.push(...newSelectedItems)
      }
    }

    const toggleItemSelection = (itemId) => {
      const index = selectedItems.value.indexOf(itemId)
      if (index === -1) {
        selectedItems.value.push(itemId)
      } else {
        selectedItems.value.splice(index, 1)
      }
    }

    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        selectedItems.value = []
      } else {
        selectedItems.value = cartItems.value.map(item => item.id)
      }
    }

    const updateQuantity = (itemId, delta) => {
      const item = cartItems.value.find(item => item.id === itemId)
      if (item) {
        const newQuantity = item.quantity + delta
        if (newQuantity > 0) {
          item.quantity = newQuantity
        }
      }
    }

    const deleteSelected = () => {
      uni.showModal({
        title: '提示',
        content: '确定要删除选中的商品吗？',
        success: (res) => {
          if (res.confirm) {
            cartItems.value = cartItems.value.filter(
              item => !selectedItems.value.includes(item.id)
            )
            selectedItems.value = []
          }
        }
      })
    }

    const checkout = () => {
      const items = cartItems.value.filter(
        item => selectedItems.value.includes(item.id)
      )
      uni.navigateTo({
        url: `/pages/shop/payment?items=${encodeURIComponent(JSON.stringify(items))}`
      })
    }

    const navigateToProduct = (productId) => {
      uni.navigateTo({
        url: `/pages/shop/detail?id=${productId}`
      })
    }

    const navigateToShop = () => {
      uni.switchTab({
        url: '/pages/shop/shop'
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

    return {
      isManageMode,
      selectedItems,
      cartItems,
      recommendations,
      groupedItems,
      totalItems,
      totalPrice,
      isAllSelected,
      toggleManageMode,
      isStoreSelected,
      toggleStoreSelection,
      toggleItemSelection,
      toggleSelectAll,
      updateQuantity,
      deleteSelected,
      checkout,
      navigateToProduct,
      navigateToShop,
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
  padding-bottom: 120rpx;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn, .manage-btn {
  background: none;
  border: none;
  font-size: 28rpx;
  color: #333;
  padding: 20rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
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

.cart-list {
  padding: 20rpx;
}

.store-group {
  background: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.store-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.store-info {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 20rpx;
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

.coupon-btn {
  font-size: 24rpx;
  color: #ff2d55;
  background: none;
  border: 1rpx solid #ff2d55;
  border-radius: 20rpx;
  padding: 4rpx 16rpx;
}

.cart-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.item-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 8rpx;
  margin: 0 20rpx;
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

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 10rpx;
}

.tag {
  font-size: 22rpx;
  color: #666;
  background: #f5f5f5;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-price {
  font-size: 32rpx;
  color: #ff2d55;
  font-weight: bold;
  margin-right: 10rpx;
}

.original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1rpx solid #eee;
  border-radius: 4rpx;
}

.qty-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
}

.quantity {
  width: 80rpx;
  text-align: center;
  font-size: 28rpx;
}

.empty-cart {
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
  margin-bottom: 40rpx;
}

.shopping-btn {
  background: #ff2d55;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
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

.product-price {
  font-size: 32rpx;
  color: #ff2d55;
  font-weight: bold;
}

.product-sales {
  font-size: 24rpx;
  color: #999;
}

.checkout-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.select-all {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 28rpx;
}

.total-info {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.total-price {
  font-size: 36rpx;
  color: #ff2d55;
  font-weight: bold;
}

.checkout-btn {
  background: #ff2d55;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
}

.checkout-btn[disabled] {
  background: #ccc;
}

.delete-btn {
  background: #ff2d55;
  color: #fff;
  font-size: 28rpx;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
}

.delete-btn[disabled] {
  background: #ccc;
}
</style>
