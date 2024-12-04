"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.ref({
      name: "时尚达人",
      avatar: "/static/user-avatar.jpg",
      bio: "热爱时尚，分享生活",
      followingCount: 256,
      followerCount: 1024,
      likeCount: 5678
    });
    const editProfile = () => {
      common_vendor.index.navigateTo({ url: "/pages/edit-profile/edit-profile" });
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatar,
        b: common_vendor.t(userInfo.value.name),
        c: common_vendor.t(userInfo.value.bio),
        d: common_vendor.t(userInfo.value.followingCount),
        e: common_vendor.t(userInfo.value.followerCount),
        f: common_vendor.t(userInfo.value.likeCount),
        g: common_vendor.o(editProfile),
        h: common_vendor.o(($event) => navigateTo("/pages/orders/orders")),
        i: common_vendor.o(($event) => navigateTo("/pages/cart/cart")),
        j: common_vendor.o(($event) => navigateTo("/pages/favorites/favorites")),
        k: common_vendor.o(($event) => navigateTo("/pages/earnings/earnings")),
        l: common_vendor.o(($event) => navigateTo("/pages/history/history"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-201c0da5"]]);
wx.createPage(MiniProgramPage);
