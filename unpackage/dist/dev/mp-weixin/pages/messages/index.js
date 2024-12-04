"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const messages = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      messages.value = [
        { id: 1, user: { name: "用户A", avatar: "/static/avatar1.jpg" }, time: "10:30", text: "喜欢了你的穿搭" },
        { id: 2, user: { name: "用户B", avatar: "/static/avatar2.jpg" }, time: "昨天", text: "关注了你" },
        { id: 3, user: { name: "用户C", avatar: "/static/avatar3.jpg" }, time: "2天前", text: "评论了你的穿搭：很漂亮的搭配！" }
      ];
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (message, k0, i0) => {
          return {
            a: message.user.avatar,
            b: common_vendor.t(message.user.name),
            c: common_vendor.t(message.time),
            d: common_vendor.t(message.text),
            e: message.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aedce2fc"]]);
wx.createPage(MiniProgramPage);
