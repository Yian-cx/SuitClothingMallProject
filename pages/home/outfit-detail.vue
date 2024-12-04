<template>
  <view class="container">
    <!-- 商品图片 -->
    <image :src="outfit.image" mode="aspectFill" class="outfit-image" />

    <!-- 商品信息 -->
    <view class="outfit-info">
      <text class="outfit-title">{{ outfit.title }}</text>
      <view class="outfit-stats">
        <text>{{ outfit.likes }} 赞</text>
        <text>{{ outfit.comments.length }} 评论</text>
        <view @click="toggleFavorite" :class="['favorite-btn', { active: isFavorite }]">
          <text>{{ isFavorite ? '已收藏' : '收藏' }}</text>
        </view>
      </view>
    </view>

    <!-- 留言列表 -->
    <view class="comments">
      <text class="comments-title">留言区</text>
      <view v-for="(comment, index) in outfit.comments" :key="index" class="comment">
        <text class="comment-user">{{ comment.user }}:</text>
        <text class="comment-content">{{ comment.content }}</text>
      </view>
    </view>

    <!-- 留言输入框 -->
    <view class="comment-input">
      <input v-model="newComment" placeholder="说点什么..." class="input-field" />
      <button @click="addComment" class="submit-btn">提交</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const outfit = ref({
      id: 1,
      title: '夏日清凉套装',
      image: 'https://picsum.photos/400/600?random=1',
      likes: 120,
      comments: [
        { user: '用户A', content: '很喜欢这个搭配！' },
        { user: '用户B', content: '请问鞋子是在哪里买的？' }
      ]
    })

    const isFavorite = ref(false)
    const newComment = ref('')

    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value
      uni.showToast({
        title: isFavorite.value ? '已收藏' : '取消收藏',
        icon: 'success'
      })
    }

    const addComment = () => {
      if (newComment.value.trim() === '') {
        uni.showToast({
          title: '内容不能为空',
          icon: 'none'
        })
        return
      }

      outfit.value.comments.push({
        user: '我',
        content: newComment.value
      })

      newComment.value = ''
      uni.showToast({
        title: '留言成功',
        icon: 'success'
      })
    }

    return {
      outfit,
      isFavorite,
      newComment,
      toggleFavorite,
      addComment
    }
  }
}
</script>

<style>
.container {
  padding: 20rpx;
  background: #f5f5f5;
}
.outfit-image {
  width: 100%;
  height: 400rpx;
  margin-bottom: 20rpx;
}
.outfit-info {
  margin-bottom: 20rpx;
}
.outfit-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.outfit-stats {
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #666;
}
.favorite-btn {
  padding: 10rpx 20rpx;
  border-radius: 12rpx;
  background-color: #eee;
  color: #333;
  font-size: 26rpx;
}
.favorite-btn.active {
  background-color: #007AFF;
  color: #fff;
}
.comments {
  margin-top: 20rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
}
.comments-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.comment {
  margin-bottom: 10rpx;
  font-size: 24rpx;
}
.comment-user {
  font-weight: bold;
  margin-right: 10rpx;
}
.comment-content {
  color: #666;
}
.comment-input {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  margin-top: 20rpx;
  border-radius: 12rpx;
}
.input-field {
  flex: 1;
  border: 1rpx solid #ddd;
  border-radius: 12rpx;
  padding: 10rpx;
  font-size: 24rpx;
}
.submit-btn {
  margin-left: 20rpx;
  padding: 10rpx 20rpx;
  background-color: #007AFF;
  color: #fff;
  font-size: 24rpx;
  border-radius: 12rpx;
}
</style>