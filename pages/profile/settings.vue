<template>
<view class="container">
  <!-- 顶部导航 -->
  <view class="header">
    <button class="back-btn" @click="goBack">
      <text class="icon">←</text>
    </button>
    <text class="title">设置</text>
  </view>

  <!-- 设置列表 -->
  <view class="settings-list">
    <view class="settings-group">
      <view class="settings-item" @click="navigateTo('account')">
        <view class="item-left">
          <text class="icon">👤</text>
          <text class="label">账号与安全</text>
        </view>
        <text class="arrow">></text>
      </view>

      <view class="settings-item" @click="navigateTo('general')">
        <view class="item-left">
          <text class="icon">⚙️</text>
          <text class="label">通用设置</text>
        </view>
        <text class="arrow">></text>
      </view>

      <view class="settings-item" @click="navigateTo('notifications')">
        <view class="item-left">
          <text class="icon">🔔</text>
          <text class="label">通知设置</text>
        </view>
        <text class="arrow">></text>
      </view>

      <view class="settings-item" @click="navigateTo('privacy')">
        <view class="item-left">
          <text class="icon">🔒</text>
          <text class="label">隐私设置</text>
        </view>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="settings-group">
      <view class="settings-item" @click="navigateTo('storage')">
        <view class="item-left">
          <text class="icon">🗑</text>
          <text class="label">存储空间</text>
        </view>
        <view class="item-right">
          <text class="value">922.9 MB</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="settings-item" @click="navigateTo('content')">
        <view class="item-left">
          <text class="icon">📝</text>
          <text class="label">内容偏好调节</text>
        </view>
        <text class="arrow">></text>
      </view>

      <view class="settings-item" @click="navigateTo('widgets')">
        <view class="item-left">
          <text class="icon">🔲</text>
          <text class="label">添加小组件</text>
        </view>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="settings-group">
      <view class="settings-item" @click="navigateTo('youth')">
        <view class="item-left">
          <text class="icon">☂️</text>
          <text class="label">青少年模式</text>
        </view>
        <view class="item-right">
          <text class="value">未开启</text>
          <text class="arrow">></text>
        </view>
      </view>

      <view class="settings-item" @click="navigateTo('help')">
        <view class="item-left">
          <text class="icon">🎧</text>
          <text class="label">帮助与客服</text>
        </view>
        <text class="arrow">></text>
      </view>

      <view class="settings-item" @click="navigateTo('about')">
        <view class="item-left">
          <text class="icon">ℹ️</text>
          <text class="label">关于小红书</text>
        </view>
        <text class="arrow">></text>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-buttons">
      <button class="switch-account-btn" @click="switchAccount">切换账号</button>
      <button class="logout-btn" @click="logout">退出登录</button>
    </view>

    <!-- 隐私政策链接 -->
    <view class="privacy-links">
      <text class="link" @click="openPrivacyPolicy">《个人信息收集清单》</text>
      <text class="link" @click="openThirdPartyInfo">《第三方信息共享清单》</text>
    </view>
  </view>
</view>
</template>

<script>
export default {
  setup() {
    const goBack = () => {
      uni.navigateBack()
    }

    const navigateTo = (page) => {
      uni.navigateTo({
        url: `/pages/settings/${page}`
      })
    }

    const switchAccount = () => {
      // 实现切换账号逻辑
      uni.showToast({
        title: '切换账号',
        icon: 'none'
      })
    }

    const logout = () => {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '已退出登录',
              icon: 'success',
              success: () => {
                setTimeout(() => {
                  uni.reLaunch({
                    url: '/pages/login/login'
                  })
                }, 1500)
              }
            })
          }
        }
      })
    }

    const openPrivacyPolicy = () => {
      // 打开隐私政策
      uni.navigateTo({
        url: '/pages/webview/webview?url=privacy-policy'
      })
    }

    const openThirdPartyInfo = () => {
      // 打开第三方信息共享清单
      uni.navigateTo({
        url: '/pages/webview/webview?url=third-party-info'
      })
    }

    return {
      goBack,
      navigateTo,
      switchAccount,
      logout,
      openPrivacyPolicy,
      openThirdPartyInfo
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
  align-items: center;
  padding: 20rpx;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  background: none;
  border: none;
  padding: 20rpx;
  margin: 0;
  line-height: 1;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
}

.settings-group {
  margin-top: 20rpx;
  background: #fff;
  border-radius: 12rpx;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.settings-item:last-child {
  border-bottom: none;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.icon {
  font-size: 36rpx;
}

.label {
  font-size: 28rpx;
  color: #333;
}

.item-right {
  display: flex;
  align-items: center;
}

.value {
  font-size: 28rpx;
  color: #999;
  margin-right: 10rpx;
}

.arrow {
  color: #999;
  font-size: 24rpx;
}

.bottom-buttons {
  margin-top: 40rpx;
  padding: 0 20rpx;
}

.switch-account-btn, .logout-btn {
  width: 100%;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 32rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch-account-btn {
  background: #fff;
  color: #333;
}

.logout-btn {
  background: #fff;
  color: #333;
}

.privacy-links {
  padding: 40rpx 20rpx;
  display: flex;
  justify-content: center;
  gap: 20rpx;
}

.link {
  font-size: 24rpx;
  color: #999;
  text-decoration: underline;
}
</style>

