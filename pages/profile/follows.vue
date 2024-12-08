<template>
<view class="container">
  <!-- 顶部导航栏 -->
  <view class="header">
    <view class="tabs">
      <view 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab', { active: currentTab === tab.id }]"
        @click="switchTab(tab.id)"
      >
        {{ tab.name }}
      </view>
    </view>
  </view>

  <!-- 搜索栏 -->
  <view class="search-bar">
    <text class="search-icon">🔍</text>
    <input 
      type="text" 
      placeholder="搜索已关注的人" 
      v-model="searchQuery"
      @confirm="handleSearch"
    />
  </view>

  <!-- 筛选标签 -->
  <view class="filter-tags">
    <view class="tag-list">
      <view 
        v-for="filter in filters" 
        :key="filter.id"
        :class="['filter-tag', { active: currentFilter === filter.id }]"
        @click="setFilter(filter.id)"
      >
        {{ filter.name }}
      </view>
    </view>
    <view class="sort-btn">
      综合排序
      <text class="sort-icon">↓</text>
    </view>
  </view>

  <!-- 用户列表 -->
  <scroll-view 
    scroll-y 
    class="user-list"
    @scrolltolower="loadMore"
  >
    <view 
      v-for="user in filteredUsers" 
      :key="user.id" 
      class="user-item"
    >
      <image :src="user.avatar" class="user-avatar" mode="aspectFill" />
      <view class="user-info">
        <text class="username">{{ user.name }}</text>
        <text class="user-desc">{{ user.description }}</text>
      </view>
      <view class="action-buttons">
        <button 
          :class="['follow-btn', { following: user.isFollowing }]"
          @click="toggleFollow(user)"
        >
          {{ user.isFollowing ? '互相关注' : '已关注' }}
        </button>
        <text class="more-btn">⋯</text>
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const currentTab = ref('following')
    const searchQuery = ref('')
    const currentFilter = ref('all')

    const tabs = [
      { id: 'mutual', name: '互相关注' },
      { id: 'following', name: '关注' },
      { id: 'followers', name: '粉丝' },
      { id: 'recommended', name: '推荐' }
    ]

    const filters = [
      { id: 'all', name: '全部' },
      { id: 'merchant', name: '商家' }
    ]

    const users = ref([
      {
        id: 1,
        name: '花花',
        avatar: 'https://picsum.photos/100/100?random=1',
        description: '还没有简介',
        isFollowing: true
      },
      {
        id: 2,
        name: '不想要香菜',
        avatar: 'https://picsum.photos/100/100?random=2',
        description: '跨境跨境跨境...',
        isFollowing: true
      },
      {
        id: 3,
        name: '跨境可带（无偿领资料）',
        avatar: 'https://picsum.photos/100/100?random=3',
        description: '领取方式 ke\\run\\chu\\ch...',
        isFollowing: true
      },
      {
        id: 4,
        name: '小河青青',
        avatar: 'https://picsum.photos/100/100?random=4',
        description: '登山、运动、户外',
        isFollowing: true
      }
    ])

    const filteredUsers = ref(users.value)

    const switchTab = (tabId) => {
      currentTab.value = tabId
      // 在实际应用中这里需要重新获取对应tab的数据
    }

    const setFilter = (filterId) => {
      currentFilter.value = filterId
      // 在实际应用中这里需要根据筛选条件过滤数据
    }

    const handleSearch = () => {
      // 实现搜索逻辑
      console.log('Searching for:', searchQuery.value)
    }

    const toggleFollow = (user) => {
      user.isFollowing = !user.isFollowing
    }

    const loadMore = () => {
      // 实现加载更多逻辑
      console.log('Loading more users...')
    }

    const goBack = () => {
      uni.navigateBack()
    }

    return {
      currentTab,
      searchQuery,
      currentFilter,
      tabs,
      filters,
      filteredUsers,
      switchTab,
      setFilter,
      handleSearch,
      toggleFollow,
      loadMore,
      goBack
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #fff;
}

.header {
  position: fixed;
  top: 40rpx;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  padding: 20rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}

.back-btn {
  padding: 20rpx;
  margin-right: 20rpx;
}

.tabs {
  flex: 1;
  display: flex;
  justify-content: space-around;
}

.tab {
  position: relative;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
}

.tab.active {
  color: #333;
  font-weight: bold;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: #ff2d55;
  border-radius: 2rpx;
}

.search-bar {
  margin-top: 120rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8rpx;
  margin: 120rpx 20rpx 20rpx;
}

.search-icon {
  margin-right: 10rpx;
  color: #999;
}

.search-bar input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.filter-tags {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}

.tag-list {
  display: flex;
  gap: 20rpx;
}

.filter-tag {
  padding: 10rpx 20rpx;
  font-size: 28rpx;
  color: #666;
  background: #f5f5f5;
  border-radius: 20rpx;
}

.filter-tag.active {
  color: #333;
  background: #fff;
  font-weight: bold;
}

.sort-btn {
  font-size: 24rpx;
  color: #666;
  display: flex;
  align-items: center;
}

.sort-icon {
  margin-left: 4rpx;
}

.user-list {
  padding: 0 20rpx;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.user-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.user-desc {
  font-size: 24rpx;
  color: #999;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.follow-btn {
  font-size: 24rpx;
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  background: #fff;
  color: #333;
  border: 1rpx solid #ddd;
}

.follow-btn.following {
  background: #f5f5f5;
}

.more-btn {
  padding: 10rpx;
  color: #999;
}
</style>

