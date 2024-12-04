<template>
  <view class="my-page">
    <!-- 顶部区域 -->
    <view class="top-section">
      <view class="profile">
        <image class="avatar" :src="avatarUrl"></image>
        <view class="profile-info">
          <text class="name">亦桉</text>
          <text class="description">小红书号: 211944829</text>
          <text class="location">IP 属地: 浙江</text>
          <text class="signature">天天要开心！You are the only one！</text>
          <view class="tags">
            <text>18岁</text>
            <text>浙江杭州</text>
            <text>搞笑博主</text>
          </view>
        </view>
      </view>
      <view class="stats">
        <view class="stat">
          <text>11</text>
          <text>关注</text>
        </view>
        <view class="stat">
          <text>11</text>
          <text>粉丝</text>
        </view>
        <view class="stat">
          <text>21</text>
          <text>获赞与收藏</text>
        </view>
      </view>
      <view class="edit-settings">
        <view class="edit-button" @click="editProfile">编辑资料</view>
        <view class="settings-button" @click="openSettings">
          <image class="settings-icon" src="https://example.com/settings-icon.png" mode="aspectFit"></image>
        </view>
      </view>
    </view>

    <!-- 顶部标签栏 -->
    <view class="top-tabs">
      <view class="tab" @click="tabClick('购物')">购物</view>
      <view class="tab" @click="tabClick('订单')">订单</view>
      <view class="tab" @click="tabClick('购物车')">购物车</view>
    </view>

    <!-- 笔记展示区 -->
    <view class="notes">
      <view class="note" v-for="note in notes" :key="note.id">
        <image :src="note.image" mode="aspectFill"></image>
        <text>{{ note.title }}</text>
      </view>
    </view>


  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: 'https://example.com/avatar.jpg',
      notes: [
        {
          id: 1,
          image: 'https://example.com/note1.jpg',
          title: '好好生活'
        },
        // Add more notes as needed
      ]
    };
  },
  methods: {
    tabClick(tab) {
      console.log(`Clicked on tab: ${tab}`);
    },
    editProfile() {
      console.log('Edit profile');
    },
    openSettings() {
      console.log('Open settings');
    },
    navigateTo(page) {
      console.log(`Navigate to: ${page}`);
    }
  }
};
</script>

<style>
.my-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.description {
  margin-top: 5px;
}

.location {
  margin-top: 5px;
}

.signature {
  margin-top: 5px;
}

.tags {
  display: flex;
  margin-top: 10px;
}

.tags text {
  margin-right: 10px;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 10px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-settings {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.edit-button {
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.settings-button {
  display: flex;
  align-items: center;
}

.settings-icon {
  width: 20px;
  height: 20px;
}

.top-tabs {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px 0;
  border-radius: 10px 10px 0 0;
}

.tab {
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  margin: 0 10px;
  cursor: pointer;
}

.tab.active {
  background-color: #007aff;
  color: #fff;
}

.notes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.note {
  margin: 20px 0;
  width: 300px;
}

.note image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;
  background-color: #f0f0f0;
  border-radius: 0 0 10px 10px;
}

.nav-item {
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>