<template>
<view class="container">
  <!-- Header Section -->
  <view class="profile-header">
    
    
    <!-- User Info -->
    <view class="user-info">
      <image :src="userInfo.avatar" class="avatar" mode="aspectFill" />
      <text class="username">{{ userInfo.name }}</text>
      <text class="user-id">账号：{{ userInfo.id }}</text>
      <text class="location" v-if="userInfo.location">
        <text class="location-icon">📍</text>
        {{ userInfo.location }}
      </text>
      
      <!-- Bio/Description -->
      <text class="bio" v-if="userInfo.bio">{{ userInfo.bio }}</text>
    </view>

    <!-- Stats -->
    <view class="stats">
      <view class="stat-item">
        <text class="stat-value">{{ userInfo.following }}</text>
        <text class="stat-label">关注</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ userInfo.followers }}</text>
        <text class="stat-label">粉丝</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ userInfo.likes }}</text>
        <text class="stat-label">获赞与收藏</text>
      </view>
    </view>

    <!-- Action Buttons -->
    <view class="action-buttons">
      <button 
        class="follow-btn"
        :class="{ 'following': isFollowing }"
        @click="toggleFollow"
      >
        {{ isFollowing ? '已关注' : '关注' }}
      </button>
      <button class="message-btn" @click="sendMessage">
        <text class="icon">💬</text>
      </button>
    </view>

    <!-- Group Chat Button -->
    <view class="group-chat-btn" @click="viewGroupChat">
      <text class="icon">👥</text>
      <text>群聊</text>
      <text class="details-text">查看详情</text>
    </view>
  </view>

  <!-- Content Tabs -->
  <view class="content-tabs">
    <view 
      class="tab"
      :class="{ active: activeTab === 'posts' }"
      @click="setActiveTab('posts')"
    >
      商品卡
    </view>
    <view 
      class="tab"
      :class="{ active: activeTab === 'collections' }"
      @click="setActiveTab('collections')"
    >
      收藏
    </view>
  </view>

  <!-- Content Area -->
  <scroll-view 
    scroll-y 
    class="content-area"
    @scrolltolower="loadMore"
  >
    <view class="posts-grid" v-if="activeTab === 'posts'">
      <view 
        v-for="post in posts" 
        :key="post.id" 
        class="post-item"
        @click="viewPost(post)"
      >
        <image :src="post.image" mode="aspectFill" class="post-image" />
        <text class="post-title">{{ post.title }}</text>
        <view class="post-stats">
          <text>{{ post.likes }} 赞</text>
        </view>
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const userInfo = ref({
      name: '',
      id: '',
      avatar: '',
      location: '',
      bio: '',
      following: 0,
      followers: 0,
      likes: 0
    })

    const isFollowing = ref(false)
    const activeTab = ref('posts')
    const posts = ref([])

    onMounted(() => {
      // Get user ID from route params
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const userId = currentPage.$page?.options?.id

      // Fetch user data
      fetchUserData(userId)
    })

    const fetchUserData = (userId) => {
      // Simulate API call
      setTimeout(() => {
        userInfo.value = {
          name: '杭州鱼头欣欣',
          id: '94111629552',
          avatar: 'https://picsum.photos/200/200?random=1',
          location: '浙江杭州',
          bio: '头欣欣带你领杭州补贴鸭~',
          following: 220,
          followers: 232,
          likes: 8452
        }

        // Fetch initial posts
        fetchPosts()
      }, 500)
    }

    const fetchPosts = () => {
      // Simulate API call
      setTimeout(() => {
        const newPosts = [
          {
            id: 1,
            title: '杭州出来了！终于出来了！',
            image: 'https://picsum.photos/300/400?random=1',
            likes: 4063
          },
          {
            id: 2,
            title: '在杭州活着就是为了每月2500块的补贴😢',
            image: 'https://picsum.photos/300/400?random=2',
            likes: 3211
          }
        ]
        posts.value = [...posts.value, ...newPosts]
      }, 500)
    }

    const toggleFollow = () => {
      isFollowing.value = !isFollowing.value
      uni.showToast({
        title: isFollowing.value ? '已关注' : '已取消关注',
        icon: 'success'
      })
    }

    const sendMessage = () => {
      uni.navigateTo({
        url: `/pages/messages/chat?id=${userInfo.value.id}&name=${encodeURIComponent(userInfo.value.name)}`
      })
    }

    const viewGroupChat = () => {
      uni.navigateTo({
        url: '/pages/group/detail'
      })
    }

    const setActiveTab = (tab) => {
      activeTab.value = tab
      if (tab === 'posts' && posts.value.length === 0) {
        fetchPosts()
      }
    }

    const loadMore = () => {
      if (activeTab.value === 'posts') {
        fetchPosts()
      }
    }

    const viewPost = (post) => {
      uni.navigateTo({
        url: `/pages/post/detail?id=${post.id}`
      })
    }

    const goBack = () => {
      uni.navigateBack()
    }

    return {
      userInfo,
      isFollowing,
      activeTab,
      posts,
      toggleFollow,
      sendMessage,
      viewGroupChat,
      setActiveTab,
      loadMore,
      viewPost,
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

.profile-header {
  background: linear-gradient(to bottom, #1a1a1a, #333);
  padding: 40rpx 20rpx 20rpx;
  color: #fff;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40rpx;
}

.back-btn, .menu-btn {
  background: none;
  border: none;
  padding: 20rpx;
  color: #fff;
  font-size: 32rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20rpx;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.user-id {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10rpx;
}

.location {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10rpx;
}

.bio {
  font-size: 28rpx;
  text-align: center;
  margin: 20rpx 0;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin: 30rpx 0;
}

.follow-btn {
  background: #ff2d55;
  color: #fff;
  border: none;
  padding: 16rpx 60rpx;
  border-radius: 32rpx;
  font-size: 28rpx;
}

.follow-btn.following {
  background: #666;
}

.message-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.group-chat-btn {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.details-text {
  margin-left: auto;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.content-tabs {
  display: flex;
  background: #fff;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}

.tab {
  flex: 1;
  text-align: center;
  font-size: 28rpx;
  color: #666;
  position: relative;
  padding: 10rpx 0;
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

.content-area {
  padding: 20rpx;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.post-item {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 400rpx;
  background: #f0f0f0;
}

.post-title {
  font-size: 26rpx;
  color: #333;
  padding: 10rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-stats {
  padding: 10rpx;
  font-size: 24rpx;
  color: #999;
}
</style>
