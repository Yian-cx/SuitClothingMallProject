<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索商品..." 
          @confirm="searchProducts"
        />
        <text class="more-icon">...</text>
      </view>
    </view>

    <!-- 主导航栏 -->
    <scroll-view 
      scroll-x 
      class="main-nav"
      :scroll-into-view="'tab-' + activeMainTab"
    >
      <view 
        v-for="tab in mainTabs" 
        :key="tab.id"
        :id="'tab-' + tab.id"
        :class="['main-tab', { active: activeMainTab === tab.id }]"
        @click="selectMainTab(tab.id)"
      >
        {{ tab.name }}
      </view>
    </scroll-view>

    <!-- 二级导航栏 -->
    <scroll-view 
      v-if="subTabs.length > 0"
      scroll-x 
      class="sub-nav"
      :scroll-into-view="'subtab-' + activeSubTab"
    >
      <view 
        v-for="tab in subTabs" 
        :key="tab.id"
        :id="'subtab-' + tab.id"
        :class="['sub-tab', { active: activeSubTab === tab.id }]"
        @click="selectSubTab(tab.id)"
      >
        {{ tab.name }}
      </view>
    </scroll-view>

    <!-- 商品列表 -->
    <scroll-view 
      scroll-y 
      class="product-grid"
      @scrolltolower="loadMoreProducts"
    >
      <view class="grid-container">
        <view 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          @click="navigateToProduct(product.id)"
        >
          <image :src="product.image" mode="aspectFill" />
          <view class="product-info">
            <text class="product-title">{{ product.title }}</text>
            <view class="price-section">
              <text class="current-price">¥{{ product.price.toFixed(2) }}</text>
              <text class="original-price">¥{{ product.originalPrice.toFixed(2) }}</text>
            </view>
            <view class="sales-section">
              <view class="tags">
                <text v-if="product.freeShipping" class="tag shipping">退货包运费</text>
                <text v-if="product.discount" class="tag discount">{{ product.discount }}</text>
              </view>
              <text class="sales-count">{{ product.sales }}人已买</text>
            </view>
          </view>
        </view>
      </view>
      <view v-if="isLoading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const searchQuery = ref('')
    const activeMainTab = ref('recommend')
    const activeSubTab = ref('')
    const isLoading = ref(false)
    const page = ref(1)

    const mainTabs = [
      { id: 'recommend', name: '推荐' },
      { id: 'women', name: '时尚女装' },
      { id: 'men', name: '潮流男装' },
      { id: 'other', name: '其他装饰' }
    ]

    const subTabsMap = {
      women: [
        { id: 'shoes', name: '潮鞋' },
        { id: 'necklace', name: '项链' },
        { id: 'hat', name: '帽子' },
        { id: 'bag', name: '潮流包' }
      ],
      men: [
        { id: 'shoes', name: '潮鞋' },
        { id: 'necklace', name: '项链' },
        { id: 'hat', name: '帽子' },
        { id: 'bag', name: '潮流包' }
      ]
    }

    const subTabs = computed(() => {
      return subTabsMap[activeMainTab.value] || []
    })

    const products = ref([
      {
        id: 1,
        title: 'APPLE·iPhone13 粉色 国行 256g 98新',
        price: 868,
        originalPrice: 888,
        image: 'https://picsum.photos/400/400?random=1',
        sales: '18',
        freeShipping: true
      },
      {
        id: 2,
        title: '高达特价清仓34.8买一送一他来了',
        price: 28.8,
        originalPrice: 34.8,
        image: 'https://picsum.photos/400/400?random=2',
        sales: '400+',
        discount: '满69减15'
      },
      {
        id: 3,
        title: '适用911兰博基尼保时捷法拉利赛车积木收纳亚克力透',
        price: 145,
        originalPrice: 165,
        image: 'https://picsum.photos/400/400?random=3',
        sales: '100+',
      },
      {
        id: 4,
        title: '乌木金丝楠·《幽童里》纯银配老琥珀男女款手串',
        price: 52,
        originalPrice: 58,
        image: 'https://picsum.photos/400/400?random=4',
        sales: '2000+',
        discount: '满69减15'
      }
    ])

    const selectMainTab = (tabId) => {
      activeMainTab.value = tabId
      activeSubTab.value = subTabs.value[0]?.id || ''
      loadProducts()
    }

    const selectSubTab = (tabId) => {
      activeSubTab.value = tabId
      loadProducts()
    }

    const loadProducts = () => {
      isLoading.value = true
      // 模拟API调用
      setTimeout(() => {
        // 这里应该根据activeMainTab和activeSubTab加载相应的商品
        isLoading.value = false
      }, 1000)
    }

    const loadMoreProducts = () => {
      if (!isLoading.value) {
        page.value++
        loadProducts()
      }
    }

    const searchProducts = () => {
      if (searchQuery.value.trim()) {
        loadProducts()
      }
    }

    const navigateToProduct = (productId) => {
      uni.navigateTo({
        url: `/pages/shop/detail?id=${productId}`
      })
    }

    return {
      searchQuery,
      activeMainTab,
      activeSubTab,
      mainTabs,
      subTabs,
      products,
      isLoading,
      selectMainTab,
      selectSubTab,
      loadMoreProducts,
      searchProducts,
      navigateToProduct
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f0f5ff);
}

.search-bar {
  padding: 20rpx;
  background: #fff;
}

.search-input {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
}

.search-icon, .more-icon {
  padding: 0 10rpx;
  color: #999;
}

.search-input input {
  flex: 1;
  height: 60rpx;
  font-size: 28rpx;
}

.main-nav {
  white-space: nowrap;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.main-tab {
  display: inline-block;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #333;
  position: relative;
}

.main-tab.active {
  color: #007AFF;
  font-weight: bold;
}

.main-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: #007AFF;
  border-radius: 2rpx;
}

.sub-nav {
  white-space: nowrap;
  background: #fff;
  padding: 10rpx 0;
  border-bottom: 1rpx solid #eee;
}

.sub-tab {
  display: inline-block;
  padding: 10rpx 20rpx;
  margin: 0 10rpx;
  font-size: 24rpx;
  color: #666;
  background: #f5f5f5;
  border-radius: 20rpx;
}

.sub-tab.active {
  color: #fff;
  background: #007AFF;
}

.product-grid {
  height: calc(100vh - 220rpx);
}

.grid-container {
  padding: 20rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.product-card {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.product-card image {
  width: 100%;
  height: 345rpx;
  background: #f5f5f5;
}

.product-info {
  padding: 16rpx;
}

.product-title {
  font-size: 26rpx;
  color: #333;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-section {
  margin-top: 10rpx;
  display: flex;
  align-items: baseline;
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
  margin-left: 10rpx;
}

.sales-section {
  margin-top: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 10rpx;
}

.tag {
  font-size: 20rpx;
  padding: 2rpx 8rpx;
  border-radius: 4rpx;
}

.tag.shipping {
  color: #ff9500;
  background: #fff5e5;
}

.tag.discount {
  color: #ff2d55;
  background: #ffe5e9;
}

.sales-count {
  font-size: 22rpx;
  color: #999;
}

.loading {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}
</style>