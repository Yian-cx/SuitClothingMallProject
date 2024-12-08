<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <view class="left">
        <button class="back-btn" @click="goBack">
          <text class="icon">←</text>
        </button>
        <view class="user-info">
          <image :src="chatUser.avatar" class="avatar" mode="aspectFill" />
          <text class="username">{{ chatUser.name }}</text>
        </view>
      </view>
      <button class="menu-btn">
        <text class="icon">⋯</text>
      </button>
    </view>

    <!-- Chat Area -->
    <scroll-view 
      scroll-y 
      class="chat-area"
      :scroll-into-view="lastMessageId"
      @scrolltoupper="loadMoreMessages"
    >
      <!-- Messages -->
      <view v-for="message in messages" :key="message.id" class="message-wrapper">
        <!-- Timestamp -->
        <view v-if="message.showTimestamp" class="timestamp">
          {{ message.timestamp }}
        </view>

        <!-- System Message -->
        <view v-if="message.type === 'system'" class="system-message">
          {{ message.content }}
        </view>

        <!-- User Message -->
        <view 
          v-else 
          class="message"
          :class="{ 'message-sent': message.isSent, 'message-received': !message.isSent }"
          :id="'msg-' + message.id"
        >
          <image 
            v-if="!message.isSent" 
            :src="message.avatar" 
            class="message-avatar"
            mode="aspectFill" 
          />
          <view class="message-content">
            {{ message.content }}
          </view>
          <image 
            v-if="message.isSent" 
            :src="message.avatar" 
            class="message-avatar"
            mode="aspectFill" 
          />
        </view>
      </view>
    </scroll-view>

    <!-- Quick Replies -->
    <scroll-view scroll-x class="quick-replies">
      <view 
        v-for="(reply, index) in quickReplies" 
        :key="index"
        class="quick-reply"
        @click="sendQuickReply(reply)"
      >
        <image :src="reply.icon" mode="aspectFit" class="reply-icon" />
        <text class="reply-text">{{ reply.text }}</text>
      </view>
    </scroll-view>

    <!-- Input Area -->
    <view class="input-area">
      <button class="voice-btn">
        <text class="icon">🎤</text>
      </button>
      <input 
        type="text" 
        v-model="messageText"
        class="message-input"
        placeholder="发消息..."
        :disabled="!canSendMessage"
        @confirm="sendMessage"
      />
      <button class="emoji-btn">
        <text class="icon">😊</text>
      </button>
      <button class="plus-btn">
        <text class="icon">+</text>
      </button>
    </view>
  </view>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  setup() {
    const chatUser = ref({
      id: 1,
      name: '薯',
      avatar: 'https://picsum.photos/100/100?random=1'
    })

    const messages = ref([
      {
        id: 1,
        type: 'normal',
        content: '你好呀，你也是在研究抖店嘛?',
        timestamp: '10-26 09:37',
        showTimestamp: true,
        isSent: false,
        avatar: 'https://picsum.photos/100/100?random=1'
      },
      {
        id: 2,
        type: 'system',
        content: '由于你和对方未互相关注，你回复之前，ta只能发送1条文字消息',
        timestamp: '10-26 09:37',
        showTimestamp: false
      },
      {
        id: 3,
        content: '没有',
        timestamp: '10-26 11:57',
        showTimestamp: true,
        isSent: true,
        avatar: 'https://picsum.photos/100/100?random=2'
      }
    ])

    const quickReplies = ref([
      { text: '我来了', icon: '/static/quick-reply/come.png' },
      { text: '赞', icon: '/static/quick-reply/like.png' },
      { text: 'hello', icon: '/static/quick-reply/hello.png' },
      { text: '谢谢宝宝', icon: '/static/quick-reply/thanks.png' },
      { text: '喜欢', icon: '/static/quick-reply/love.png' }
    ])

    const messageText = ref('')
    const canSendMessage = ref(true)
    const lastMessageId = computed(() => {
      const lastMessage = messages.value[messages.value.length - 1]
      return lastMessage ? 'msg-' + lastMessage.id : ''
    })

    const sendMessage = () => {
      if (!messageText.value.trim() || !canSendMessage.value) return

      messages.value.push({
        id: messages.value.length + 1,
        content: messageText.value,
        timestamp: new Date().toLocaleString(),
        showTimestamp: true,
        isSent: true,
        avatar: 'https://picsum.photos/100/100?random=2'
      })

      messageText.value = ''
      canSendMessage.value = false
    }

    const sendQuickReply = (reply) => {
      if (!canSendMessage.value) return
      messageText.value = reply.text
      sendMessage()
    }

    const loadMoreMessages = () => {
      // Implement loading more messages
      console.log('Loading more messages...')
    }

    const goBack = () => {
      uni.navigateBack()
    }

    return {
      chatUser,
      messages,
      quickReplies,
      messageText,
      canSendMessage,
      lastMessageId,
      sendMessage,
      sendQuickReply,
      loadMoreMessages,
      goBack
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  z-index: 100;
  border-bottom: 1rpx solid #eee;
}

.left {
  display: flex;
  align-items: center;
}

.back-btn, .menu-btn {
  background: none;
  border: none;
  padding: 20rpx;
  margin: 0;
  line-height: 1;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 10rpx;
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.username {
  font-size: 32rpx;
  font-weight: 500;
}

.chat-area {
  flex: 1;
  padding: 108rpx 20rpx 180rpx;
  box-sizing: border-box;
}

.message-wrapper {
  margin-bottom: 20rpx;
}

.timestamp {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  margin: 20rpx 0;
}

.system-message {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  background: rgba(0, 0, 0, 0.1);
  padding: 10rpx 20rpx;
  border-radius: 8rpx;
  margin: 20rpx auto;
  max-width: 80%;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.message-sent {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin: 0 20rpx;
}

.message-content {
  max-width: 60%;
  padding: 20rpx;
  border-radius: 20rpx;
  font-size: 28rpx;
  word-break: break-all;
}

.message-received .message-content {
  background: #fff;
}

.message-sent .message-content {
  background: #4080ff;
  color: #fff;
}

.quick-replies {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  background: #f8f8f8;
  padding: 20rpx;
  white-space: nowrap;
}

.quick-reply {
  display: inline-flex;
  align-items: center;
  background: #fff;
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  margin-right: 20rpx;
}

.reply-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}

.reply-text {
  font-size: 24rpx;
  color: #333;
}

.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f8f8f8;
  padding: 20rpx;
  display: flex;
  align-items: center;
  border-top: 1rpx solid #eee;
}

.voice-btn, .emoji-btn, .plus-btn {
  background: none;
  border: none;
  padding: 20rpx;
  margin: 0;
  line-height: 1;
}

.message-input {
  flex: 1;
  background: #fff;
  border-radius: 36rpx;
  padding: 20rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
}

.message-input[disabled] {
  background: #f5f5f5;
}
</style>

