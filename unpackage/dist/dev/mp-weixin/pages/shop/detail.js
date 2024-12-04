"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const outfit = common_vendor.ref({});
    const comments = common_vendor.ref([]);
    const newComment = common_vendor.ref("");
    common_vendor.onMounted(() => {
      outfit.value = {
        id: 1,
        title: "夏日清凉套装",
        price: 299,
        images: ["/static/outfit1_1.jpg", "/static/outfit1_2.jpg", "/static/outfit1_3.jpg"],
        description: "这是一套非常适合夏天穿着的清凉套装，包括一件T恤和一条短裤。"
      };
      comments.value = [
        { id: 1, user: "用户A", content: "这套衣服真不错！" },
        { id: 2, user: "用户B", content: "穿着很舒服，推荐购买。" }
      ];
    });
    const addToCart = () => {
      common_vendor.index.showToast({ title: "已加入购物车", icon: "success" });
    };
    const buyNow = () => {
      common_vendor.index.navigateTo({ url: "/pages/order/order" });
    };
    const submitComment = () => {
      if (newComment.value.trim()) {
        comments.value.push({
          id: comments.value.length + 1,
          user: "当前用户",
          content: newComment.value
        });
        newComment.value = "";
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(outfit.value.images, (image, k0, i0) => {
          return {
            a: image,
            b: image
          };
        }),
        b: common_vendor.t(outfit.value.title),
        c: common_vendor.t(outfit.value.price),
        d: common_vendor.o(addToCart),
        e: common_vendor.o(buyNow),
        f: common_vendor.t(outfit.value.description),
        g: common_vendor.f(comments.value, (comment, k0, i0) => {
          return {
            a: common_vendor.t(comment.user),
            b: common_vendor.t(comment.content),
            c: comment.id
          };
        }),
        h: newComment.value,
        i: common_vendor.o(($event) => newComment.value = $event.detail.value),
        j: common_vendor.o(submitComment)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e68d3657"]]);
wx.createPage(MiniProgramPage);
