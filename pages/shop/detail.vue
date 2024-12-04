<template>
  <view class="container">
    <!-- 搜索栏 (滚动时显示) -->
    <view class="search-header" :class="{ 'show': showSearchBar }">
      <view class="search-bar">
        <text class="back-icon" @click="goBack">←</text>
        <input 
          type="text" 
          placeholder="搜索更多好物" 
          disabled 
          @click="navigateToSearch"
        />
		
		<view class="right-actions">
		  <button class="icon-btn">
		    <text class="icon">🔍</text>
		  </button>
		  <button class="icon-btn" @click="toggleFavorite">
		    <text class="icon">{{ isFavorite ? '❤️' : '🤍' }}</text>
		  </button>
		  <button class="icon-btn" @click="shareProduct">
		    <text class="icon">↗️</text>
		  </button>
		</view>
		
        <text class="share-icon" @click="shareProduct">↗️</text>
      </view>
      <!-- Tab导航 -->
      <scroll-view 
        scroll-x 
        class="tab-nav"
      >
        <view 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-item', { active: activeTab === tab.id }]"
          @click="switchTab(tab.id)"
        >
          {{ tab.name }}
        </view>
      </scroll-view>
    </view>

    <!-- 内容区域 -->
    <scroll-view 
      scroll-y 
      class="content-scroll"
      @scroll="handleScroll"
      :scroll-into-view="activeTab"
    >
      <!-- 商品部分 -->
      <view id="product" class="section">
        <!-- 商品图片轮播 -->
        <swiper class="product-images" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
          <swiper-item v-for="(image, index) in product.images" :key="index">
            <image :src="image" mode="aspectFill" />
          </swiper-item>
        </swiper>

        <!-- 价格信息 -->
        <view class="price-section">
          <view class="price-row">
            <text class="current-price">¥{{ product.price }}</text>
            <text class="original-price">到手价 ¥{{ product.discountPrice }}</text>
          </view>
          <view class="coupon-row">
            <view class="coupon-tag">平台券</view>
            <text class="coupon-text">满99减20</text>
            <view class="coupon-tag">商家券</view>
            <text class="coupon-text">满199减10</text>
            <text class="more-icon">></text>
          </view>
        </view>

        <!-- 商品标题 -->
        <view class="product-title">
          {{ product.title }}
        </view>

        <!-- 销售信息 -->
        <view class="sales-info">
          <text>已售 {{ product.sales }}</text>
          <text>{{ product.purchases }}+人加购</text>
          <text>{{ product.favorites }}+人收藏</text>
        </view>

        <!-- 保障信息 -->
        <view class="guarantee-section">
          <view class="guarantee-item">
            <text class="icon">✓</text>
            <text>退货包运费</text>
          </view>
          <view class="guarantee-item">
            <text class="icon">✓</text>
            <text>假一赔四</text>
          </view>
          <view class="guarantee-item">
            <text class="icon">✓</text>
            <text>7天无理由</text>
          </view>
        </view>

        <!-- 活动信息 -->
        <view class="activity-section">
          <view class="activity-item">
            <text class="tag">先用后付</text>
            <text>支持0元下单，确认收货后再付款</text>
            <text class="more-icon">></text>
          </view>
        </view>

        <!-- 已选信息 -->
        <view class="selected-section" @click="showSkuSelector">
          <text class="label">已选</text>
          <text class="value">{{ selectedCombo ? selectedCombo.name : '请选择套装、颜色分类' }}</text>
          <text class="more-icon">></text>
        </view>

        <!-- 发货信息 -->
        <view class="delivery-section">
          <text class="label">发货</text>
          <view class="delivery-info">
            <text class="tag">现货</text>
            <text>48小时内发货，晚发必赔</text>
          </view>
          <view class="location">广东揭阳 | 包邮</view>
        </view>
      </view>

      <!-- 达人搭配推荐 -->
      <view id="recommendations" class="section">
        <view class="section-title">达人搭配推荐</view>
        <scroll-view scroll-x class="outfits-scroll">
          <view 
            v-for="outfit in recommendations" 
            :key="outfit.id"
            class="outfit-card"
            @click="navigateToOutfit(outfit.id)"
          >
            <image :src="outfit.image" mode="aspectFill" />
            <view class="outfit-info">
              <text class="outfit-creator">{{ outfit.creator }}</text>
              <text class="outfit-likes">{{ outfit.likes }} 赞</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 评价部分 -->
      <view id="reviews" class="section" @click="navigateToReview">
        <view class="review-header">
          <text class="title">商品评价·{{ product.reviewCount }}</text>
          <text class="rating">{{ product.rating }} 超赞</text>
        </view>
        <view class="review-list">
          <view v-for="review in reviews" :key="review.id" class="review-item">
            <view class="reviewer-info">
              <image :src="review.avatar" class="avatar" />
              <text class="name">{{ review.username }}</text>
            </view>
            <text class="content">{{ review.content }}</text>
            <view class="review-images" v-if="review.images && review.images.length">
              <image 
                v-for="(image, index) in review.images" 
                :key="index"
                :src="image"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
      </view>

      <!-- 详情部分 -->
      <view id="details" class="section">
        <view class="section-title">商品详情</view>
        <image 
          v-for="(img, index) in product.detailImages" 
          :key="index"
          :src="img"
          mode="widthFix"
          class="detail-image"
        />
      </view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="action-buttons">
      <view class="left-actions">
        <button class="icon-button" @click="navigateToStore">
          <text class="icon">🏪</text>
          <text>店铺</text>
        </button>
        <button class="icon-button" @click="contactService">
          <text class="icon">💬</text>
          <text>客服</text>
        </button>
        <button class="icon-button" @click="toggleCart">
          <text class="icon">🛒</text>
          <text>购物车</text>
        </button>
      </view>
      <view class="right-actions">
        <button class="add-to-cart-btn" @click="showSkuSelector('cart')">加入购物车</button>
        <button class="buy-now-btn" @click="showSkuSelector('buy')">领券购买</button>
      </view>
    </view>

    <!-- SKU选择弹窗 -->
    <view class="sku-popup" v-if="showSkuPopup">
      <view class="popup-mask" @click="closeSkuSelector"></view>
      <view class="popup-content">
        <view class="popup-header">
          <image :src="product.images[0]" class="product-thumb" />
          <view class="popup-product-info">
            <text class="popup-price">¥{{ product.price }}</text>
            <text class="popup-stock">库存 {{ product.stock }} 件</text>
            <text class="popup-selected">已选：{{ selectedCombo ? selectedCombo.name : '请选择' }}</text>
          </view>
          <text class="close-btn" @click="closeSkuSelector">×</text>
        </view>

        <!-- 套装选择 -->
        <view class="select-section">
          <text class="section-title">套装选择</text>
          <view class="combo-options">
            <view 
              v-for="combo in product.combos" 
              :key="combo.id"
              :class="['combo-option', { active: selectedComboId === combo.id }]"
              @click="selectCombo(combo)"
            >
              <image :src="combo.image" mode="aspectFill" />
              <text class="combo-name">{{ combo.name }}</text>
            </view>
          </view>
        </view>

        <button 
          class="confirm-btn" 
          :disabled="!selectedComboId"
          @click="confirmSelection"
        >
          {{ currentAction === 'cart' ? '确认' : '立即购买' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

export default {
  setup() {
    const showSearchBar = ref(false)
    const activeTab = ref('product')
    const showSkuPopup = ref(false)
    const selectedComboId = ref('')
    const selectedCombo = ref(null)
    const currentAction = ref('')
    const isFavorite = ref(false)

    const tabs = [
      { id: 'product', name: '商品' },
      { id: 'recommendations', name: '达人搭配推荐' },
      { id: 'reviews', name: '评价' },
      { id: 'details', name: '详情' }
    ]

    const product = reactive({
      id: 1,
      title: 'TULX·秋季穿搭男外套穿搭时尚套装显高显瘦男生秋冬季衣服风衣穿搭',
      price: 388,
      discountPrice: 363,
      stock: 999,
      sales: 47,
      purchases: 600,
      favorites: 400,
      reviewCount: 58,
      rating: 5.0,
      images: [
        'https://picsum.photos/800/800?random=1',
        'https://picsum.photos/800/800?random=2',
        'https://picsum.photos/800/800?random=3'
      ],
      detailImages: [
        'https://picsum.photos/800/1200?random=4',
        'https://picsum.photos/800/1200?random=5',
        'https://picsum.photos/800/1200?random=6'
      ],
      combos: [
        { 
          id: 1, 
          name: '套装1 (外套+内搭+裤子，没有鞋子.配饰等)',
          image: 'https://picsum.photos/200/200?random=7'
        },
        { 
          id: 2, 
          name: '套装2 (外套+内搭+裤子，没有鞋子.配饰等)',
          image: 'https://picsum.photos/200/200?random=8'
        }
      ]
    })

    const reviews = ref([
      {
        id: 1,
        username: '小红薯66E53AAE',
        avatar: 'https://picsum.photos/100/100?random=9',
        content: '收到了，尺码标准颜色也比较正，穿着也特别的合身',
        images: [
          'https://picsum.photos/300/300?random=10',
          'https://picsum.photos/300/300?random=11'
        ]
      }
    ])

    const recommendations = ref([
      {
        id: 1,
        image: 'https://picsum.photos/300/400?random=12',
        creator: '@时尚达人A',
        likes: 1234
      },
      {
        id: 2,
        image: 'https://picsum.photos/300/400?random=13',
        creator: '@潮流博主B',
        likes: 856
      }
    ])

    const handleScroll = (e) => {
      showSearchBar.value = e.detail.scrollTop > 100
    }

    const switchTab = (tabId) => {
      activeTab.value = tabId
    }

    const showSkuSelector = (action) => {
      currentAction.value = action || ''
      showSkuPopup.value = true
    }

    const closeSkuSelector = () => {
      showSkuPopup.value = false
      currentAction.value = ''
    }

    const selectCombo = (combo) => {
      selectedComboId.value = combo.id
      selectedCombo.value = combo
    }

    const confirmSelection = () => {
      if (currentAction.value === 'cart') {
        uni.showToast({ 
          title: '已加入购物车', 
          icon: 'success',
          duration: 2000
        })
      } else {
        uni.navigateTo({ 
          url: '/pages/shop/payment' 
        })
      }
      closeSkuSelector()
    }

    const navigateToOutfit = (outfitId) => {
      uni.navigateTo({
        url: `/pages/outfit-detail/outfit-detail?id=${outfitId}`
      })
    }

    const navigateToStore = () => {
      uni.navigateTo({
        url: '/pages/store/store'
      })
    }

    const contactService = () => {
      uni.showToast({
        title: '正在连接客服...',
        icon: 'none'
      })
    }

    const toggleCart = () => {
      uni.navigateTo({
        url: '/pages/cart/cart'
      })
    }

    const shareProduct = () => {
      uni.showShareMenu({
        withShareTicket: true
      })
    }

    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value
      uni.showToast({
        title: isFavorite.value ? '已收藏' : '已取消收藏',
        icon: 'success'
      })
    }

    const navigateToSearch = () => {
      uni.navigateTo({
        url: '/pages/search/search'
      })
    }

    const navigateToReview = () => {
      uni.navigateTo({
        url: '/pages/shop/review'
      })
    }

    return {
      showSearchBar,
      activeTab,
      tabs,
      product,
      reviews,
      recommendations,
      showSkuPopup,
      selectedComboId,
      selectedCombo,
      isFavorite,
      handleScroll,
      switchTab,
      showSkuSelector,
      closeSkuSelector,
      selectCombo,
      confirmSelection,
      navigateToOutfit,
      navigateToStore,
      contactService,
      toggleCart,
	  shareProduct,
      toggleFavorite,
      navigateToSearch,
      navigateToReview
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  padding-bottom: 120rpx;
  background: #f8f8f8;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}

.left-actions, .right-actions {
  display: flex;
  gap: 20rpx;
}

.icon-btn {
  background: rgba(0, 0, 0, 0.5);
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
}

.icon-btn .icon {
  color: #fff;
  font-size: 32rpx;
}

.search-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #fff;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.search-header.show {
  transform: translateY(0);
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #f8f8f8;
}

.search-bar input {
  flex: 1;
  height: 72rpx;
  background: #f1f1f1;
  border-radius: 36rpx;
  padding: 0 30rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
}

.back-icon, .share-icon {
  font-size: 40rpx;
  color: #333;
  padding: 10rpx;
}

.tab-nav {
  display: flex;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
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

.content-scroll {
  padding-top: 88rpx;
}

.section {
  margin-bottom: 20rpx;
  background: #fff;
}

.product-images {
  height: 750rpx;
}

.product-images image {
  width: 100%;
  height: 100%;
}

.price-section {
  padding: 20rpx;
}

.price-row {
  display: flex;
  align-items: baseline;
}

.current-price {
  font-size: 48rpx;
  color: #ff2d55;
  font-weight: bold;
}

.original-price {
  font-size: 28rpx;
  color: #ff2d55;
  margin-left: 20rpx;
  background: #fff5f7;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
}

.coupon-row {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}

.coupon-tag {
  padding: 4rpx 12rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 24rpx;
  border-radius: 4rpx;
  margin-right: 10rpx;
}

.coupon-text {
  font-size: 24rpx;
  color: #ff2d55;
  margin-right: 20rpx;
}

.product-title {
  padding: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  line-height: 1.4;
}

.sales-info {
  padding: 0 20rpx 20rpx;
  display: flex;
  gap: 40rpx;
  font-size: 24rpx;
  color: #999;
}

.guarantee-section {
  padding: 20rpx;
  display: flex;
  gap: 40rpx;
  border-top: 1rpx solid #f5f5f5;
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  color: #666;
}

.guarantee-item .icon {
  color: #ff2d55;
}

.activity-section {
  padding: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.activity-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
}

.activity-item .tag {
  background: #ff2d55;
  color: #fff;
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-right: 20rpx;
}

.selected-section {
  padding: 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #f5f5f5;
}

.selected-section .label {
  font-size: 28rpx;
  color: #999;
  margin-right: 20rpx;
}

.selected-section .value {
  flex: 1;
  font-size: 28rpx;
}

.delivery-section {
  padding: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.delivery-section .label {
  font-size: 28rpx;
  color: #999;
  margin-right: 20rpx;
}

.delivery-info {
  display: flex;
  align-items: center;
  margin: 10rpx 0;
}

.delivery-info .tag {
  background: #f5f5f5;
  color: #333;
  font-size: 24rpx;
  padding: 4rpx 12rpx;
  border-radius: 4rpx;
  margin-right: 20rpx;
}

.location {
  font-size: 24rpx;
  color: #999;
}

.section-title {
  padding: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  border-bottom: 1rpx solid #f5f5f5;
}

.outfits-scroll {
  white-space: nowrap;
  padding: 20rpx;
}

.outfit-card {
  display: inline-block;
  width: 300rpx;
  margin-right: 20rpx;
}

.outfit-card image {
  width: 300rpx;
  height: 400rpx;
  border-radius: 12rpx;
}

.outfit-info {
  padding: 10rpx;
}

.outfit-creator {
  font-size: 24rpx;
  color: #333;
}

.outfit-likes {
  font-size: 24rpx;
  color: #666;
}

.review-header {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #f5f5f5;
}

.review-header .title {
  font-size: 32rpx;
  font-weight: bold;
}

.review-header .rating {
  font-size: 28rpx;
  color: #ff2d55;
}

.review-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.reviewer-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.reviewer-info .avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.reviewer-info .name {
  font-size: 28rpx;
  color: #333;
}

.review-item .content {
  font-size: 28rpx;
  line-height: 1.6;
  color: #333;
  margin-bottom: 20rpx;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.review-images image {
  width: 220rpx;
  height: 220rpx;
  border-radius: 8rpx;
}

.detail-image {
  width: 100%;
  display: block;
}

.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
}

.left-actions {
  display: flex;
  margin-right: 20rpx;
}

.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  margin: 0 20rpx;
  padding: 0;
  line-height: 1.2;
}

.icon-button::after {
  border: none;
}

.icon-button .icon {
  font-size: 40rpx;
}

.right-actions {
  flex: 1;
  display: flex;
  gap: 20rpx;
}

.right-actions button {
  flex: 1;
  height: 80rpx;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  color: #fff;
}

.add-to-cart-btn {
  background: #ff9500;
}

.buy-now-btn {
  background: #ff2d55;
}

.sku-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
}

.popup-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
  max-height: 80vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  margin-bottom: 30rpx;
}

.product-thumb {
  width: 180rpx;
  height: 180rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.popup-product-info {
  flex: 1;
}

.popup-price {
  font-size: 36rpx;
  color: #ff2d55;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.popup-stock {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.popup-selected {
  font-size: 24rpx;
  color: #333;
}

.close-btn {
  font-size: 48rpx;
  color: #999;
  padding: 20rpx;
}

.select-section {
  margin-bottom: 30rpx;
}

.combo-options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.combo-option {
  padding: 20rpx;
  border: 2rpx solid #eee;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
}

.combo-option.active {
  border-color: #ff2d55;
  background: #fff5f7;
}

.combo-option image {
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
  border-radius: 8rpx;
}

.combo-name {
  font-size: 28rpx;
  color: #333;
}

.confirm-btn {
  width: 100%;
  height: 80rpx;
  border: none;
  border-radius: 40rpx;
  background: #ff2d55;
  color: #fff;
  font-size: 28rpx;
  margin-top: 30rpx;
}

.confirm-btn[disabled] {
  background: #ccc;
}

.more-icon {
  margin-left: auto;
  color: #999;
  font-size: 24rpx;
}
</style>

