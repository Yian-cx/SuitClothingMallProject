<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="nav-header">
      <view class="left-actions">
        <button class="icon-btn" @click="goBack">
          <text class="icon">←</text>
        </button>
      </view>
      <view class="title">创建新地址</view>
      <view class="right-actions"></view>
    </view>

    <!-- 表单内容 -->
    <view class="form-content">
      <view class="form-header">
        <text>填写地址</text>
        <view class="default-switch">
          <text>设为默认收货地址</text>
          <switch :checked="isDefault" @change="toggleDefault" color="#ff2d55" />
        </view>
      </view>

      <view class="form-group">
        <text class="label">收货人<text class="required">*</text></text>
        <input 
          type="text"
          v-model="form.name"
          placeholder="姓名"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-group">
        <text class="label">联系电话<text class="required">*</text></text>
        <input 
          type="number"
          v-model="form.phone"
          placeholder="手机号码"
          placeholder-class="placeholder"
          maxlength="11"
        />
      </view>

      <view class="form-group">
        <text class="label">所在地区<text class="required">*</text></text>
        <view class="region-picker" @click="showRegionPicker">
          <text v-if="form.region">{{ form.region }}</text>
          <text v-else class="placeholder">省、市、区、街道</text>
          <text class="icon">></text>
        </view>
      </view>

      <view class="form-group">
        <text class="label">详细地址<text class="required">*</text></text>
        <input 
          type="text"
          v-model="form.detail"
          placeholder="小区、门牌号等"
          placeholder-class="placeholder"
        />
        <view class="location-btn" @click="getLocation">
          <text class="icon">📍</text>
        </view>
      </view>

      <!-- 智能填写区域 -->
      <view class="smart-input">
        <text class="smart-title">智能填写</text>
        <view class="smart-content">
          <text class="placeholder">粘贴收货信息到此处，将自动识别收件人/手机号/地址</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <button class="save-btn" @click="saveAddress">保存地址</button>
    </view>
  </view>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const isDefault = ref(false)
    const form = reactive({
      name: '',
      phone: '',
      region: '',
      detail: ''
    })

    const goBack = () => {
      uni.navigateBack()
    }

    const toggleDefault = (e) => {
      isDefault.value = e.detail.value
    }

    const showRegionPicker = () => {
      // 实现省市区选择器
      uni.showToast({
        title: '地区选择功能开发中',
        icon: 'none'
      })
    }

    const getLocation = () => {
      // 实现定位功能
      uni.showToast({
        title: '定位功能开发中',
        icon: 'none'
      })
    }

    const saveAddress = () => {
      // 表单验证
      if (!form.name) {
        uni.showToast({
          title: '请输入收货人姓名',
          icon: 'none'
        })
        return
      }
      if (!form.phone) {
        uni.showToast({
          title: '请输入联系电话',
          icon: 'none'
        })
        return
      }
      if (!form.region) {
        uni.showToast({
          title: '请选择所在地区',
          icon: 'none'
        })
        return
      }
      if (!form.detail) {
        uni.showToast({
          title: '请输入详细地址',
          icon: 'none'
        })
        return
      }

      // 保存地址
      uni.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            uni.navigateBack()
          }, 2000)
        }
      })
    }

    return {
      isDefault,
      form,
      goBack,
      toggleDefault,
      showRegionPicker,
      getLocation,
      saveAddress
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

.form-content {
  padding: 88rpx 20rpx 0;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
}

.default-switch {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #666;
}

.form-group {
  background: #fff;
  padding: 20rpx;
  margin-bottom: 2rpx;
  display: flex;
  align-items: center;
}

.label {
  width: 160rpx;
  font-size: 28rpx;
  color: #333;
}

.required {
  color: #ff2d55;
  margin-left: 4rpx;
}

.form-group input {
  flex: 1;
  font-size: 28rpx;
  padding: 0 20rpx;
}

.placeholder {
  color: #999;
}

.region-picker {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  padding: 0 20rpx;
}

.location-btn {
  padding: 10rpx;
}

.smart-input {
  margin-top: 40rpx;
  padding: 20rpx;
}

.smart-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.smart-content {
  background: #fff;
  padding: 20rpx;
  border-radius: 12rpx;
  min-height: 200rpx;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
}

.save-btn {
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
