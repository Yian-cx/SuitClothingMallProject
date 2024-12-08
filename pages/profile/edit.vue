<template>
<view class="container">
  <!-- 顶部导航 -->
  <view class="header">
    <button class="back-btn" @click="goBack">
      <text class="icon">←</text>
    </button>
    <text class="title">编辑资料</text>
  </view>

  <!-- 头像编辑 -->
  <view class="avatar-section">
    <view class="avatar-container" @click="changeAvatar">
      <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
      <view class="camera-icon">
        <text class="icon">📷</text>
      </view>
    </view>
  </view>

  <!-- 表单内容 -->
  <view class="form-content">
    <view class="form-item" @click="navigateToEdit('name')">
      <text class="label">名字</text>
      <view class="value-container">
        <text class="value">{{ userInfo.name }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('redBookId')">
      <text class="label">小红书号</text>
      <view class="value-container">
        <text class="value">{{ userInfo.redBookId }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('bio')">
      <text class="label">简介</text>
      <view class="value-container">
        <text class="value">{{ userInfo.bio }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('gender')">
      <text class="label">性别</text>
      <view class="value-container">
        <text class="value">{{ userInfo.gender }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('birthday')">
      <text class="label">生日</text>
      <view class="value-container">
        <text class="value">{{ userInfo.birthday }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('location')">
      <text class="label">地区</text>
      <view class="value-container">
        <text class="value">{{ userInfo.location }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('occupation')">
      <text class="label">职业</text>
      <view class="value-container">
        <text class="value">{{ userInfo.occupation }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="navigateToEdit('school')">
      <text class="label">学校</text>
      <view class="value-container">
        <text class="value">{{ userInfo.school || '选择学校' }}</text>
        <text class="arrow">></text>
      </view>
    </view>

    <view class="form-item" @click="changeBackground">
      <text class="label">背景图</text>
      <view class="value-container">
        <image 
          v-if="userInfo.backgroundImage" 
          :src="userInfo.backgroundImage" 
          class="background-preview" 
          mode="aspectFill"
        />
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const userInfo = ref({
      avatar: 'https://picsum.photos/200/200?random=1',
      name: '亦桉',
      redBookId: 'cxYtime',
      bio: '当朋友圈发！天天要开心！\nYou are the only one!\n正在中ing！！！',
      gender: '男',
      birthday: '2002-11-05',
      location: '中国 浙江 杭州',
      occupation: '搞笑博主',
      school: '',
      backgroundImage: 'https://picsum.photos/800/400?random=1'
    })

    const goBack = () => {
      uni.navigateBack()
    }

    const changeAvatar = () => {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          userInfo.value.avatar = res.tempFilePaths[0]
        }
      })
    }

    const changeBackground = () => {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          userInfo.value.backgroundImage = res.tempFilePaths[0]
        }
      })
    }

    const navigateToEdit = (field) => {
      uni.navigateTo({
        url: `/pages/profile/edit-field?field=${field}&value=${encodeURIComponent(userInfo.value[field] || '')}`
      })
    }

    return {
      userInfo,
      goBack,
      changeAvatar,
      changeBackground,
      navigateToEdit
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

.avatar-section {
  padding: 40rpx 0;
  display: flex;
  justify-content: center;
  background: #fff;
  margin-bottom: 20rpx;
}

.avatar-container {
  position: relative;
  width: 160rpx;
  height: 160rpx;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.camera-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 48rpx;
  height: 48rpx;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.form-content {
  background: #fff;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.label {
  font-size: 28rpx;
  color: #333;
}

.value-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.value {
  font-size: 28rpx;
  color: #666;
  margin-right: 10rpx;
  text-align: right;
}

.arrow {
  color: #999;
  font-size: 24rpx;
}

.background-preview {
  width: 100rpx;
  height: 100rpx;
  border-radius: 8rpx;
  margin-right: 10rpx;
}
</style>
