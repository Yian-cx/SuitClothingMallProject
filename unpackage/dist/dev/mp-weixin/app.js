"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/home/outfit-detail.js";
  "./pages/shop/index.js";
  "./pages/shop/detail.js";
  "./pages/create/index.js";
  "./pages/messages/index.js";
  "./pages/messages/likes.js";
  "./pages/messages/favorites.js";
  "./pages/messages/follows.js";
  "./pages/messages/comments.js";
  "./pages/profile/index.js";
  "./pages/profile/settings.js";
  "./pages/profile/orders.js";
  "./pages/profile/cart.js";
  "./pages/profile/creator.js";
  "./pages/profile/history.js";
  "./pages/profile/my-items.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    setTimeout(() => {
      common_vendor.index.setTabBarBadge({
        index: 1,
        text: "31"
      });
      common_vendor.index.showTabBarRedDot({
        index: 3
      });
    }, 1e3);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
